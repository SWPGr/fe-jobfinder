import React, { useState } from 'react';
import SettingsPage from './SettingsPage';
import Single from './Single';

export default function EmployerProfile() {
  const [companyInfo, setCompanyInfo] = useState(null);

  // Hàm cập nhật thông tin công ty
  const updateCompanyInfo = (newInfo) => {
    setCompanyInfo(newInfo);
  };

  return (
    <div>
      <h1>Employer Profile</h1>
      {/* Truyền hàm updateCompanyInfo vào SettingsPage */}
      <SettingsPage updateCompanyInfo={updateCompanyInfo} />

      {/* Truyền companyInfo vào Single */}
      {companyInfo && <Single companyInfo={companyInfo} />}
    </div>
  );
}
