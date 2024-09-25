function ListItem({ label, to }) {
  return (
    <li>
      <Link to={to}>{label}</Link>
    </li>
  );
}

function NavMenu() {
  return (
    <nav>
      <ul>
        <ListItem label="Home" to="/" />
        <ListItem label="About" to="/about" />
        <ListItem label="Contact" to="/contact" />
      </ul>
    </nav>
  );
}
