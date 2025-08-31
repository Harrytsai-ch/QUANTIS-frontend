import React from 'react';
import { Container, Alert } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="mt-5">
          <Alert variant="danger">
            <Alert.Heading>出現錯誤</Alert.Heading>
            <p>
              應用程式遇到未預期的錯誤。請重新整理頁面或聯絡系統管理員。
            </p>
            <hr />
            <p className="mb-0">
              錯誤訊息: {this.state.error?.message || '未知錯誤'}
            </p>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;