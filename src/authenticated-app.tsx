import React from "react"
import { ProjectListScreen } from "./screens/project-list"
import { useAuth } from "./context/auth_context"
import styled from "@emotion/styled"
import { row } from "./components/lib"
 import {ReactComponent as SoftwareLogo} from "./assets/software-logo.svg"
import { Dropdown, Button } from "antd"
import { Route,Routes ,Navigate} from "react-router"
import { ProjectScreen } from "./screens/project/index"
import {BrowserRouter as Router } from "react-router-dom"
import { resetRoute } from "./utils"
export const AuthenticatedApp = () => {
   
    
    return <Container>
       <PageHeader />
        <Main>
           <Router>
  <Routes>
    <Route path="/projects" element={<ProjectListScreen />} />
    <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
    <Route element={<Navigate to="/projects"  />} />
  </Routes>
  </Router>
        </Main>  
        <Footer>
            footer
        </Footer>
       
    </Container>
}

const PageHeader = () => {
  const {logout,user} = useAuth()
    return   <Header between={true}>
             <HeaderLeft gap={true}>
              <Button type="link" onClick={resetRoute}> <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'}/></Button>
               
              <h2>项目</h2>
              <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
              <Dropdown 
                menu={{ 
                  items: [{ key: 'logout', label: <span>退出</span> }],
                  onClick: ({ key }) => { if (key === 'logout') logout() }
                }}
              >
                <Button type="link">Hi,{user?.name}</Button>
              </Dropdown>
            </HeaderRight>
      
        </Header>   
}
const Container = styled.div`
display: grid;
grid-template-rows: 6rem 1fr 6rem;
grid-template-columns: 20rem 1fr 20rem;
grid-template-areas: 
    "header header header"
    "main main main"
    "footer footer footer";
  height: 100vh;
 
`
const Header = styled(row)`
padding: 3.2rem;
grid-area: header;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
z-index: 1;

`
const HeaderLeft = styled(row)`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`
const HeaderRight = styled.div`

`
const Main = styled.main`
grid-area: main;

`
const Footer = styled.footer`
grid-area: footer;
`



