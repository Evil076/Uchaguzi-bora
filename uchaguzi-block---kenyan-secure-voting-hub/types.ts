export enum ViewState {
  HOME = 'HOME',
  VERIFICATION = 'VERIFICATION',
  VOTING = 'VOTING',
  RESULTS = 'RESULTS',
  EDUCATION = 'EDUCATION',
  CAPSTONE_DOCS = 'CAPSTONE_DOCS'
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  photoUrl: string;
  color: string;
  votes: number;
}

export interface Voter {
  id: string;
  name: string;
  verified: boolean;
  hasVoted: boolean;
  location: 'Local' | 'Diaspora';
}

export interface VoteRecord {
  txHash: string;
  timestamp: number;
  candidateId: string;
  location: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface CapstoneSection {
  id: string;
  title: string;
  content: string; // Markdown-like text
  type: 'text' | 'persona' | 'heuristic';
}