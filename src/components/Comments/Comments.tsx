import { Box } from "@mui/material";

import { Comment } from "../../types";
import {
  Title,
  Container,
  FormContainer,
  CommentContainer,
} from "./Comments.styles";
import AddCommentForm from "../AddCommentForm";

interface CommentsProps {
  postId: string;
  comments: Comment[];
  getPost: () => void;
}

function Comments({ postId, comments, getPost }: CommentsProps) {
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentContainer item key={comment.id} sm={8}>
            <Box>{comment.author}</Box>
            <Box>{comment.content}</Box>
          </CommentContainer>
        ))}
      <FormContainer item sm={8}>
        <AddCommentForm postId={postId} getPost={getPost} />
      </FormContainer>
    </Container>
  );
}

export default Comments;
