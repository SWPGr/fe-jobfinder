function transformJobData(rawJob) {
    return {
        companyName: rawJob.employer.fullName || rawJob.employer.email || 'Unknown',
        companyAddress: rawJob.location || 'Địa chỉ không xác định',
        jobTitle: rawJob.title,
        workTime: rawJob.jobType?.name || 'Không rõ',
        salary: formatSalary(rawJob.salaryMin, rawJob.salaryMax),
        dueDate: formatDueDate(rawJob.createdAt), // giả định dueDate = createdAt + 30 ngày
    };
}

function formatSalary(min, max) {
    if (!min || !max) return 'Thỏa thuận';
    const toUSD = (vnd) => `$${(vnd / 23000).toFixed(0).toLocaleString()}`;
    return `${toUSD(min)} - ${toUSD(max)}`;
}

function formatDueDate(createdAt) {
    const created = new Date(createdAt);
    const due = new Date(created);
    due.setDate(due.getDate() + 30);
    return due.toISOString().split('T')[0]; // Trả về yyyy-mm-dd
}

const format = {
    transformJobData,
    formatSalary,
    formatDueDate,
};

export default format;
