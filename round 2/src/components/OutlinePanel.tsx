import React from 'react';
import { ChevronRight, Hash, FileText } from 'lucide-react';
import { OutlineItem } from '../types';

interface OutlinePanelProps {
  outline: OutlineItem[];
  selectedSection: string | null;
  onSectionSelect: (section: string) => void;
}

const OutlinePanel: React.FC<OutlinePanelProps> = ({
  outline,
  selectedSection,
  onSectionSelect,
}) => {
  const getIndentLevel = (level: string) => {
    switch (level) {
      case 'H1': return 0;
      case 'H2': return 1;
      case 'H3': return 2;
      default: return 0;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'H1': return <Hash className="w-4 h-4 text-cyan-400" />;
      case 'H2': return <Hash className="w-3 h-3 text-blue-400" />;
      case 'H3': return <Hash className="w-3 h-3 text-slate-400" />;
      default: return <Hash className="w-4 h-4 text-slate-400" />;
    }
  };

  const getLevelTextSize = (level: string) => {
    switch (level) {
      case 'H1': return 'text-sm font-semibold';
      case 'H2': return 'text-sm font-medium';
      case 'H3': return 'text-xs font-normal';
      default: return 'text-sm';
    }
  };

  if (outline.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <FileText className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-slate-400 text-sm">
            No outline data available
          </p>
          <p className="text-slate-500 text-xs">
            Upload a PDF to see the document structure
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-1">
        {outline.map((item, index) => {
          const indentLevel = getIndentLevel(item.level);
          const isSelected = selectedSection === item.text;
          
          return (
            <button
              key={index}
              onClick={() => onSectionSelect(item.text)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30'
                  : 'hover:bg-slate-800/50 border border-transparent'
              }`}
              style={{ paddingLeft: `${12 + indentLevel * 16}px` }}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getLevelIcon(item.level)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`${getLevelTextSize(item.level)} ${
                    isSelected ? 'text-cyan-300' : 'text-white group-hover:text-cyan-400'
                  } transition-colors duration-200`}>
                    {item.text}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-slate-500">
                      Page {item.page}
                    </span>
                    {isSelected && (
                      <ChevronRight className="w-3 h-3 text-cyan-400" />
                    )}
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

export default OutlinePanel;