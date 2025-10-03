import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProviders } from './context';
import { DevTools, loadServer } from 'jira-dev-tool';
import 'antd/dist/reset.css'
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

// 重置 jira-dev-tool 的失败设置
window.localStorage.removeItem('__jira_failure_rate__');
window.localStorage.removeItem('__jira_request_fail_config__');

loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <StyleProvider hashPriority="high">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'rgb(0, 82, 204)',
              colorInfo: 'rgb(0, 82, 204)',
              fontSize: 16,
            },
            components: {
              Button: {
                colorPrimary: 'rgb(0, 82, 204)',
                colorPrimaryHover: 'rgb(0, 92, 224)',
                colorPrimaryActive: 'rgb(0, 72, 184)'
              }
            }
          }}
        >
          <App />
          <DevTools />
        </ConfigProvider>
        </StyleProvider>
      </AppProviders>
    </React.StrictMode>,
    document.getElementById('root')
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
