import {
  CanvasContextProvider,
  SavedCanvasProvider,
  SettingsContextProvider,
} from "~/context";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CanvasContextProvider>
      <SettingsContextProvider>
        <SavedCanvasProvider>{children}</SavedCanvasProvider>
      </SettingsContextProvider>
    </CanvasContextProvider>
  );
}
