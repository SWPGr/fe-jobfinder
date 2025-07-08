function transformJobData(rawJob) {
    return {
        id: rawJob.id,
        companyName: rawJob.employer?.fullName || rawJob.employer?.email || 'Unknown',
        companyAddress: rawJob.location || 'Địa chỉ không xác định',
        jobTitle: rawJob.title,
        workTime: rawJob.jobType?.name || 'Không rõ',
        salary: formatSalary(rawJob.salaryMin, rawJob.salaryMax),
        remainDay: formatDueDate(rawJob.createdAt), // giả định dueDate = createdAt + 30 ngày
        save: rawJob.save,
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

function formatTimeAgo(createdAt) {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now - created;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else {
        return `${days} days ago`;
    }
}

function formatTimeRemaining(expiredAt) {
    const expired = new Date(expiredAt);
    const now = new Date();
    const diffMs = expired - now;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return days;
}

const format = {
    transformJobData,
    formatSalary,
    formatDueDate,
    formatTimeAgo,
};

export default format;
