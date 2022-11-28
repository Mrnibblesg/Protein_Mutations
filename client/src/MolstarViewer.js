import React, { useEffect, useRef } from "react";
import createMolstarViewer from "./molstar";

export default function MolstarViewer({ pdbStr, mutant }) {
  const molstarRef = useRef();

  useEffect(() => {
    const createViewer = async () => {
      await createMolstarViewer(molstarRef.current, pdbStr);
    };
    createViewer();
  }, [pdbStr, mutant]);

  return (
    <div
      ref={molstarRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
