import { Kanit } from "next/font/google";
import StyledComponentsRegistry from "./registry";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "700", "900"],
  style: ["italic", "normal"],
  subsets: ["latin-ext"],
  display: "swap",
});

export const metadata = {
  template: "%s | Acme",
  description: "Generated by create next app",
};

export async function generateStaticParams() {
  return [{ lang: "en-US" }, { lang: "pt-BR" }];
}

// this page is dynamic because the cookies are used to set the theme
export const dynamic = true;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <StyledComponentsRegistry>
      <html lang={params.lang} className={kanit.className}>
        <body>
          {children}
          </body>
      </html>
    </StyledComponentsRegistry>
  );
}
