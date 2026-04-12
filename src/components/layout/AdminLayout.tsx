import { useState, type ReactNode } from "react";
import AdminSidebar from "../admin/AdminSidebar";
import AdminTopbar from "../admin/AdminTopbar";


type AdminLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
};

const AdminLayout = ({ children, title, subtitle }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar
            title={title}
            subtitle={subtitle}
            onMenuClick={() => setIsSidebarOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
