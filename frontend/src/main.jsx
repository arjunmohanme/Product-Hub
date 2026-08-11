import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import "@fontsource/manrope/800.css";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />
    </ChakraProvider>
  </StrictMode>
);