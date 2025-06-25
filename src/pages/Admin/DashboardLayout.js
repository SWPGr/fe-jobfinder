import { Sidebar } from 'lucide-react';
import { useState } from 'react';
import { items } from '~/layouts/components/Sidebar/Items';

function DashboardLayout() {
    const [currentTab, setCurrentTab] = useState(() => items.ADMIN.items[0]);
    const [chartKey, setChartKey] = useState(0);

    const handleSelectTab = (tab) => {
        setCurrentTab(tab);
        if (tab.title === 'Overview') setChartKey((k) => k + 1);
    };

    // Xử lý trả về component hoặc function(tab.page)
    let content = null;
    if (typeof currentTab.page === 'function') {
        content = currentTab.page(chartKey); // <- Truyền key vào!
    } else if (currentTab.page) {
        content = currentTab.page;
    } else {
        content = <div>Chức năng đang phát triển</div>;
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar
                setSelectedMenu={(_, title) => {
                    const tab = items.ADMIN.items.find((i) => i.title === title);
                    handleSelectTab(tab);
                }}
            />
            <div style={{ flex: 1 }}>{content}</div>
        </div>
    );
}

export default DashboardLayout;
