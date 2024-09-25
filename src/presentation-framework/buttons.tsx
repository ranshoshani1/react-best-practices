import { Button } from "@mui/joy";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { usePresentationContext } from "./presentation";

export const NextButton = () => {
  const { next } = usePresentationContext();

  return (
    <Button onClick={next} size="sm" variant="soft">
      <VscChevronRight />
    </Button>
  );
};

export const PreviousButton = () => {
  const { previous } = usePresentationContext();

  return (
    <Button onClick={previous} size="sm" variant="soft">
      <VscChevronLeft />
    </Button>
  );
};
