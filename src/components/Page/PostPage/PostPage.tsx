import { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";

import axios from "../../../api/axios";
import Banner from "../../Banner";
import Comments from "../../Comments";
import { Post } from "../../../types";
import { SnackbarContext } from "../../../context";
import Loading from "../../Loading";
import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";

function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const createAlert = useContext(SnackbarContext);
  const { postId } = useParams();

  const getPost = useCallback(() => {
    axios({
      method: "get",
      url: `/${postId}`,
      signal: AbortSignal.timeout(5000),
    })
      .then((response: AxiosResponse) => {
        if (response.status === 200 || response.status === 201) {
          setPost(response.data);
        }
      })
      .catch((error: AxiosError) => {
        createAlert({
          message: "Something went wrong.",
          severity: "error",
        });
        console.error(`${error}`);
      });
  }, [postId, createAlert]);

  useEffect(() => (postId ? getPost() : undefined), [postId, getPost]);

  if (!post || !postId) return <Loading />;

  return (
    <Container container>
      <BannerContainer item>
        <Banner postImage={post.image} postTitle={post.title} />
      </BannerContainer>
      <DescriptionContainer item>
        <p>{post.description}</p>
      </DescriptionContainer>
      <CommentsContainer item>
        <Comments postId={postId} comments={post.comments} getPost={getPost} />
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
