import Dashboard from "@/components/modules/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wellcome to Dashboard",
  description: "this is admin dashboard.",
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <Dashboard>{children}</Dashboard>
    </div>
  );
};

export default Layout;
