// 日期工具函數

/**
 * 格式化日期
 * @param {Date|string} date - 要格式化的日期
 * @param {string} locale - 語言地區，默認為 'zh-TW'
 * @returns {string} - 格式化後的日期字串
 */
export const formatDate = (date, locale = 'zh-TW') => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '無效日期';
  }
  
  return dateObj.toLocaleString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * 格式化相對時間（如：2分鐘前）
 * @param {Date|string} date - 要格式化的日期
 * @returns {string} - 相對時間字串
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} 秒前`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} 分鐘前`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} 小時前`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} 天前`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} 個月前`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} 年前`;
};

/**
 * 檢查日期是否為今天
 * @param {Date|string} date - 要檢查的日期
 * @returns {boolean} - 是否為今天
 */
export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  
  return today.toDateString() === checkDate.toDateString();
};

/**
 * 獲取日期範圍的標籤
 * @param {Date|string} date - 日期
 * @returns {string} - 日期範圍標籤
 */
export const getDateLabel = (date) => {
  if (isToday(date)) {
    return '今天';
  }
  
  const now = new Date();
  const checkDate = new Date(date);
  const diffInDays = Math.floor((now - checkDate) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 1) {
    return '昨天';
  }
  
  if (diffInDays <= 7) {
    return '本週';
  }
  
  if (diffInDays <= 30) {
    return '本月';
  }
  
  return '較早';
};