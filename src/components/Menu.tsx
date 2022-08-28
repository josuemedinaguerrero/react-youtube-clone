import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import HelpIcon from "@mui/icons-material/Help";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import styled from "styled-components";
import logoImg from "../images/youtube.png";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const Container = styled.div`
   flex: 1;
   background-color: ${({ theme }) => theme.bgLighter};
   height: 100vh;
   color: ${({ theme }) => theme.text};
   font-size: 14px;
   position: sticky;
   overflow-y: scroll;
   overflow-x: hidden;
   top: 0;

   &::-webkit-scrollbar {
      width: 7px;
   }

   &::-webkit-scrollbar-thumb {
      background: #c3260d;
      border-radius: 3px;
   }
`;

const Wrapper = styled.div`
   padding: 18px 26px;
`;

const Logo = styled.div`
   display: flex;
   align-items: center;
   gap: 5px;
   font-weight: bold;
   margin-bottom: 25px;
`;

const Img = styled.img`
   height: 25px;
`;

const Item = styled.div`
   display: flex;
   align-items: center;
   gap: 20px;
   cursor: pointer;
   padding: 7.5px 0px;

   &:hover {
      background-color: ${({ theme }) => theme.soft};
   }
`;

const Hr = styled.hr`
   margin: 15px 0px;
   border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;

const Button = styled.button`
   padding: 5px 15px;
   background-color: transparent;
   border: 1px solid #3ea6ff;
   color: #3ea6ff;
   border-radius: 3px;
   font-weight: 500;
   margin-top: 10px;
   cursor: pointer;
   display: flex;
   align-items: center;
   gap: 5px;
`;

const Title = styled.h2`
   font-size: 14px;
   font-weight: 500;
   color: #aaaaaa;
   margin-bottom: 20px;
`;

interface MenuProps {
   darkMode: boolean;
   setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu = ({ darkMode, setDarkMode }: MenuProps) => {
   const { currentUser } = useAppSelector((state) => state.user);

   return (
      <Container>
         <Wrapper>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
               <Logo>
                  <Img src={logoImg} />
                  JosTube
               </Logo>
            </Link>
            <Item>
               <HomeIcon />
               Home
            </Item>
            <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
               <Item>
                  <ExploreIcon />
                  Explore
               </Item>
            </Link>
            <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
               <Item>
                  <SubscriptionsIcon />
                  Subscriptions
               </Item>
            </Link>
            <Hr />
            <Item>
               <VideoLibraryIcon />
               Library
            </Item>
            <Item>
               <HistoryIcon />
               History
            </Item>
            <Hr />
            {currentUser.name ? (
               ""
            ) : (
               <>
                  <Login>
                     Sign in to like videos, comment, and subscribe
                     <Link to="signin" style={{ textDecoration: "none" }}>
                        <Button>
                           <AccountCircleIcon />
                           SIGN IN
                        </Button>
                     </Link>
                  </Login>
                  <Hr />
               </>
            )}
            <Title>BEST OF JOSTUBE</Title>
            <Item>
               <LibraryMusicIcon />
               Music
            </Item>
            <Item>
               <SportsBasketballIcon />
               Sports
            </Item>
            <Item>
               <SportsEsportsIcon />
               Gaming
            </Item>
            <Item>
               <LocalMoviesIcon />
               Movies
            </Item>
            <Item>
               <NewspaperIcon />
               News
            </Item>
            <Item>
               <LiveTvIcon />
               Live
            </Item>
            <Hr />
            <Item>
               <SettingsIcon />
               Settings
            </Item>
            <Item>
               <ReportIcon />
               Report
            </Item>
            <Item>
               <HelpIcon />
               Help
            </Item>
            <Item>
               <HomeIcon />
               Home
            </Item>
            <Item onClick={() => setDarkMode(!darkMode)}>
               {darkMode ? (
                  <>
                     <LightModeIcon />
                     Light
                  </>
               ) : (
                  <>
                     <DarkModeIcon />
                     Dark
                  </>
               )}
            </Item>
         </Wrapper>
      </Container>
   );
};

export default Menu;
