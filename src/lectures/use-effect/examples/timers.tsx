useEffect(() => {
  const intervalId = setInterval(() => {
    console.log("Interval running...");
  }, 1000);

  return () => clearInterval(intervalId);
}, []);
