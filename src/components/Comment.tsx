import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import { CommentModel, UserModel } from "../types/types";

interface CommentProps {
   comment: CommentModel;
}

const Container = styled.div`
   display: flex;
   gap: 10px;
   margin: 30px 0px;
`;

const Avatar = styled.img`
   width: 50px;
   height: 50px;
   border-radius: 50px;
`;

const Details = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
   color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
   font-size: 13px;
   font-weight: 500;
`;

const Date = styled.span`
   font-size: 12px;
   font-weight: 400;
   color: ${({ theme }) => theme.textSoft};
   margin-left: 5px;
`;

const Text = styled.span`
   font-size: 14px;
`;

const Comment = ({ comment }: CommentProps) => {
   const [channel, setChannel] = useState({} as UserModel);

   useEffect(() => {
      const fetchComment = async () => {
         try {
            const res = await axios.get(
               `https://jmg-youtube-clone.herokuapp.com/api/users/find/${comment.userId}`
            );
            setChannel(res.data);
         } catch (error) {}
      };
      fetchComment();
   }, [comment.userId]);

   return (
      <Container>
         <Avatar src={channel.img} />
         <Details>
            <Name>
               {channel.name} <Date>{format(comment.createdAt)}</Date>
            </Name>
            <Text>{comment.desc} </Text>
         </Details>
      </Container>
   );
};

export default Comment;
