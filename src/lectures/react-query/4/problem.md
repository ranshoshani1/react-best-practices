```jsx
function useInstance(instanceId: string) {
  return useQuery({
    queryKey: getQueryKey(instanceId),
    queryFn: () => getInstance(instanceId),
  });
}

function InstanceDomain() {
  const { data: instance } = useInstance(website.id);

  return (
    <div>
      <h1>{instance.name}</h1>
      <p>{instance.domain}</p>
    </div>
  );
}
```
