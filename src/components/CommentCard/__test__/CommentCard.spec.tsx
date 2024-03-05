import { render, screen } from '@testing-library/react';
import CommentCard from '..';

const mockComment = {
  id: '1',
  author: 'John Doe',
  content: 'This is a test comment.',
};

describe('CommentCard', () => {
  test('renders the comment author and content', () => {
    render(
        <CommentCard comment={mockComment} />
    );

    expect(screen.getByText(mockComment.author)).toBeInTheDocument();
    expect(screen.getByText(mockComment.content)).toBeInTheDocument();
  });
});
