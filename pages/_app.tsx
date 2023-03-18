import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import reduxStore from "../redux/store";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "@/components/Layout";

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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
