import * as themes from "react-code-blocks";
import { CodeBlock } from "react-code-blocks";

type Props = {
  children: string;
};

export default function Code({ children }: Props) {
  return (
    <CodeBlock
      customStyle={{ width: "100%" }}
      text={children}
      language={"jsx"}
      showLineNumbers={true}
      theme={themes.anOldHope}
    />
  );
}
