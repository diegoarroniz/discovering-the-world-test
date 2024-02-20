import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

import { Comment } from "../../types";

interface CommentsProps {
  comments: Comment[];
}

function Comments({ comments }: CommentsProps) {
  const [newComment, setNewComment] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setNewComment(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newComment);
  };

  return (
    <Grid container flexGrow={1} justifyContent={"center"} display={"flex"}>
      <Grid flexGrow={1} item sm={8}>
        <Grid item flexGrow={1}>
          <h4>Comments</h4>
        </Grid>
        <>
          {comments.map((comment) => (
            <Grid
              item
              key={comment.id}
              flexGrow={1}
              padding={2}
              marginBottom={3}
              sx={{ backgroundColor: "white", borderRadius: "8px" }}
            >
              <div> {comment.author}</div>
              <div>{comment.content}</div>
            </Grid>
          ))}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              id="comment-id"
              label="Write a comment"
              type="text"
              variant="standard"
              name="comment"
              margin="dense"
              onChange={handleChange}
              sx={{ paddingBottom: 2 }}
            />
            <Button type="submit" variant="contained" disabled={!newComment}>
              Add
            </Button>
          </form>
        </>
      </Grid>
    </Grid>
  );
}

export default Comments;
