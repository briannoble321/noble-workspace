import "./styles.css";
import { SnackbarProvider } from "notistack";
import MessageButtons from "./MessageButton";

export default function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <h1>Custom Snackbar Test</h1>
        <h2>Try out the different message types</h2>
        <MessageButtons />
      </SnackbarProvider>
    </div>
  );
}
