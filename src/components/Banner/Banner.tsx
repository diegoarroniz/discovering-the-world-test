import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Banner({
  postImage,
  postTitle,
}: {
  postImage: string;
  postTitle: string;
}) {
  const navigate = useNavigate();
  return (
    <Grid
      container
      flexGrow={1}
      sx={{
        backgroundImage: `url(${postImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat:"no-repeat",
        color: "white",
      }}
    >
      <Grid item flexGrow={1} padding={2}>
        <Button
          sx={{ color: "white" }}
          startIcon={<ArrowBackIosIcon />}
          onClick={() => navigate("/")}
        >
          View Posts
        </Button>
        <Grid item flexGrow={1} textAlign={"center"} paddingBottom={4}>
          <h1>{postTitle}</h1>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Banner;
