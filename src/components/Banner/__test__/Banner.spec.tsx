import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Banner from '..'

describe('Banner Component', () => {
  const postImage = 'test-image.jpg';
  const postTitle = 'Test Post Title';

  test('renders with the correct background image', () => {
    render(<Banner postImage={postImage} postTitle={postTitle} />);
    const container = screen.getByTestId('banner-container'); // You'll need to add data-testid="banner-container" to your Container component
    expect(container).toHaveStyle(`backgroundImage: url(${postImage})`);
  });

  test('displays the correct post title', () => {
    render(<Banner postImage={postImage} postTitle={postTitle} />);
    expect(screen.getByText(postTitle)).toBeInTheDocument();
  });

  test('contains a button with "View Posts" text and an ArrowBackIosIcon', () => {
    render(<Banner postImage={postImage} postTitle={postTitle} />);
    expect(screen.getByRole('button', { name: /view posts/i })).toBeInTheDocument();
    expect(screen.getByTestId('ArrowBackIosIcon')).toBeInTheDocument(); // You'll need to add data-testid="ArrowBackIosIcon" to the ArrowBackIosIcon component
  });
});
