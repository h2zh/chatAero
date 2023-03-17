import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import reduxStore from "../redux/store";
import Footer from "@/components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#F6F1F1",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={reduxStore}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}
