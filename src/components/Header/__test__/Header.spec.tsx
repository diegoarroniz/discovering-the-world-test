import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe("Header", () => {
    test('Renders correctly with expected text content', () => {
        render(
            <Header />
        );

        // Check if the specific parts of the text content are in the document
        expect(screen.getByText(/Making your Life Easier/)).toBeInTheDocument();
        expect(screen.getByText(/Discovering the World/)).toBeInTheDocument();

        // Since you used a role in your Typography component, you can also use it for querying
        const headingElement = screen.getByRole('heading', { name: /Making your Life Easier/ });
        expect(headingElement).toBeInTheDocument();
    });
})