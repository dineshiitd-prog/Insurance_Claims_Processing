import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const EVALUATE_CLAIM = gql`
  mutation EvaluateClaim($claim: ClaimInput!) {
    evaluateClaim(claim: $claim) {
      approved
      payout
      reasonCode
    }
  }
`;

function App() {
  const [policyId, setPolicyId] = useState('');
  const [incidentType, setIncidentType] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [amountClaimed, setAmountClaimed] = useState('');

  const [evaluateClaim, { data, loading, error }] =
    useMutation(EVALUATE_CLAIM);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await evaluateClaim({
      variables: {
        claim: {
          policyId,
          incidentType,
          incidentDate,
          amountClaimed: parseFloat(amountClaimed),
        },
      },
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Insurance Claim Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Policy ID"
          value={policyId}
          onChange={e => setPolicyId(e.target.value)}
        />

        <input
          placeholder="Incident Type"
          value={incidentType}
          onChange={e => setIncidentType(e.target.value)}
        />

        <input
          placeholder="Incident Date"
          value={incidentDate}
          onChange={e => setIncidentDate(e.target.value)}
        />

        <input
          placeholder="Amount Claimed"
          type="number"
          value={amountClaimed}
          onChange={e => setAmountClaimed(e.target.value)}
        />

        <button type="submit">Submit Claim</button>
      </form>

      {loading && <p>Submitting…</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default App;