# Prop Drilling

This pattern involves passing data from a parent component down through multiple layers of child components until it reaches the component that needs it.

2. **Why It Can Be a Problem**:
   - As your application grows, prop drilling can make your components harder to manage and understand.
   - It increases the coupling between components, making changes more difficult.
   - It can lead to unnecessary re-renders.

3. **Alternatives**:
   - **Context API**: Provides a way to pass data through the component tree without having to pass props down manually at every level.
   - **State Management Libraries**: Tools like Redux can help manage state globally, reducing the need for prop drilling.
