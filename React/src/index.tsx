import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import "./global.scss";
import 'react-loading-skeleton/dist/skeleton.css'

import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <div className="w-screen h-screen overflow-hidden dark:bg-[#111726]">
          <App />
        </div>
      </StrictMode>
    );
  } catch (err) {
    console.error(err)
  }
} else {
  console.error("Elemento com id 'root' não encontrado!");
}