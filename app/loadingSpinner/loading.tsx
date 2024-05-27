import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

function LoadingSpinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "self-start", height: "100vh", minWidth: "1700px" }}>
  <LinearProgress color="primary" style={{ width: "90%" }} />
</div>

  );
}

export default LoadingSpinner;
