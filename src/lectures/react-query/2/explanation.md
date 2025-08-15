# Using State Inside Query Hooks

React Query is designed to manage server state effectively. Adding local state inside query hooks creates unnecessary complexity and can lead to issues with state management.

**Why is this bad?**

1. **State Duplication**:
   - React Query already handles caching and state management
   - Additional state creates redundancy

2. **Unpredictable Behavior**:
   - Local state changes can interfere with query cache
   - Makes debugging more difficult

3. **Unnecessary Complexity**:
   - Adds extra state management overhead
   - Violates separation of concerns 