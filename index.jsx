import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM from "react-dom" here
import App from "./App";
import MyContextProvider from "./Hooks/useContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>
    
  </StrictMode>
);
