import { CodeBlock, atomOneDark } from "react-code-blocks";

type Props = {
  mdFile: string;
};
export default function CodeFromMd({ mdFile }: Props) {
  const split = mdFile.split("```");

  if (split.length <= 1) {
    throw new Error("No code blocks found in the markdown file");
  }

  const code = split[1];

  const language = code.split("\n")[0];

  const text = code.replace(language, "");

  return (
    <CodeBlock
      text={text}
      language={language.trim()}
      showLineNumbers={true}
      theme={atomOneDark}
    />
  );
}
