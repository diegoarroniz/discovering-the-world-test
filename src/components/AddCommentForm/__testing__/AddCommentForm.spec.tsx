import { render, screen } from '@testing-library/react';
import AddCommentForm from '..';
import { SnackbarProvider } from 'src/context';
import { fireEvent } from '@testing-library/react';

const funcMock = jest.fn()

describe('AddCommentForm', () => {
    test('renders without crashing', () => {
        render(
            <SnackbarProvider>
                <AddCommentForm postId="123" getPost={funcMock} />
            </SnackbarProvider>
        );
        expect(screen.getByLabelText(/write a comment/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });


    test('allows entering a comment', () => {
        render(
            <SnackbarProvider>
                <AddCommentForm postId="123" getPost={funcMock} />
            </SnackbarProvider>
        );
        const input = screen.getByLabelText(/write a comment/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Test comment' } });
        expect(input.value).toBe('Test comment');
    });
});
