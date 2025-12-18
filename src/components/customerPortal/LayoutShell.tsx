import { useState } from 'react';
import CustomerSidebar from './CustomerSidebar';
import TopHeader from './TopHeader';
import JobOverviewView from './JobOverviewView';
import QuoteApprovalView from './QuoteApprovalView';
import MaterialSourcingView from './MaterialSourcingView';
import LiveTrackingView from './LiveTrackingView';
import CompletionView from './CompletionView';
import type { CustomerJob, WorkflowStep } from '@/types/customerPortal';

interface LayoutShellProps {
    job: CustomerJob;
    customerName?: string;
    customerAvatar?: string;
}

export default function LayoutShell({ job, customerName, customerAvatar }: LayoutShellProps) {
    const [currentStep, setCurrentStep] = useState<WorkflowStep>('overview');

    const handleStepChange = (step: WorkflowStep) => {
        setCurrentStep(step);
    };

    const handleQuoteApprove = () => {
        setCurrentStep('materials');
    };

    const handleMaterialSelfSourcing = () => {
        setCurrentStep('progress');
    };

    const renderCurrentView = () => {
        switch (currentStep) {
            case 'overview':
                return <JobOverviewView job={job} />;
            case 'quote':
                return <QuoteApprovalView job={job} onApprove={handleQuoteApprove} />;
            case 'materials':
                return <MaterialSourcingView job={job} onSelfSourcing={handleMaterialSelfSourcing} />;
            case 'progress':
                return <LiveTrackingView job={job} />;
            case 'completion':
                return <CompletionView job={job} />;
            default:
                return <JobOverviewView job={job} />;
        }
    };

    return (
        <div className="flex h-screen w-full relative">
            <CustomerSidebar
                currentStep={currentStep}
                onStepChange={handleStepChange}
                customerName={customerName}
                customerAvatar={customerAvatar}
            />

            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-950 relative">
                <TopHeader jobTitle={job.title} jobId={job.id} address={job.address} isActive={job.status === 'active'} />

                <div className="flex-1 overflow-y-auto relative scroll-smooth bg-grid-pattern">
                    {renderCurrentView()}
                </div>
            </main>
        </div>
    );
}

