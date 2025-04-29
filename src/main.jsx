import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/app/store.js";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <Toaster richColors position="top-right" closeButton />
  </Provider>
);
