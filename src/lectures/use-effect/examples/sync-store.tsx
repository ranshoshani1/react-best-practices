
useEffect(() => {
  const unsubscribe = someGlobalStore.subscribe(() => {
    const data = someGlobalStore.getData();
    setDataInAnotherStore(data);
  });

  return () => unsubscribe();
}, []);
