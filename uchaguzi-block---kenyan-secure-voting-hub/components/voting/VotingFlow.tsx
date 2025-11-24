import React, { useState, useEffect } from 'react';
import { Camera, Fingerprint, CheckCircle, Loader2, QrCode } from 'lucide-react';
import { CANDIDATES } from '../../constants';
import { Candidate, VoteRecord } from '../../types';

interface VotingFlowProps {
  onComplete: () => void;
  language: 'EN' | 'SW';
}

export const VotingFlow: React.FC<VotingFlowProps> = ({ onComplete, language }) => {
  const [step, setStep] = useState<'VERIFY' | 'BALLOT' | 'SUBMITTING' | 'RECEIPT'>('VERIFY');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [receipt, setReceipt] = useState<VoteRecord | null>(null);

  // Mock Biometric Scan
  const startVerification = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setStep('BALLOT');
    }, 3000);
  };

  const castVote = () => {
    if (!selectedCandidate) return;
    setStep('SUBMITTING');
    
    // Simulate Blockchain Transaction
    setTimeout(() => {
      const txHash = "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
      setReceipt({
        txHash,
        timestamp: Date.now(),
        candidateId: selectedCandidate.id,
        location: 'Nairobi - Embakasi East (Virtual)'
      });
      setStep('RECEIPT');
    }, 2000);
  };

  if (step === 'VERIFY') {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center relative overflow-hidden">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'EN' ? 'Identity Verification' : 'Uthibitishaji wa Kitambulisho'}
          </h2>
          <p className="text-gray-600 mb-8">
            {language === 'EN' 
              ? 'Please look at the camera for facial recognition and biometric match.' 
              : 'Tafadhali angalia kamera kwa utambuzi wa uso.'}
          </p>
          
          <div className="relative w-64 h-64 mx-auto bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-slate-300">
            {isScanning ? (
              <>
                <video autoPlay loop muted className="absolute w-full h-full object-cover opacity-50">
                  {/* Fallback if no camera permission or just simulation */}
                  <source src="" type="video/mp4" />
                </video>
                <div className="scan-line"></div>
                <p className="text-green-700 font-mono z-20 bg-white/80 px-2 rounded">Scanning ID: 2491...</p>
              </>
            ) : (
               <Fingerprint size={64} className="text-slate-400" />
            )}
          </div>

          <button
            onClick={startVerification}
            disabled={isScanning}
            className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isScanning ? (
              <>
                <Loader2 className="animate-spin" /> 
                Verifying...
              </>
            ) : (
              <>
                <Camera />
                {language === 'EN' ? 'Start Scan' : 'Anza Kutambua'}
              </>
            )}
          </button>
          
          <div className="mt-4 text-xs text-slate-500 flex items-center justify-center gap-1">
            <CheckCircle size={12} className="text-green-500" />
            Connected to IEBC Database (Secure)
          </div>
        </div>
      </div>
    );
  }

  if (step === 'BALLOT') {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">
          {language === 'EN' ? 'Presidential Ballot 2027' : 'Kura ya Urais 2027'}
        </h2>
        <p className="text-center text-gray-600 mb-8">Select your preferred candidate. Your vote is anonymous.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CANDIDATES.map((candidate) => (
            <div 
              key={candidate.id}
              onClick={() => setSelectedCandidate(candidate)}
              className={`
                cursor-pointer rounded-xl overflow-hidden border-2 transition-all transform hover:scale-105
                ${selectedCandidate?.id === candidate.id ? 'border-green-500 ring-4 ring-green-100 shadow-2xl' : 'border-transparent shadow-lg bg-white'}
              `}
            >
              <div className="h-48 bg-slate-200 relative">
                <img src={candidate.photoUrl} alt={candidate.name} className="w-full h-full object-cover" />
                <div className="absolute top-0 right-0 p-2">
                   {selectedCandidate?.id === candidate.id && <CheckCircle className="text-green-500 bg-white rounded-full" size={32} />}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">{candidate.name}</h3>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{candidate.party}</p>
                <div className="mt-4 h-2 w-full rounded-full" style={{ backgroundColor: candidate.color }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={castVote}
            disabled={!selectedCandidate}
            className={`
              py-4 px-12 rounded-full font-bold text-lg shadow-xl transition-all
              ${selectedCandidate 
                ? 'bg-slate-900 text-white hover:bg-slate-800 transform hover:-translate-y-1' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
            `}
          >
            {language === 'EN' ? 'CAST SECURE VOTE' : 'PIGA KURA SALAMA'}
          </button>
        </div>
      </div>
    );
  }

  if (step === 'SUBMITTING') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 size={64} className="animate-spin text-green-600 mb-4" />
        <h3 className="text-xl font-semibold">Encrypting Vote...</h3>
        <p className="text-slate-500">Writing to Immutable Ledger</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-t-8 border-green-500">
        <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {language === 'EN' ? 'Vote Confirmed!' : 'Kura Imethibitishwa!'}
        </h2>
        <p className="text-gray-600 mb-6">Your vote has been permanently recorded on the blockchain.</p>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-left mb-6">
          <p className="text-xs text-slate-400 uppercase font-bold mb-1">Transaction Hash</p>
          <p className="font-mono text-xs break-all text-slate-600">{receipt?.txHash}</p>
          
          <div className="flex justify-between mt-4">
             <div>
                <p className="text-xs text-slate-400 uppercase font-bold">Timestamp</p>
                <p className="text-sm font-mono">{new Date(receipt?.timestamp || 0).toLocaleTimeString()}</p>
             </div>
             <div>
                <p className="text-xs text-slate-400 uppercase font-bold">Location</p>
                <p className="text-sm font-mono">Digital/Remote</p>
             </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
            <QrCode size={128} className="text-slate-800" />
        </div>
        <p className="text-xs text-center text-slate-400 mb-6">Scan to verify on public ledger explorer</p>

        <button
          onClick={onComplete}
          className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};