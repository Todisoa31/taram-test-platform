import AppLayout from "../src/components/common/layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}