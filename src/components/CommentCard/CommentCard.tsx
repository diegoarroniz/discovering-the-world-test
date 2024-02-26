import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Comment } from "../../types";
import { Container, Content, Autor } from "./CommentCard.styles";

interface CommentsProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentsProps) {
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        <Autor>{comment.author}</Autor>
        <Typography>{comment.content}</Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
