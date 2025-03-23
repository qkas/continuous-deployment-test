import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoList } from './TodoList';

describe('TodoList Component', () => {
  it('displays "No task found" when the list is empty', () => {
    render(<TodoList />);
    const noTaskMessage = screen.getByText(/No task found/i);
    expect(noTaskMessage).toBeInTheDocument();
  });

  it('renders tasks and allows deletion', async () => {
    const mockRemove = jest.fn();
    const tasks = ['Task 1', 'Task 2'];

    render(<TodoList list={tasks} remove={mockRemove} />);

    // Ensure tasks are rendered
    tasks.forEach(task => {
      expect(screen.getByText(task)).toBeInTheDocument();
    });

    // Simulate deleting the first task
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await userEvent.click(deleteButtons[0]);

    // Ensure the remove function was called with the correct argument
    expect(mockRemove).toHaveBeenCalledWith('Task 1');
  });
});
