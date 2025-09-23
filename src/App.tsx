import React from 'react';
import './App.css';
import { ProjectListScreen } from './screens/project-list';
import { LoginScreen } from './screens/login';
function App() {
  return (
    <div className="App">
      <h1>登录页面</h1>
      <LoginScreen></LoginScreen>
      <hr />
      <h1>项目列表页面</h1>
      <ProjectListScreen></ProjectListScreen>
    </div>
  );
}

export default App;
