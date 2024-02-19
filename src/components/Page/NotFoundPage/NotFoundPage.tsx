import React from "react";
import Typography from "@mui/material/Typography";

export default function NotFoundPage(): React.JSX.Element {
  return (
    <>
      <Typography variant="h2">Page Not Found.</Typography>
      <br />
      <Typography sx={{ maxWidth: "60ch" }}>
        You have ended up on a URL for a page that does not exist. You can use
        the back button in your browser to return to where you were.
      </Typography>
    </>
  );
}
