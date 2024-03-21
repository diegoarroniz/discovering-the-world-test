import { ButtonGroup } from "@mui/material";

import { Container, StyledButton } from "./CategoryButtonGroup.styles";

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
    <Container item>
      <ButtonGroup aria-label="category button group" color="inherit">
        {categoryOptions.map((category) => (
          <StyledButton
            type="button"
            name={category.name}
            key={category.key}
            selected={category.name === categorySelected}
            aria-pressed={category.name === categorySelected ? 'true' : 'false'}
            onClick={() => handleSelectCategory(category.name)}
          >
            {category.name}
          </StyledButton>
        ))}
      </ButtonGroup>
    </Container>
  );
}

export default CategoryButtonGroup;
