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
import DependencyArray2 from "./examples/dependency-array2.tsx";
import dependencyArray2Code from "./examples/dependency-array2.tsx?raw";
import DependencyArrayFixed from "./examples/dependency-array-fixed.tsx";
import dependencyArrayFixedCode from "./examples/dependency-array-fixed.tsx?raw";
import cleanupExample from "./examples/cleanup.tsx?raw";
import cleanupExampleFixed from "./examples/cleanup-fixed.tsx?raw";
import InfiniteRender from "./examples/infinite-render.tsx";
import infiniteRenderCode from "./examples/infinite-render.tsx?raw";
import InfiniteRenderFixed from "./examples/infinite-render-fixed.tsx";
import infiniteRenderFixedCode from "./examples/infinite-render-fixed.tsx?raw";
import { CodeWithRender } from "../../common/code-with-render.tsx";
import TimerButton from "./components/timer-button.tsx";

const TIMER_DURATION = 60000;

const slides = [
  () => (
    <Slide
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      gap={4}
    >
      <Typography level="h1" sx={{ fontSize: "7rem" }}>
        Use Effect and its uses
      </Typography>
    </Slide>
  ),
  () => (
    <Slide alignItems="center" justifyContent="center">
      <Stack gap={6} textAlign="center" width="70vw">
        <Typography level="h1">
          useEffect is the second most commonly used hook in React.
        </Typography>
        <Divider />
        <Typography level="h2">
          Its lets you run side effects ( fetching data, subscribing to events,
          or manipulating the DOM) after the component has rendered.
        </Typography>
        <Divider />
        <Typography level="h3">
          It runs after every render by default, but you can control when it
          runs by specifying dependencies in its array.
        </Typography>
      </Stack>
    </Slide>
  ),
  () => (
    <Slide gap={5} alignItems="center">
      <Typography level="h1" sx={{ fontSize: "7rem" }} color="danger">
        BUT!{" "}
      </Typography>
      <Typography level="h2">
        It is sometimes considered an anti-pattern
      </Typography>
    </Slide>
  ),
  () => (
    <Slide alignItems="center" justifyContent="center">
      <Stack gap={5} width="40vw" textAlign="center">
        <Typography level="h3" color="warning">
          Think of useEffect as that friend who means well but sometimes shows
          up at the wrong time... 🤦‍♀️
        </Typography>
        <Divider />
        <Typography level="body-lg" color="primary">
          Fun fact: 73.6% of React bugs are caused by useEffect*
        </Typography>
      </Stack>
      <Stack
        gap={5}
        textAlign="center"
        justifyContent="flex-end"
        alignItems="flex-start"
        sx={{ position: "absolute", bottom: "30px", left: "30px" }}
      >
        <Typography level="body-sm" fontStyle="italic">
          *Statistics may be completely made up
        </Typography>
      </Stack>
    </Slide>
  ),
  () => {
    return (
      <Slide gap={4} alignItems="center" justifyContent="center">
        <Typography level="h1" fontSize="5rem">
          Let's look at some examples
        </Typography>
      </Slide>
    );
  },
  () => {
    return (
      <Slide gap={4}>
        <Code>{cleanupExample}</Code>
        <TimerButton timeMs={TIMER_DURATION} />
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
  () => (
    <Slide gap={4} paddingTop={5}>
      <Divider />
      <CodeWithRender
        code={derivativeStateExample}
        component={<DerivativeState />}
      />
      <TimerButton timeMs={TIMER_DURATION} />
    </Slide>
  ),
  () => (
    <Slide gap={4}>
      <Typography level="h1" fontSize="5rem">
        Derivative State
      </Typography>
    </Slide>
  ),
  () => (
    <Slide gap={4}>
      <Typography level="h1">
        Derivative State -{" "}
        <Typography level="h1" color="success">
          Fixed
        </Typography>
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
        <TimerButton timeMs={TIMER_DURATION} />
      </Slide>
    );
  },
  () => {
    return (
      <Slide gap={4}>
        <CodeWithRender
          code={dependencyArray2Code}
          component={<DependencyArray2 />}
        />
        <TimerButton timeMs={TIMER_DURATION} />
      </Slide>
    );
  },
  () => {
    return (
      <Slide gap={4}>
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
        <Stack direction="column" gap={3}>
          <InfiniteRender />
        </Stack>
      </Slide>
    );
  },
  () => {
    return (
      <Slide gap={4}>
        <Code>{infiniteRenderCode}</Code>
        <TimerButton timeMs={TIMER_DURATION} />
      </Slide>
    );
  },
  () => {
    return (
      <Slide gap={4}>
        <Typography level="h1" color="success">
          Fixed
        </Typography>
        <Code>{infiniteRenderFixedCode}</Code>
      </Slide>
    );
  },
  () => {
    return (
      <Slide gap={4}>
        <Stack direction="column" gap={3}>
          <InfiniteRenderFixed />
        </Stack>
      </Slide>
    );
  },
  () => {
    return (
      <Slide justifyContent="center" alignItems="center">
        <Typography level="h1" fontSize="5rem">
          When should we use useEffect?
        </Typography>
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
        <Typography level="body-sm">
          * Prefer using a library like React Query or RTK Query for fetching
          data
        </Typography>
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
        <Typography level="h1" fontSize="5rem">
          Summary
        </Typography>
      </Slide>
    );
  },
  () => (
    <Slide gap={3} width="50vw">
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
      <Slide justifyContent="center">
        <Stack direction="column" gap={3}>
          <Typography level="h1" color="success">
            Using it right:
          </Typography>
          <List marker="disc">
            <ListItem>
              <Typography>
                Fetching data from APIs or external sources
              </Typography>
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
        </Stack>
      </Slide>
    );
  },
  () => {
    return (
      <Slide justifyContent="center" alignItems="center" gap={10}>
        <Typography level="h1" fontSize="5rem">
          That's it!
        </Typography>
        <Typography level="h1">Thanks</Typography>
      </Slide>
    );
  },
];

export default function LectureUseEffect() {
  return <Presentation slides={slides} />;
}
