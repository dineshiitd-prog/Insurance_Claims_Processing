import { GraphQLScalarType, Kind } from 'graphql';
import { policies } from '../data/policies.js';
import { evaluateClaim } from '../domain/evaluateClaim.js';
import type { IncidentType } from '../domain/types.js';

export const DateScalar = new GraphQLScalarType({
  name: 'Date',
  serialize(value: unknown): number {
    if (value instanceof Date) return value.getTime();
    throw new Error('Date serialization error');
  },
  parseValue(value: unknown): Date {
    if (typeof value === 'string' || typeof value === 'number') {
      return new Date(value);
    }
    throw new Error('Date parse error');
  },
  parseLiteral(ast): Date {
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
    policy: (_: unknown, args: { policyId: string }) =>
      policies.find(p => p.policyId === args.policyId) || null
  },
  Mutation: {
    evaluateClaim: (
      _: unknown,
      args: {
        claim: {
          policyId: string;
          incidentType: IncidentType;
          incidentDate: Date;
          amountClaimed: number;
        };
      }
    ) => {
      const claim = {
        ...args.claim,
        incidentDate: new Date(args.claim.incidentDate)
      };
      return evaluateClaim(policies, claim);
    }
  }
};