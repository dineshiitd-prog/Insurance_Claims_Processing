import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

  enum IncidentType {
    accident
    theft
    fire
    water_damage
    natural_disaster
  }

  type Policy {
    policyId: ID!
    startDate: Date!
    endDate: Date!
    deductible: Float!
    coverageLimit: Float!
    coveredIncidents: [IncidentType!]!
  }

  input ClaimInput {
    policyId: ID!
    incidentType: IncidentType!
    incidentDate: Date!
    amountClaimed: Float!
  }

  type ClaimEvaluation {
    approved: Boolean!
    payout: Float!
    reasonCode: String!
  }

  type Query {
    policies: [Policy!]!
    policy(policyId: ID!): Policy
  }

  type Mutation {
    evaluateClaim(claim: ClaimInput!): ClaimEvaluation!
  }
`;