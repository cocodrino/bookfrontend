import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import mswWorker from "./mock/msw_worker";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

console.log(
  `import.meta.env.VITE_USE_POKEMON_API_MOCK is ${
    import.meta.env.VITE_USE_POKEMON_API_MOCK
  }`
);
if (import.meta.env.VITE_USE_POKEMON_API_MOCK === "true") {
  console.info("USING MOCK API, YOU CAN CHANGE THIS IN THE .ENV FILE");
  mswWorker
    .start()
    .catch((e) => console.error(`error loading mocking server ${e}`));
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
