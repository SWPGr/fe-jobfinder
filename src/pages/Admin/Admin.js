import { useState } from 'react';
import EmployerProvider from '~/context/EmployerContext';
import { JobSeekerProvider } from '~/context/JobSeekerContext';
import Sidebar from '~/layouts/components/Sidebar';
import { items } from '~/layouts/components/Sidebar/Items';
import DashboardOverview from '~/pages/Admin/DashboardOverview';
import EmployersManagement from '~/pages/Admin/EmployersManagement';
import JobSeekersManagement from '~/pages/Admin/JobSeekersManagement';
// ... import các page khác nếu cần

function Admin() {
    const [selectedPage, setSelectedPage] = useState(() => items.ADMIN.items[0]); // mặc định là Overview
    const [overviewAnimationKey, setOverviewAnimationKey] = useState(0);

    const handleSetMenu = (item) => {
        setSelectedPage(item);
        // Nếu click lại Overview thì tăng animationKey
        if (item.title === 'Overview') setOverviewAnimationKey((prev) => prev + 1);
    };

    // Render component
    let content = null;
    if (selectedPage.title === 'Overview') {
        // Trang Overview truyền animationKey vào để ActivityChart chạy hiệu ứng
        content = <DashboardOverview animationKey={overviewAnimationKey} />;
    } else if (selectedPage.title === 'Manage Employers') {
        content = (
            <EmployerProvider>
                <EmployersManagement />
            </EmployerProvider>
        );
    } else if (selectedPage.title === 'Manage Job Seekers') {
        content = (
            <JobSeekerProvider>
                <JobSeekersManagement />
            </JobSeekerProvider>
        );
    } else {
        content = selectedPage.page || <div>Content Coming Soon...</div>;
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar selectedTitle={selectedPage.title} setSelectedMenu={handleSetMenu} />
            <div style={{ flex: 1 }}>{content}</div>
        </div>
    );
}
export default Admin;
