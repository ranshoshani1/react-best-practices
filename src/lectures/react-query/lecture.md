# React Query Best Practices Lecture

---

## Common Issues

### Incorrect Data Invalidation After Mutation

**Why is this bad?**

- If you forget to invalidate queries, the UI might show stale data even after a mutation.
- Even with optimistic updates, queries should still be invalidated to ensure correctness. This should happen onSettled to ensure data is consistent even if the mutation fails.

---

### Using State Inside Query Hooks

- **State duplication** – React Query already provides caching and state management (Adding local state inside query hooks is redundant).
- **Unpredictable reactivity** – Changing local state inside a query function can cause issues (Query results should always be derived from server state, not local state).
- **Harder debugging** – Mixing `useState` with query hooks makes it harder to track state changes (Leads to unpredictable behaviors and makes debugging difficult).

---

### mutateAsync without catch

mutateAsync returns a promise. If you don't catch the error, it will be swallowed and the UI will show a generic error message.

---

### Missing types

If you don't provide type for the `useQuery` hook, it will be inferred as `any`.
This can lead to bugs from incorrect types.

---

## Best Practices

### Using Custom Hooks

Custom hooks make React Query logic more reusable, organized, and testable. Instead of calling `useQuery` or `useMutation` directly in components, we should encapsulate logic into custom hooks.

- **Separation of concerns** – Keeps components clean and focused on UI logic (Prevents bloated components that mix UI and data logic).
- **Reusability** – Easily reuse the same data-fetching logic across multiple places (Avoids code duplication and maintains consistency).
- **Encapsulation** – Custom hooks centralize options like `staleTime`, `select`, and `onSuccess`, making API management easier (Prevents scattered API calls and inconsistent behaviors).

---

### Using mutation events in the custom hook vs in the mutation function

There are two ways to handle the mutation events (onSuccess, onError, onSettled):

- Defined in the custom hook.
- Defined when calling the mutation function.

- **Inside a hook**: For React Query logic like invalidating queries.
- **Inside a mutation function**: For UI-related actions like showing a toast.

**Example 1: Defined in the custom hook**

```jsx
function useDeleteStaging(parentId: string) {
  return useMutation({
    mutationFn: (stagingId: string) => deleteStaging(stagingId),
    onSuccess: () => {
      // Query related actions
      queryClient.invalidateQueries({ queryKey: ["websites", parentId] });
    },
  });
}
```

**Example 2: Defined in mutate**

```jsx
function DeleteStaging() {
  const { mutate: deleteStaging } = useDeleteStaging(parentId);

  const handleDelete = () => {
    deleteStaging(stagingId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["websites", parentId] });
      },
    });
  };

  return <button onClick={handleDelete}>Delete Staging</button>;
}
```

**Example 3: Defined in mutateAsync**

```jsx
function DeleteStaging() {
  const { mutateAsync: deleteStaging } = useDeleteStaging(parentId);

  const handleDelete = async () => {
    try {
      await deleteStaging(stagingId);
      navigate(`/websites/${parent}/`);
    } catch (e) {
      // Creating a toast is UI related action.
      createToast({
        type: "error",
        title: "Your staging environment wasn't deleted.",
        text: "There is a temporary glitch. Try again soon.",
      });
    }
  };

  return <button onClick={handleDelete}>Delete Staging</button>;
}
```

---

### Optimistic Updates

Optimistic updates improve UX by updating the UI immediately before the mutation completes. This makes interactions feel much faster and more responsive.

- **Instant UI feedback** – The user sees the change immediately (Prevents delays in UI updates, which can feel unresponsive).

```jsx
function useDeleteInstance(parentId: string) {
  return useMutation({
    mutationFn: (instanceId: string) => deleteInstance(instanceId),
    onMutate: async (instanceId) => {
      await queryClient.cancelQueries({ queryKey: ["instances"] });
      const previousInstances = queryClient.getQueryData(["instances"]);
      queryClient.setQueryData(["instances"], (old) =>
        old.filter((instance) => instance.id !== instanceId)
      );
      return { previousInstances };
    },
    onError: (error, instanceId, context) => {
      queryClient.setQueryData(["instances"], context.previousInstances);
    },
    onSettled: () => {
      // Invalidate the queries to refetch the data
      queryClient.invalidateQueries({ queryKey: ["instances"] });
    },
  });
}
```

---

## Advanced Methods

### `useMutationState` for Global Mutation Awareness

If you want to track all running mutations globally, use `useMutationState`.

```jsx
const MUTATION_KEY = "deleteStaging";

function useDeleteStaging() {
  return useMutation({
    mutationKey: [MUTATION_KEY],
    mutationFn: (stagingId: string) => deleteStaging(stagingId),
  });
}

function useIsDeletingStaging() {
  const mutationState = useMutationState({ mutationKey: [MUTATION_KEY] });
  return mutationState.some((mutation) => mutation.status === "pending");
}
```

---

## Testing Strategies

### Mocking the API Response (MSW)

```jsx
const server = setupServer(
  http.get(
    `${process.env.NX_PUBLIC_HOSTING_API_BASE_URL}/v4/invitations/find`,
    ({ request }) => {
      const token = new URL(request.url).searchParams.get("token");
      let status;

      switch (token) {
        case "invalid":
          status = 500;
          break;
        case "unauthenticated":
          status = 401;
          break;
        case "unauthorized":
          status = 403;
          break;
        default:
          status = 200;
      }

      if (status !== 200) {
        throw new Response(null, { status });
      }

      return Response.json([
        {
          metadata: {
            siteName: "Test Site",
            siteUrl: "https://test-site.com",
            subdomain: "test-site",
          },
          status: token,
        },
      ]);
    }
  )
);

const renderWithRouter = (token: string): RenderResult => {
  return render(
    <Router initialEntries={[`/websites/site-sharing/accept?token=${token}`]}>
      <Routes>
        <Route
          path="/websites/site-sharing/accept"
          element={<InvitationModal />}
        />
        <Route path="/websites/test-site" element={<>Test Site</>} />
      </Routes>
    </Router>
  );
};

describe("Accept Invitation", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
});
```

**Most realistic** but **high overhead**.

- Uses Mock Service Worker (MSW) to simulate API responses.
- Best for integration tests.

**Key Takeaways**

- **Realistic API testing** – Simulates actual API requests (Ensures the app behaves correctly in a real environment).
- **Prevents external dependencies** – Avoids reliance on an actual backend during testing (Ensures tests are reliable and self-contained).
- **Requires setup** – MSW requires writing mock handlers and setting up request interception (More overhead compared to simpler mocking techniques).

---

### Mocking the API Hook

```jsx
jest.mock("../modules/staging/api", () => ({
  deleteStaging: jest.fn(),
}));
```

**Less setup than MSW**, but still tests API logic.

- Instead of mocking network requests, we mock the function that fetches data.

**Key Takeaways**

- **More control over test cases** – You can simulate different API responses (Makes it easier to test edge cases like errors or empty responses).
- **Lower overhead than MSW** – Avoids having to mock request handlers for every API call (Saves development time while still providing accurate test coverage).
- **Not a full integration test** – Since the API request is mocked, it doesn't test actual network interactions (Might miss issues that occur at the network level).

---

### Mocking the Entire Custom Hook

```jsx
jest.mock("../modules/staging/useDeleteStaging", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    mutate: jest.fn(),
    mutateAsync: jest.fn(),
    isPending: jest.fn(),
  }),
}));
```

**Minimal overhead**, but doesn't test real API behavior.

- This is a pure unit test approach.
- Useful for testing UI components in isolation.

**Key Takeaways**

- **Fast and lightweight** – Focuses only on UI behavior (Great for unit tests where external dependencies are not needed).
- **Easy to test UI variations** – Allows for testing multiple UI states (loading, success, error) (Ensures UI behaves correctly in all scenarios).
- **Lacks API validation** – Since it completely mocks the custom hook, it doesn't validate if the API calls are working (Can miss bugs related to actual data fetching).
- **May lead to over-mocking** – If the test setup is too detached from real-world usage, the tests might not be meaningful (Could give false confidence that the app is working when it's not).

---
