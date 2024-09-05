``` jsx
function NameForm() {
  const [name, setName] = React.useState('');

  const handleSubmit = (event) => {
    sendFormData(name);
    event.preventDefault();
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

```