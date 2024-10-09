
useEffect(() => {
  fetch(`https://api.example.com/data`)
    .then((response) => response.json())
    .then((data) => setData(data));
}, []); 
