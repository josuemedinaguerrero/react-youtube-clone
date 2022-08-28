import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useState } from "react";
import Upload from "./Upload";
import styled from "styled-components";
import { logout } from "../redux/userSlice";
import axios from "axios";

const Container = styled.div`
   position: sticky;
   top: 0;
   background-color: ${({ theme }) => theme.bgLighter};
   height: 56px;
`;

const Wrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
   height: 100%;
   padding: 0px 20px;
   position: relative;
`;

const Logout = styled.button`
   padding: 5px 15px;
   background-color: transparent;
   position: absolute;
   left: 15px;
   border: 1px solid #3ea6ff;
   color: #3ea6ff;
   border-radius: 3px;
   font-weight: 500;
   cursor: pointer;
   display: flex;
   align-items: center;
   gap: 5px;
`;

const Search = styled.div`
   width: 40%;
   position: absolute;
   left: 0;
   right: 0;
   margin: auto;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 5px;
   border: 1px solid #ccc;
   border-radius: 3px;
   color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
   border: none;
   background-color: transparent;
   outline: none;
   color: ${({ theme }) => theme.textSoft};
`;

const Button = styled.button`
   padding: 5px 15px;
   background-color: transparent;
   border: 1px solid #3ea6ff;
   color: #3ea6ff;
   border-radius: 3px;
   font-weight: 500;
   cursor: pointer;
   display: flex;
   align-items: center;
   gap: 5px;
`;

const User = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   font-weight: 500;
   color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
   width: 32px;
   height: 32px;
   border-radius: 50%;
   background-color: #999;
`;

const Navbar = () => {
   const { currentUser } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();
   const [open, setOpen] = useState(false);
   const [q, setQ] = useState("");

   const navigate = useNavigate();

   const handleLogout = async () => {
      dispatch(logout());
      await axios.get("https://jmg-youtube-clone.herokuapp.com/api/auth/logout");
   };

   return (
      <>
         <Container>
            <Wrapper>
               {currentUser.name && currentUser.email ? (
                  <Logout onClick={handleLogout}>
                     <AccountCircleIcon />
                     LOGOUT
                  </Logout>
               ) : (
                  ""
               )}
               <Search>
                  <Input placeholder="Search" onChange={(e) => setQ(e.target.value)} />
                  <SearchIcon onClick={() => navigate(`/search?q=${q}`)} />
               </Search>
               {currentUser.name && currentUser.email ? (
                  <User>
                     <VideoCallIcon onClick={() => setOpen(true)} style={{ cursor: "pointer" }} />
                     <Avatar src={currentUser.img} alt="" />
                     {currentUser.name}
                  </User>
               ) : (
                  <Link to="/signin" style={{ textDecoration: "none" }}>
                     <Button>
                        <AccountCircleIcon />
                        SIGN IN
                     </Button>
                  </Link>
               )}
            </Wrapper>
         </Container>
         {open && <Upload setOpen={setOpen} />}
      </>
   );
};

export default Navbar;
