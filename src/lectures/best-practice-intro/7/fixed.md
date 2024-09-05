```jsx

function User() {
  const user = useUser();
  
  return (
    <div>
      <h3>Child Component</h3>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

```