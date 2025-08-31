import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ size = 'md', text = '載入中...', className = '' }) => {
  const getSpinnerSize = (size) => {
    switch (size) {
      case 'sm':
        return 'spinner-border-sm';
      case 'lg':
        return '';
      default:
        return '';
    }
  };

  return (
    <div className={`d-flex flex-column align-items-center justify-content-center ${className}`}>
      <Spinner 
        animation="border" 
        variant="primary" 
        className={getSpinnerSize(size)}
        role="status"
        aria-hidden="true"
      />
      {text && (
        <div className="mt-2 text-muted">
          {text}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;