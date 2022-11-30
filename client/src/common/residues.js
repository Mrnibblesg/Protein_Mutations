const residues = [
  { short: "A", long: "Ala", longest: "Alanine" },
  { short: "C", long: "Cys", longest: "Cysteine" },
  { short: "D", long: "Asp", longest: "Aspartate" },
  { short: "E", long: "Glu", longest: "Glutamate" },
  { short: "F", long: "Phe", longest: "Phenylalanine" },
  { short: "G", long: "Gly", longest: "Glycine" },
  { short: "H", long: "His", longest: "Histidine" },
  { short: "I", long: "Ile", longest: "Isoleucine" },
  { short: "K", long: "Lys", longest: "Lysine" },
  { short: "L", long: "Leu", longest: "Leucine" },
  { short: "M", long: "Met", longest: "Methionine" },
  { short: "N", long: "Asn", longest: "Asparagine" },
  { short: "P", long: "Pro", longest: "Proline" },
  { short: "Q", long: "Gln", longest: "Glutamine" },
  { short: "R", long: "Arg", longest: "Arginine" },
  { short: "S", long: "Ser", longest: "Serine" },
  { short: "T", long: "Thr", longest: "Threonine" },
  { short: "V", long: "Val", longest: "Valine" },
  { short: "W", long: "Trp", longest: "Tryptophan" },
  { short: "Y", long: "Tyr", longest: "Tyrosine" },
];

export default residues;

export const shortResidues = (() => residues.map((res) => res.short))();

// Currently finds by short, could be modified to find based on long or longest
export const findResidue = (string) => {
  return residues.find((residue) => residue.short == string);
};
