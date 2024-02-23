import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { BannerContent, BannerTitle, Container } from "./Banner.styles";

function Banner({
  postImage,
  postTitle,
}: {
  postImage: string;
  postTitle: string;
}) {
  const navigate = useNavigate();
  return (
    <Container image={postImage}>
      <BannerContent>
        <Button
          sx={{ color: "white" }}
          startIcon={<ArrowBackIosIcon />}
          onClick={() => navigate("/")}
        >
          View Posts
        </Button>
        <BannerTitle variant="h3">{postTitle}</BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;
