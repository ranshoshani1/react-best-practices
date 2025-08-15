```jsx
function DeleteStaging() {
  const { mutateAsync: deleteStaging } = useDeleteStaging(parentId);

  const handleDelete = async () => {
    try {
      await deleteStaging(stagingId);
      navigate(`/websites/${parent}/`);
    } catch (e) {
      createToast({
        type: "error",
        title: "Your staging environment wasn't deleted.",
        text: "There is a temporary glitch. Try again soon.",
      });
    }
  };

  return <button onClick={handleDelete}>Delete Staging</button>;
}
```
