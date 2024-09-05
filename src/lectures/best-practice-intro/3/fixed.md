```jsx
function Avatar({ src }) {
  return <img src={src} />;
}

function User({ user }) {
  return (
    <div>
      <Avatar />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}
```
