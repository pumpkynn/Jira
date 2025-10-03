import React from "react"
import { ProjectListScreen } from "./screens/project-list"
import { useAuth } from "./context/auth_context"
import styled from "@emotion/styled"

export const AuthenticatedApp = () => {
    const {logout} = useAuth()
    return <Container>
        <Header>
             <HeaderLeft>
              <h3>logo</h3>
              <h3>项目</h3>
              <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
              RIGHT  <button onClick={logout}>退出</button>
            </HeaderRight>
          
        </Header>   
        <Nav>
            nav
        </Nav>
        <Main>
            <ProjectListScreen />
        </Main>  
        <Footer>
            footer
        </Footer>
        <Aside>
            aside
        </Aside>
    </Container>
}

const Container = styled.div`
display: grid;
grid-template-rows: 6rem 1fr 6rem;
grid-template-columns: 20rem 1fr 20rem;
grid-template-areas: 
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
  grid-gap: 5rem;
`
const Header = styled.header`
grid-area: header;
background-color: grey;
display: flex;
flex-direction:row;
align-items: center;
justify-content: space-between;
`
const HeaderLeft = styled.div`

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
const Aside = styled.aside`
grid-area: aside;

`
const Nav = styled.nav`
grid-area: nav;
`
