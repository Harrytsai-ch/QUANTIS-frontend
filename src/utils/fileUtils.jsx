// 檔案工具函數

/**
 * 檢查檔案類型是否被允許
 * @param {File} file - 要檢查的檔案
 * @returns {boolean} - 是否允許的檔案類型
 */
export const isValidFileType = (file) => {
  const allowedTypes = ['.xlsx', '.xls', '.csv'];
  const fileName = file.name.toLowerCase();
  return allowedTypes.some(type => fileName.endsWith(type));
};

/**
 * 格式化檔案大小
 * @param {number} bytes - 檔案大小（bytes）
 * @returns {string} - 格式化後的檔案大小
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * 獲取檔案擴展名
 * @param {string} fileName - 檔案名稱
 * @returns {string} - 檔案擴展名
 */
export const getFileExtension = (fileName) => {
  return fileName.substring(fileName.lastIndexOf('.'));
};

/**
 * 驗證檔案
 * @param {File} file - 要驗證的檔案
 * @param {Object} options - 驗證選項
 * @returns {Object} - 驗證結果
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 50 * 1024 * 1024, // 默認最大50MB
    allowedTypes = ['.xlsx', '.xls', '.csv']
  } = options;
  
  const errors = [];
  
  // 檢查檔案類型
  if (!isValidFileType(file)) {
    errors.push(`不支援的檔案類型。支援的格式：${allowedTypes.join(', ')}`);
  }
  
  // 檢查檔案大小
  if (file.size > maxSize) {
    errors.push(`檔案太大。最大允許大小：${formatFileSize(maxSize)}`);
  }
  
  // 檢查檔案名稱
  if (!file.name || file.name.trim() === '') {
    errors.push('檔案名稱不能為空');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * 下載檔案
 * @param {Blob} blob - 檔案 blob
 * @param {string} fileName - 檔案名稱
 */
export const downloadBlob = (blob, fileName) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};