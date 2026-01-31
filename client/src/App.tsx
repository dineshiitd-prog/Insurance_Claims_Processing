import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const SUBMIT_CLAIM = gql`
  mutation SubmitClaim($name: String!, $amount: Float!) {
    submitClaim(name: $name, amount: $amount) {
      id
      name
      amount
      status
    }
  }
`;

function App() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [submitClaim, { data, loading, error }] = useMutation(SUBMIT_CLAIM);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitClaim({
      variables: {
        name,
        amount: parseFloat(amount),
      },
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Insurance Claim Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <button type="submit">Submit Claim</button>
      </form>

      {loading && <p>Submitting...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default App;