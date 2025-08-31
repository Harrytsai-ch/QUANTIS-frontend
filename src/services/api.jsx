import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-backend-api.herokuapp.com/api'  // 生產環境 - 需要部署後端
  : 'http://localhost:3001/api';                   // 開發環境

// 建立 axios 實例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30秒超時
});

// API 服務類
class ApiService {
  // 上傳檔案
  static async uploadFile(file, onUploadProgress = null) {
    const formData = new FormData();
    formData.append('file', file);
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    
    if (onUploadProgress) {
      config.onUploadProgress = onUploadProgress;
    }
    
    return await apiClient.post('/upload', formData, config);
  }

  // 獲取處理狀態
  static async getProcessStatus(taskId) {
    return await apiClient.get(`/process/${taskId}/status`);
  }

  // 下載處理結果
  static async downloadFile(taskId) {
    return await apiClient.get(`/download/${taskId}`, {
      responseType: 'blob',
    });
  }

  // 獲取所有報表
  static async getReports() {
    return await apiClient.get('/reports');
  }

  // 獲取組別與報表配置
  static async getReportConfig() {
    return await apiClient.get('/reportConfig');
  }

  // 獲取資料來源配置
  static async getDataSourceConfig() {
    return await apiClient.get('/dataSourceConfig');
  }
}

// 錯誤處理
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // 伺服器回應錯誤
      const message = error.response.data?.error || error.response.data?.message || '伺服器錯誤';
      throw new Error(message);
    } else if (error.request) {
      // 請求發送失敗
      throw new Error('無法連接到伺服器，請檢查網路連接');
    } else {
      // 其他錯誤
      throw new Error('請求發生未知錯誤');
    }
  }
);

export default ApiService;