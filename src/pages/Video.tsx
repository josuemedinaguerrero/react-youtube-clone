import styled from "styled-components";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ShareIcon from "@mui/icons-material/Share";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Comments from "../components/Comments";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { UserModel } from "../types/types";
import { subscription } from "../redux/userSlice";
import Recommendations from "../components/Recommendations";

const Container = styled.div`
   display: flex;
   gap: 24px;
`;
const Content = styled.div`
   flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
   font-size: 18px;
   font-weight: 400;
   margin-top: 20px;
   margin-bottom: 10px;
   color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const Info = styled.span`
   color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
   display: flex;
   gap: 20px;
   color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
   display: flex;
   align-items: center;
   gap: 5px;
   cursor: pointer;
`;

const Hr = styled.hr`
   margin: 15px 0px;
   border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
   display: flex;
   justify-content: space-between;
`;

const ChannelInfo = styled.div`
   display: flex;
   gap: 20px;
`;

const Image = styled.img`
   width: 50px;
   height: 50px;
   border-radius: 50%;
`;

const ChannelDetail = styled.div`
   display: flex;
   flex-direction: column;
   color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
   font-weight: 500;
`;

const ChannelCounter = styled.span`
   margin-top: 5px;
   margin-bottom: 20px;
   color: ${({ theme }) => theme.textSoft};
   font-size: 12px;
`;

const Description = styled.p`
   font-size: 14px;
`;

const Subscribe = styled.button`
   background-color: #cc1a00;
   font-weight: 500;
   color: white;
   border: none;
   border-radius: 3px;
   height: max-content;
   padding: 10px 20px;
   cursor: pointer;
`;

const VideoFrame = styled.video`
   max-height: 720px;
   width: 100%;
   object-fit: cover;
`;

const Video = () => {
   const { currentUser } = useAppSelector((state) => state.user);
   const { currentVideo } = useAppSelector((state) => state.video);
   const dispatch = useAppDispatch();

   const path = useLocation().pathname.split("/")[2];
   const [channel, setChannel] = useState({} as UserModel);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const videoRes = await axios.get(
               `https://jmg-youtube-clone.herokuapp.com/api/videos/find/${path}`
            );
            const channelRes = await axios.get(
               `https://jmg-youtube-clone.herokuapp.com/api/users/find/${videoRes.data.userId}`
            );
            setChannel(channelRes.data);
            dispatch(fetchSuccess(videoRes.data));
         } catch (error) {}
      };
      fetchData();
   }, [path, dispatch]);

   const handleLike = async () => {
      await axios.put(`https://jmg-youtube-clone.herokuapp.com/api/users/like/${currentVideo._id}`);
      dispatch(like(currentUser._id));
   };

   const handleDislike = async () => {
      await axios.put(
         `https://jmg-youtube-clone.herokuapp.com/api/users/dislike/${currentVideo._id}`
      );
      dispatch(dislike(currentUser._id));
   };

   const handleSub = async () => {
      currentUser.subscribedUsers.includes(channel._id)
         ? await axios.put(`https://jmg-youtube-clone.herokuapp.com/api/users/unsub/${channel._id}`)
         : await axios.put(`https://jmg-youtube-clone.herokuapp.com/api/users/sub/${channel._id}`);
      dispatch(subscription(channel._id));
   };

   return (
      <Container>
         <Content>
            <VideoWrapper>
               <VideoFrame src={currentVideo.videoUrl} controls />
            </VideoWrapper>
            <Title>{currentVideo.title}</Title>
            <Details>
               <Info>
                  {currentVideo.views} views &bull; {format(currentVideo.createdAt)}
               </Info>
               <Buttons>
                  <Button onClick={handleLike}>
                     {currentVideo.likes ? (
                        currentVideo.likes.includes(currentUser._id) ? (
                           <ThumbUpIcon />
                        ) : (
                           <ThumbUpOffAltIcon />
                        )
                     ) : (
                        ""
                     )}
                     {currentVideo.likes ? currentVideo.likes.length : ""}
                  </Button>
                  <Button onClick={handleDislike}>
                     {currentVideo.dislikes ? (
                        currentVideo.dislikes.includes(currentUser._id) ? (
                           <ThumbDownAltIcon />
                        ) : (
                           <ThumbDownOffAltIcon />
                        )
                     ) : (
                        ""
                     )}
                     Dislike
                  </Button>
                  <Button>
                     <ShareIcon /> Share
                  </Button>
                  <Button>
                     <SaveAltIcon /> Save
                  </Button>
               </Buttons>
            </Details>
            <Hr />
            <Channel>
               <ChannelInfo>
                  <Image src={channel.img} />
                  <ChannelDetail>
                     <ChannelName>{channel.name}</ChannelName>
                     <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
                     <Description>{currentVideo.desc} </Description>
                  </ChannelDetail>
               </ChannelInfo>
               <Subscribe onClick={handleSub}>
                  {currentUser.subscribedUsers
                     ? currentUser.subscribedUsers.includes(channel._id)
                        ? "SUBSCRIBED"
                        : "SUBSCRIBE"
                     : ""}
               </Subscribe>
            </Channel>
            <Hr />
            <Comments videoId={currentVideo._id} />
         </Content>
         <Recommendations tags={currentVideo.tags} />
      </Container>
   );
};

export default Video;
