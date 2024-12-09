import React, { useState, useEffect } from 'react';

const mockCandidates = [
  {
    id: 1,
    name: 'Jane Doe',
    username: 'janedoe',
    location: 'San Francisco, CA',
    avatar: 'https://example.com/avatar1.jpg',
    email: 'jane.doe@example.com',
    html_url: 'https://github.com/janedoe',
    company: 'TechCorp',
  },
  {
    id: 2,
    name: 'John Smith',
    username: 'johnsmith',
    location: 'New York, NY',
    avatar: 'https://example.com/avatar2.jpg',
    email: 'john.smith@example.com',
    html_url: 'https://github.com/johnsmith',
    company: 'InnovateInc',
  },
];

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const [savedCandidates, setSavedCandidates] = useState(
    JSON.parse(localStorage.getItem('savedCandidates')) || []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('candidates'));
    if (storedCandidates) {
      setCandidates(storedCandidates);
      setCurrentCandidate(storedCandidates[0] || null);
    } else {
      setCandidates(mockCandidates);
      setCurrentCandidate(mockCandidates[0]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  const handleAccept = () => {
    alert(`${currentCandidate.name} has been saved.`);
    const updatedCandidates = candidates.slice(1);
    const updatedSavedCandidates = [...savedCandidates, currentCandidate];

    setCandidates(updatedCandidates);
    setSavedCandidates(updatedSavedCandidates);
    setCurrentCandidate(updatedCandidates[0] || null);

    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
  };

  const handleReject = () => {
    alert(`${currentCandidate.name} has been skipped.`);
    const updatedCandidates = candidates.slice(1);
    setCandidates(updatedCandidates);
    setCurrentCandidate(updatedCandidates[0] || null);
  };

  if (loading) {
    return <p>Loading candidates...</p>;
  }

  if (!currentCandidate) {
    return <p>No more candidates available for review.</p>;
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      <div style={styles.card}>
        <img src={currentCandidate.avatar} alt={`${currentCandidate.name}'s avatar`} style={styles.avatar} />
        <div>
          <p><strong>Name:</strong> {currentCandidate.name}</p>
          <p><strong>Username:</strong> {currentCandidate.username}</p>
          <p><strong>Location:</strong> {currentCandidate.location}</p>
          <p><strong>Email:</strong> <a href={`mailto:${currentCandidate.email}`}>{currentCandidate.email}</a></p>
          <p><strong>Company:</strong> {currentCandidate.company}</p>
          <p>
            <strong>Profile:</strong>{' '}
            <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
          </p>
        </div>
      </div>
      <div>
        <button onClick={handleAccept} aria-label="Accept Candidate">+</button>
        <button onClick={handleReject} aria-label="Reject Candidate">-</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
};

export default CandidateSearch;

