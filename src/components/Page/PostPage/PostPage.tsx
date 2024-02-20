import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { Grid } from "@mui/material";

import axios from "../../../api/axios";
import Banner from "../../Banner";
import Comments from "../../Comments";
import { Post } from "../../../types";
import { SnackbarContext } from "../../../context";
import Loading from "../../Loading";

function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const createAlert = useContext(SnackbarContext);
  const { postId } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `/${postId}`,
      signal: AbortSignal.timeout(5000),
    })
      .then((response: AxiosResponse) => {
        setPost(response.data);
      })
      .catch((error: AxiosError) => {
        createAlert({
          message: "Something went wrong.",
          severity: "error",
        });
        console.error(`${error}`);
      });
  }, [postId, createAlert]);

  if (!post) return <Loading />;

  return (
    <Grid
      container
      height="100%"
      flexDirection={"column"}
      sx={{ backgroundColor: "#F0F0FF" }}
    >
      <Grid item flexGrow={1}>
        <Banner postImage={post.image} postTitle={post.title} />
      </Grid>
      <Grid item padding={2}>
        <p>{post.description}</p>
      </Grid>
      <Grid item flexGrow={1} padding={2}>
        <Comments comments={post.comments} />
      </Grid>
    </Grid>
  );
}

export default PostPage;
