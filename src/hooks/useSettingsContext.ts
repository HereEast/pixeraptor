import { useContext } from "react";

import { SettingsContext } from "~/context";

export function useSettingsContext() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "No context found. Settings context must be used within a SettingsContextProvider",
    );
  }

  return context;
}
