import Sidebar from "@/components/modules/dashboard/Sidebar.tsx/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-10 min-h-screen">
      <div>
        <Sidebar />
      </div>
      <main className="mt-12 lg:mt-10 flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
