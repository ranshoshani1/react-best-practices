function App() {
  const [isActive, setIsActive] = useState(false);

  return (
    <button onClick={() => setIsActive(!isActive)}>
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}
