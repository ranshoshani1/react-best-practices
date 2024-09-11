```jsx
function List({ data }) {
  const sortedData = data.sort((a, b) => a - b);

  return (
    <ul>
      {sortedData.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```
