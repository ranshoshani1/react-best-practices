# Derivative state

In React, derivative state refers to state that can be computed or derived from other existing state or props within a component, rather than being stored separately. Managing derivative state effectively helps to keep your components simpler, reduce redundancy, and prevent potential issues like data inconsistency.

**Why is it bad?**

1. **Redundancy**:

   - Storing derivative state leads to duplicated data, increasing the risk of errors and making it harder to keep data in sync.

2. **Data Inconsistency**:

   - Derivative state can become out of sync with the source state, leading to UI bugs and incorrect data display.

3. **Increased Complexity**:

   - Managing multiple interdependent state variables adds complexity to the code, making it harder to maintain and more prone to bugs.

4. **Additional State Management**:

   - Manually updating derivative state requires extra boilerplate code and introduces the risk of forgetting updates, causing inconsistent behavior.

5. **Performance Concerns**:

   - Storing derivative state for performance reasons can lead to premature optimization. React's rendering and memoization are usually sufficient without needing extra state.

6. **Violation of React’s Declarative Nature**:
   - React’s declarative approach is undermined by storing unnecessary state, complicating the component’s behavior and making it less predictable.

**Any derivative state can be resolved through computation (and memoization for performance).**
