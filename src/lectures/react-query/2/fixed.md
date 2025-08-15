```jsx
function useInstance(instanceId: string) {
  return useQuery({
    queryKey: getQueryKey(instanceId),
    queryFn: () => {
      return getInstance(instanceId);
    },
    refetchInterval: (query) => {
      // Use other solutions instead of inner state
      return isPending(query.state?.data) ? seconds(1) : false;
    },
  });
}
```
