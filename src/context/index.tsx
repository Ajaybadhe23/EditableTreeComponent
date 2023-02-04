import { createContext } from "react";
import { useState } from "react";

export const ThemeContext = createContext<any>("light");
const GlobalDataProvider = ({ children }:any) => {
  const [theme, setTheme] = useState<any>("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default GlobalDataProvider;