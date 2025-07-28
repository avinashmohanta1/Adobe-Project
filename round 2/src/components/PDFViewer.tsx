import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Loader, Upload, Zap } from 'lucide-react';
import { OutlineData, PersonaData } from '../types';

interface PDFViewerProps {
  pdfUrl: string;
  selectedSection: string | null;
  outlineData: OutlineData | null;
  personaData: PersonaData | null;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ 
  pdfUrl, 
  selectedSection, 
  outlineData, 
  personaData 
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adobeAPI, setAdobeAPI] = useState<any>(null);

  const ADOBE_API_KEY = "21e48acd685d4229a56c738855a5cb43";

  useEffect(() => {
    loadAdobeAPI();
  }, []);

  useEffect(() => {
    if (pdfUrl && adobeAPI) {
      loadPDF();
    }
  }, [pdfUrl, adobeAPI]);

  const loadAdobeAPI = () => {
    if (window.AdobeDC) {
      setAdobeAPI(window.AdobeDC);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://acrobatservices.adobe.com/view-sdk/viewer.js';
    script.onload = () => {
      setAdobeAPI(window.AdobeDC);
    };
    script.onerror = () => {
      setError('Failed to load Adobe PDF Embed API');
    };
    document.head.appendChild(script);
  };

  const loadPDF = async () => {
    if (!viewerRef.current || !adobeAPI) return;

    setIsLoading(true);
    setError(null);

    try {
      // Clear previous content
      viewerRef.current.innerHTML = '';

      const adobeDCView = new adobeAPI.View({
        clientId: ADOBE_API_KEY,
        divId: 'pdf-viewer-container',
      });

      adobeDCView.previewFile({
        content: { location: { url: pdfUrl } },
        metaData: { fileName: 'document.pdf' }
      }, {
        embedMode: 'SIZED_CONTAINER',
        showDownloadPDF: true,
        showPrintPDF: true,
        showLeftHandPanel: true,
        showAnnotationTools: true,
        enableFormFilling: true,
        enablePageControls: true,
        enableSearchControl: true,
        focusOnRendering: true,
      });

      setIsLoading(false);
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError('Failed to load PDF. Please check the file format.');
      setIsLoading(false);
    }
  };

  if (!pdfUrl) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-800/30">
        <div className="text-center space-y-6 max-w-md mx-auto px-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
            <Upload className="w-12 h-12 text-cyan-400" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white">
              Welcome to PDF Intelligence Reader
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Upload a PDF document to begin your intelligent reading experience. 
              Our system will analyze the document structure and provide persona-driven insights.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <Zap className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-slate-300">Real-time document outline extraction</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <Zap className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span className="text-slate-300">Persona-driven content prioritization</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <Zap className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <span className="text-slate-300">Intelligent section highlighting</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-800/30">
      {/* PDF Viewer Header */}
      <div className="px-6 py-3 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="font-semibold text-white">
              {outlineData?.title || 'PDF Document'}
            </h2>
            {selectedSection && (
              <span className="px-2 py-1 text-xs bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
                Section: {selectedSection}
              </span>
            )}
          </div>
          
          {personaData && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-slate-400">Persona:</span>
              <span className="text-emerald-400 font-medium">
                {personaData.metadata.persona}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* PDF Viewer Content */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-10">
            <div className="flex items-center space-x-3 text-cyan-400">
              <Loader className="w-6 h-6 animate-spin" />
              <span className="font-medium">Loading PDF...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-10">
            <div className="flex items-center space-x-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <div
          ref={viewerRef}
          id="pdf-viewer-container"
          className="w-full h-full"
          style={{ minHeight: '500px' }}
        />
      </div>
    </div>
  );
};

export default PDFViewer;