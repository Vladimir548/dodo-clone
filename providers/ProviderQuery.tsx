'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function ProviderQuery({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
              staleTime:Infinity
          },

        },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
