import { NavLink } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav style={styles.nav}>
    <ul style={styles.navList}>
      <li style={styles.navItem}>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { ...styles.navLink, color: 'red' } : styles.navLink
          }
        >
          Candidate Search
        </NavLink>
      </li>
      <li style={styles.navItem}>
        <NavLink
          to="/SavedCandidates"
          style={({ isActive }) =>
            isActive ? { ...styles.navLink, color: 'red' } : styles.navLink
          }
        >
          Saved Candidates
        </NavLink>
      </li>
    </ul>
  </nav>
);
};

const styles = {
nav: {
  backgroundColor: '#f8f9fa',
  padding: '1rem',
  borderBottom: '1px solid #dee2e6',
},
navList: {
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'space-around',
  margin: 0,
  padding: 0,
},
navItem: {
  margin: '0 1rem',
},
navLink: {
  textDecoration: 'none',
  color: '#007bff',
  fontWeight: 'bold',
},
};


export default Nav;
