import { Card, Divider, List, ListItem, Stack, Typography } from "@mui/joy";
import Slide from "../../common/slide";
import { Presentation } from "../../presentation-framework";
import DerivativeState from "./examples/derivative-state.tsx";
import derivativeStateExample from "./examples/derivative-state.tsx?raw";
import DerivativeStateFixed from "./examples/derivative-state-fixed.tsx";
import derivativeStateExampleFixed from "./examples/derivative-state-fixed.tsx?raw";
import fetchExample from "./examples/fetch.tsx?raw";
import timersExample from "./examples/timers.tsx?raw";
import SyncStoreExample from "./examples/sync-store.tsx?raw";
import externalServiceExample from "./examples/external-service.tsx?raw";
import Code from "../../presentation-framework/code.tsx";
import DependencyArray from "./examples/dependency-array.tsx";
import dependencyArrayCode from "./examples/dependency-array.tsx?raw";
import DependencyArrayFixed from "./examples/dependency-array-fixed.tsx";
import dependencyArrayFixedCode from "./examples/dependency-array-fixed.tsx?raw";
import cleanupExample from "./examples/cleanup.tsx?raw";
import cleanupExampleFixed from "./examples/cleanup-fixed.tsx?raw";

const slides = [
  () => (
    <Slide alignItems="center">
      <Typography level="h1">Use Effect and its uses</Typography>
    </Slide>
  ),
  () => (
    <Slide gap={5}>
      <Typography level="h3">
        Use Effect is a hook that allows you to perform side effects in your
        component.
      </Typography>
      <Divider />
      <Typography level="h3">
        It is sometimes considered an anti-pattern depending on how it's used.
      </Typography>
    </Slide>
  ),
  () => (
    <Slide alignItems="center">
      <Typography level="h1">Why?</Typography>
    </Slide>
  ),
  () => {
    return (
      <Slide gap={4}>
        <Typography level="h1">Let's look at some examples</Typography>
      </Slide>
    );
  },
  () => (
    <Slide gap={4}>
      <Typography level="h1">Derivative State</Typography>
      <Divider />
      <CodeWithRender
        code={derivativeStateExample}
        component={<DerivativeState />}
      />
    </Slide>
  ),
  () => (
    <Slide gap={4}>
      <Typography level="h1" color="success">
        Fixed
      </Typography>
      <Divider />
      <DerivativeStateFixed />
      <Code>{derivativeStateExampleFixed}</Code>
    </Slide>
  ),
  () => {
    return (
      <Slide gap={4}>
        <CodeWithRender
          code={dependencyArrayCode}
          component={<DependencyArray />}
        />
      </Slide>
    );
  },
  () => {
    return (
      <Slide gap={4} direction="row">
        <Stack direction="column" gap={3}>
          <Typography level="h1">Improper dependency management</Typography>
          <Divider />
          <DependencyArrayFixed />
        </Stack>
        <Code>{dependencyArrayFixedCode}</Code>
      </Slide>
    );
  },
  () => {
    return (
      <Slide gap={4}>
        <Code>{cleanupExample}</Code>
      </Slide>
    );
  },
  () => {
    return (
      <Slide gap={4}>
        <Typography level="h1">Proper cleanup</Typography>
        <Code>{cleanupExampleFixed}</Code>
      </Slide>
    );
  },
  () => {
    return (
      <Slide>
        <Typography level="h1">So when should we use useEffect?</Typography>
      </Slide>
    );
  },
  () => {
    return (
      <Slide gap={4}>
        <Typography level="h1">
          Fetching Data from APIs or External Sources
        </Typography>
        <Code>{fetchExample}</Code>
      </Slide>
    );
  },
  () => {
    return (
      <Slide gap={4}>
        <Typography level="h1">
          Subscribing to External Services (e.g., WebSocket, Event Listeners)
        </Typography>
        <Code>{externalServiceExample}</Code>
      </Slide>
    );
  },
  () => {
    return (
      <Slide gap={4}>
        <Typography level="h1">Timers and Intervals</Typography>
        <Code>{timersExample}</Code>
      </Slide>
    );
  },
  () => {
    return (
      <Slide gap={4}>
        <Typography level="h1">
          Synchronizing with External State or Context
        </Typography>
        <Code>{SyncStoreExample}</Code>
      </Slide>
    );
  },
  () => {
    return (
      <Slide>
        <Typography level="h1">Summary</Typography>
      </Slide>
    );
  },
  () => (
    <Slide gap={3}>
      <Typography level="h1" color="danger">
        Using it wrong:
      </Typography>
      <Card>
        <Typography level="h3">Over-reliance on Side Effects</Typography>
        <Typography>
          When using the hook to simply manage state, re-rendering, or other
          internal logic that can be handled declaratively (without side
          effects), it can complicate your code unnecessarily.
        </Typography>
      </Card>
      <Card>
        <Typography level="h3">
          Incorrect dependency array management
        </Typography>
        <Typography>
          Forgetting to include dependencies or adding unnecessary dependencies
          can cause unnecessary re-renders, side effects running on unnecessary
          occasions, etc.
        </Typography>
      </Card>
      <Card>
        <Typography level="h3">Improper cleanup of side effects</Typography>
        <Typography>
          Not cleaning up side effects can lead to memory leaks, unnecessary
          resource consumption, and other performance issues.
        </Typography>
      </Card>
    </Slide>
  ),
  () => {
    return (
      <Slide gap={3}>
        <Typography level="h1" color="success">
          Using it right:
        </Typography>
        <List marker="disc">
          <ListItem>
            <Typography>Fetching data from APIs or external sources</Typography>
          </ListItem>
          <ListItem>
            <Typography>
              Subscribing to external services (e.g., WebSocket, Event
              Listeners)
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>Timers and intervals</Typography>
          </ListItem>
          <ListItem>
            <Typography>
              Synchronizing with external state or context
            </Typography>
          </ListItem>
        </List>
      </Slide>
    );
  },
  () => {
    return (
      <Slide>
        <Typography level="h1">Thank you</Typography>
      </Slide>
    );
  },
];

export default function LectureUseEffect() {
  return <Presentation slides={slides} />;
}
