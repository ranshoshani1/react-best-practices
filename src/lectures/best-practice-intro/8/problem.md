```jsx
function FieldInput({ field }) {
  if (field.type === "textarea") {
    return (
      <div>
        <label>{field.label}</label>
        <textarea />
      </div>
    );
  }

  return (
    <div>
      <label>{field.label}</label>
      <input type={field.type} />
    </div>
  );
}

function Form() {
  const fields = [
    {
      label: "Name",
      type: "text",
    },
    {
      label: "Description",
      type: "textarea",
    },
    {
      label: "Password",
      type: "password",
    },
  ];

  return (
    <Stack direction="column" alignItems="center">
      <FieldInput field={fields[0]}>
      <FieldInput field={fields[1]}>
      <FieldInput field={fields[2]}>
    </Stack>
  );
}
```
