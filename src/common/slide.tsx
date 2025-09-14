import { Stack, StackProps } from "@mui/joy";

const Slide = (props: StackProps) => (
  <Stack
    className="slide"
    height="100%"
    width="100%"
    justifyContent="center"
    alignItems="flex-start"
    {...props}
  />
);

export default Slide;
