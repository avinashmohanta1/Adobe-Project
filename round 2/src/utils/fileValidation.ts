import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from './constants';

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export function validatePDFFile(file: File): FileValidationResult {
  // Check file type
  if (file.type !== SUPPORTED_FILE_TYPES.PDF) {
    return {
      isValid: false,
      error: 'Please select a valid PDF file.'
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size exceeds the maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB.`
    };
  }

  // Check if file is not empty
  if (file.size === 0) {
    return {
      isValid: false,
      error: 'The selected file appears to be empty.'
    };
  }

  return { isValid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}