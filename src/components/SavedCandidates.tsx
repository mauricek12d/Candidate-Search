import React, { useState, useEffect } from 'react';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates')) || [];
    setSavedCandidates(saved);
  }, []);

  if (savedCandidates.length === 0) {
    return <p>No candidates have been accepted.</p>;
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      <ul style={styles.list}>
        {savedCandidates.map(candidate => (
          <li key={candidate.id} style={styles.card}>
            <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} style={styles.avatar} />
            <div>
              <p><strong>Name:</strong> {candidate.name}</p>
              <p><strong>Username:</strong> {candidate.username}</p>
              <p><strong>Location:</strong> {candidate.location}</p>
              <p><strong>Email:</strong> <a href={`mailto:${candidate.email}`}>{candidate.email}</a></p>
              <p><strong>Company:</strong> {candidate.company}</p>
              <p>
                <strong>Profile:</strong>{' '}
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  list: {
    listStyleType: 'none',
    padding: 0,
  },
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

export default SavedCandidates;
