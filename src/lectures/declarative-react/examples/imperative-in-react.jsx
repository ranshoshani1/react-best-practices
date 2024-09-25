function NavMenu() {
  const items = [
    { id: "home", label: "Home", to: "/" },
    { id: "about", label: "About", to: "/about" },
    { id: "contact", label: "Contact", to: "/contact" },
  ];

  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
