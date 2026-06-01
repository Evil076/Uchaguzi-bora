export enum ViewState {
  HOME = 'HOME',
  VERIFICATION = 'VERIFICATION',
  VOTING = 'VOTING',
  RESULTS = 'RESULTS',
  EDUCATION = 'EDUCATION',
  CAPSTONE_DOCS = 'CAPSTONE_DOCS'
}

export type Position = 'PRESIDENT' | 'GOVERNOR' | 'SENATOR' | 'MP' | 'WOMAN_REP' | 'MCA';

export interface Region {
  id: string;
  name: string;
  type: 'NATIONAL' | 'COUNTY' | 'CONSTITUENCY';
  parentId?: string;
}

export interface County {
  id: string;
  name: string;
  code: string; // e.g., 047 for Nairobi
  constituencies: { id: string; name: string }[];
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  photoUrl: string;
  color: string; // Party color
  votes: number;
  position: Position;
  regionId: string; // 'national' OR county_id OR constituency_id
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
  selections: Record<Position, string>; // position -> candidateId
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