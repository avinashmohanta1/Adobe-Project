import React from 'react';
import { User, Target, Calendar, Star, Trophy, Brain } from 'lucide-react';
import { PersonaData, ExtractedSection } from '../types';

interface PersonaPanelProps {
  personaData: PersonaData | null;
  filteredSections: ExtractedSection[];
  selectedSection: string | null;
  onSectionSelect: (section: string) => void;
}

const PersonaPanel: React.FC<PersonaPanelProps> = ({
  personaData,
  filteredSections,
  selectedSection,
  onSectionSelect,
}) => {
  if (!personaData) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <Brain className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-slate-400 text-sm">
            No persona analysis available
          </p>
          <p className="text-slate-500 text-xs">
            Process documents with persona-driven intelligence
          </p>
        </div>
      </div>
    );
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 2: return 'text-orange-400 bg-orange-400/20 border-orange-400/30';
      case 3: return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/30';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-3 h-3" />;
    return <Star className="w-3 h-3" />;
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Persona Info */}
      <div className="p-4 border-b border-slate-700/50 bg-slate-800/30">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-white">Persona</span>
          </div>
          <p className="text-emerald-400 font-medium text-sm">
            {personaData.metadata.persona}
          </p>
          
          <div className="flex items-start space-x-2 mt-3">
            <Target className="w-4 h-4 text-cyan-400 mt-0.5" />
            <div>
              <span className="text-sm font-medium text-white block mb-1">Objective</span>
              <p className="text-cyan-400 text-xs leading-relaxed">
                {personaData.metadata.job_to_be_done}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Calendar className="w-3 h-3" />
            <span>
              Processed: {new Date(personaData.metadata.processing_timestamp).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Extracted Sections */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
          <Brain className="w-4 h-4 text-purple-400" />
          <span>Priority Sections</span>
        </h3>
        
        {filteredSections.map((section, index) => {
          const isSelected = selectedSection === section.section_title;
          
          return (
            <button
              key={index}
              onClick={() => onSectionSelect(section.section_title)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30'
                  : 'hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 px-2 py-1 rounded-full border text-xs font-medium flex items-center space-x-1 ${getRankColor(section.importance_rank)}`}>
                  {getRankIcon(section.importance_rank)}
                  <span>#{section.importance_rank}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${
                    isSelected ? 'text-emerald-300' : 'text-white group-hover:text-emerald-400'
                  } transition-colors duration-200`}>
                    {section.section_title}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-slate-500">
                      {section.document}
                    </span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-500">
                      Page {section.page_number}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PersonaPanel;