import { DashboardSidebar } from "@/components/dashboart/DashboartSidebar";


const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar></DashboardSidebar>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default DashboardLayout;