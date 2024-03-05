import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreatePostButton from '..';

describe('CreatePostButton', () => {
    test('calls handleOpenForm when clicked', async () => {
        const handleOpenFormMock = jest.fn();

        render(<CreatePostButton handleOpenForm={handleOpenFormMock} />);

        // Find the button by role and click it
        const button = screen.getByRole('button');
        await userEvent.click(button);

        // Assert that the handleOpenForm was called once
        expect(handleOpenFormMock).toHaveBeenCalledTimes(1);
    });

    test('renders the button correctly', () => {
        const handleOpenFormMock = jest.fn();

        render(<CreatePostButton handleOpenForm={handleOpenFormMock} />);

        // Check if the button is rendered
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        const icon = screen.getByTestId('EditIcon');
        expect(icon).toBeInTheDocument();
    });
});
