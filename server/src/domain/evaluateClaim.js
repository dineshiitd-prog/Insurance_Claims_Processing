export var ReasonCode;
(function (ReasonCode) {
    ReasonCode["APPROVED"] = "APPROVED";
    ReasonCode["POLICY_NOT_FOUND"] = "POLICY_NOT_FOUND";
    ReasonCode["POLICY_INACTIVE"] = "POLICY_INACTIVE";
    ReasonCode["NOT_COVERED"] = "NOT_COVERED";
    ReasonCode["ZERO_PAYOUT"] = "ZERO_PAYOUT";
})(ReasonCode || (ReasonCode = {}));
export function evaluateClaim(policies, claim) {
    const policy = policies.find(p => p.policyId === claim.policyId);
    if (!policy) {
        return {
            approved: false,
            payout: 0,
            reasonCode: ReasonCode.POLICY_NOT_FOUND
        };
    }
    const incidentTime = claim.incidentDate.getTime();
    if (incidentTime < policy.startDate.getTime() ||
        incidentTime > policy.endDate.getTime()) {
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
//# sourceMappingURL=evaluateClaim.js.map