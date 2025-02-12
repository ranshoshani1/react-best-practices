```jsx
function DeleteStaging() {
  const { mutateAsync: deleteStaging } = useDeleteStaging(parentId);

  const handleDelete = async () => {
    await deleteStaging(stagingId);
    navigate(`/websites/${parent}/`);
  };

  return <button onClick={handleDelete}>Delete Staging</button>;
}
```
