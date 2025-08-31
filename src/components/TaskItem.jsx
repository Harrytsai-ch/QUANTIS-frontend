import React from 'react';
import { Card, ProgressBar, Button, Badge } from 'react-bootstrap';
import { formatDate } from '../utils/dateUtils';

const TaskItem = ({ task, onDownload }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'primary';
      case 'error':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'bi-check-circle';
      case 'processing':
        return 'bi-arrow-clockwise';
      case 'error':
        return 'bi-exclamation-triangle';
      default:
        return 'bi-clock';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return '完成';
      case 'processing':
        return '處理中';
      case 'error':
        return '錯誤';
      default:
        return '等待中';
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="flex-grow-1">
            <h6 className="mb-2">
              <i className="bi bi-file-earmark-text me-2"></i>
              {task.originalName || `任務 ${task.taskId}`}
            </h6>
            <div className="text-muted small mb-2">
              <div>任務 ID: <code>{task.taskId}</code></div>
              {task.recordCount && (
                <div>記錄數: {task.recordCount.toLocaleString()} 筆</div>
              )}
              {task.updatedAt && (
                <div>更新時間: {formatDate(task.updatedAt)}</div>
              )}
            </div>
          </div>
          <Badge bg={getStatusVariant(task.status)} className="ms-3">
            <i className={`bi ${getStatusIcon(task.status)} me-1`}></i>
            {getStatusText(task.status)}
          </Badge>
        </div>

        {/* 狀態訊息 */}
        {task.message && (
          <div className={`alert alert-${getStatusVariant(task.status)} py-2 mb-3`}>
            <small>
              <i className={`bi ${getStatusIcon(task.status)} me-2`}></i>
              {task.message}
            </small>
          </div>
        )}

        {/* 進度條 */}
        {task.status === 'processing' && (
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <small className="text-muted">處理進度</small>
              <small className="text-muted">{task.progress || 0}%</small>
            </div>
            <ProgressBar 
              now={task.progress || 0} 
              animated={task.status === 'processing'}
              variant={getStatusVariant(task.status)}
            />
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="d-flex justify-content-end">
          {task.status === 'completed' && (
            <Button
              variant="success"
              size="sm"
              onClick={() => onDownload(task.taskId)}
            >
              <i className="bi bi-download me-2"></i>
              下載結果
            </Button>
          )}
          
          {task.status === 'error' && (
            <Button
              variant="outline-secondary"
              size="sm"
              disabled
            >
              <i className="bi bi-exclamation-triangle me-2"></i>
              處理失敗
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;