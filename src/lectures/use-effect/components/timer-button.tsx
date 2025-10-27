import { Button } from "@mui/joy";
import { useState, useEffect } from "react";

interface TimerButtonProps {
  timeMs: number;
  gradient?: boolean;
}

export default function TimerButton({
  timeMs,
  gradient = false,
}: TimerButtonProps) {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || remainingTime === null) return;

    if (remainingTime <= 0) {
      setIsRunning(false);
      setRemainingTime(null);
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prev) => (prev ? prev - 100 : null));
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, remainingTime]);

  const handleClick = () => {
    if (isRunning) {
      setIsRunning(false);
      setRemainingTime(null);
    } else {
      setRemainingTime(timeMs);
      setIsRunning(true);
    }
  };

  const getProgressStyle = () => {
    const baseStyle = {
      position: "absolute",
      bottom: "10px",
      left: "10px",
    };

    if (!isRunning || remainingTime === null || !gradient) {
      return baseStyle;
    }

    const progress = (remainingTime / timeMs) * 100;

    return {
      ...baseStyle,
      background: `linear-gradient(to right, #0b6bcb ${
        100 - progress
      }%, #c41e3a ${100 - progress}%)`,
      color: "white",
    };
  };

  const getColor = () => {
    if (gradient) {
      return undefined;
    }

    if (isRunning) {
      return "danger";
    }

    return "primary";
  };

  return (
    <Button
      onClick={handleClick}
      color={getColor()}
      sx={getProgressStyle()}
      size="sm"
    ></Button>
  );
}
