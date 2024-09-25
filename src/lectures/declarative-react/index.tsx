import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  StackProps,
  Typography,
} from "@mui/joy";
import { ReactNode, useState } from "react";
import { Presentation } from "../../presentation-framework";
import Code from "../../presentation-framework/code";
import declarativeExample from "./examples/declarative.jsx?raw";
import imperativeInReactExample from "./examples/imperative-in-react.jsx?raw";
import imperativeToDeclarative from "./examples/imperative-to-declarative.jsx?raw";
import imperativeExample from "./examples/imperative.jsx?raw";
import tableExample from "./examples/table-example.jsx?raw";

function Header({
  title,
  subtitle,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <Stack gap={2} justifyContent="center" mb={7}>
      <Typography level="h1">{title}</Typography>
      {!!subtitle && <Typography level="h2">{subtitle}</Typography>}
    </Stack>
  );
}

const CenterStack = (props: StackProps) => (
  <Stack height="100%" justifyContent="center" alignItems="center" {...props} />
);

const slides = [
  () => (
    <CenterStack>
      <Typography level="h1">Declarative vs Imperative Programming</Typography>
    </CenterStack>
  ),
  () => (
    <Stack gap={10} alignItems="center">
      <Stack textAlign="center">
        <Typography level="h1">Imperative programming</Typography>
        <Typography level="h2" color="danger">
          How to do
        </Typography>
      </Stack>
      <Stack width="60vw">
        <Typography level="h3">
          In imperative programming, you focus on how to achieve a result.
          <br /> You provide specific instructions to manipulate the UI, which
          can involve direct DOM manipulation.
        </Typography>
      </Stack>
    </Stack>
  ),
  () => (
    <Stack gap={4}>
      <Code>{imperativeExample}</Code>
      <Typography level="h4">
        In this example, we imperatively update the button text by directly
        manipulating the DOM element (button.textContent = ...) when the button
        is clicked. You are telling the system how to update the UI.
      </Typography>
    </Stack>
  ),
  () => (
    <Stack gap={10} alignItems="center">
      <Stack textAlign="center">
        <Typography level="h1">Declarative programming</Typography>
        <Typography level="h2" color="danger">
          How should it look
        </Typography>
      </Stack>
      <Stack width="60vw">
        <Typography level="h3">
          In declarative programming, you focus on what the UI should look like
          based on the application's current state.
          <br /> You describe the outcome you want, and the system takes care of
          updating the UI.
        </Typography>
      </Stack>
    </Stack>
  ),
  () => (
    <Stack gap={4}>
      <Code>{declarativeExample}</Code>
      <Typography level="h4">
        In this example, we declare the desired state of the button. React takes
        care of updating the DOM to reflect the changes in state (i.e., showing
        "Active" or "Inactive").
      </Typography>
    </Stack>
  ),
  () => {
    return (
      <Stack gap={4}>
        <Header title="Benefits of declarative programming" />
        <Stack direction="column" gap={2} width="50vw">
          <Card>
            <Typography level="h4">Simplicity</Typography>
            <Typography>
              Declarative code is easier to read and understand because it
              focuses on the desired outcome rather than the implementation
              details.
            </Typography>
          </Card>
          <Card>
            <Typography level="h4">Easier state management</Typography>
            <Typography>
              Since you focus on describing the UI based on state, there's less
              need to manage how the state changes, but when it does nad how the
              UI reacts to it.
            </Typography>
          </Card>
          <Card>
            <Typography level="h4">Fewer bugs</Typography>
            <Typography>
              Because the DOM updates are abstracted away, there's less chance
              of introducing bugs related to manual DOM manipulation
            </Typography>
          </Card>
        </Stack>
      </Stack>
    );
  },
  () => (
    <CenterStack gap={4}>
      <Typography level="h1">Non declarative programming in React</Typography>
      <Typography level="h2">
        We can go even further and call some coding style as {"  "}
        <Typography level="h2" color="danger">
          Non declarative
        </Typography>
      </Typography>
    </CenterStack>
  ),
  () => (
    <Stack gap={4}>
      <Code>{imperativeInReactExample}</Code>
    </Stack>
  ),
  () => (
    <CenterStack gap={4} alignItems="flex-start">
      <Typography level="h2">
        We can see that this code is not in a declarative fashion.
      </Typography>
      <Typography level="h4">
        Because we are not truly describing "What the UI should look like."
      </Typography>
      <Typography level="h4">
        We are dynamically rendering a list of{" "}
        <Typography color="danger">static</Typography> elements.
      </Typography>
      <Divider />
      <Typography level="h4">
        This approach makes the code harder to read, as it requires switching
        back and forth between the list and the component to understand what's
        actually being rendered.
      </Typography>
      <Divider />
    </CenterStack>
  ),
  () => (
    <CenterStack>
      <Typography level="h1">We can fix it </Typography>
    </CenterStack>
  ),
  () => {
    const [fixed, setFixed] = useState(false);

    const FixMe = () => (
      <Button
        onClick={() => setFixed(!fixed)}
        size="sm"
        color="danger"
        variant="solid"
        className="glow"
      >
        Fix me
      </Button>
    );

    const Unfix = () => (
      <Button
        onClick={() => setFixed(!fixed)}
        size="sm"
        color="success"
        variant="outlined"
      >
        Unfix
      </Button>
    );

    return (
      <Stack gap={1} height="100%">
        <Code>
          {fixed ? imperativeToDeclarative : imperativeInReactExample}
        </Code>
        <Box>{fixed ? <Unfix /> : <FixMe />}</Box>
      </Stack>
    );
  },
  () => (
    <CenterStack>
      <Typography level="h1">
        But sometimes we do need to use a more imperative approach
      </Typography>
    </CenterStack>
  ),
  () => (
    <Stack justifyContent="flex-start">
      <Code>{tableExample}</Code>
    </Stack>
  ),
  () => (
    <CenterStack>
      <Typography level="h1">
        In this example, we have several places that are dependent on `fields`,
        the Row and the Header.
        <br /> It makes more sense to edit them in a central place instead of
        going back and forth between a header component and a row component.
      </Typography>
    </CenterStack>
  ),
  () => (
    <CenterStack>
      <Typography level="h1">Conclusion</Typography>
    </CenterStack>
  ),
  () => {
    return (
      <CenterStack>
        <Stack gap={4} textAlign="center" width="50vh">
          <Typography level="h1">Be more declarative</Typography>
          <Typography level="h3">
            By adopting a more declarative way of writing, we can achieve
            cleaner, more maintainable code that is easier to read and
            understand.
          </Typography>
        </Stack>
      </CenterStack>
    );
  },
  () => {
    return (
      <CenterStack>
        <Stack gap={4} textAlign="center" width="50vh">
          <Typography level="h2">
            But we can also be flexible and use imperative code when it makes
            more sense.
          </Typography>
        </Stack>
      </CenterStack>
    );
  },
  () => {
    return (
      <CenterStack>
        <Stack gap={4} textAlign="center" width="50vh">
          <Typography level="h1">Thank you!</Typography>
        </Stack>
      </CenterStack>
    );
  },
];

export default function Declarative() {
  return <Presentation slides={slides} />;
}
