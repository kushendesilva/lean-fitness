import React, { useState } from "react";
import { default as colors } from "./src/configs/Colors.json";
import AppNavigator from "./src/navigation/AppNavigator";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ThemeContext } from "./src/configs/Theme";
import { AuthProvider } from "./src/provider/AuthProvider";

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme }}>
        <ApplicationProvider {...eva} theme={{ ...eva[theme], ...colors }}>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
}
