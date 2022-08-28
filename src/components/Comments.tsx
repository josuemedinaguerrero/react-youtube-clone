import Comment from "./Comment";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { CommentModel } from "../types/types";
import { useAppSelector } from "../redux/hooks";

interface CommmentsProps {
   videoId: string;
}

const Container = styled.div``;

const NewComment = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
`;

const Avatar = styled.img`
   width: 50px;
   height: 50px;
   border-radius: 50%;
`;

const Input = styled.input`
   border: none;
   border-bottom: 1px solid ${({ theme }) => theme.soft};
   background-color: transparent;
   outline: none;
   padding: 5px;
   width: 100%;
`;

const Comments = ({ videoId }: CommmentsProps) => {
   const { currentUser } = useAppSelector((state) => state.user);
   const [comments, setComments] = useState([{}] as CommentModel[]);

   useEffect(() => {
      const fetchComments = async () => {
         try {
            const res = await axios.get(
               `https://jmg-youtube-clone.herokuapp.com/api/comments/${videoId}`
            );
            setComments(res.data);
         } catch (error) {}
      };
      fetchComments();
   }, [videoId]);

   return (
      <Container>
         <NewComment>
            <Avatar src={currentUser.img} />
            <Input placeholder="Add a comment..." />
         </NewComment>
         {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
         ))}
      </Container>
   );
};

export default Comments;
