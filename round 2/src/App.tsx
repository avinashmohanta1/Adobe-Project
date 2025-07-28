import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, BookOpen, Brain, User, Target } from 'lucide-react';
import PDFViewer from './components/PDFViewer';
import OutlinePanel from './components/OutlinePanel';
import PersonaPanel from './components/PersonaPanel';
import { OutlineData, PersonaData } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'outline' | 'persona'>('outline');
  const [outlineData, setOutlineData] = useState<OutlineData | null>(null);
  const [personaData, setPersonaData] = useState<PersonaData | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string>('');

  useEffect(() => {
    // Load sample data (in production, this would come from your document processing pipeline)
    loadSampleData();
  }, []);

  const loadSampleData = async () => {
    try {
      // Sample outline data
      const sampleOutline: OutlineData = {
        title: "Tax Performance System Handbook",
        outline: [
          { level: "H1", text: "ET HANDBOOK NO. 407 TAX PERFORMANCE SYSTEM", page: 3 },
          { level: "H2", text: "FINDINGS AND CONCLUSIONS", page: 7 },
          { level: "H3", text: "Status Determinations", page: 7 },
          { level: "H3", text: "Cashiering Function", page: 7 },
          { level: "H3", text: "Report Delinquency", page: 8 },
          { level: "H3", text: "Collections Function", page: 8 },
          { level: "H3", text: "Field Audit Function", page: 9 },
          { level: "H3", text: "Account Maintenance", page: 9 },
          { level: "H2", text: "RECOMMENDATIONS", page: 10 },
          { level: "H3", text: "Global/Systemic and Miscellaneous", page: 11 }
        ]
      };

      // Sample persona data
      const samplePersona: PersonaData = {
        metadata: {
          input_documents: ["annual_report.pdf"],
          persona: "Investment Analyst",
          job_to_be_done: "Analyze revenue trends, R&D investments, and market positioning strategies",
          processing_timestamp: new Date().toISOString()
        },
        extracted_sections: [
          {
            document: "annual_report.pdf",
            page_number: 7,
            section_title: "FINDINGS AND CONCLUSIONS",
            importance_rank: 1
          },
          {
            document: "annual_report.pdf",
            page_number: 8,
            section_title: "Collections Function Analysis",
            importance_rank: 2
          },
          {
            document: "annual_report.pdf",
            page_number: 9,
            section_title: "Field Audit Function Performance",
            importance_rank: 3
          }
        ]
      };

      setOutlineData(sampleOutline);
      setPersonaData(samplePersona);
    } catch (error) {
      console.error('Error loading sample data:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    }
  };

  const filteredOutline = outlineData?.outline.filter(item =>
    searchQuery === '' || 
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredSections = personaData?.extracted_sections.filter(section =>
    searchQuery === '' || 
    section.section_title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-lg bg-slate-900/80">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  PDF Intelligence Reader
                </h1>
                <p className="text-sm text-slate-400">Connecting the dots through documents</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="pdf-upload"
                />
                <label
                  htmlFor="pdf-upload"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-white font-medium cursor-pointer hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Upload PDF</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-lg flex flex-col">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-700/50">
            <button
              onClick={() => setActiveTab('outline')}
              className={`flex-1 px-4 py-3 flex items-center justify-center space-x-2 transition-all duration-200 ${
                activeTab === 'outline'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="font-medium">Outline</span>
            </button>
            <button
              onClick={() => setActiveTab('persona')}
              className={`flex-1 px-4 py-3 flex items-center justify-center space-x-2 transition-all duration-200 ${
                activeTab === 'persona'
                  ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 border-b-2 border-emerald-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span className="font-medium">Intelligence</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-slate-700/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search sections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200"
              />
            </div>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'outline' ? (
              <OutlinePanel
                outline={filteredOutline}
                selectedSection={selectedSection}
                onSectionSelect={setSelectedSection}
              />
            ) : (
              <PersonaPanel
                personaData={personaData}
                filteredSections={filteredSections}
                selectedSection={selectedSection}
                onSectionSelect={setSelectedSection}
              />
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <PDFViewer
            pdfUrl={pdfUrl}
            selectedSection={selectedSection}
            outlineData={outlineData}
            personaData={personaData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;