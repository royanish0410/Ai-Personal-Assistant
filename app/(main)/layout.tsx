import Provider from './provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
