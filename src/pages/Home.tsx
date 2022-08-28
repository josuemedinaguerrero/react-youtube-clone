import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { VideoModel } from "../types/types";

interface PropsHome {
   type: "random" | "trend" | "sub";
}

const Container = styled.div`
   display: flex;
   justify-content: space-between;
   flex-wrap: wrap;
`;

const Home = ({ type }: PropsHome) => {
   const [videos, setVideos] = useState([] as VideoModel[]);

   useEffect(() => {
      const fetchVideos = async () => {
         const res = await axios.get(`https://jmg-youtube-clone.herokuapp.com/api/videos/${type}`);
         setVideos(res.data);
      };
      fetchVideos();
   }, [type]);

   return (
      <Container>
         {videos.map((video) => (
            <Card key={video._id} type="" video={video} />
         ))}
      </Container>
   );
};

export default Home;
