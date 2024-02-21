import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const PostCard = styled(Grid)<{ image: string }>`
  display: flex;
  flex-grow: 1;
  color: white;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => `url(${props.image})`};

  :hover .card-actions {
    visibility: visible;
  }
`;
