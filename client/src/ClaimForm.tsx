import { FormEvent, useState } from 'react';
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

export function ClaimForm() {
  const [policyId, setPolicyId] = useState('POL123');
  const [incidentType, setIncidentType] = useState('fire');
  const [incidentDate, setIncidentDate] = useState('2023-06-15');
  const [amountClaimed, setAmountClaimed] = useState(3000);
  const [evaluateClaim, { data, loading, error }] = useMutation(EVALUATE_CLAIM);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    evaluateClaim({
      variables: {
        claim: {
          policyId,
          incidentType,
          incidentDate,
          amountClaimed: Number(amountClaimed)
        }
      }
    });
  };

  return (
    <div>
      <h2>Submit Claim</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Policy ID</label>
          <input
            value={policyId}
            onChange={e => setPolicyId(e.target.value)}
          />
        </div>
        <div>
          <label>Incident Type</label>
          <select
            value={incidentType}
            onChange={e => setIncidentType(e.target.value)}
          >
            <option value="accident">accident</option>
            <option value="theft">theft</option>
            <option value="fire">fire</option>
            <option value="water_damage">water damage</option>
          </select>
        </div>
        <div>
          <label>Incident Date</label>
          <input
            type="date"
            value={incidentDate}
            onChange={e => setIncidentDate(e.target.value)}
          />
        </div>
        <div>
          <label>Amount Claimed</label>
          <input
            type="number"
            value={amountClaimed}
            onChange={e => setAmountClaimed(Number(e.target.value))}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Evaluating...' : 'Evaluate Claim'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {data && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Result</h3>
          <p>Approved: {data.evaluateClaim.approved ? 'Yes' : 'No'}</p>
          <p>Payout: {data.evaluateClaim.payout}</p>
          <p>Reason: {data.evaluateClaim.reasonCode}</p>
        </div>
      )}
    </div>
  );
}