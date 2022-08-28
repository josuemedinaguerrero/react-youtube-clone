import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { VideoModel } from "../types/types";
import Card from "./Card";

interface RecommendationsProps {
   tags: string;
}

const Container = styled.div`
   flex: 2;
`;

const Recommendations = ({ tags }: RecommendationsProps) => {
   const [videos, setVideos] = useState([] as VideoModel[]);

   useEffect(() => {
      const fetchVideos = async () => {
         const res = await axios.get(
            `https://jmg-youtube-clone.herokuapp.com/api/videos/tags?tags=${tags}`
         );
         setVideos(res.data);
      };
      fetchVideos();
   }, [tags]);

   return (
      <Container>
         {videos.map((video) => (
            <Card type="sm" key={video._id} video={video} />
         ))}
      </Container>
   );
};

export default Recommendations;
