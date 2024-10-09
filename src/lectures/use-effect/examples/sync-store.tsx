useEffect(() => {
  const unsubscribe = someGlobalStore.subscribe(() => {
    setData(someGlobalStore.getData());
  });

  return () => unsubscribe();
}, []); 