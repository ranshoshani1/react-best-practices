```jsx
function useInstance(instanceId: string) {
  const [shouldPoll, setShouldPoll] = useState(false);

  return useQuery({
    queryKey: getQueryKey(instanceId),
    queryFn: () => {
      const instance = getInstance(instanceId);
      if (isPending(instance)) {
        setShouldPoll(true);
      }
      return instance;
    },
    refetchInterval: shouldPoll ? seconds(1) : false,
  });
}
```
