import { useState, useEffect } from 'react';

const SavedCandidates = () => {
  interface Candidate {
    id: string;
    avatar: string;
    name: string;
    username: string;
    location: string;
    html_url: string;
  }

  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Load saved candidates from localStorage when the component mounts
    try {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
    } catch (error) {
      console.error('Failed to load saved candidates:', error);
      setSavedCandidates([]); // Reset to an empty array if there was an error
    }
  }, []);

  const removeCandidate = (id: string) => {
    // Remove a candidate from the list of saved candidates
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  }

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id}>
              <img
                src={candidate.avatar}
                alt={candidate.name || candidate.username}
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
              <div>
                <p><strong>Name:</strong> {candidate.name}</p>
                <p><strong>Username:</strong> {candidate.username}</p>
                <p><strong>Location:</strong> {candidate.location}</p>
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  View GitHub Profile
                </a>
              </div>
              <button onClick={() => removeCandidate(candidate.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates saved yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
