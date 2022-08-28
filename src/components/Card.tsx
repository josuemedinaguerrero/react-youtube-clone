import { Link } from "react-router-dom";
import { UserModel, VideoModel } from "../types/types";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

interface CardProps {
  type: string;
  video: VideoModel;
}

interface CardPropsStyles {
  type: string;
}

const Container = styled.div<CardPropsStyles>`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img<CardPropsStyles>`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "200px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div<CardPropsStyles>`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img<CardPropsStyles>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }: CardProps) => {
  const [channel, setChannel] = useState({} as UserModel);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `https://jmg-youtube-clone.herokuapp.com/api/users/find/${video?.userId}`
      );
      setChannel(res.data);
    };
    fetchChannel();
  }, [video?.userId]);

  return (
    <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video?.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Texts>
            <Title>{video?.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video?.views} views &bull; {format(video?.createdAt || new Date())}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
