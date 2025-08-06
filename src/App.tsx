import { SnackbarProvider } from "notistack";
import { register } from "swiper/element";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ptBR } from "@mui/x-date-pickers/locales";
import { Provider } from "react-redux";
import AppTheme from "./AppTheme";
import { GlobalStyle } from "./globalStyle";
import AppRouter from "./routes/route";
import { store as reduxStore } from "./store/store";

register();

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="pt-BR"
        localeText={
          ptBR.components.MuiLocalizationProvider.defaultProps
            .localeText
        }
      >
        <AppTheme>
          <GlobalStyle />
          <Provider store={reduxStore}>
            <AppRouter />
          </Provider>
        </AppTheme>
      </LocalizationProvider>
    </SnackbarProvider>
  );
}

export default App;
