import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router";

//라우터 설정을 애플리케이션에 적용할 컴포넌트(Provider)
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
