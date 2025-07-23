import { NumberFormatter } from '@mantine/core';

function transformJobData(rawJob) {
    return {
        id: rawJob.id,
        companyName: rawJob.employer?.fullName || rawJob.employer?.email || 'Unknown',
        companyLogo: rawJob.employer?.avatarUrl,
        companyAddress: rawJob.location || 'Địa chỉ không xác định',
        jobTitle: rawJob.title,
        workTime: rawJob.jobType?.name || 'Không rõ',
        salary: formatSalary(rawJob.salaryMin, rawJob.salaryMax),
        timeAgo: timeAgo(rawJob.createdAt),
        remainDay: getTimeUntilDueDate(rawJob?.expiredDate),
        experience: rawJob.experience?.name || 'Không rõ',
        isSave: rawJob.isSave,
        job_description: rawJob.description || 'Không rõ',
        responsibility: rawJob.responsibility || 'Không rõ',
    };
}

function formatSalary(min, max) {
    const isEmpty = (value) => value === null || value === undefined || value === '';

    if (isEmpty(min) && isEmpty(max)) return 'Negotiable';

    return (
        <p>
            <NumberFormatter prefix="$ " value={min} thousandSeparator />
            - <NumberFormatter prefix="$ " value={max} thousandSeparator />
        </p>
    );
}

function formatDueDate(createdAt) {
    const created = new Date(createdAt);
    const due = new Date(created);
    due.setDate(due.getDate() + 30);
    return due.toISOString().split('T')[0]; // Trả về yyyy-mm-dd
}

function getTimeUntilDueDate(dueDate) {
    const expiredDate = new Date(dueDate);
    const now = new Date();
    const diffMs = expiredDate - now;

    if (diffMs <= 0) {
        return 'expired';
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} remaining`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
    } else {
        return `${minutes} minute${minutes !== 1 ? 's' : ''} remaining`;
    }
}

function timeAgo(date) {
    const target = new Date(date);
    const now = new Date();

    const diffMs = now - target; // dương nếu quá khứ, âm nếu tương lai
    const diffSec = Math.round(Math.abs(diffMs) / 1000);

    const MIN = 60;
    const HOUR = 60 * MIN;
    const DAY = 24 * HOUR;

    const plural = (num, unit) => `${num} ${unit}${num === 1 ? '' : 's'}`;

    let result;
    if (diffSec < 5) {
        result = 'just now';
    } else if (diffSec < MIN) {
        result = plural(diffSec, 'second');
    } else if (diffSec < HOUR) {
        result = plural(Math.floor(diffSec / MIN), 'minute');
    } else if (diffSec < DAY) {
        result = plural(Math.floor(diffSec / HOUR), 'hour');
    } else {
        result = plural(Math.floor(diffSec / DAY), 'day');
    }

    // Nếu là thời gian trong tương lai
    return diffMs >= 0 ? `${result} ago` : `in ${result}`;
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

const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Ho_Chi_Minh', // 👈 Múi giờ Việt Nam
    });
};

const format = {
    transformJobData,
    formatSalary,
    formatDueDate,
    formatTimeAgo,
    formatTime,
};

export default format;
