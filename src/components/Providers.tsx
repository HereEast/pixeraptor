import { CanvasContextProvider, SettingsContextProvider } from "~/context";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CanvasContextProvider>
      <SettingsContextProvider>{children}</SettingsContextProvider>
    </CanvasContextProvider>
  );
}
