import React, { useState } from 'react';
import { CAPSTONE_CONTENT, PERSONAS } from '../../constants';
import { User, BookOpen, Layout, CheckSquare, Eye, FileText, Shield, Smartphone } from 'lucide-react';

export const CapstoneDocs: React.FC = () => {
  const [activeId, setActiveId] = useState(CAPSTONE_CONTENT[0].id);

  const activeContent = CAPSTONE_CONTENT.find(c => c.id === activeId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-slate-900 text-white p-2 rounded-lg">
            <BookOpen size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">HCI Capstone: Uchaguzi Block</h1>
        </div>
        <p className="text-slate-600">Course: HCI-BIT 316/COMP 401 | Final Project Deliverables</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-72 shrink-0 space-y-2">
          {CAPSTONE_CONTENT.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveId(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all border
                ${activeId === section.id 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                  : 'bg-white text-slate-600 border-transparent hover:bg-slate-100 hover:border-slate-200'}`}
            >
              {section.id.includes('overview') && <Shield size={18} />}
              {section.id.includes('observation') && <Eye size={18} />}
              {section.id.includes('heuristics') && <CheckSquare size={18} />}
              {section.id.includes('wireframes') && <Layout size={18} />}
              {section.id.includes('testing') && <Smartphone size={18} />}
              <span className="font-medium text-sm">{section.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white p-8 rounded-xl shadow-sm border border-slate-200 min-h-[60vh]">
          {activeContent && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold border-b pb-4 mb-6">{activeContent.title}</h2>
              
              {/* Text Content Rendering */}
              <div className="prose max-w-none text-slate-700 mb-8">
                {activeContent.content.split('\n').map((line, i) => {
                  if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-slate-900 mt-6 mb-3">{line.replace('### ', '')}</h3>;
                  if (line.startsWith('**')) return <p key={i} className="font-bold mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
                  if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc mb-1">{line.replace('- ', '')}</li>;
                  if (line.startsWith('* ')) return <li key={i} className="ml-4 list-disc mb-1">{line.replace('* ', '')}</li>;
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} className="mb-2 leading-relaxed">{line}</p>;
                })}
              </div>

              {/* Special Render for Personas if applicable (Optional enhancement based on ID) */}
              {activeContent.id.includes('overview') && (
                <div className="grid md:grid-cols-2 gap-4 mt-8 pt-8 border-t">
                  {PERSONAS.map((persona, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
                          {persona.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{persona.name}</h4>
                          <p className="text-xs text-slate-500">{persona.role}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 italic">"{persona.goal}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};