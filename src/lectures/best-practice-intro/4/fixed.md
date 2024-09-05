``` jsx
function Form() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  return (
    <form>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
    </form>
  );
}
```
