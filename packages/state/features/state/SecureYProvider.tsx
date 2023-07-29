import { PropsWithChildren } from 'react';
import { YProvider, YProviderProps } from "./YProvider";

export function SecureYProvider({children, initialYState}: PropsWithChildren<YProviderProps>) {
  return (
    <YProvider initialYState={initialYState}>
      {children}
    </YProvider>
  )
}
