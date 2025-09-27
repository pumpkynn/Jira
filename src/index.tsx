import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProviders } from './context';
import { DevTools, loadServer } from 'jira-dev-tool';

// 重置 jira-dev-tool 的失败设置
window.localStorage.removeItem('__jira_failure_rate__');
window.localStorage.removeItem('__jira_request_fail_config__');

loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
        <DevTools />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById('root')
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
