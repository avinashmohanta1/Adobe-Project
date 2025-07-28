export const ADOBE_API_KEY = "21e48acd685d4229a56c738855a5cb43";

export const PDF_VIEWER_CONFIG = {
  embedMode: 'SIZED_CONTAINER',
  showDownloadPDF: true,
  showPrintPDF: true,
  showLeftHandPanel: true,
  showAnnotationTools: true,
  enableFormFilling: true,
  enablePageControls: true,
  enableSearchControl: true,
  focusOnRendering: true,
};

export const SUPPORTED_FILE_TYPES = {
  PDF: 'application/pdf',
};

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const PROCESSING_CONSTRAINTS = {
  MAX_EXECUTION_TIME: 10000, // 10 seconds
  MAX_MODEL_SIZE: 200 * 1024 * 1024, // 200MB
  CPU_CORES: 8,
  RAM_GB: 16,
};