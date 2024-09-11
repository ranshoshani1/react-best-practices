``` jsx

function NameForm() {
  const inputRef = React.useRef();

  const handleSubmit = (event) => {
    sendFormData(inputRef.current.value);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={inputRef} />
      </label>
      <button type="submit" value="Submit" />
    </form>
  );
}

```