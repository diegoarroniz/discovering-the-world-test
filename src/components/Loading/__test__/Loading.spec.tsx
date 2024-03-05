import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading Component', () => {
  test('displays a loading spinner', () => {
    render(<Loading />);
    
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });
});
