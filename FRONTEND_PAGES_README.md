# Frontend Pages Documentation

This document provides a comprehensive overview of all frontend pages in the APX Portal application, organized by portal type and functionality.

## Table of Contents

1. [Authentication & Entry Points](#authentication--entry-points)
2. [Contractor Portal](#contractor-portal)
3. [Admin Portal](#admin-portal)
4. [Investor Portal](#investor-portal)
5. [Customer Portal](#customer-portal)
6. [Public/Magic Link Pages](#publicmagic-link-pages)
7. [Utility Pages](#utility-pages)

---

## Authentication & Entry Points

### Login Page
**File:** `src/pages/Login.tsx`  
**Route:** `/login`  
**Access:** Public

**Description:**  
Main authentication page for all user roles. Features role-based login with demo user support.

**Key Features:**
- Multi-role selection (Admin, Contractor, Investor, Customer)
- Email/password authentication
- Demo user quick login
- Role-based routing after login
- Glassmorphism UI design
- Auto-sync role based on email input

**User Roles Supported:**
- Admin
- Contractor Pro
- Investor
- Homeowner (Customer)

**Navigation:**
- Redirects to role-specific dashboard after successful login
- Redirects authenticated users away from login page

---

## Contractor Portal

### Contractor Portal (Main Dashboard)
**File:** `src/pages/contractor/ContractorPortal.tsx`  
**Route:** `/contractor/portal`  
**Access:** Contractor role only

**Description:**  
Main hub for contractors with dashboard, job board, compliance, and wallet management.

**Key Features:**
- **Dashboard Tab:**
  - Active projects overview
  - Available jobs board
  - KYC verification status
  - Agreements section
  - Earnings summary
  - Job statistics
  - Collapsible projects section
  - Completed jobs sidebar

- **Compliance Tab:**
  - KYC verification card with camera capture
  - Agreements signing section
  - Compliance status tracking

- **Jobs Tab:**
  - Available jobs filtered by trade
  - Job acceptance functionality
  - Active jobs management
  - Job refresh mechanism

- **Wallet Tab:**
  - Earnings overview
  - Payment history
  - Payout status

**Navigation:**
- Sidebar navigation with logout button
- Project cards navigate to job flow or job summary
- Completed jobs navigate to job summary view

**Related Components:**
- `KycVerificationCard.tsx` - KYC verification with camera
- `AgreementsSection.tsx` - Agreement signing
- `SupportWidget.tsx` - Support chat widget

---

### Contractor Dashboard
**File:** `src/pages/contractor/ContractorDashboard.tsx`  
**Route:** `/contractor/dashboard`  
**Access:** Contractor role only

**Description:**  
Alternative dashboard view for contractors with job overview and statistics.

**Key Features:**
- Job statistics cards
- Recent activity feed
- Quick actions
- Performance metrics

---

### Job Board
**File:** `src/pages/contractor/JobBoard.tsx`  
**Route:** `/contractor/jobs`  
**Access:** Contractor role only

**Description:**  
Dedicated page for browsing and accepting available jobs.

**Key Features:**
- Filterable job list
- Job details modal
- Accept job functionality
- Trade-based filtering

---

### Active Job View
**File:** `src/pages/contractor/ActiveJobView.tsx`  
**Route:** `/contractor/jobs/:jobId`  
**Access:** Contractor role only

**Description:**  
Detailed view for an active job with step-by-step workflow.

**Key Features:**
- Job details display
- Step-by-step progress tracking
- Material requirements
- Photo uploads
- Progress updates

---

### Contractor Job Flow Demo
**File:** `src/pages/contractor/ContractorJobFlowDemo.tsx`  
**Route:** `/contractor/job-flow-demo?auto=1&jobId={jobId}`  
**Access:** Contractor role only

**Description:**  
Interactive job workflow interface with 5-step completion process.

**Key Features:**
- Step 1: Job Details & Requirements
- Step 2: Material Sourcing
- Step 3: Work Progress Updates
- Step 4: Photo Documentation
- Step 5: Completion & Summary
- Auto-redirect on job acceptance
- Job refresh logic to prevent "job not found" errors

**Navigation:**
- Auto-navigates when job is accepted
- Redirects if job not found after refresh attempts

---

### Job Summary View
**File:** `src/pages/contractor/JobSummaryView.tsx`  
**Route:** `/contractor/project/:jobId`  
**Access:** Contractor role only

**Description:**  
Summary view for completed jobs showing all steps compiled together.

**Key Features:**
- Complete job overview
- All steps displayed in summary format
- Job details, materials, progress, photos
- Completion status
- Contractor information

**Navigation:**
- Accessible from completed jobs in sidebar
- Accessible from "View Details" in completed jobs modal

---

### Compliance Hub
**File:** `src/pages/contractor/ComplianceHub.tsx`  
**Route:** `/contractor/compliance`  
**Access:** Contractor role only

**Description:**  
Dedicated compliance management page.

**Key Features:**
- KYC status
- Agreement status
- Compliance requirements checklist
- Document uploads

---

### Wallet
**File:** `src/pages/contractor/Wallet.tsx`  
**Route:** `/contractor/wallet`  
**Access:** Contractor role only

**Description:**  
Financial management page for contractors.

**Key Features:**
- Earnings overview
- Payment history
- Pending payouts
- Transaction details
- Payout requests

---

## Admin Portal

### Admin Portal (Main Dashboard)
**File:** `src/pages/admin/AdminPortal.tsx`  
**Route:** `/admin/dashboard`  
**Access:** Admin role only

**Description:**  
Comprehensive admin console with multiple management views integrated into a single component.

**Key Features:**
- **Dashboard View:**
  - KPI cards (Total Jobs, Active Jobs, Pending Payouts, Disputes)
  - Revenue charts
  - Recent activity feed
  - Quick stats overview

- **Jobs View:**
  - Job list with filters
  - Job detail modal
  - Status management
  - Contractor assignment

- **Leads View:**
  - Lead pipeline management
  - Add/import leads
  - Lead status tracking
  - Property address and date tracking

- **Payouts View:**
  - Pending payout approvals
  - Payout history
  - Amount filtering
  - Status management

- **Disputes View:**
  - Dispute list with status
  - Dispute detail modal
  - Resolution tracking
  - Title and description display

- **Compliance View:**
  - Contractor compliance status
  - Blocked contractors list
  - Compliance metrics

- **Meetings View:**
  - Scheduled meetings calendar
  - Meeting management

- **Ledger View:**
  - Accounting ledger
  - Financial transactions
  - Revenue tracking

**UI Features:**
- Glassmorphism design
- Dark theme
- Responsive sidebar navigation
- Logout functionality
- Search and filter capabilities

**Navigation:**
- Sidebar navigation between views
- Job detail modals
- Logout button

---

### Legal Compliance
**File:** `src/pages/admin/LegalCompliance.tsx`  
**Route:** `/admin/legal-compliance`  
**Access:** Admin role only

**Description:**  
Legal and compliance management page.

**Key Features:**
- Compliance regulations
- Legal document management
- Audit trails

---

### Dispute List
**File:** `src/pages/admin/DisputeList.tsx`  
**Route:** `/admin/disputes`  
**Access:** Admin role only

**Description:**  
List view of all disputes.

**Key Features:**
- Dispute filtering
- Status management
- Search functionality

---

### Dispute Detail
**File:** `src/pages/admin/DisputeDetail.tsx`  
**Route:** `/admin/disputes/:disputeId`  
**Access:** Admin role only

**Description:**  
Detailed view of a specific dispute.

**Key Features:**
- Full dispute information
- Resolution tools
- Communication history
- Status updates

---

### Ledger
**File:** `src/pages/admin/Ledger.tsx`  
**Route:** `/admin/ledger`  
**Access:** Admin role only

**Description:**  
Accounting ledger page.

**Key Features:**
- Financial transactions
- Revenue tracking
- Expense management
- Reports

---

### Payout Approval
**File:** `src/pages/admin/PayoutApproval.tsx`  
**Route:** `/admin/payouts`  
**Access:** Admin role only

**Description:**  
Payout management and approval page.

**Key Features:**
- Pending payouts list
- Approval workflow
- Payment processing
- History tracking

---

### Investor Accounting
**File:** `src/pages/admin/InvestorAccounting.tsx`  
**Route:** `/admin/investors`  
**Access:** Admin role only

**Description:**  
Investor financial management page.

**Key Features:**
- Investor accounts
- Financial reports
- Payment tracking

---

### Admin Job List
**File:** `src/pages/admin/AdminJobList.tsx`  
**Route:** `/admin/jobs`  
**Access:** Admin role only

**Description:**  
Dedicated job management page.

**Key Features:**
- Job list with filters
- Status management
- Contractor assignment
- Job creation

---

### Admin Meetings
**File:** `src/pages/admin/AdminMeetings.tsx`  
**Route:** `/admin/meetings`  
**Access:** Admin role only

**Description:**  
Meeting scheduling and management page.

**Key Features:**
- Calendar view
- Meeting scheduling
- Attendee management

---

### Admin Leads
**File:** `src/pages/admin/AdminLeads.tsx`  
**Route:** `/admin/leads`  
**Access:** Admin role only

**Description:**  
Lead management page.

**Key Features:**
- Lead pipeline
- Lead import
- Status tracking
- Conversion management

---

## Investor Portal

### Investor Dashboard
**File:** `src/pages/investor/InvestorDashboard.tsx`  
**Routes:** 
- `/investor/dashboard`
- `/investor/orders`
- `/investor/properties`
- `/investor/leads`

**Access:** Investor role only

**Description:**  
Main investor portal with multiple views (Overview, Work Orders, Leads, Properties).

**Key Features:**
- **Overview:**
  - Portfolio metrics
  - Revenue charts
  - Property statistics
  - Investment performance

- **Work Orders:**
  - Job/work order list
  - Status tracking
  - Financial details

- **Leads:**
  - Lead pipeline
  - Conversion tracking
  - Lead management

- **Properties:**
  - Property portfolio
  - Property details
  - Investment tracking

**UI Features:**
- Dark theme
- Responsive design
- Tab-based navigation
- Data visualization

---

### Investor Reports
**File:** `src/pages/investor/InvestorReports.tsx`  
**Route:** `/investor/reports`  
**Access:** Investor role only

**Description:**  
Financial reports and analytics page.

**Key Features:**
- Financial reports
- Performance analytics
- Revenue breakdown
- Export functionality

---

### Property Detail View
**File:** `src/pages/investor/PropertyDetailView.tsx`  
**Route:** `/investor/property/:address`  
**Access:** Investor role only

**Description:**  
Detailed view of a specific property.

**Key Features:**
- Property information
- Investment details
- Job history
- Financial metrics

---

## Customer Portal

### Customer Job View (Main Dashboard)
**File:** `src/pages/customer/CustomerJobView.tsx`  
**Route:** `/customer/dashboard`  
**Access:** Customer role only

**Description:**  
Main customer portal dashboard using LayoutShell component.

**Key Features:**
- Job overview
- Progress tracking
- Material status
- Contractor information
- Sidebar navigation

**Layout:**
- Uses `LayoutShell` component
- Integrated sidebar
- Job management views

---

### Customer Dashboard
**File:** `src/pages/customer/CustomerDashboard.tsx`  
**Route:** (Legacy/Alternative view)  
**Access:** Customer role only

**Description:**  
Alternative customer dashboard with tabs for status, materials, and actions.

**Key Features:**
- **Status Tab:**
  - Job progress timeline
  - Current status display

- **Materials Tab:**
  - Materials list
  - Purchase status
  - Delivery tracking

- **Actions Tab:**
  - Quick actions
  - Support links
  - Report issue

---

### Job Management
**File:** `src/pages/customer/JobManagement.tsx`  
**Route:** (Used within LayoutShell)  
**Access:** Customer role only

**Description:**  
Job creation and management interface.

**Key Features:**
- Create new job form
- Job list display
- Job selection
- Job details view

**Form Fields:**
- Job name
- Property address
- City
- Trade
- Estimated pay
- Description
- Scheduled time
- Square footage

---

### Customer Tracker
**File:** `src/pages/customer/CustomerTracker.tsx`  
**Route:** `/track/:jobId`  
**Access:** Public (Magic Link)

**Description:**  
Public job tracking page accessible via magic link.

**Key Features:**
- Job status display
- Progress tracking
- No authentication required
- Magic link access

---

### Customer Credentials
**File:** `src/pages/customer/CustomerCredentials.tsx`  
**Route:** `/customer/credentials`  
**Access:** Public

**Description:**  
Page displayed after quote approval showing customer credentials.

**Key Features:**
- Display email and password
- Portal link
- Copy to clipboard
- Direct access button
- Auto-login functionality

---

### Quote Approval
**File:** `src/pages/customer/QuoteApproval.tsx`  
**Route:** `/quote/:token`  
**Access:** Public (Magic Link)

**Description:**  
Public page for customers to approve quotes via magic link.

**Key Features:**
- Quote details display
- Approve/Reject buttons
- Terms and conditions
- Redirect to credentials page after approval

---

### Material Purchase Status
**File:** `src/pages/customer/MaterialPurchaseStatus.tsx`  
**Route:** `/materials/:token`  
**Access:** Customer role (via CustomerPortalLayout)

**Description:**  
Material purchase tracking page.

**Key Features:**
- Material list
- Purchase status
- Approval workflow
- Delivery tracking

---

### Material Delivery Confirmation
**File:** `src/pages/customer/MaterialDeliveryConfirmation.tsx`  
**Route:** `/materials/:token/delivery`  
**Access:** Customer role (via CustomerPortalLayout)

**Description:**  
Material delivery confirmation page.

**Key Features:**
- Delivery status
- Confirmation form
- Photo upload
- Signature capture

---

### Report Issue
**File:** `src/pages/customer/ReportIssue.tsx`  
**Route:** `/issue/:token`  
**Access:** Customer role (via CustomerPortalLayout)

**Description:**  
Customer support and issue reporting page.

**Key Features:**
- Issue reporting form
- Photo upload
- Priority selection
- Support ticket creation

---

### Customer Job Detail
**File:** `src/pages/customer/CustomerJobDetail.tsx`  
**Route:** (Legacy route)  
**Access:** Customer role only

**Description:**  
Legacy job detail view.

---

### Customer Login
**File:** `src/pages/customer/CustomerLogin.tsx`  
**Route:** (Component, not standalone page)  
**Access:** Public

**Description:**  
Customer-specific login component.

## Public/Magic Link Pages

### Customer Tracker
**File:** `src/pages/customer/CustomerTracker.tsx`  
**Route:** `/track/:jobId`  
**Access:** Public (No authentication required)

**Description:**  
Public job tracking accessible via magic link.

---

### Quote Approval
**File:** `src/pages/customer/QuoteApproval.tsx`  
**Route:** `/quote/:token`  
**Access:** Public (Magic link)

**Description:**  
Public quote approval page.

---

## Utility Pages

### Test API
**File:** `src/pages/TestAPI.tsx`  
**Route:** `/test-api`  
**Access:** Public (Development)

**Description:**  
API testing and debugging page.

**Key Features:**
- API endpoint testing
- Request/response display
- Error debugging
- Backend connectivity check

---

### Materials
**File:** `src/pages/Materials.tsx`  
**Route:** (Utility page)  
**Access:** Varies

**Description:**  
Materials management utility page.

---

## Layout Components

### Customer Portal Layout
**File:** `src/layouts/CustomerPortalLayout.tsx`  
**Description:**  
Layout wrapper for customer portal pages with sidebar navigation.

**Navigation Items:**
- Dashboard
- Job Management
- Materials
- Delivery
- Support
- Quote

---

### Portal Layout
**File:** `src/components/PortalLayout.tsx`  
**Description:**  
Reusable portal layout component with sidebar and header.

---

### Layout Shell
**File:** `src/components/customerPortal/LayoutShell.tsx`  
**Description:**  
Main layout component for customer portal with integrated views.

**Integrated Views:**
- Job Management View
- Job Overview View
- Live Tracking View
- Material Sourcing View
- Quote Approval View
- Completion View

---

## Key Components

### Protected Route
**File:** `src/components/ProtectedRoute.tsx`  
**Description:**  
Route protection component that checks authentication and role permissions.

**Features:**
- Authentication check
- Role-based access control
- Redirect to login if unauthorized

---

### Auth Components
**Location:** `src/components/auth/`

**Components:**
- `AuthLayoutSplit.tsx` - Split layout for auth pages
- `DemoLoginList.tsx` - Demo user quick login
- `GlassInput.tsx` - Glassmorphism input field
- `PrimaryButton.tsx` - Primary action button
- `RoleToggle.tsx` - Role selection toggle

---

## Context Providers

### Auth Context
**File:** `src/context/AuthContext.tsx`  
**Description:**  
Authentication state management.

**Features:**
- Login/logout
- User session management
- Role-based routing
- API timeout handling

---

### Jobs Context
**File:** `src/context/JobsContext.tsx`  
**Description:**  
Job data management and API integration.

**Features:**
- Job CRUD operations
- Job filtering
- Contractor assignment
- Job refresh mechanism

---

### Contractor Jobs Context
**File:** `src/context/ContractorJobsContext.tsx`  
**Description:**  
Contractor-specific job state management.

**Features:**
- Completed jobs tracking
- Active jobs management
- Job statistics

---

### Theme Context
**File:** `src/context/ThemeContext.tsx`  
**Description:**  
Theme management (light/dark mode).

---

## Routing Structure

### Main Routes (App.tsx)

**Public Routes:**
- `/login` - Login page
- `/test-api` - API testing
- `/track/:jobId` - Public job tracker
- `/quote/:token` - Quote approval
- `/customer/credentials` - Customer credentials

**Contractor Routes:**
- `/contractor/portal` - Main portal
- `/contractor/dashboard` - Dashboard
- `/contractor/job-flow-demo` - Job workflow
- `/contractor/project/:jobId` - Job summary
- `/contractor/compliance` - Compliance hub
- `/contractor/jobs` - Job board
- `/contractor/jobs/:jobId` - Active job view
- `/contractor/wallet` - Wallet

**Admin Routes:**
- `/admin/dashboard` - Main admin portal
- `/admin/legal-compliance` - Legal compliance
- `/admin/disputes` - Dispute list
- `/admin/disputes/:disputeId` - Dispute detail
- `/admin/ledger` - Accounting ledger
- `/admin/payouts` - Payout approvals
- `/admin/investors` - Investor accounting
- `/admin/jobs` - Job management
- `/admin/meetings` - Meetings
- `/admin/leads` - Lead management

**Investor Routes:**
- `/investor/dashboard` - Main dashboard
- `/investor/orders` - Work orders
- `/investor/properties` - Properties
- `/investor/leads` - Leads
- `/investor/reports` - Reports
- `/investor/property/:address` - Property detail

**Customer Routes:**
- `/customer/dashboard` - Main dashboard
- `/materials/:token` - Material purchase
- `/materials/:token/delivery` - Delivery confirmation
- `/issue/:token` - Report issue

**Root Route:**
- `/` - Redirects based on authentication and role

---

## Performance Optimizations

### Code Splitting
- All portal components are lazy-loaded using `React.lazy()`
- Suspense boundaries with loading fallbacks
- Reduced initial bundle size

### State Management
- Context providers for shared state
- Memoization for expensive computations
- Job refresh mechanisms to prevent stale data

### API Optimization
- API timeout handling (3-second timeout)
- Non-blocking profileID fetch
- Graceful error handling
- Local storage fallbacks for KYC and agreements

---

## Styling

### Main Stylesheets
- `src/styles/index.css` - Global styles, glassmorphism effects
- `src/styles/customerPortal.css` - Customer portal specific styles

### Design System
- Tailwind CSS for utility classes
- Glassmorphism effects
- Dark theme support
- Custom scrollbars
- Animations and transitions

---

## Backend Integration

### API Base URL
- Default: `http://127.0.0.1:5001/api`

### Key Endpoints Used
- `/api/auth/login` - Authentication
- `/api/jobs` - Job CRUD operations
- `/api/profiles/:id` - Profile information
- `/api/kyc` - KYC submission
- `/api/agreements` - Agreement signing

---

## Error Handling

### Common Error Scenarios
1. **Job Not Found**: Implemented refresh logic before critical operations
2. **API Timeout**: 3-second timeout with fallback to localStorage
3. **Camera Access**: Graceful fallback if camera unavailable
4. **Authentication Failures**: Redirect to login with error message

---

## Future Enhancements

### Potential Additions
- Real-time notifications
- WebSocket integration for live updates
- Advanced filtering and search
- Export functionality for reports
- Mobile app support
- Offline mode capabilities

---

## Notes

- All portals include logout functionality
- Demo users are supported for quick testing
- Magic links enable public access to specific features
- Job refresh mechanisms prevent "job not found" errors
- Local storage fallbacks ensure functionality even when API is unavailable

---

**Last Updated:** December 2025  
**Version:** 1.0

