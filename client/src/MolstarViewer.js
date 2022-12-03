import { Box } from "@mui/material";
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
    <Box mx={{ sm: 5, md: 15, xl: 20 }} data-testid="molstarViewer">
      <div
        ref={molstarRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
}
