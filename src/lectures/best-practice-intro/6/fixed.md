### Solution

```jsx
<List>
  <HostingToolsListItem
    icon={<StagingIcon fontSize="small" />}
    label={
      hasStaging ? "Manage staging environment" : "Create a staging environment"
    }
    onClick={hasStaging ? actions.manageStaging : actions.createStaging}
  />
  <HostingToolsListItem
    icon={<MigrationIcon />}
    label="Migrate your site"
    onClick={actions.migrateSite}
  />
  <HostingToolsListItem
    icon={<DBIcon />}
    label="Open database"
    onClick={actions.openDB}
    endIcon={<ExternalLinkIcon color="secondary" />}
  />
  <HostingToolsListItem
    icon={<SFTPIcon />}
    label="Show SFTP details"
    onClick={actions.showSftp}
  />
</List>
```
