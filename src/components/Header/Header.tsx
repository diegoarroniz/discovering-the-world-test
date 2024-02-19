import { Grid, Typography } from "@mui/material";

function Header() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      padding={2}
    >
      <Grid item flexGrow={1}>
        <Typography
          variant="caption"
          color="primary"
          component="div"
          alignItems="center"
        >
          <span style={{ fontSize: "1.5rem" }}>[ </span>
          Making your Life Easier
          <span style={{ fontSize: "1.5rem" }}> ]</span>
        </Typography>
      </Grid>
      <Grid item flexGrow={1}>
        <Typography variant="h4">
          <strong>Discovering the World</strong>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Header;
