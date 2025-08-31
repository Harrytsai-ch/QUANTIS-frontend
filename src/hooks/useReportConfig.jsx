import { useState, useEffect } from 'react';
import ApiService from '../services/api';

const useReportConfig = () => {
  const [reportConfig, setReportConfig] = useState(null);
  const [dataSourceConfig, setDataSourceConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 並行請求兩個配置
      const [reportResponse, dataSourceResponse] = await Promise.all([
        ApiService.getReportConfig(),
        ApiService.getDataSourceConfig()
      ]);
      
      setReportConfig(reportResponse.data);
      setDataSourceConfig(dataSourceResponse.data);
    } catch (err) {
      setError(err.message || '無法獲取配置');
      console.error('獲取配置失敗:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const refreshConfigs = () => {
    fetchConfigs();
  };

  return {
    reportConfig,
    dataSourceConfig,
    loading,
    error,
    refreshConfigs
  };
};

export default useReportConfig;