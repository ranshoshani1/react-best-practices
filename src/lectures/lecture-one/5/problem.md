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
      <input type="submit" value="Submit" />
    </form>
  );
}

```