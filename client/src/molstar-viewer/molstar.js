import { createPluginAsync } from "molstar/lib/mol-plugin-ui";
import { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { PluginLayoutControlsDisplay } from "molstar/lib/mol-plugin/layout";
import { DefaultPluginUISpec, PluginUISpec } from "molstar/lib/mol-plugin-ui/spec";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { Script } from "molstar/lib/mol-script/script";
import { StructureSelection } from "molstar/lib/mol-model/structure/query/selection";
import { StateTransforms } from "molstar/lib/mol-plugin-state/transforms";
import { StructureQueryHelper } from "molstar/lib/mol-plugin-state/helpers/structure-query";

const defaultSpec = DefaultPluginUISpec();
const o = {
  layoutIsExpanded: true,
  layoutShowControls: true,
  layoutShowRemoteState: false,
  layoutControlsDisplay: "reactive",
  layoutShowSequence: true,
  layoutShowLog: false,
  layoutShowLeftPanel: false,
  layoutShowRightPanel: false,
  collapseLeftPanel: false,
  disableAntialiasing: PluginConfig.General.DisableAntialiasing.defaultValue,
  pixelScale: PluginConfig.General.PixelScale.defaultValue,
  pickScale: PluginConfig.General.PickScale.defaultValue,
  pickPadding: PluginConfig.General.PickPadding.defaultValue,
  enableWboit: PluginConfig.General.EnableWboit.defaultValue,

  viewportShowExpand: PluginConfig.Viewport.ShowExpand.defaultValue,
  viewportShowControls: PluginConfig.Viewport.ShowControls.defaultValue,
  viewportShowSettings: PluginConfig.Viewport.ShowSettings.defaultValue,
  viewportShowSelectionMode: PluginConfig.Viewport.ShowSelectionMode.defaultValue,
  viewportShowAnimation: PluginConfig.Viewport.ShowAnimation.defaultValue,
};

const spec = {
  behaviors: [...defaultSpec.behaviors],
  layout: {
    initial: {
      isExpanded: false,
      showControls: true,
      controlsDisplay: "reactive",
      regionState: {
        bottom: "full",
        left: o.collapseLeftPanel ? "collapsed" : "full",
        right: "hidden",
        top: "full",
      },
    },
  },
  components: {
    ...defaultSpec.components,
    controls: {
      // ...defaultSpec.components?.controls,
      top: o.layoutShowSequence ? undefined : "none",
      bottom: o.layoutShowLog ? undefined : "none",
      left: o.layoutShowLeftPanel ? undefined : "none",
    },
    remoteState: o.layoutShowRemoteState ? "default" : "none",
  },
  config: [
    [PluginConfig.General.DisableAntialiasing, o.disableAntialiasing],
    [PluginConfig.General.PixelScale, o.pixelScale],
    [PluginConfig.General.PickScale, o.pickScale],
    [PluginConfig.General.PickPadding, o.pickPadding],
    [PluginConfig.General.EnableWboit, o.enableWboit],
    [PluginConfig.Viewport.ShowExpand, o.viewportShowExpand],
    [PluginConfig.Viewport.ShowControls, o.viewportShowControls],
    [PluginConfig.Viewport.ShowSettings, o.viewportShowSettings],
    [PluginConfig.Viewport.ShowSelectionMode, o.viewportShowSelectionMode],
    [PluginConfig.Viewport.ShowAnimation, o.viewportShowAnimation],
  ],
};

function MolstarViewer() {
  // const state = plugin.state.data;
  // const update = state.build();
  // const struct = plugin.managers.structure.hierarchy.current.structures[0];
  // const repr = struct.components[0].representations[0].cell;
}

MolstarViewer.prototype.init = async function (root, data) {
  // manually set up all the state info
  // this was a pita to figure out - they need much better documentation

  this.plugin = await createPluginAsync(root, spec);
  const _data = await this.plugin.builders.data.rawData({ data });
  const trajectory = await this.plugin.builders.structure.parseTrajectory(_data, "pdb");

  const model = await this.plugin.builders.structure.createModel(trajectory);
  this.structure = await this.plugin.builders.structure.createStructure(model);
  const preset = await this.plugin.builders.structure.representation.applyPreset(
    this.structure,
    "auto",
    {
      theme: { globalName: "secondary-structure" },
    }
  );
};

MolstarViewer.prototype.getLociForAtomIds = function (atomIds) {
  const sel = Script.getStructureSelection(
    (Q) =>
      Q.struct.generator.atomGroups({
        // 'atom-test': Q.core.set.has([Q.set(...indices), Q.ammp('id')]),
        "atom-test": Q.core.set.has([Q.set(...atomIds), Q.ammp("id")]),
      }),
    this.structure.obj.data
  );

  return StructureSelection.toLociWithSourceUnits(sel);
};

MolstarViewer.prototype.deselectAllClusters = async function () {
  await this.plugin.managers.interactivity.lociHighlights.clearHighlights();
  await this.plugin.managers.interactivity.lociSelects.deselectAll();
  await this.plugin.managers.camera.reset();
};

MolstarViewer.prototype.selectCluster = async function (atomIds) {
  const loci = this.getLociForAtomIds(atomIds);

  await this.plugin.managers.interactivity.lociHighlights.clearHighlights();
  await this.plugin.managers.interactivity.lociSelects.deselectAll();

  await this.plugin.managers.camera.focusLoci(loci);
  await this.plugin.managers.structure.selection.fromLoci("add", loci);
};

MolstarViewer.prototype.unhighlightAllClusters = async function () {
  await this.plugin.managers.interactivity.lociHighlights.clearHighlights();
};

MolstarViewer.prototype.highlightCluster = async function (atomIds) {
  const loci = this.getLociForAtomIds(atomIds);

  await this.plugin.managers.interactivity.lociSelects.deselectAll();
  await this.plugin.managers.interactivity.lociHighlights.clearHighlights();

  await this.plugin.managers.interactivity.lociHighlights.highlight({ loci: loci }, false);
};

export default async function (root, data) {
  const viewer = new MolstarViewer();
  await viewer.init(root, data);
  return viewer;
}

// const pdbStr = require('./1aap.tsx');
// const clusters = require('./clusters.tsx');
// clusters.sort((a,b) => b.length - a.length);
// (async () => {
//     const viewer = await window.createMolstarViewer(document.getElementById('root'), pdbStr)

//     // debugger;

//     setTimeout(() => {
//         viewer.highlightCluster(clusters[1]);
//     }, 2000)
// })()
