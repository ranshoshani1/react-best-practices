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
      // Always invalidate on success to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
```
