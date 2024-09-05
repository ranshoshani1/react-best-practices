```jsx
function HostingTools() {
  const goToStaging = useNavigateToStaging();
  const migrate = useMigrate();
  const openDb = useOpenDb();

  const hasStaging = useHasStaging();

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={() => goToStaging()}>
          <ListItemIcon>
            <StagingIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={hasStaging ? "Manage staging" : "Create staging"}
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => goToStaging()}>
          <ListItemIcon>
            <MigrationIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Migrate your site" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => migrate()}>
          <ListItemIcon>
            <MigrationIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Migrate your site" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => openDb()}>
          <ListItemIcon>
            <DBIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Open database" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
```
