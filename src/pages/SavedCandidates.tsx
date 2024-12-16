import { useState, useEffect } from 'react';

const SavedCandidates = () => {
  interface Candidate {
    id: number;
    name: string;
    username: string;
    location: string;
    avatar_url: string;
    email: string;
    html_url: string;
    company: string;
  }

  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  console.log('Loaded to localStorage', savedCandidates);

  useEffect(() => {
    // Load saved candidates from localStorage when the component mounts
    try {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      if (!Array.isArray(candidates)) throw new Error('Invalid data in localStorage');
    setSavedCandidates(candidates);
    } catch (error) {
      console.error('Failed to load saved candidates:', error);
      setSavedCandidates([]); // Reset to an empty array if there was an error
    }
  }, []);

  const removeCandidate = (id: number) => {
    // Remove a candidate from the list of saved candidates
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate) => (

          return (
            <li key={candidate.id}>
              <img
                src={candidate.avatar_url}
                alt={candidate.name || candidate.username}
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50';
                }}
              />
              <div>
                <p><strong>Name:</strong> {candidate.name}</p>
                <p><strong>Username:</strong> {candidate.username}</p>
                <p><strong>Location:</strong> {candidate.location}</p>
                <p><strong>Github URL:</strong> candidate.html_url}</p>
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
