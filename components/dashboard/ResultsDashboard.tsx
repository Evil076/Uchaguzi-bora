import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { RefreshCw, ShieldAlert, Activity, TrendingUp, Database, Filter } from 'lucide-react';
import { DEMOGRAPHICS_DATA, VOTING_TRENDS, BALLOT_CONFIG, KENYAN_LOCATIONS } from '../../constants';
import { analyzeElectionIntegrity } from '../../services/geminiService';
import { Position, Candidate } from '../../types';

interface ResultsDashboardProps {
  candidates?: Candidate[];
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ candidates = [] }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position>('PRESIDENT');

  // --- REGION FILTERS ---
  // Default to national (null) or first county
  const [filterCountyId, setFilterCountyId] = useState<string>('county_047'); // Default Nairobi
  const [filterConstituencyId, setFilterConstituencyId] = useState<string>('');

  // Reset filters when position changes type
  useEffect(() => {
    if (selectedPosition === 'PRESIDENT') {
      // No filters needed for President
    } else if (['GOVERNOR', 'SENATOR', 'WOMAN_REP'].includes(selectedPosition)) {
       // Reset constituency, keep county
       setFilterConstituencyId('');
    } else {
       // Need both, ensure a constituency is selected if county is present
       if (filterCountyId && !filterConstituencyId) {
         const county = KENYAN_LOCATIONS.find(c => c.id === filterCountyId);
         if (county && county.constituencies.length > 0) {
           setFilterConstituencyId(county.constituencies[0].id);
         }
       }
    }
  }, [selectedPosition, filterCountyId]);

  // --- FILTERING LOGIC ---
  let filteredCandidates = candidates.filter(c => c.position === selectedPosition);
  
  if (selectedPosition === 'PRESIDENT') {
     // Show all presidential candidates
  } else if (['GOVERNOR', 'SENATOR', 'WOMAN_REP'].includes(selectedPosition)) {
     // Filter by County
     if (filterCountyId) {
       filteredCandidates = filteredCandidates.filter(c => c.regionId === filterCountyId);
     }
  } else {
     // Filter by Constituency (MP, MCA)
     if (filterConstituencyId) {
       filteredCandidates = filteredCandidates.filter(c => c.regionId === filterConstituencyId);
     } else if (filterCountyId) {
       // If no constituency selected but county is, maybe show all in county? 
       // Better to force constituency selection for graph clarity, but let's show all valid for county's constituencies
       const county = KENYAN_LOCATIONS.find(c => c.id === filterCountyId);
       const constIds = county?.constituencies.map(c => c.id) || [];
       filteredCandidates = filteredCandidates.filter(c => constIds.includes(c.regionId));
     }
  }
  
  const totalVotes = filteredCandidates.reduce((acc, c) => acc + c.votes, 0);
  
  // Find winner
  const winner = filteredCandidates.length > 0 
    ? filteredCandidates.reduce((prev, current) => (prev.votes > current.votes) ? prev : current)
    : null;

  const chartData = filteredCandidates.map(c => ({
    name: c.name,
    votes: c.votes,
    fill: c.color,
    party: c.party
  }));

  const handleAnalysis = async () => {
    setAnalyzing(true);
    setAiReport(null);
    const report = await analyzeElectionIntegrity(chartData);
    setAiReport(report);
    setAnalyzing(false);
  };

  const tabs: { id: Position; label: string }[] = Object.entries(BALLOT_CONFIG).map(([key, config]) => ({
      id: key as Position,
      label: config.label
  }));

  // Helper to get County Name
  const selectedCountyName = KENYAN_LOCATIONS.find(c => c.id === filterCountyId)?.name || 'Select County';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Live Election Results (2027)</h1>
          <p className="text-slate-500">Real-time blockchain ledger aggregation.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium border border-green-200 animate-fade-in">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
          Live Updates: BLOCK #89214
        </div>
      </div>

      {/* Blockchain Ticker */}
      <div className="bg-slate-900 text-green-400 p-2 rounded-lg mb-6 overflow-hidden flex items-center gap-4 text-xs font-mono border border-slate-700 shadow-inner">
         <Database size={14} className="shrink-0" />
         <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] flex gap-8">
           <span>0x8a...92f1 TX_CONFIRMED [Nairobi]</span>
           <span>0x7b...11a4 TX_CONFIRMED [Kisumu]</span>
           <span>0x3c...55b2 TX_CONFIRMED [Diaspora-UK]</span>
           <span>0x1d...88c9 TX_CONFIRMED [Mombasa]</span>
           <span>0x9e...22d5 TX_CONFIRMED [Nakuru]</span>
           <span>0x4f...00e3 TX_CONFIRMED [Nyeri]</span>
           <span>0x2a...44f8 TX_CONFIRMED [Eldoret]</span>
         </div>
      </div>

      {/* Position Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-4 gap-2 no-scrollbar">
         {tabs.map(tab => (
           <button
             key={tab.id}
             onClick={() => setSelectedPosition(tab.id)}
             className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0
               ${selectedPosition === tab.id 
                 ? 'bg-slate-900 text-white shadow-md' 
                 : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
           >
             {tab.label}
           </button>
         ))}
      </div>

      {/* Dynamic Filters (Correctness Fix) */}
      {selectedPosition !== 'PRESIDENT' && (
        <div className="bg-slate-100 p-4 rounded-xl mb-6 flex flex-wrap gap-4 items-center animate-in slide-in-from-top-2 border border-slate-200">
           <div className="flex items-center gap-2 text-slate-500 text-sm font-bold uppercase tracking-wider">
             <Filter size={16} /> Filters:
           </div>
           
           {/* County Select */}
           <select 
             value={filterCountyId}
             onChange={(e) => { setFilterCountyId(e.target.value); setFilterConstituencyId(''); }}
             className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm focus:ring-2 focus:ring-green-500 outline-none min-w-[200px]"
           >
             {KENYAN_LOCATIONS.map(c => (
               <option key={c.id} value={c.id}>{c.name}</option>
             ))}
           </select>

           {/* Constituency Select (Only for MP/MCA) */}
           {['MP', 'MCA'].includes(selectedPosition) && (
             <select 
               value={filterConstituencyId}
               onChange={(e) => setFilterConstituencyId(e.target.value)}
               className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm focus:ring-2 focus:ring-green-500 outline-none min-w-[200px]"
             >
               {filterCountyId 
                 ? KENYAN_LOCATIONS.find(c => c.id === filterCountyId)?.constituencies.map(cons => (
                     <option key={cons.id} value={cons.id}>{cons.name}</option>
                   ))
                 : <option value="">Select County First</option>
               }
             </select>
           )}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Votes</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalVotes.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Turnout</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">78.4%</p>
          <span className="text-xs text-green-600 font-medium">↑ 12% from 2022</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 bg-green-50 border-green-100">
           <h3 className="text-xs font-bold text-green-700 uppercase tracking-wider">Leading Candidate</h3>
           {winner ? (
             <div>
               <p className="text-lg font-bold text-slate-900 mt-1 truncate">{winner.name}</p>
               <p className="text-xs text-slate-500 font-bold uppercase">{winner.party}</p>
             </div>
           ) : (
             <p className="text-sm text-slate-400 mt-2">No data available</p>
           )}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Incidents</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">0</p>
          <span className="text-xs text-green-600 font-medium">System Secure</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Activity size={20} className="text-slate-400" />
            {BALLOT_CONFIG[selectedPosition].label} Results
            {selectedPosition !== 'PRESIDENT' && (
              <span className="text-sm font-normal text-slate-400 ml-2">
                — {['MP', 'MCA'].includes(selectedPosition) 
                     ? (KENYAN_LOCATIONS.find(c => c.id === filterCountyId)?.constituencies.find(k => k.id === filterConstituencyId)?.name || selectedCountyName) 
                     : selectedCountyName}
              </span>
            )}
          </h3>
          
          {filteredCandidates.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [value.toLocaleString(), 'Votes']}
                />
                <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
                   {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                   ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-50 rounded-lg border border-dashed">
               Please select a valid {selectedPosition === 'MP' || selectedPosition === 'MCA' ? 'Constituency' : 'County'} to view results.
            </div>
          )}
        </div>

        {/* Demographics Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-4">Votes by Region</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DEMOGRAPHICS_DATA}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DEMOGRAPHICS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '8px'}} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend Line Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-slate-400" />
            Voting Velocity (Votes per Hour)
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={VOTING_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="votes" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Integrity Section */}
      <div className="mt-8 bg-slate-900 text-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="flex items-center gap-2 mb-4">
             <ShieldAlert className="text-yellow-400" size={28} />
             <h3 className="text-xl font-semibold">AI Fraud Detection</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            Gemini AI analyzes transaction timestamps, geolocation patterns, and ledger velocity to detect anomalies like "ballot stuffing" or bot attacks in real-time.
          </p>
          
          <button
            onClick={handleAnalysis}
            disabled={analyzing}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {analyzing ? <RefreshCw className="animate-spin" /> : <Activity size={18} />}
            {analyzing ? 'Running Diagnostics...' : 'Run Integrity Scan'}
          </button>
        </div>

        <div className="md:w-2/3 bg-slate-800/50 rounded-lg p-4 border border-slate-700 min-h-[150px]">
          {aiReport ? (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <div className="flex justify-between items-center mb-3 border-b border-slate-700 pb-2">
                <span className="text-green-400 font-bold text-xs tracking-wider">ANALYSIS REPORT COMPLETE</span>
                <span className="text-xs text-slate-500 font-mono">{new Date().toLocaleTimeString()}</span>
              </div>
              <p className="text-sm text-slate-200 whitespace-pre-line font-mono leading-relaxed">{aiReport}</p>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
              System Ready. Waiting for manual trigger to scan blockchain ledger...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};