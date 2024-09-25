import { CssVarsProvider, extendTheme } from "@mui/joy";

const baseTheme = extendTheme({
  fontFamily: {
    display: "Oswald", // applies to `h1`–`h4`
    body: "Oswald", // applies to `title-*` and `body-*`
  },
});

const darkTheme = extendTheme({
  colorSchemes: {
    light: baseTheme.colorSchemes.dark,
    dark: baseTheme.colorSchemes.dark,
  },
});

const lightTheme = extendTheme({
  colorSchemes: {
    light: baseTheme.colorSchemes.light,
    dark: baseTheme.colorSchemes.light,
  },
});

type Props = {
  children: React.ReactNode;
  colorScheme: "light" | "dark";
};

export default function ThemeProvider({ children, colorScheme }: Props) {
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
}
