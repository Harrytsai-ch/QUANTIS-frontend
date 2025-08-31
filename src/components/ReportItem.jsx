import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { formatDate, formatRelativeTime, getDateLabel } from '../utils/dateUtils';
import { formatFileSize } from '../utils/fileUtils';

const ReportItem = ({ report, onDownload }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h6 className="mb-0">
            <i className="bi bi-file-earmark-spreadsheet me-2 text-success"></i>
            任務 {report.taskId}
          </h6>
          <Badge bg="light" text="dark" className="ms-2">
            {getDateLabel(report.createdAt)}
          </Badge>
        </div>

        <div className="flex-grow-1 mb-3">
          <div className="text-muted small">
            <div className="mb-2">
              <i className="bi bi-calendar3 me-2"></i>
              建立時間: {formatDate(report.createdAt)}
            </div>
            <div className="mb-2">
              <i className="bi bi-clock me-2"></i>
              {formatRelativeTime(report.createdAt)}
            </div>
            <div className="mb-2">
              <i className="bi bi-hdd me-2"></i>
              檔案大小: {formatFileSize(report.size)}
            </div>
            <div>
              <i className="bi bi-file-text me-2"></i>
              檔案名稱: <code className="small">{report.filename}</code>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onDownload(report.taskId)}
            className="w-100"
          >
            <i className="bi bi-download me-2"></i>
            重新下載
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReportItem;