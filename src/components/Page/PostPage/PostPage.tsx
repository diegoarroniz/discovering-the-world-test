import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import { AxiosError, AxiosResponse } from "axios";
import Banner from "../../Banner";
import Comments from "../../Comments";
import { Grid } from "@mui/material";

export interface Comment {
  id: string;
  author: string;
  content: string;
}

export interface Post {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments: Comment[];
}

function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
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
        console.error(`${error}`);
      });
  }, [postId]);

  if (!post) return <>"Loading..."</>;

  return (
    <Grid
      item
      sx={{
        backgroundColor: "#F0F0FF",
        height: "100%",
      }}
      flexDirection={"column"}
      container
    >
      <Grid item >
        <Banner postImage={post.image} postTitle={post.title} />
      </Grid>
      <Grid item  padding={2}>
        <p>{post.description}</p>
      </Grid>
      <Grid item flexGrow={1} padding={2}>
        <Comments comments={post.comments} />
      </Grid>
    </Grid>
  );
}

export default PostPage;
