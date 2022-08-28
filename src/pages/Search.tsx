import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { VideoModel } from "../types/types";

const Container = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 10px;
`;

const Search = () => {
   const [videos, setVideos] = useState([] as VideoModel[]);
   const query = useLocation().search;

   useEffect(() => {
      const fetchVideos = async () => {
         const res = await axios.get(
            `https://jmg-youtube-clone.herokuapp.com/api/videos/search${query}`
         );
         setVideos(res.data);
      };
      fetchVideos();
   }, [query]);

   return (
      <Container>
         {videos.map((video) => (
            <Card key={video._id} video={video} type="" />
         ))}
      </Container>
   );
};

export default Search;
