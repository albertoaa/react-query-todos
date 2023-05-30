import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../../api/todosApi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

const TodosList = () => {
  const [newTodo, setNewTodo] = useState();
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data: todos } = useQuery('todos', getTodos);

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      // Invalidates the cache and refetch data
      queryClient.invalidateQueries('todos ');
    },
  });

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      // Invalidates the cache and refetch data
      queryClient.invalidateQueries('todos ');
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      // Invalidates the cache and refetch data
      queryClient.invalidateQueries('todos ');
    },
  });

  return <div>TodosList</div>;
};

export default TodosList;
