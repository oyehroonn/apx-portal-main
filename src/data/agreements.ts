export interface Agreement {
  id: string;
  title: string;
  version: string;
  content: string;
}

export const agreements: Agreement[] = [
  {
    id: 'independent-contractor',
    title: 'Independent Contractor Agreement',
    version: '2024.1',
    content: `
# Independent Contractor Agreement

This Independent Contractor Agreement ("Agreement") is entered into between Apex Home Services ("Company") and the Contractor ("Contractor") effective as of the date of acceptance.

## 1. Independent Contractor Status

Contractor is engaged as an independent contractor and not as an employee, partner, agent, or joint venturer of Company. Contractor acknowledges that this Agreement does not create an employment relationship and that Contractor is not entitled to any benefits provided to Company employees.

## 2. Services

Contractor agrees to perform services for Company's clients in a professional and workmanlike manner, consistent with industry standards and Company's quality requirements.

## 3. Compensation

Contractor will be compensated based on the terms agreed upon for each project. Payment will be made upon satisfactory completion of work and receipt of all required documentation.

## 4. Compliance

Contractor agrees to comply with all applicable laws, regulations, and Company policies, including but not limited to safety standards, licensing requirements, and insurance obligations.

## 5. Confidentiality

Contractor agrees to maintain the confidentiality of all proprietary information and client data obtained during the course of providing services.

## 6. Term and Termination

This Agreement may be terminated by either party with written notice. Upon termination, Contractor will complete all work in progress and return all Company property.

By signing below, Contractor acknowledges that they have read, understood, and agree to be bound by the terms of this Agreement.
    `.trim(),
  },
  {
    id: 'liability-waiver',
    title: 'Liability Waiver 2024',
    version: '2024.1',
    content: `
# Liability Waiver 2024

This Liability Waiver ("Waiver") is entered into between Apex Home Services ("Company") and the Contractor ("Contractor").

## 1. Assumption of Risk

Contractor acknowledges that construction and home services work involves inherent risks, including but not limited to physical injury, property damage, and exposure to hazardous materials. Contractor voluntarily assumes all such risks.

## 2. Release of Liability

Contractor hereby releases, waives, and discharges Company, its officers, employees, agents, and clients from any and all claims, demands, actions, or causes of action arising out of or related to any loss, damage, or injury that may be sustained by Contractor while performing services under this Agreement.

## 3. Insurance

Contractor agrees to maintain adequate general liability insurance and workers' compensation insurance as required by law and Company policy.

## 4. Indemnification

Contractor agrees to indemnify and hold harmless Company from any claims, damages, losses, or expenses arising from Contractor's negligence, breach of this Agreement, or violation of any law or regulation.

## 5. Acknowledgment

Contractor acknowledges that they have read this Waiver, understand its terms, and voluntarily agree to be bound by its provisions.

By signing below, Contractor confirms their understanding and acceptance of this Liability Waiver.
    `.trim(),
  },
  {
    id: 'payment-terms',
    title: 'Apex Platform Payment Terms',
    version: '2024.1',
    content: `
# Apex Platform Payment Terms

These Payment Terms ("Terms") govern all payment transactions between Apex Home Services ("Company") and Contractors using the Apex platform.

## 1. Payment Schedule

Payments will be processed according to the following schedule:
- Initial payment: 50% upon project acceptance
- Final payment: 50% upon project completion and customer approval
- Payments are processed weekly on Fridays

## 2. Payment Methods

Contractors may receive payments via:
- Direct bank transfer (ACH)
- Digital wallet
- Other methods as agreed upon

## 3. Fees and Deductions

Company may deduct the following from payments:
- Platform service fee: 10% of project value
- Material costs (if provided by Company)
- Any applicable taxes or withholdings

## 4. Disputes

Payment disputes must be reported within 7 days of payment date. Company will investigate and resolve disputes within 14 business days.

## 5. Late Payments

If Company fails to make payment within 5 business days of the scheduled date, Contractor may suspend work until payment is received.

## 6. Tax Obligations

Contractor is solely responsible for all tax obligations related to payments received. Company will provide necessary tax documentation (1099 forms) as required by law.

## 7. Modifications

These Terms may be modified by Company with 30 days' written notice. Continued use of the platform constitutes acceptance of modified terms.

By signing below, Contractor acknowledges that they have read, understood, and agree to these Payment Terms.
    `.trim(),
  },
];

