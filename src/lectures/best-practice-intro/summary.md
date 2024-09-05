# Summary

## Do's

- **One file per component**:

  - Each component is defined in its own file. Makes it easier to find components and keeps the files small and focused.

- **Split state**

  - Split state into multiple pieces based on their responsibilities. This improves state management, performance, debugging, control, readability, and maintainability.

- **Controlled over uncontrolled components**:

  - Use controlled components to have a single source of truth, validate and format input values, conditionally render elements, debug more easily, and ensure predictability in the UI.

- **Modularity**:
  - Split code into small, reusable components. This enhances reusability, maintainability, testability, separation of concerns, debugging, collaboration, performance optimization, scalability, and clearer responsibility.

## Don'ts

- **Derivative state**:

  - Use computed state instead of storing derived state separately. This helps to keep components simpler, reduce redundancy, and prevent potential issues like data inconsistency.

- **Components nesting**:

  - Avoid defining a component inside another component. This can lead to performance issues, increased memory usage, unexpected behavior, and lack of code reusability.

- **Prop Drilling**:

  - Avoid prop drilling by using the Context API or state management libraries like Redux. Prop drilling can make components harder to manage, increase coupling, lead to unnecessary re-renders, and make changes more difficult.

- **Over-Generalization**:

  - Avoid making components or code too generic or reusable. This can lead to unnecessary complexity, maintainability issues, reduced readability, performance costs, and unnecessary abstraction.
