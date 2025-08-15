```tsx
function useInstance(instanceId: string) {
  return useQuery<Instance>({
    queryKey: getQueryKey(instanceId),
    queryFn: () => getInstance(instanceId),
  });
}

function InstanceDomain() {
  const { data: instance } = useInstance(website.id);

  return (
    <div>
      <h1>{instance?.name}</h1>
      <p>{instance?.domain}</p>
    </div>
  );
}
```
