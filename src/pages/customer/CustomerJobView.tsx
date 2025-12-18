import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LayoutShell from '@/components/customerPortal/LayoutShell';
import CustomerLogin from './CustomerLogin';
import { mockCustomerJob } from '@/data/customerPortalMockData';
import '@/styles/customerPortal.css';

export default function CustomerJobView() {
    const { jobId } = useParams<{ jobId: string }>();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // In a real app, you'd fetch the job data based on jobId
    const job = mockCustomerJob;

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    if (!isAuthenticated) {
        return <CustomerLogin onLogin={handleLogin} />;
    }

    return (
        <div className="customer-portal antialiased selection:bg-emerald-500/30 selection:text-emerald-100 h-screen flex flex-col overflow-hidden bg-slate-950">
            <LayoutShell job={job} />
        </div>
    );
}

