```jsx
function List({ data }) {
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    setSortedData(data.sort((a, b) => a - b));
  }, [data]);

  return (
    <ul>
      {sortedData.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```
