import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import { useAppSelector } from "./redux/hooks";
import GoogleSign from "./components/google-sign";
import "./App.css";

const Container = styled.div`
   display: flex;
`;

const Main = styled.div`
   flex: 7;
   background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
   padding: 22px 96px;
`;

function App() {
   const [darkMode, setDarkMode] = useState(true);

   const ProtectedRoute = ({ children }: any) => {
      const { currentUser } = useAppSelector((state) => state.user);
      if (currentUser.name && currentUser.email) {
         return <Navigate to="/" />;
      }
      return children;
   };

   return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
         <Container>
            <HashRouter>
               <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
               <Main>
                  <Navbar />
                  <Wrapper>
                     <Routes>
                        <Route path="/">
                           <Route index element={<Home type="random" />} />
                           <Route path="trends" element={<Home type="trend" />} />
                           <Route path="subscriptions" element={<Home type="sub" />} />
                           <Route path="search" element={<Search />} />
                           <Route
                              path="signin"
                              element={
                                 <ProtectedRoute>
                                    <SignIn />
                                 </ProtectedRoute>
                              }
                           />
                           <Route path="video">
                              <Route path=":id" element={<Video />} />
                           </Route>
                        </Route>
                     </Routes>
                  </Wrapper>
               </Main>
            </HashRouter>
         </Container>
      </ThemeProvider>
   );
}

export default App;
