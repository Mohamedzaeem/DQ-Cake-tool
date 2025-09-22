import "./app.css";

export const metadata = {
  title: "DQ Cake tool",
  description: "Appwrite starter for Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={"bg-[#FAFAFB] font-[Inter] text-sm text-[#56565C]"}>
        {children}
      </body>
    </html>
  );
}
