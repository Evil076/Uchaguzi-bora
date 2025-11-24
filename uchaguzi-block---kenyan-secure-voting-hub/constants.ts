import { Candidate, CapstoneSection } from './types';

export const CANDIDATES: Candidate[] = [
  {
    id: 'c1',
    name: 'Amani Kenya',
    party: 'Unity Alliance',
    photoUrl: 'https://picsum.photos/200/200?random=1',
    color: '#ef4444', // Red
    votes: 4520123
  },
  {
    id: 'c2',
    name: 'Baraka Msingi',
    party: 'Progressive Party',
    photoUrl: 'https://picsum.photos/200/200?random=2',
    color: '#22c55e', // Green
    votes: 4100567
  },
  {
    id: 'c3',
    name: 'David Omondi',
    party: 'Tech Forward',
    photoUrl: 'https://picsum.photos/200/200?random=3',
    color: '#3b82f6', // Blue
    votes: 1200890
  }
];

export const PERSONAS = [
  {
    name: "Wanjiku",
    role: "Rural Voter (Elderly)",
    context: "Uses a basic feature phone. Struggles with small text. Needs voice assistance.",
    goal: "Vote quickly without traveling 50km to a town center."
  },
  {
    name: "Kevin",
    role: "Diaspora Voter (London, UK)",
    context: "Tech-savvy software engineer. Worried about vote counting transparency.",
    goal: "Vote securely from abroad and verify his vote on the blockchain."
  }
];

export const CAPSTONE_CONTENT: CapstoneSection[] = [
  {
    id: 'prob',
    title: 'Problem & Overview',
    type: 'text',
    content: `**Problem:** 
Kenya faces recurring challenges in elections:
1. **Low Voter Turnout:** Especially among the 3+ million diaspora due to travel logistics.
2. **Trust Issues:** Fears of rigging/fraud (e.g., 2022 disputes) lead to tension.
3. **Digital Divide:** Rural areas lack high-bandwidth connectivity.

**Solution:** 
"Uchaguzi Block" is a blockchain-enabled voting hub.
- **Identity:** Biometric verification linked to IEBC database.
- **Trust:** Ethereum-based immutable ledger for vote recording.
- **Inclusivity:** Multimodal UI (Voice/Text), Offline-first architecture.`
  },
  {
    id: 'heuristic',
    title: 'Heuristic Evaluation (Nielsen)',
    type: 'heuristic',
    content: `**Target: Existing IEBC Portal**
1. **Visibility of System Status:** (Fail) Users often don't know if their registration is pending or approved.
2. **Match between System and Real World:** (Pass) Uses standard terms like "Polling Station".
3. **Error Prevention:** (Fail) Forms often submit with missing data, only to error out later.
   
**Improvement in Uchaguzi Block:** Real-time field validation and clear progress steppers.`
  }
];