```jsx
function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
}

function useAddTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    onSuccess: (newTodo) => {
      queryClient.setQueryData(["todos"], (old) => [...old, newTodo]);
    },
  });
}
```
