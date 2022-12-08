import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    mainColor: "#FFFFFF",
    primaryColor: "#F7FAFC",
    secondaryColor: "#EDE8F0",
    buttonColor: "#319795",
    fontColor: "#2D3748",
    navTitleColor: "#4A5568",
    hoverSideBard: "#E6FFFA",
    hoverTextColor: "#285E61",
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

export default theme;
