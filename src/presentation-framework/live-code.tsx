import { Stack } from "@mui/joy";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

type Props = {
  code: string;
};
export default function LiveCode({ code }: Props) {
  return (
    <LiveProvider code={code} noInline>
      <Stack direction="row" gap={3} height="100%">
        <Stack flexGrow={1}>
          <LiveEditor className="LiveEditor" />
        </Stack>
        <Stack>
          <LivePreview className="LivePreview" />
          <LiveError className="LiveError" />
        </Stack>
      </Stack>
    </LiveProvider>
  );
}
