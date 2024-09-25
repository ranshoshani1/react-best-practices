import { Stack } from "@mui/joy";
import { createContext, FC, useCallback, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { NextButton, PreviousButton } from "./buttons";

const PresentationContext = createContext({
  next: () => {},
  previous: () => {},
});

export const usePresentationContext = () => {
  return useContext(PresentationContext);
};

type Props = {
  slides: FC[];
};

export default function Presentation({ slides }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSlide = Number(searchParams.get("s")) || 0;

  const setCurrentSlide = useCallback(
    (index: number) => {
      setSearchParams({ s: `${index}` });
    },
    [setSearchParams]
  );

  const next = useCallback(() => {
    if (currentSlide === slides.length - 1) {
      return;
    }
    setCurrentSlide(currentSlide + 1);
  }, [currentSlide, slides.length, setCurrentSlide]);

  const previous = useCallback(() => {
    if (currentSlide === 0) {
      return;
    }
    setCurrentSlide(currentSlide - 1);
  }, [currentSlide, setCurrentSlide]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        next();
      } else if (event.key === "ArrowLeft") {
        previous();
      }
    },
    [next, previous]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);

    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, [handleKeyPress]);

  const Slide = slides[currentSlide];

  return (
    <PresentationContext.Provider
      value={{
        next,
        previous,
      }}
    >
      <Stack height="80%" p={5} justifyContent="center">
        <Slide />
        <Stack
          direction="row"
          justifyContent="center"
          gap={2}
          sx={{
            position: "fixed",
            bottom: 0,
            right: 0,
            padding: 1,
          }}
        >
          <PreviousButton />
          <NextButton />
        </Stack>
      </Stack>
    </PresentationContext.Provider>
  );
}
