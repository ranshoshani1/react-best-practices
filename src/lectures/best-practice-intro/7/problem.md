```jsx
function App() {
  const user = {
    name: 'John Doe',
    age: 30,
  };

  return (
    <div>
      <UserCard user={user} />
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div>
      <User user={user} />
    </div>
  );
}

function User({ user }) {
  return (
    <div>
      <h3>Child Component</h3>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

```