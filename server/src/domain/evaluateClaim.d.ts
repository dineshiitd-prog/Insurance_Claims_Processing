import type { Claim, ClaimEvaluation, Policy } from './types.js';
export declare enum ReasonCode {
    APPROVED = "APPROVED",
    POLICY_NOT_FOUND = "POLICY_NOT_FOUND",
    POLICY_INACTIVE = "POLICY_INACTIVE",
    NOT_COVERED = "NOT_COVERED",
    ZERO_PAYOUT = "ZERO_PAYOUT"
}
export declare function evaluateClaim(policies: Policy[], claim: Claim): ClaimEvaluation;
//# sourceMappingURL=evaluateClaim.d.ts.map