import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PaymentManagement.module.scss';
import {
    Search,
    Download,
    CreditCard,
    DollarSign,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronDown,
    ArrowUpDown,
    Plus,
    BarChart3,
    LineChart,
    Wallet,
} from 'lucide-react';

const cx = classNames.bind(styles);

const PaymentManagement = () => {
    const [activeTab, setActiveTab] = useState('transactions');
    const [dateFilter, setDateFilter] = useState('30days');

    return (
        <div className={cx('managementWrapper')}>
            {/* Header */}
            <div className={cx('payment-header')}>
                <div className={cx('title')}>Payment Management</div>
                <p className={cx('description')}>Track and manage all payment transactions on your platform.</p>
            </div>

            {/* Payment Summary Cards */}
            <div className={cx('summary-grid')}>
                {/* Total Revenue Card */}
                <div className={cx('summary-card')}>
                    <div className={cx('card-header')}>
                        <div className={cx('card-icon', 'blue')}>
                            <DollarSign size={24} className={cx('icon-blue')} />
                        </div>
                        <span className={cx('card-period')}>This Month</span>
                    </div>
                    <h3 className={cx('card-value')}>$24,500</h3>
                    <p className={cx('card-label')}>Total Revenue</p>
                    <div className={cx('card-trend', 'up')}>
                        <span className={cx('trend-icon')}>↑</span>12% from last month
                    </div>
                </div>

                {/* Successful Payments Card */}
                <div className={cx('summary-card')}>
                    <div className={cx('card-header')}>
                        <div className={cx('card-icon', 'green')}>
                            <CheckCircle2 size={24} className={cx('icon-green')} />
                        </div>
                        <span className={cx('card-period')}>This Month</span>
                    </div>
                    <h3 className={cx('card-value')}>432</h3>
                    <p className={cx('card-label')}>Successful Payments</p>
                    <div className={cx('card-trend', 'up')}>
                        <span className={cx('trend-icon')}>↑</span>8% from last month
                    </div>
                </div>

                {/* Failed Payments Card */}
                <div className={cx('summary-card')}>
                    <div className={cx('card-header')}>
                        <div className={cx('card-icon', 'red')}>
                            <XCircle size={24} className={cx('icon-red')} />
                        </div>
                        <span className={cx('card-period')}>This Month</span>
                    </div>
                    <h3 className={cx('card-value')}>12</h3>
                    <p className={cx('card-label')}>Failed Payments</p>
                    <div className={cx('card-trend', 'up')}>
                        <span className={cx('trend-icon')}>↑</span>3% from last month
                    </div>
                </div>

                {/* Pending Payments Card */}
                <div className={cx('summary-card')}>
                    <div className={cx('card-header')}>
                        <div className={cx('card-icon', 'yellow')}>
                            <Clock size={24} className={cx('icon-yellow')} />
                        </div>
                        <span className={cx('card-period')}>This Month</span>
                    </div>
                    <h3 className={cx('card-value')}>5</h3>
                    <p className={cx('card-label')}>Pending Payments</p>
                    <div className={cx('card-trend', 'down')}>
                        <span className={cx('trend-icon')}>↓</span>2% from last month
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className={cx('tabs')}>
                <nav className={cx('tab-nav')}>
                    <button
                        className={cx('tab-button', { active: activeTab === 'transactions' })}
                        onClick={() => setActiveTab('transactions')}
                    >
                        Transactions
                    </button>
                    <button
                        className={cx('tab-button', { active: activeTab === 'subscriptions' })}
                        onClick={() => setActiveTab('subscriptions')}
                    >
                        Subscription Plans
                    </button>
                    <button
                        className={cx('tab-button', { active: activeTab === 'invoices' })}
                        onClick={() => setActiveTab('invoices')}
                    >
                        Invoices
                    </button>
                    <button
                        className={cx('tab-button', { active: activeTab === 'reports' })}
                        onClick={() => setActiveTab('reports')}
                    >
                        Reports
                    </button>
                </nav>
            </div>

            {/* Filters and Actions */}
            <div className={cx('toolbar')}>
                <div className={cx('toolbar-filters')}>
                    <div className={cx('search-box')}>
                        <Search className={cx('search-icon')} size={18} />
                        <input type="text" placeholder="Search transactions..." className={cx('search-input')} />
                    </div>
                    <select
                        className={cx('filter-select')}
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    >
                        <option value="7days">Last 7 days</option>
                        <option value="30days">Last 30 days</option>
                        <option value="90days">Last 90 days</option>
                        <option value="custom">Custom range</option>
                    </select>
                    <select className={cx('filter-select')}>
                        <option value="all">All Payment Types</option>
                        <option value="subscription">Subscription</option>
                        <option value="jobPosting">Job Posting</option>
                        <option value="featuredListing">Featured Listing</option>
                        <option value="resumeAccess">Resume Access</option>
                    </select>
                    <select className={cx('filter-select')}>
                        <option value="all">All Statuses</option>
                        <option value="successful">Successful</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>
                <div className={cx('toolbar-actions')}>
                    <button className={cx('action-button')}>
                        <Download size={18} className={cx('button-icon')} />
                        Export
                    </button>
                    {activeTab === 'subscriptions' && (
                        <button className={cx('action-button', 'primary')}>
                            <Plus size={18} className={cx('button-icon')} />
                            New Plan
                        </button>
                    )}
                </div>
            </div>

            {/* Transactions Table */}
            {activeTab === 'transactions' && (
                <div className={cx('tableWrapper')}>
                    <table className={cx('dataTable')}>
                        <thead className={cx('table-head')}>
                            <tr>
                                <th className={cx('table-header')}>
                                    <div className={cx('header-content')}>
                                        ID
                                        <ArrowUpDown size={14} className={cx('sort-icon')} />
                                    </div>
                                </th>
                                <th className={cx('table-header')}>
                                    <div className={cx('header-content')}>
                                        Date
                                        <ArrowUpDown size={14} className={cx('sort-icon')} />
                                    </div>
                                </th>
                                <th className={cx('table-header')}>Customer</th>
                                <th className={cx('table-header')}>Type</th>
                                <th className={cx('table-header')}>
                                    <div className={cx('header-content')}>
                                        Amount
                                        <ArrowUpDown size={14} className={cx('sort-icon')} />
                                    </div>
                                </th>
                                <th className={cx('table-header')}>Status</th>

                                <th className={cx('table-header')}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={cx('table-body')}>
                            <tr className={cx('table-row')}>
                                <td className={cx('table-cell', 'transaction-id')}>#TRX-8765</td>
                                <td className={cx('table-cell')}>May 15</td>
                                <td className={cx('table-cell')}>
                                    <div className={cx('customer-info')}>
                                        <div className={cx('avatarCircle', 'blue')}>T</div>
                                        <div className={cx('customer-details')}>
                                            <div className={cx('customer-name')}>TechCorp Inc.</div>
                                            <div className={cx('customer-email')}>tech@example.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td className={cx('table-cell')}>Premium Job Posting</td>
                                <td className={cx('table-cell')}>$299.00</td>
                                <td className={cx('table-cell')}>
                                    <span className={cx('statusText', 'success')}>Successful</span>
                                </td>

                                <td className={cx('table-cell', 'actions')}>
                                    <button className={cx('action-button', 'view')}>View</button>
                                </td>
                            </tr>
                            <tr className={cx('table-row')}>
                                <td className={cx('table-cell', 'transaction-id')}>#TRX-8764</td>
                                <td className={cx('table-cell')}>May 14</td>
                                <td className={cx('table-cell')}>
                                    <div className={cx('customer-info')}>
                                        <div className={cx('avatarCircle', 'purple')}>D</div>
                                        <div className={cx('customer-details')}>
                                            <div className={cx('customer-name')}>DesignHub</div>
                                            <div className={cx('customer-email')}>design@example.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td className={cx('table-cell')}>Monthly Subscription</td>
                                <td className={cx('table-cell')}>$149.00</td>
                                <td className={cx('table-cell')}>
                                    <span className={cx('statusText', 'success')}>Successful</span>
                                </td>

                                <td className={cx('table-cell', 'actions')}>
                                    <button className={cx('action-button', 'view')}>View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Subscription Plans */}
            {activeTab === 'subscriptions' && (
                <div className={cx('subscriptionsWrapper')}>
                    <div className={cx('subscriptions-grid')}>
                        {/* Basic Plan */}
                        <div className={cx('plan-card')}>
                            <div className={cx('plan-header')}>
                                <h3 className={cx('plan-title')}>Basic</h3>
                                <span className={cx('plan-period')}>Monthly</span>
                            </div>
                            <div className={cx('plan-price')}>
                                <span className={cx('price-value')}>$49</span>
                                <span className={cx('price-unit')}>/month</span>
                            </div>
                            <ul className={cx('plan-features')}>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />5 Job Postings
                                </li>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    Basic Resume Search
                                </li>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    30 Days Visibility
                                </li>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    Email Support
                                </li>
                            </ul>
                            <div className={cx('plan-actions')}>
                                <button className={cx('action-button', 'edit')}>Edit</button>
                                <button className={cx('action-button', 'deactivate')}>Deactivate</button>
                            </div>
                        </div>

                        {/* Professional Plan */}
                        <div className={cx('plan-card', 'popular')}>
                            <div className={cx('popular-badge')}>POPULAR</div>
                            <div className={cx('plan-header')}>
                                <h3 className={cx('plan-title')}>Professional</h3>
                                <span className={cx('plan-period')}>Monthly</span>
                            </div>
                            <div className={cx('plan-price')}>
                                <span className={cx('price-value')}>$149</span>
                                <span className={cx('price-unit')}>/month</span>
                            </div>
                            <ul className={cx('plan-features')}>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    20 Job Postings
                                </li>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    Advanced Resume Search
                                </li>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    Featured Jobs
                                </li>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    60 Days Visibility
                                </li>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    Priority Support
                                </li>
                            </ul>
                            <div className={cx('plan-actions')}>
                                <button className={cx('action-button', 'edit')}>Edit</button>
                                <button className={cx('action-button', 'deactivate')}>Deactivate</button>
                            </div>
                        </div>

                        {/* Enterprise Plan */}
                        <div className={cx('plan-card')}>
                            <div className={cx('plan-header')}>
                                <h3 className={cx('plan-title')}>Enterprise</h3>
                                <span className={cx('plan-period')}>Annual</span>
                            </div>
                            <div className={cx('plan-price')}>
                                <span className={cx('price-value')}>$399</span>
                                <span className={cx('price-unit')}>/month</span>
                            </div>
                            <ul className={cx('plan-features')}>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    Unlimited Job Postings
                                </li>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    Premium Resume Database
                                </li>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    Featured Company Profile
                                </li>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    90 Days Visibility
                                </li>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    Dedicated Account Manager
                                </li>
                                <li className={cx('feature-item')}>
                                    <CheckCircle2 className={cx('feature-icon')} />
                                    API Access
                                </li>
                            </ul>
                            <div className={cx('plan-actions')}>
                                <button className={cx('action-button', 'edit')}>Edit</button>
                                <button className={cx('action-button', 'deactivate')}>Deactivate</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Invoices Tab */}
            {activeTab === 'invoices' && (
                <div className={cx('tableWrapper')}>
                    <table className={cx('dataTable')}>
                        <thead className={cx('table-head')}>
                            <tr>
                                <th className={cx('table-header')}>Invoice #</th>
                                <th className={cx('table-header')}>Customer</th>
                                <th className={cx('table-header')}>Issue Date</th>
                                <th className={cx('table-header')}>Due Date</th>
                                <th className={cx('table-header')}>Amount</th>
                                <th className={cx('table-header')}>Status</th>
                                <th className={cx('table-header')}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={cx('table-body')}>
                            <tr className={cx('table-row')}>
                                <td className={cx('table-cell', 'invoice-id')}>#INV-2023-1234</td>
                                <td className={cx('table-cell')}>
                                    <div className={cx('customer-info')}>
                                        <div className={cx('avatarCircle', 'blue')}>T</div>
                                        <div className={cx('customer-details')}>
                                            <div className={cx('customer-name')}>TechCorp Inc.</div>
                                        </div>
                                    </div>
                                </td>
                                <td className={cx('table-cell')}>May 01, 2023</td>
                                <td className={cx('table-cell')}>May 15, 2023</td>
                                <td className={cx('table-cell')}>$299.00</td>
                                <td className={cx('table-cell')}>
                                    <span className={cx('statusText', 'paid')}>Paid</span>
                                </td>
                                <td className={cx('table-cell', 'actions')}>
                                    <button className={cx('action-button', 'view')}>View</button>
                                    <button className={cx('action-button', 'download')}>Download</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
                <div className={cx('reportsWrapper')}>
                    <div className={cx('report-card')}>
                        <h3 className={cx('report-title')}>Revenue Overview</h3>
                        <div className={cx('chart-placeholder')}>
                            <div className={cx('chart-content')}>
                                <BarChart3 size={48} className={cx('chart-icon')} />
                                <p className={cx('chart-text')}>Revenue chart would be displayed here</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('report-grid')}>
                        <div className={cx('report-card')}>
                            <h3 className={cx('report-title')}>Payment Methods</h3>
                            <div className={cx('chart-placeholder')}>
                                <div className={cx('chart-content')}>
                                    <CreditCard size={48} className={cx('chart-icon')} />
                                    <p className={cx('chart-text')}>Payment methods chart would be displayed here</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('report-card')}>
                            <h3 className={cx('report-title')}>Subscription Growth</h3>
                            <div className={cx('chart-placeholder')}>
                                <div className={cx('chart-content')}>
                                    <LineChart size={48} className={cx('chart-icon')} />
                                    <p className={cx('chart-text')}>
                                        Subscription growth chart would be displayed here
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('report-card')}>
                        <div className={cx('report-header')}>
                            <h3 className={cx('report-title')}>Revenue by Plan</h3>
                            <button className={cx('action-button', 'export')}>
                                <Download size={16} className={cx('button-icon')} />
                                Export CSV
                            </button>
                        </div>
                        <table className={cx('dataTable')}>
                            <thead className={cx('table-head')}>
                                <tr>
                                    <th className={cx('table-header')}>Plan</th>
                                    <th className={cx('table-header')}>Subscribers</th>
                                    <th className={cx('table-header')}>Monthly Revenue</th>
                                    <th className={cx('table-header')}>Growth</th>
                                </tr>
                            </thead>
                            <tbody className={cx('table-body')}>
                                <tr className={cx('table-row')}>
                                    <td className={cx('table-cell')}>Basic</td>
                                    <td className={cx('table-cell')}>245</td>
                                    <td className={cx('table-cell')}>$12,005</td>
                                    <td className={cx('table-cell')}>
                                        <div className={cx('growth-info')}>
                                            <span className={cx('growth-value')}>+12%</span>
                                            <div className={cx('progress-bar')}>
                                                <div className={cx('progress-fill')} style={{ width: '75%' }} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className={cx('table-row')}>
                                    <td className={cx('table-cell')}>Professional</td>
                                    <td className={cx('table-cell')}>187</td>
                                    <td className={cx('table-cell')}>$27,863</td>
                                    <td className={cx('table-cell')}>
                                        <div className={cx('growth-info')}>
                                            <span className={cx('growth-value')}>+18%</span>
                                            <div className={cx('progress-bar')}>
                                                <div className={cx('progress-fill')} style={{ width: '85%' }} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className={cx('table-row')}>
                                    <td className={cx('table-cell')}>Enterprise</td>
                                    <td className={cx('table-cell')}>63</td>
                                    <td className={cx('table-cell')}>$25,137</td>
                                    <td className={cx('table-cell')}>
                                        <div className={cx('growth-info')}>
                                            <span className={cx('growth-value')}>+7%</span>
                                            <div className={cx('progress-bar')}>
                                                <div className={cx('progress-fill')} style={{ width: '60%' }} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentManagement;
