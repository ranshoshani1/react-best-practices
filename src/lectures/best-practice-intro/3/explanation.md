# Components nesting

### Why You Shouldn’t Define a Component Inside Another Component

Defining a component inside another component can lead to performance issues and unexpected behavior. Here are the key reasons:

1. **Recreation on Every Render**:
   - The inner component gets recreated every time the outer component re-renders, leading to unnecessary re-renders and a loss of optimization.

2. **Increased Memory Usage**:
   - Recreating the component each time increases memory usage, especially in large applications.

3. **Unexpected Behavior**:
   - Hooks like `useState` or `useEffect` might behave unexpectedly since the component is recreated on each render.

4. **Lack of Code Reusability**:
   - The inner component becomes tightly coupled to the outer component, making it less reusable.

