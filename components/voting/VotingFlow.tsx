import React, { useState, useEffect, useRef } from 'react';
import { Fingerprint, CheckCircle, QrCode, Lock, MapPin, ScanFace, ArrowRight, AlertTriangle, RotateCcw, Edit3, ChevronDown, Volume2, VolumeX, Globe, Home } from 'lucide-react';
import { BALLOT_CONFIG, KENYAN_LOCATIONS, DIASPORA_LOCATIONS } from '../../constants';
import { VoteRecord, Position, County, Candidate } from '../../types';
import { blockchainService } from '../../services/blockchainService';
import { iebcService, VoterRegistration } from '../../services/iebcService';

interface VotingFlowProps {
  onComplete: () => void;
  language: 'EN' | 'SW';
  castVote: (selections: Record<Position, string>) => void;
  candidates: Candidate[];
}

type VerificationMethod = 'FINGERPRINT' | 'FACE';
type VoterCategory = 'LOCAL' | 'DIASPORA';
type VotingStep = 'CATEGORY' | 'ID_ENTRY' | 'LOCATION_DETAILS' | 'METHOD' | 'VERIFY' | 'BALLOT' | 'REVIEW' | 'SUBMITTING' | 'RECEIPT';

// Full Kenya "6-Piece Suit" Voting Sequence
const VOTING_SEQUENCE: Position[] = ['PRESIDENT', 'GOVERNOR', 'SENATOR', 'WOMAN_REP', 'MP', 'MCA'];

export const VotingFlow: React.FC<VotingFlowProps> = ({ onComplete, language, castVote, candidates: allCandidates }) => {
  const [step, setStep] = useState<VotingStep>('CATEGORY');
  const [method, setMethod] = useState<VerificationMethod>('FACE');
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Location/Category State
  const [voterCategory, setVoterCategory] = useState<VoterCategory | null>(null);
  const [diasporaLocation, setDiasporaLocation] = useState<{ id: string, name: string } | null>(null);

  // Registered Home State (Where the vote counts)
  const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
  const [selectedConstituency, setSelectedConstituency] = useState<{ id: string, name: string } | null>(null);

  // ID Verification State
  const [idNumber, setIdNumber] = useState('');
  const [isVerifyingId, setIsVerifyingId] = useState(false);
  const [idError, setIdError] = useState<string | null>(null);
  const [voterDetails, setVoterDetails] = useState<VoterRegistration | null>(null);

  // Voting State
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [selections, setSelections] = useState<Record<Position, string>>({} as any);

  const [receipt, setReceipt] = useState<VoteRecord | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- Text to Speech Helper ---
  const speak = (text: string) => {
    if (!audioEnabled) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop previous
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'SW' ? 'sw-KE' : 'en-KE'; // Try Kenyan English/Swahili if available
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Announce step changes if audio enabled
    if (step === 'CATEGORY') speak(language === 'EN' ? "Welcome. Are you voting from within Kenya or from the Diaspora?" : "Karibu. Je, unapiga kura ukiwa Kenya au ughaibuni?");
    if (step === 'ID_ENTRY') speak(language === 'EN' ? "Please enter your National ID number for verification." : "Tafadhali weka nambari yako ya kitambulisho.");
    if (step === 'LOCATION_DETAILS') speak(language === 'EN' ? "Please select your physical location and your registered home county." : "Tafadhali chagua mahali ulipo na kaunti yako ya nyumbani uliyojisajili.");
    if (step === 'METHOD') speak(language === 'EN' ? "Choose how you want to verify your identity." : "Chagua njia ya kuthibitisha utambulisho wako.");
    if (step === 'BALLOT') {
      const pos = VOTING_SEQUENCE[currentPositionIndex];
      const label = BALLOT_CONFIG[pos].label;
      speak(language === 'EN' ? `Select your candidate for ${label}` : `Chagua mgombea wa ${label}`);
    }
  }, [step, currentPositionIndex, audioEnabled, language]);

  // Handle Camera Stream for Face ID
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (step === 'VERIFY' && method === 'FACE' && isScanning) {
      setScanError(false);
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.warn("Camera access denied or not available", err);
          setScanError(true);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [step, method, isScanning]);

  const startVerification = () => {
    setStep('VERIFY');
    setIsScanning(true);

    // Simulate processing time
    setTimeout(() => {
      if (scanError) {
        setIsScanning(false);
        return;
      }
      setIsScanning(false);
      setStep('BALLOT');
    }, 3500);
  };

  const handleIdVerify = async () => {
    if (!idNumber || idNumber.length < 6) {
      setIdError(language === 'EN' ? 'Invalid ID Number' : 'Nambari si sahihi');
      return;
    }

    setIsVerifyingId(true);
    setIdError(null);

    try {
      const voter = await iebcService.verifyVoter(idNumber);
      if (voter) {
        setVoterDetails(voter);

        // Auto-select location based on IEBC data
        const { county, constituency } = iebcService.getLocationDetails(voter.countyId, voter.constituencyId);
        if (county) setSelectedCounty(county);
        if (constituency) setSelectedConstituency(constituency);

      } else {
        setIdError(language === 'EN' ? 'ID not found in IEBC register' : 'Kitambulisho hakikupatikana');
      }
    } catch (err) {
      setIdError('Connection Error');
    } finally {
      setIsVerifyingId(false);
    }
  };

  const proceedFromId = () => {
    if (voterCategory === 'DIASPORA') {
      setStep('LOCATION_DETAILS'); // Needs to select host country
    } else {
      setStep('METHOD'); // Skip location details as they are auto-filled
    }
  };

  const handleCandidateSelect = (candidateId: string) => {
    const currentPos = VOTING_SEQUENCE[currentPositionIndex];
    setSelections(prev => ({ ...prev, [currentPos]: candidateId }));
  };

  const nextBallot = () => {
    if (currentPositionIndex < VOTING_SEQUENCE.length - 1) {
      setCurrentPositionIndex(prev => prev + 1);
    } else {
      setStep('REVIEW');
    }
  };

  const submitVotes = async () => {
    setStep('SUBMITTING');

    try {
      const locStr = voterCategory === 'DIASPORA'
        ? `${diasporaLocation?.name} (Origin: ${selectedCounty?.name})`
        : `${selectedCounty?.name} - ${selectedConstituency?.name}`;

      // Use the real service
      const receiptData = await blockchainService.submitVote(
        "user-session-id",
        selections,
        locStr
      );

      // Update local state for UI (Charts)
      castVote(selections);

      setReceipt({
        txHash: receiptData.txHash,
        timestamp: receiptData.timestamp,
        selections: selections,
        location: locStr
      });
      setStep('RECEIPT');
    } catch (error) {
      console.error("Vote submission failed:", error);
      // In a real app, we would show an error state here
      alert("Submission failed. Please try again.");
      setStep('REVIEW');
    }
  };

  // --- RENDER HELPERS ---

  const ToggleAudioBtn = () => (
    <button
      onClick={() => setAudioEnabled(!audioEnabled)}
      className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-30 ${audioEnabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}
      title="Toggle Audio Guide"
    >
      {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );

  // Step 1: Category Selection (Local vs Diaspora)
  if (step === 'CATEGORY') {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 animate-in fade-in">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100 relative">
          <ToggleAudioBtn />

          <h2 className="text-2xl font-bold text-center mb-2 text-slate-900">
            {language === 'EN' ? 'Where are you voting from?' : 'Unapiga kura kutoka wapi?'}
          </h2>
          <p className="text-center text-slate-500 mb-8 text-sm">
            {language === 'EN' ? 'Choose your physical location context.' : 'Chagua eneo ulilopo kwa sasa.'}
          </p>

          <div className="space-y-4">
            <button
              onClick={() => { setVoterCategory('LOCAL'); setStep('ID_ENTRY'); }}
              className="w-full p-6 border-2 border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all flex items-center gap-4 group"
            >
              <div className="bg-slate-100 p-4 rounded-full group-hover:bg-green-200 text-slate-700 group-hover:text-green-800 transition-colors">
                <Home size={32} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-slate-900">{language === 'EN' ? 'Within Kenya' : 'Ndani ya Kenya'}</h3>
                <p className="text-xs text-slate-500">{language === 'EN' ? 'Voting at a local polling station' : 'Kupiga kura katika kituo cha nyumbani'}</p>
              </div>
            </button>

            <button
              onClick={() => { setVoterCategory('DIASPORA'); setStep('ID_ENTRY'); }}
              className="w-full p-6 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-4 group"
            >
              <div className="bg-slate-100 p-4 rounded-full group-hover:bg-blue-200 text-slate-700 group-hover:text-blue-800 transition-colors">
                <Globe size={32} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-slate-900">{language === 'EN' ? 'Diaspora (Abroad)' : 'Ughaibuni (Diaspora)'}</h3>
                <p className="text-xs text-slate-500">{language === 'EN' ? 'Voting from UK, US, UAE, etc.' : 'Kupiga kura kutoka nje ya nchi'}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 1.5: ID Entry (New)
  if (step === 'ID_ENTRY') {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 animate-in fade-in">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100 relative">
          <ToggleAudioBtn />
          <button
            onClick={() => setStep('CATEGORY')}
            className="text-xs text-slate-400 hover:text-slate-600 mb-4 flex items-center gap-1"
          >
            &larr; Back
          </button>

          <h2 className="text-2xl font-bold text-center mb-6 text-slate-900">
            {language === 'EN' ? 'Enter National ID' : 'Weka Kitambulisho'}
          </h2>

          {!voterDetails ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">National ID / Passport Number</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="e.g. 12345678"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-xl font-mono tracking-widest text-center"
                />
                {idError && <p className="text-red-500 text-sm mt-2 text-center">{idError}</p>}
              </div>

              <button
                onClick={handleIdVerify}
                disabled={isVerifyingId}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isVerifyingId ? 'Verifying...' : (language === 'EN' ? 'Verify Registration' : 'Hakiki Usajili')}
              </button>

              <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-700">
                <p><strong>Demo IDs:</strong> 12345678 (Nairobi), 87654321 (Mombasa), 11223344 (Kisumu)</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in zoom-in">
              <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Verified Successfully</h3>
                <p className="text-slate-600 mb-4">Welcome, <span className="font-bold">{voterDetails.fullName}</span></p>

                <div className="text-left bg-white p-4 rounded-lg border border-green-100 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Polling Station:</span>
                    <span className="font-bold text-slate-900">{voterDetails.pollingStation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Constituency:</span>
                    <span className="font-bold text-slate-900">{selectedConstituency?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">County:</span>
                    <span className="font-bold text-slate-900">{selectedCounty?.name}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={proceedFromId}
                className="w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200"
              >
                {language === 'EN' ? 'Continue' : 'Endelea'} <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Step 2: Location Details (Physical & Registration)
  // Only needed for Diaspora now, or if we want to show confirmation
  if (step === 'LOCATION_DETAILS') {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 animate-in fade-in">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100 relative">
          <ToggleAudioBtn />
          <button
            onClick={() => setStep('ID_ENTRY')}
            className="text-xs text-slate-400 hover:text-slate-600 mb-4 flex items-center gap-1"
          >
            &larr; Back
          </button>

          <h2 className="text-2xl font-bold text-center mb-2 text-slate-900">
            {language === 'EN' ? 'Confirm Location' : 'Thibitisha Mahali'}
          </h2>
          <p className="text-center text-slate-500 mb-8 text-sm">
            {language === 'EN'
              ? 'Confirm where your vote should be counted.'
              : 'Thibitisha mahali kura yako inapaswa kuhesabiwa.'}
          </p>

          <div className="space-y-6">
            {/* Diaspora Only: Select Country */}
            {voterCategory === 'DIASPORA' && (
              <div className="animate-in slide-in-from-top-2">
                <label className="block text-sm font-bold text-blue-700 mb-2 flex items-center gap-2">
                  <Globe size={16} /> Physical Location (Country)
                </label>
                <div className="relative">
                  <select
                    className="w-full p-4 bg-blue-50 border border-blue-200 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) => {
                      const loc = DIASPORA_LOCATIONS.find(c => c.id === e.target.value);
                      setDiasporaLocation(loc || null);
                    }}
                    value={diasporaLocation?.id || ''}
                  >
                    <option value="">-- Select Host Country --</option>
                    {DIASPORA_LOCATIONS.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-4 text-blue-400 pointer-events-none" size={20} />
                </div>
              </div>
            )}

            {/* Read Only View of Home County */}
            <div className="pt-4 border-t border-slate-100 opacity-75">
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Home size={16} /> Registered Home County (Locked)
              </label>
              <div className="w-full p-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-medium">
                {selectedCounty?.name} - {selectedConstituency?.name}
              </div>
            </div>

            <button
              onClick={() => setStep('METHOD')}
              disabled={voterCategory === 'DIASPORA' && !diasporaLocation}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2
                 ${(voterCategory === 'DIASPORA' && !diasporaLocation)
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-1'}`}
            >
              {language === 'EN' ? 'Proceed to Verification' : 'Endelea Kuhakiki'} <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Method Selection
  if (step === 'METHOD') {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 animate-in fade-in">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100 relative">
          <ToggleAudioBtn />
          <button
            onClick={() => setStep('LOCATION_DETAILS')}
            className="text-xs text-slate-400 hover:text-slate-600 mb-4 flex items-center gap-1"
          >
            &larr; Change Location
          </button>
          <h2 className="text-2xl font-bold text-center mb-2 text-slate-900">
            {language === 'EN' ? 'Voter Identification' : 'Utambulisho wa Mpiga Kura'}
          </h2>
          <p className="text-center text-slate-500 mb-6 text-sm">
            {language === 'EN'
              ? 'Verify your Huduma Namba identity securely.'
              : 'Thibitisha utambulisho wako wa Huduma Namba kwa usalama.'}
          </p>

          <div className="space-y-4">
            <button
              onClick={() => { setMethod('FACE'); startVerification(); }}
              className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all flex items-center gap-4 group"
            >
              <div className="bg-slate-100 p-3 rounded-full group-hover:bg-green-200 text-slate-700 group-hover:text-green-800">
                <ScanFace size={28} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900">Face ID Recognition</h3>
                <p className="text-xs text-slate-500">Scan face with camera (Recommended)</p>
              </div>
            </button>

            <button
              onClick={() => { setMethod('FINGERPRINT'); startVerification(); }}
              className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all flex items-center gap-4 group"
            >
              <div className="bg-slate-100 p-3 rounded-full group-hover:bg-green-200 text-slate-700 group-hover:text-green-800">
                <Fingerprint size={28} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900">Biometric Fingerprint</h3>
                <p className="text-xs text-slate-500">Use device sensor or manual code</p>
              </div>
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-1 items-center justify-center text-xs text-slate-400 bg-slate-50 p-3 rounded">
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>Home Registration: <span className="font-semibold text-slate-700">{selectedConstituency?.name}, {selectedCounty?.name}</span></span>
            </div>
            {voterCategory === 'DIASPORA' && (
              <div className="flex items-center gap-2 text-blue-500">
                <Globe size={12} />
                <span>Voting from: {diasporaLocation?.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Step 4: Verification Simulation
  if (step === 'VERIFY') {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center relative overflow-hidden border border-slate-100">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>

          <h2 className="text-xl font-bold mb-6 text-slate-900 flex items-center justify-center gap-2">
            {method === 'FACE' ? <ScanFace className="text-green-500" /> : <Fingerprint className="text-green-500" />}
            {language === 'EN' ? 'Verifying Identity...' : 'Inathibitisha Utambulisho...'}
          </h2>

          <div className="relative w-64 h-64 mx-auto bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner border-4 border-slate-200">
            {method === 'FACE' && !scanError ? (
              <>
                <video ref={videoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 border-2 border-green-500/30 rounded-xl m-8"></div>
                <div className="scan-line"></div>
                <div className="absolute bottom-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  Scanning Facial Points...
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535378437323-955a65957013?auto=format&fit=crop&w=400&q=60')] bg-cover opacity-40 grayscale"></div>
                <div className="scan-line"></div>
                <Fingerprint size={80} className={`${scanError ? 'text-red-400' : 'text-green-400'} animate-pulse relative z-10`} />
              </>
            )}
          </div>

          {scanError ? (
            <div className="mt-6 animate-in slide-in-from-bottom">
              <div className="flex items-center justify-center gap-2 text-amber-600 mb-4">
                <AlertTriangle size={18} />
                <span className="font-bold text-sm">Camera not detected</span>
              </div>
              <button
                onClick={() => { setMethod('FINGERPRINT'); setScanError(false); startVerification(); }}
                className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-slate-800"
              >
                Switch to Fingerprint
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-2">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 animate-[scan_3s_ease-in-out_infinite] w-full origin-left"></div>
              </div>
              <p className="text-xs text-slate-400 font-mono">Cross-referencing Huduma Namba DB...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Step 5: The Voting Loop (6-Piece Suit)
  if (step === 'BALLOT') {
    const currentPos = VOTING_SEQUENCE[currentPositionIndex];
    const config = BALLOT_CONFIG[currentPos];

    // --- FILTER LOGIC ---
    // Use the global candidates list (which updates dynamically) instead of the static constant
    const candidates = allCandidates.filter(c => {
      if (c.position !== currentPos) return false;
      if (c.regionId === 'national') return true;
      if (c.regionId === selectedCounty?.id) return true;
      if (c.regionId === selectedConstituency?.id) return true;
      return false;
    });

    const selectedId = selections[currentPos];

    return (
      <div className={`max-w-5xl mx-auto py-8 px-4 animate-in slide-in-from-right duration-500 ${config.color} min-h-[85vh] rounded-3xl mt-4 shadow-2xl relative`}>
        <ToggleAudioBtn />

        <div className="flex justify-between items-center mb-6 bg-white/50 p-4 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">
              BALLOT {currentPositionIndex + 1}/{VOTING_SEQUENCE.length}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Electoral Area</span>
              <span className="text-sm font-bold text-slate-900">
                {currentPos === 'PRESIDENT' ? 'The Republic of Kenya' :
                  (currentPos === 'MP' || currentPos === 'MCA') ? selectedConstituency?.name : selectedCounty?.name}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono text-slate-400">ID: 238***92 | Verified</div>
            {voterCategory === 'DIASPORA' && (
              <div className="text-[10px] text-blue-600 font-bold flex items-center justify-end gap-1">
                <Globe size={10} /> {diasporaLocation?.name}
              </div>
            )}
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-black mt-2 text-slate-900 uppercase tracking-tight">
            {config.label}
          </h2>
          <p className="text-slate-600 font-medium max-w-lg mx-auto mt-2">{config.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {candidates.length > 0 ? candidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => handleCandidateSelect(candidate.id)}
              className={`
                cursor-pointer rounded-2xl overflow-hidden border-2 transition-all transform duration-300 group relative bg-white
                ${selectedId === candidate.id
                  ? 'border-green-500 ring-4 ring-green-100 scale-105 shadow-2xl z-10'
                  : 'border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1'}
              `}
            >
              <div className="h-56 bg-slate-200 relative overflow-hidden">
                <img src={candidate.photoUrl} alt={candidate.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-black/20 transition-opacity ${selectedId === candidate.id ? 'opacity-0' : 'opacity-0 hover:opacity-10'}`}></div>

                {/* Party Color Strip */}
                <div className="absolute bottom-0 left-0 right-0 h-2" style={{ backgroundColor: candidate.color }}></div>

                {selectedId === candidate.id && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white p-1.5 rounded-full shadow-lg animate-in zoom-in">
                    <CheckCircle size={28} fill="currentColor" className="text-white" />
                  </div>
                )}
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{candidate.name}</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">{candidate.party}</p>

                {selectedId === candidate.id ? (
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">SELECTED</span>
                ) : (
                  <span className="inline-block text-slate-300 text-xs">Tap to Select</span>
                )}
              </div>
            </div>
          )) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-20 text-slate-400 bg-white/50 rounded-xl border border-dashed border-slate-300">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Edit3 size={32} className="text-slate-300" />
              </div>
              <p className="font-medium text-lg text-slate-600">No candidates listed.</p>
              <p className="text-sm mb-4">There are no contested seats for {config.label} in this region.</p>
              <button onClick={nextBallot} className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-700 transition-colors">Skip Position</button>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:relative md:bg-transparent md:border-0 md:shadow-none md:p-0 flex justify-center z-20">
          <button
            onClick={nextBallot}
            disabled={candidates.length > 0 && !selectedId}
            className={`
              py-4 px-20 rounded-full font-bold text-lg shadow-xl transition-all flex items-center gap-3 w-full md:w-auto justify-center
              ${(candidates.length === 0 || selectedId)
                ? 'bg-slate-900 text-white hover:bg-slate-800 transform hover:-translate-y-1'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
            `}
          >
            {currentPositionIndex === VOTING_SEQUENCE.length - 1 ? 'REVIEW BALLOT' : 'NEXT POSITION'}
            <ArrowRight size={24} />
          </button>
        </div>
        <div className="h-24 md:hidden"></div>
      </div>
    );
  }

  // Step 6: Review
  if (step === 'REVIEW') {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in">
        <h2 className="text-3xl font-bold mb-2 text-center text-slate-900">Review Your Choices</h2>
        <p className="text-center text-slate-500 mb-8">Please confirm your selections before submitting to the blockchain.</p>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          {VOTING_SEQUENCE.map((pos, idx) => {
            const selectedId = selections[pos];
            const candidate = allCandidates.find(c => c.id === selectedId);
            const config = BALLOT_CONFIG[pos];

            return (
              <div key={pos} className={`flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600 border ${config.color.replace('bg-', 'bg-white border-')}`}>
                    {config.label.substring(0, 3).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{config.label}</p>
                    <p className="font-bold text-slate-900 text-lg">{candidate ? candidate.name : 'No Selection'}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setCurrentPositionIndex(idx); setStep('BALLOT'); }}
                  className="text-slate-400 hover:text-green-600 p-2 flex items-center gap-1 text-sm font-medium"
                >
                  Change <Edit3 size={16} />
                </button>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => { setStep('CATEGORY'); }}
            className="px-6 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-100 flex items-center justify-center gap-2 border border-slate-200"
          >
            <RotateCcw size={20} /> Cancel / Restart
          </button>
          <button
            onClick={submitVotes}
            className="flex-grow md:flex-grow-0 px-12 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-200 flex items-center justify-center gap-3"
          >
            SUBMIT VOTE <Lock size={20} />
          </button>
        </div>
      </div>
    )
  }

  // Step 7: Submission Spinner
  if (step === 'SUBMITTING') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="relative">
          <div className="w-32 h-32 border-4 border-slate-100 border-t-green-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock className="text-green-500" size={40} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mt-8 text-slate-900">Encrypting Ballot</h3>
        <p className="text-slate-500 mt-2 text-center">Generating Zero-Knowledge Proofs for {selectedConstituency?.name}...</p>
        <div className="mt-8 bg-slate-900 text-green-400 font-mono text-xs p-4 rounded-lg max-w-xs w-full overflow-hidden">
          <p>{'>'} Initiating Smart Contract...</p>
          <p>{'>'} Validating Registration: {selectedCounty?.code}...</p>
          {voterCategory === 'DIASPORA' && <p className="text-blue-400">{'>'} Origin Node: {diasporaLocation?.id.toUpperCase()}...</p>}
          <p>{'>'} Hashing Selections...</p>
          <p className="animate-pulse">{'>'} Block Height: 12,401,291</p>
        </div>
      </div>
    );
  }

  // Step 8: Receipt
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 animate-in zoom-in duration-300">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border-t-8 border-green-500 relative">
        <div className="absolute -top-4 -left-4 text-yellow-400 animate-bounce">✨</div>
        <div className="absolute -top-4 -right-4 text-blue-400 animate-bounce delay-100">🎉</div>

        <div className="mx-auto bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <CheckCircle size={48} className="text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {language === 'EN' ? 'Vote Confirmed!' : 'Kura Imethibitishwa!'}
        </h2>
        <p className="text-gray-600 mb-6">Your ballot has been permanently recorded on the blockchain.</p>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-left mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5">
            <QrCode size={100} />
          </div>

          <p className="text-[10px] text-slate-400 uppercase font-bold mb-1 tracking-wider">Transaction Hash</p>
          <p className="font-mono text-xs break-all text-green-700 font-medium bg-green-50 p-1 rounded border border-green-100 mb-4">
            {receipt?.txHash}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Time</p>
              <p className="text-sm font-semibold text-slate-700">{new Date(receipt?.timestamp || 0).toLocaleTimeString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Registered Unit</p>
              <p className="text-sm font-semibold text-slate-700 truncate">{selectedConstituency?.name}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Voting Location</p>
              <p className="text-sm font-semibold text-slate-700">{receipt?.location}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <div className="bg-white p-2 rounded-lg shadow-lg border border-slate-100 group cursor-pointer">
            <QrCode size={140} className="text-slate-900 group-hover:opacity-80 transition-opacity" />
          </div>
        </div>
        <p className="text-xs text-center text-slate-400 mb-8">Scan to verify on public ledger explorer</p>

        <button
          onClick={onComplete}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};