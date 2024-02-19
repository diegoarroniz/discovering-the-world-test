import { Grid, Button, Box, ButtonGroup } from "@mui/material";

const categoryOptions = [
  {
    key: "all",
    name: "All",
  },
  {
    key: "healt",
    name: "Health",
  },
  {
    key: "travel",
    name: "Travel",
  },
  {
    key: "sports",
    name: "Sports",
  },
];

interface CategoryButtonGroupProps {
  categorySelected: string;
  handleSelectCategory: (category: string) => void;
}

function CategoryButtonGroup({
  categorySelected,
  handleSelectCategory,
}: CategoryButtonGroupProps) {
  return (
    <Grid item flexGrow={1}>
      <Box display="flex" justifyContent="center" paddingBottom={2}>
        <ButtonGroup aria-label="category button group" color="inherit">
          {categoryOptions.map((category) => (
            <Button
              key={category.key}
              type="button"
              onClick={() => {
                handleSelectCategory(category.name);
              }}
              sx={{
                backgroundColor:
                  category.name === categorySelected ? "#DCDCDC" : null,
              }}
            >
              {category.name}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Grid>
  );
}

export default CategoryButtonGroup;
