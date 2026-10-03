import React, { useEffect } from "react";
import Home from "./Home";

function App() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLanguage = document.documentElement.getAttribute("lang");
    document.title = "Cabrel Ngamaleu — Ingénierie logicielle & stratégie SI";
    document.documentElement.lang = "fr";
    return () => {
      document.title = previousTitle;
      if (previousLanguage === null) {
        document.documentElement.removeAttribute("lang");
      } else {
        document.documentElement.lang = previousLanguage;
      }
    };
  }, []);

  return <Home />;
}

export default App;
