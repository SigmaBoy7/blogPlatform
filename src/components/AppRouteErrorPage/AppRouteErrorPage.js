import React from 'react';
import { Alert } from 'antd';

export default function AppRouteErrorPage() {
  return (
    <div>
      <Alert message="Данной страницы не существует" type="warning" />
    </div>
  );
}
