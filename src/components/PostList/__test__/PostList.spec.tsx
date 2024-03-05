import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PostContext } from 'src/context';
import PostList from '..';
import userEvent from '@testing-library/user-event';

const mockPosts = [
    { id: '1', title: 'Post 1', description: 'Description 1', comments: [], category: 'Category 1', image: '' },
    { id: '2', title: 'Post 2', description: 'Description 2', comments: [], category: 'Category 2', image: '' },
];

const contextPostMock = {
    posts: mockPosts,
    getPosts: jest.fn(),
    deletePost: jest.fn(),
}

describe('PostList', () => {
    test('renders posts correctly', () => {
        render(
            <MemoryRouter>
                <PostContext.Provider value={contextPostMock}>
                    <PostList posts={mockPosts} handleOpenForm={jest.fn()} />
                </PostContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Post 1')).toBeInTheDocument();
        expect(screen.getByText('Post 2')).toBeInTheDocument();
    });

    test('edit button calls handleOpenForm with post', async () => {
        const handleOpenFormMock = jest.fn();

        render(
            <MemoryRouter>
                <PostContext.Provider value={contextPostMock}>
                    <PostList posts={mockPosts} handleOpenForm={handleOpenFormMock} />
                </PostContext.Provider>
            </MemoryRouter>
        );

        const editButton = screen.getAllByLabelText('edit');
        await userEvent.click(editButton[0]);
        expect(handleOpenFormMock).toHaveBeenCalledWith(mockPosts[0]);
    });

    test('delete button triggers deletePost with correct id', async () => {
        render(
            <MemoryRouter>
                <PostContext.Provider value={contextPostMock}>
                    <PostList posts={mockPosts} handleOpenForm={jest.fn()} />
                </PostContext.Provider>
            </MemoryRouter>
        );

        const deleteButtons = screen.getAllByLabelText('delete');
        await userEvent.click(deleteButtons[0]);
        expect(contextPostMock.deletePost).toHaveBeenCalledWith('1');
    });
});
