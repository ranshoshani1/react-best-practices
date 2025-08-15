# Incorrect Data Invalidation After Mutation

When using React Query mutations, proper data invalidation is crucial for maintaining data consistency. Forgetting to invalidate queries after mutations can lead to stale data being displayed in the UI.

**Why is this bad?**

1. **Stale Data Display**: 
   - Users see outdated information even after successful mutations
   - Creates confusing user experiences

2. **Inconsistent State**: 
   - The client cache becomes out of sync with the server
   - Can lead to bugs and unexpected behavior

3. **Failed Mutation Handling**:
   - Without proper invalidation on settled, failed mutations can leave the cache in an inconsistent state
   - Makes error recovery more difficult 