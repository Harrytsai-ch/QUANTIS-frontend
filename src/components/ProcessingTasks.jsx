import React from 'react';
import { Card } from 'react-bootstrap';
import TaskItem from './TaskItem';

const ProcessingTasks = ({ tasks, onDownload }) => {
  if (!tasks || tasks.length === 0) {
    return null;
  }

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">
          <i className="bi bi-gear-fill me-2"></i>
          處理中的任務
          <span className="badge bg-primary ms-2">{tasks.length}</span>
        </h5>
      </Card.Header>
      <Card.Body>
        {tasks.map((task) => (
          <TaskItem
            key={task.taskId}
            task={task}
            onDownload={onDownload}
          />
        ))}
      </Card.Body>
    </Card>
  );
};

export default ProcessingTasks;