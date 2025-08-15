# mutateAsync without catch

When using mutateAsync, it's crucial to handle potential errors properly. Not catching errors can lead to unhandled promise rejections and poor error handling.

**Why is this bad?**

1. **Swallowed Errors**:

   - Errors are not properly handled
   - Can lead to silent failures

2. **Poor User Experience**:

   - Users aren't informed of errors
   - No opportunity to recover from failures

3. **Debugging Difficulties**:
   - Error stack traces may be lost
   - Makes troubleshooting harder
