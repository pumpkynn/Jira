import React from "react"
import { ProjectListScreen } from "./screens/project-list"
import { useAuth } from "./context/auth_context"
import styled from "@emotion/styled"
import { row } from "./components/lib"

export const AuthenticatedApp = () => {
    const {logout} = useAuth()
    return <Container>
        <Header between={true}>
             <HeaderLeft gap={true}>
              <h2>logo</h2>
              <h2>项目</h2>
              <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
              RIGHT  <button onClick={logout}>退出</button>
            </HeaderRight>
          
        </Header>   
       
        <Main>
            <ProjectListScreen />
        </Main>  
        <Footer>
            footer
        </Footer>
       
    </Container>
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
grid-area: header;
background-color: grey;

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



