import { GraphQLScalarType, Kind } from 'graphql';
import { policies } from '../data/policies.js';
import { evaluateClaim } from '../domain/evaluateClaim.js';
export const DateScalar = new GraphQLScalarType({
    name: 'Date',
    serialize(value) {
        if (value instanceof Date)
            return value.getTime();
        throw new Error('Date serialization error');
    },
    parseValue(value) {
        if (typeof value === 'string' || typeof value === 'number') {
            return new Date(value);
        }
        throw new Error('Date parse error');
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
            return new Date(ast.value);
        }
        throw new Error('Date literal parse error');
    }
});
export const resolvers = {
    Date: DateScalar,
    IncidentType: {
        accident: 'accident',
        theft: 'theft',
        fire: 'fire',
        water_damage: 'water damage',
        natural_disaster: 'natural disaster'
    },
    Query: {
        policies: () => policies,
        policy: (_, args) => policies.find(p => p.policyId === args.policyId) || null
    },
    Mutation: {
        evaluateClaim: (_, args) => {
            const claim = {
                ...args.claim,
                incidentDate: new Date(args.claim.incidentDate)
            };
            return evaluateClaim(policies, claim);
        }
    }
};
//# sourceMappingURL=resolvers.js.map