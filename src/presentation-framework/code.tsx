import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  children: string;
};

export default function Code({ children }: Props) {
  return (
    <SyntaxHighlighter
      language="tsx"
      style={vscDarkPlus}
      showLineNumbers
      className="code-block"
    >
      {children}
    </SyntaxHighlighter>
  );
}
