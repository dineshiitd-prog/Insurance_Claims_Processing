import { gql, useQuery } from '@apollo/client';

const POLICIES = gql`
  query Policies {
    policies {
      policyId
      startDate
      endDate
      deductible
      coverageLimit
      coveredIncidents
    }
  }
`;

export function PolicyList() {
  const { data, loading, error } = useQuery(POLICIES);

  if (loading) return <p>Loading policies...</p>;
  if (error) return <p>Error loading policies: {error.message}</p>;

  return (
    <div>
      <h2>Policies</h2>
      <ul>
        {data.policies.map((p: any) => (
          <li key={p.policyId}>
            <strong>{p.policyId}</strong> — deductible {p.deductible}, limit{' '}
            {p.coverageLimit}, incidents: {p.coveredIncidents.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}