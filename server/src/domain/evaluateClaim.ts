import type { Claim, ClaimEvaluation, Policy } from './types.js';

export enum ReasonCode {
  APPROVED = 'APPROVED',
  POLICY_NOT_FOUND = 'POLICY_NOT_FOUND',
  POLICY_INACTIVE = 'POLICY_INACTIVE',
  NOT_COVERED = 'NOT_COVERED',
  ZERO_PAYOUT = 'ZERO_PAYOUT'
}

export function evaluateClaim(
  policies: Policy[],
  claim: Claim
): ClaimEvaluation {
  const policy = policies.find(p => p.policyId === claim.policyId);

  if (!policy) {
    return {
      approved: false,
      payout: 0,
      reasonCode: ReasonCode.POLICY_NOT_FOUND
    };
  }

  const incidentTime = claim.incidentDate.getTime();
  if (
    incidentTime < policy.startDate.getTime() ||
    incidentTime > policy.endDate.getTime()
  ) {
    return {
      approved: false,
      payout: 0,
      reasonCode: ReasonCode.POLICY_INACTIVE
    };
  }

  if (!policy.coveredIncidents.includes(claim.incidentType)) {
    return {
      approved: false,
      payout: 0,
      reasonCode: ReasonCode.NOT_COVERED
    };
  }

  let payout = claim.amountClaimed - policy.deductible;

  if (payout <= 0) {
    return {
      approved: false,
      payout: 0,
      reasonCode: ReasonCode.ZERO_PAYOUT
    };
  }

  if (payout > policy.coverageLimit) {
    payout = policy.coverageLimit;
  }

  return {
    approved: true,
    payout,
    reasonCode: ReasonCode.APPROVED
  };
}