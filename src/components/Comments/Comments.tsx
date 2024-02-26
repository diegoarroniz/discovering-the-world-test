import { Comment } from "../../types";
import {
  Title,
  Container,
  FormContainer,
} from "./Comments.styles";
import AddCommentForm from "../AddCommentForm";
import CommentCard from "../CommentCard";

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
          <CommentCard key={comment.id} comment={comment} />
        ))}
      <FormContainer item sm={8}>
        <AddCommentForm postId={postId} getPost={getPost} />
      </FormContainer>
    </Container>
  );
}

export default Comments;
