// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    id: number; 
    name: string; 
    username: string; 
    location: string; 
    avatar: string; // The URL to the candidate's avatar image
    email: string; // The candidate's email address
    html_url: string; // The candidate's profile URL 
    company: string; //  The candidate's company
  }
  