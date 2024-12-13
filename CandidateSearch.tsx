import { useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

interface Candidate {
  id: number;
  name: string;
  username: string;
  location: string;
  avatar: string;
  email: string;
  html_url: string;
  company: string;
}
const CandidateSearch = () => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState(
    JSON.parse(localStorage.getItem('savedCandidates') || '[]')
  );

  // User Interface
  interface User {
    id: number;
    login: string;
    avatar_url: string;
    name?: string;
    location?: string;
    company?: string;
    email?: string;
    html_url: string;
  }

  const fetchCandidates = async () => {
    if (!search.trim()) {
    }

    setLoading(true);
    setError('');
    setUser(null);

    try {
      // Fetch GitHub users
      const response = await searchGithub();
      console.log(response);
      if (response.length > 0) {
        // Fetch details of the first user
        const userDetails = await searchGithubUser(response[0].login); 
        console.log(userDetails);
        setCurrentCandidate(userDetails);
        setUser(userDetails); 
      } else {
        setError('No users found.');
      }
    } catch (err) {
      setError('Failed to fetch user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    if (currentCandidate) {
      alert(`${currentCandidate.name} has been saved.`);

      const candidatetoSave = { 
        id: currentCandidate.id,
        name: currentCandidate.name,
        username: currentCandidate.username,
        location: currentCandidate.location,
        avatar: currentCandidate.avatar,
        email: currentCandidate.email || 'N/A',
        html_url: currentCandidate.html_url,
        company: currentCandidate.company || 'N/A',
      };

      const updatedSavedCandidates = [...savedCandidates, candidatetoSave];

      setSavedCandidates(updatedSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));

      const updatedCandidates = candidates.slice(1);
      setCandidates(updatedCandidates);
      setCurrentCandidate(updatedCandidates[0] || null);  
    }
  };

  const handleReject = () => {
    if (currentCandidate) {
      alert(`${currentCandidate.name} has been skipped.`);
      const updatedCandidates = candidates.slice(1);
      setCandidates(updatedCandidates);
      setCurrentCandidate(updatedCandidates[0] || null);
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for candidates"
        />
        <button onClick={fetchCandidates} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div style={styles.details}>
          <h2>{user.login}</h2>
          <img
            src={user.avatar_url}
            alt={user.login}
            style={styles.avatar}
          />
          <p><strong>Name:</strong> {user.name || 'N/A'}</p>
          <p><strong>Location:</strong> {user.location || 'N/A'}</p>
          <p><strong>Company:</strong> {user.company || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
          <div style={styles.buttonContainer}>
        <button onClick={handleAccept} aria-label="Accept Candidate" style={styles.acceptButton}>
          +
        </button>
        <button onClick={handleReject} aria-label="Reject Candidate" style={styles.rejectButton}>
          -
        </button>
        </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  details: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '50px',
  },
  acceptButton: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  rejectButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default CandidateSearch;
