import { GraphQLScalarType } from 'graphql';
import type { IncidentType } from '../domain/types.js';
export declare const DateScalar: GraphQLScalarType<Date, number>;
export declare const resolvers: {
    Date: GraphQLScalarType<Date, number>;
    IncidentType: {
        accident: string;
        theft: string;
        fire: string;
        water_damage: string;
        natural_disaster: string;
    };
    Query: {
        policies: () => import("../domain/types.js").Policy[];
        policy: (_: unknown, args: {
            policyId: string;
        }) => import("../domain/types.js").Policy | null;
    };
    Mutation: {
        evaluateClaim: (_: unknown, args: {
            claim: {
                policyId: string;
                incidentType: IncidentType;
                incidentDate: Date;
                amountClaimed: number;
            };
        }) => import("../domain/types.js").ClaimEvaluation;
    };
};
//# sourceMappingURL=resolvers.d.ts.map