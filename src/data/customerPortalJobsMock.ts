import type { CustomerJob } from '@/context/JobsContext';
import { users } from './mockData';

// Mock jobs for customer portal (in CustomerJob format)
const mockJobs: CustomerJob[] = [
  {
    id: '8291',
    jobName: 'Master Bath & Kitchen Remodel',
    propertyAddress: '1248 Highland Avenue',
    city: 'Venice, CA',
    customerName: 'John Doe',
    customerEmail: 'customer@apex.com',
    trade: 'remodeling',
    estimatedPay: '$12,450',
    description: 'Full renovation of master bathroom and kitchen. Includes demolition, plumbing, electrical, and installation of new fixtures and cabinets.',
    scheduledTime: '2025-12-15T10:00:00',
    squareFootage: '450',
    status: 'InProgress',
    assignedContractorId: 3,
    materialStatus: 'FM Verified',
    createdAt: '2025-11-20T09:00:00',
    profileID: '6',
    contractorProgress: {
      currentStep: 3,
      acknowledged: true,
      lastUpdated: '2025-12-10T14:30:00',
    },
  },
  {
    id: '8292',
    jobName: 'Bathroom Renovation',
    propertyAddress: '567 Ocean Drive',
    city: 'Venice, CA',
    customerName: 'John Doe',
    customerEmail: 'customer@apex.com',
    trade: 'bathroom',
    estimatedPay: '$8,750',
    description: 'Complete bathroom renovation including new vanity, tile work, and fixtures.',
    scheduledTime: '2025-12-18T09:00:00',
    squareFootage: '120',
    status: 'Open',
    assignedContractorId: undefined,
    materialStatus: 'AI Generated',
    createdAt: '2025-12-05T11:00:00',
    profileID: '6',
  },
  {
    id: '8293',
    jobName: 'Kitchen Cabinet Installation',
    propertyAddress: '1248 Highland Avenue',
    city: 'Venice, CA',
    customerName: 'John Doe',
    customerEmail: 'customer@apex.com',
    trade: 'cabinetry',
    estimatedPay: '$5,200',
    description: 'Install new kitchen cabinets and hardware.',
    scheduledTime: '2025-11-28T10:00:00',
    squareFootage: '300',
    status: 'Complete',
    assignedContractorId: 3,
    materialStatus: 'FM Verified',
    createdAt: '2025-11-15T08:00:00',
    profileID: '6',
    contractorProgress: {
      currentStep: 5,
      acknowledged: true,
      lastUpdated: '2025-12-08T16:00:00',
    },
  },
];

// In-memory storage for created jobs (simulates API persistence)
let jobsStorage: CustomerJob[] = [...mockJobs];
let nextJobId = 8300;

/**
 * Get all jobs
 */
export function getAllMockJobs(): CustomerJob[] {
  return [...jobsStorage];
}

/**
 * Get jobs by customer email or profileID
 */
export function getMockJobsByCustomer(email: string, profileID?: string): CustomerJob[] {
  return jobsStorage.filter(job => {
    if (profileID && job.profileID) {
      return job.profileID === profileID;
    }
    return job.customerEmail === email;
  });
}

/**
 * Get job by ID
 */
export function getMockJobById(jobId: string): CustomerJob | undefined {
  return jobsStorage.find(job => job.id === jobId);
}

/**
 * Create a new job (mock - adds to in-memory storage)
 */
export function createMockJob(jobData: Omit<CustomerJob, 'id' | 'createdAt' | 'status'> & { assignedContractorId?: string | number }): CustomerJob {
  const newJob: CustomerJob = {
    ...jobData,
    id: (nextJobId++).toString(),
    createdAt: new Date().toISOString(),
    status: jobData.assignedContractorId ? 'InProgress' : 'Open',
    contractorProgress: jobData.assignedContractorId ? {
      currentStep: 1,
      acknowledged: false,
      lastUpdated: new Date().toISOString(),
    } : undefined,
  };
  
  jobsStorage.push(newJob);
  return newJob;
}

/**
 * Update a job (mock - updates in-memory storage)
 */
export function updateMockJob(jobId: string, updates: Partial<CustomerJob>): void {
  const jobIndex = jobsStorage.findIndex(job => job.id === jobId);
  if (jobIndex !== -1) {
    jobsStorage[jobIndex] = { ...jobsStorage[jobIndex], ...updates };
  }
}

/**
 * Get contractor info by ID (mock - uses users data)
 */
export function getMockContractorInfo(contractorId: string | number | undefined): any {
  if (!contractorId || contractorId === '1') {
    return null;
  }

  const contractor = users.find(u => 
    (u.id?.toString() === contractorId.toString()) || 
    (u.profileID?.toString() === contractorId.toString())
  );
  
  if (contractor && contractor.role === 'contractor') {
    return {
      profileID: contractor.profileID || contractor.id?.toString(),
      email: contractor.email,
      user_role: 'contractor',
    };
  }

  // Default mock contractor
  return {
    profileID: contractorId.toString(),
    email: 'contractor@apex.com',
    user_role: 'contractor',
  };
}

