import { Stack, Tooltip, IconButton } from "@mui/joy";
import { useState } from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import Code from "../presentation-framework/code";

export function CodeWithRender({
  code,
  component,
}: {
  code: string;
  component: React.ReactNode;
}) {
  const [showCode, setShowCode] = useState(false);
  return (
    <Stack
      direction="column"
      gap={3}
      height="100%"
      width="100%"
      alignItems="flex-start"
    >
      {component}
      <Tooltip
        title={!showCode ? "Show code" : " Hide code"}
        placement="right"
        arrow
        variant="outlined"
      >
        <IconButton
          onClick={() => setShowCode(!showCode)}
          variant="plain"
          color="neutral"
          size="sm"
        >
          {!showCode ? <VscChevronDown /> : <VscChevronUp />}
        </IconButton>
      </Tooltip>
      {showCode && <Code>{code}</Code>}
    </Stack>
  );
}
