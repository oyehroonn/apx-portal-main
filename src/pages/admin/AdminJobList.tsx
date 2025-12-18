import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PortalLayout from '@/components/PortalLayout';
import Card from '@/components/ui/Card';
import Badge, { getStatusBadgeVariant } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { jobs } from '@/data/mockData';
import { Search, Eye, LayoutDashboard, Briefcase, ShieldCheck, AlertTriangle, FileText, DollarSign, Calendar, Users } from 'lucide-react';

export default function AdminJobList() {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');

    // Set initial filter from navigation state if present
    useEffect(() => {
        if (location.state && location.state.status) {
            setStatusFilter(location.state.status);
        }
    }, [location]);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch =
            job.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.customerName.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesStatus = true;
        if (statusFilter === 'All') {
            matchesStatus = true;
        } else if (statusFilter === 'Active') {
            matchesStatus = job.status === 'Open' || job.status === 'InProgress';
        } else {
            matchesStatus = job.status === statusFilter;
        }

        return matchesSearch && matchesStatus;
    });

    const categories = ['All', 'Active', 'Open', 'InProgress', 'Complete', 'Paid', 'Cancelled'];

    const navItems = [
        { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { label: 'Jobs', path: '/admin/jobs', icon: <Briefcase className="w-5 h-5" /> },
        { label: 'Legal & Compliance', path: '/admin/legal-compliance', icon: <ShieldCheck className="w-5 h-5" /> },
        { label: 'Disputes', path: '/admin/disputes', icon: <AlertTriangle className="w-5 h-5" /> },
        { label: 'Ledger', path: '/admin/ledger', icon: <FileText className="w-5 h-5" /> },
        { label: 'Payouts', path: '/admin/payouts', icon: <DollarSign className="w-5 h-5" /> },
        { label: 'Meetings', path: '/admin/meetings', icon: <Calendar className="w-5 h-5" /> },
        { label: 'Leads', path: '/admin/leads', icon: <Users className="w-5 h-5" /> },
    ];

    return (
        <PortalLayout title="All Jobs" navItems={navItems}>
            <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder="Search jobs..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                        {categories.map(cat => (
                            <Button
                                key={cat}
                                variant={statusFilter === cat ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setStatusFilter(cat)}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </div>

                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                                <tr>
                                    <th className="py-3 px-4 font-medium">Job ID</th>
                                    <th className="py-3 px-4 font-medium">Property</th>
                                    <th className="py-3 px-4 font-medium">Customer</th>
                                    <th className="py-3 px-4 font-medium">Type</th>
                                    <th className="py-3 px-4 font-medium">Status</th>
                                    <th className="py-3 px-4 font-medium">Assigned To</th>
                                    <th className="py-3 px-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {filteredJobs.map(job => (
                                    <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">#{job.id}</td>
                                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{job.propertyAddress}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{job.customerName}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400 capitalize">{job.type}</td>
                                        <td className="py-3 px-4">
                                            <Badge variant={getStatusBadgeVariant(job.status)}>{job.status}</Badge>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                            {job.assignedContractorId ? `Contractor #${job.assignedContractorId}` : 'Unassigned'}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    // In a real app this would go to an admin view of the job
                                                    // For now, we can perhaps re-use the contractor view or just show an alert
                                                    alert(`Viewing Job #${job.id} details (Mock Admin View)`);
                                                }}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredJobs.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                No jobs found matching your filters.
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </PortalLayout>
    );
}
