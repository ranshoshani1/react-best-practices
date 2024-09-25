declare module "*.md" {
  const content: string;
  export default content;
}

declare module "jsx-to-string" {
  const jsxToString: (jsx: React.ReactNode) => string;
  export default jsxToString;
}

declare module "*?raw" {
  const content: string;
  export default content;
}
