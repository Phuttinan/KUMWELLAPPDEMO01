import React from "react";
import { useQuery } from "react-query";
import axios from "axios";



async function fetchLightning() {
    const { data } = await axios.get(
      "http://58.97.57.113/LLSApp/jgetlast1hr.php"
    );
    return data;
  }
  
  function Posts() {
    const { data, error, isError, isLoading, isRefetching } = useQuery("Lightning", fetchLightning);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (isError) {
      return <div>Error! {error.message}</div>;
    }
  
    return (
      <div className="container">
        <h1>Posts</h1>
        {data.map((post, index) => {
          return <li key={index}>{post.title}</li>;
        })}
      </div>
    );
  }
  
  export default Posts;