import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CompletedJob {
  id: string;
  jobName: string;
  customerName: string;
  address: string;
  completedDate: string;
  estimatedPay: string;
  description?: string;
}

interface ContractorJobsContextType {
  completedJobs: CompletedJob[];
  addCompletedJob: (job: CompletedJob) => void;
  completedJobsCount: number;
}

const ContractorJobsContext = createContext<ContractorJobsContextType | undefined>(undefined);

const STORAGE_KEY = 'contractor_completed_jobs';

export function ContractorJobsProvider({ children }: { children: React.ReactNode }) {
  const [completedJobs, setCompletedJobs] = useState<CompletedJob[]>([]);

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCompletedJobs(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load completed jobs:', e);
      }
    }
  }, []);

  const addCompletedJob = (job: CompletedJob) => {
    const updated = [job, ...completedJobs];
    setCompletedJobs(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <ContractorJobsContext.Provider
      value={{
        completedJobs,
        addCompletedJob,
        completedJobsCount: completedJobs.length,
      }}
    >
      {children}
    </ContractorJobsContext.Provider>
  );
}

export function useContractorJobs() {
  const context = useContext(ContractorJobsContext);
  if (!context) {
    throw new Error('useContractorJobs must be used within ContractorJobsProvider');
  }
  return context;
}

