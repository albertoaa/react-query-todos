import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../../api/todosApi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

const TodosList = () => {
  const [newTodo, setNewTodo] = useState('');
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data: todos } = useQuery(['todos'], getTodos);

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      // Invalidates the cache and refetch data
      queryClient.invalidateQueries(['todos ']);
    },
  });

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      // Invalidates the cache and refetch data
      queryClient.invalidateQueries(['todos ']);
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      // Invalidates the cache and refetch data
      queryClient.invalidateQueries(['todos ']);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false });
    setNewTodo('');
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor='new-todo'>Enter a new todo item</label>
      <div className='new-todo'>
        <input
          type='text'
          id='new-todo'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Enter new todo'
        />
      </div>
      <button className='submit'>
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>c{error.message}</p>;
  } else {
    console.log(todos);
    content = JSON.stringify(todos);
  }

  return (
    <main>
      <h1>TodosList</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default TodosList;
