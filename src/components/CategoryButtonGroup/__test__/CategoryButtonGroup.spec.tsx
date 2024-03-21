import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryButtonGroup from '../CategoryButtonGroup';

describe('CategoryButtonGroup Component', () => {
    const handleSelectCategoryMock = jest.fn();

    beforeEach(() => {
        handleSelectCategoryMock.mockClear();
    });

    test('renders the correct number of category buttons', () => {
        render(<CategoryButtonGroup categorySelected="All" handleSelectCategory={handleSelectCategoryMock} />);
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(4);
    });

    test('marks the correct category as selected', () => {
        const selectedCategory = "Health";
        render(<CategoryButtonGroup categorySelected={selectedCategory} handleSelectCategory={handleSelectCategoryMock} />);
        const selectedButton = screen.getByRole('button', { name: selectedCategory });
        expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
    });

    test('calls handleSelectCategory with the correct category name when a category button is clicked', () => {
        render(<CategoryButtonGroup categorySelected="All" handleSelectCategory={handleSelectCategoryMock} />);
        const categoryToSelect = "Travel";
        const button = screen.getByRole('button', { name: categoryToSelect });
        fireEvent.click(button);
        expect(handleSelectCategoryMock).toHaveBeenCalledWith(categoryToSelect);
    });
});
