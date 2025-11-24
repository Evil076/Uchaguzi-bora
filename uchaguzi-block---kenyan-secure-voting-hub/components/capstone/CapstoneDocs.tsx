import React, { useState } from 'react';
import { CAPSTONE_CONTENT, PERSONAS } from '../../constants';
import { User, BookOpen, Layout, CheckSquare, Eye, FileText } from 'lucide-react';

export const CapstoneDocs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview & Problem', icon: FileText },
    { id: 'personas', label: 'Personas & Flow', icon: User },
    { id: 'heuristics', label: 'Heuristic Eval', icon: CheckSquare },
    { id: 'testing', label: 'Usability & A11y', icon: Eye },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">HCI Capstone Project: Uchaguzi Block</h1>
        <p className="text-slate-600 mt-2">Course: HCI-BIT 316 | Student Project Compilation</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 shrink-0 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all
                ${activeTab === tab.id 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <tab.icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white p-8 rounded-xl shadow-sm border border-slate-200 min-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold border-b pb-4">Project Overview</h2>
              <div className="prose max-w-none text-slate-700">
                <p><strong>Context:</strong> Designed for the Kenyan 2027 General Elections and upcoming by-elections.</p>
                <p><strong>Core Problem:</strong> Lack of trust in manual tallies, exclusion of diaspora voters (3M+), and accessibility barriers for rural populations.</p>
                <p><strong>Proposed Solution:</strong> A hybrid mobile/web platform using blockchain for immutable vote recording and AI for real-time anomaly detection. The design adheres to a "Mobile-First" approach given Kenya's 98% mobile penetration.</p>
                
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-4">
                  <h3 className="font-bold text-blue-900">Design Philosophy</h3>
                  <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
                    <li><strong>Trust through Transparency:</strong> Every voter gets a transaction hash (receipt).</li>
                    <li><strong>Radical Inclusivity:</strong> Interfaces designed for low-literacy (icon-heavy, voice support).</li>
                    <li><strong>Scalability:</strong> Serverless architecture handling millions of concurrent requests.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'personas' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold border-b pb-4">User Personas & Task Flow</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {PERSONAS.map((persona, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center font-bold text-xl">
                        {persona.name[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{persona.name}</h3>
                        <p className="text-sm text-slate-500">{persona.role}</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p><strong>Context:</strong> {persona.context}</p>
                      <p><strong>Goal:</strong> {persona.goal}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">Task Flow Diagram (Remote Voting)</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span className="bg-green-100 px-3 py-1 rounded border border-green-200">Login (Biometric)</span>
                  <span>→</span>
                  <span className="bg-green-100 px-3 py-1 rounded border border-green-200">Select Ballot Type</span>
                  <span>→</span>
                  <span className="bg-green-100 px-3 py-1 rounded border border-green-200">Choose Candidate</span>
                  <span>→</span>
                  <span className="bg-green-100 px-3 py-1 rounded border border-green-200">Review Selection</span>
                  <span>→</span>
                  <span className="bg-slate-800 text-white px-3 py-1 rounded">Sign & Submit (Blockchain)</span>
                  <span>→</span>
                  <span className="bg-green-100 px-3 py-1 rounded border border-green-200">Download Receipt</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'heuristics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold border-b pb-4">Heuristic Evaluation (Nielsen)</h2>
              <p className="text-slate-600 mb-4">Analysis of the current IEBC portal vs. Uchaguzi Block Prototype.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold">
                    <tr>
                      <th className="px-4 py-3">Heuristic</th>
                      <th className="px-4 py-3">Issue in Current System</th>
                      <th className="px-4 py-3">Uchaguzi Solution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-3 font-medium">Visibility of Status</td>
                      <td className="px-4 py-3 text-red-600">Unclear loading states; session timeouts without warning.</td>
                      <td className="px-4 py-3 text-green-600">Progress bars (Step 1/4); Skeleton loaders during blockchain sync.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Match Real World</td>
                      <td className="px-4 py-3 text-red-600">Uses legal jargon ("Statutory Instrument 4").</td>
                      <td className="px-4 py-3 text-green-600">Simple language ("Vote", "Receipt", "Candidate").</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Error Prevention</td>
                      <td className="px-4 py-3 text-red-600">Allows submitting incomplete forms.</td>
                      <td className="px-4 py-3 text-green-600">Disabled "Cast Vote" button until candidate selected.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'testing' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold border-b pb-4">Usability & Accessibility</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Usability Testing Report</h3>
                  <ul className="list-disc ml-5 text-sm text-slate-700 space-y-2">
                    <li><strong>Participants:</strong> 5 (2 Students, 1 Elderly, 2 Diaspora).</li>
                    <li><strong>Success Rate:</strong> 100% completed voting within 3 minutes.</li>
                    <li><strong>Feedback:</strong> "The receipt QR code makes me feel safer knowing I can check it later."</li>
                    <li><strong>Iteration:</strong> Increased font size on candidate cards based on elderly feedback.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Accessibility Audit (WCAG 2.1)</h3>
                  <ul className="list-disc ml-5 text-sm text-slate-700 space-y-2">
                    <li><strong>Contrast:</strong> All text meets AA standard (4.5:1 ratio).</li>
                    <li><strong>Keyboard:</strong> Full tab navigation support implemented.</li>
                    <li><strong>Screen Readers:</strong> ARIA labels added to all icon-only buttons.</li>
                    <li><strong>Language:</strong> One-tap Swahili toggle available globally.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};