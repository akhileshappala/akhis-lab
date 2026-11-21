import "./globals.css";

export const metadata = {
  title: "Akhi's Lab — FDE Course, System Design & Interview Prep",
  description:
    "Akhilesh Appala's personal learning lab: the Forward Deployed Engineer course (Module 1 interactive), 27 system design concepts with animated diagrams, FDE interview prep, and his project portfolio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
