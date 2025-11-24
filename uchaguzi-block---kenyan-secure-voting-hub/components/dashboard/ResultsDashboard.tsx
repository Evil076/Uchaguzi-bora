import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { AlertTriangle, RefreshCw, ShieldAlert } from 'lucide-react';
import { CANDIDATES } from '../../constants';
import { analyzeElectionIntegrity } from '../../services/geminiService';

export const ResultsDashboard: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  const totalVotes = CANDIDATES.reduce((acc, c) => acc + c.votes, 0);
  const data = CANDIDATES.map(c => ({
    name: c.name,
    votes: c.votes,
    fill: c.color
  }));

  const handleAnalysis = async () => {
    setAnalyzing(true);
    setAiReport(null);
    const report = await analyzeElectionIntegrity(data);
    setAiReport(report);
    setAnalyzing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Live Election Results (2027)</h1>
          <p className="text-slate-500">Real-time blockchain ledger aggregation.</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
          Live Updates Active
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-400 uppercase">Total Votes Cast</h3>
          <p className="text-2xl font-bold text-slate-900">{totalVotes.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-400 uppercase">Voter Turnout</h3>
          <p className="text-2xl font-bold text-slate-900">78.4%</p>
          <span className="text-xs text-green-600">↑ 12% from 2022</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-400 uppercase">Diaspora Participation</h3>
          <p className="text-2xl font-bold text-slate-900">142,000</p>
          <span className="text-xs text-green-600">Record High</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-400 uppercase">Rejected Ballots</h3>
          <p className="text-2xl font-bold text-slate-900">0.02%</p>
          <span className="text-xs text-green-600">Reduced by Smart UI</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Charts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Vote Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{fontSize: 12}} />
              <YAxis />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Bar dataKey="votes" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Integrity Check */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg flex flex-col">
          <div className="flex items-center gap-2 mb-6">
             <ShieldAlert className="text-yellow-400" />
             <h3 className="text-lg font-semibold">AI Fraud Detection System</h3>
          </div>
          
          <p className="text-slate-300 mb-6 flex-grow">
            Gemini AI analyzes transaction timestamps, geolocation patterns, and ledger velocity to detect anomalies like "ballot stuffing" or bot attacks in real-time.
          </p>

          {aiReport ? (
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mb-4 text-sm font-mono animate-in fade-in slide-in-from-bottom-2">
              <div className="flex justify-between items-center mb-2 border-b border-slate-700 pb-2">
                <span className="text-green-400 font-bold">REPORT GENERATED</span>
                <span className="text-xs text-slate-500">{new Date().toLocaleTimeString()}</span>
              </div>
              <p className="whitespace-pre-line leading-relaxed">{aiReport}</p>
            </div>
          ) : null}

          <button
            onClick={handleAnalysis}
            disabled={analyzing}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {analyzing ? <RefreshCw className="animate-spin" /> : <AlertTriangle size={18} />}
            {analyzing ? 'Running Diagnostics...' : 'Run Integrity Scan'}
          </button>
        </div>
      </div>
    </div>
  );
};