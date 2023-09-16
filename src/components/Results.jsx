import React from "react";
import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchSiteData from "../utils/fetchSiteData";
const Results = () => {
  const { url } = useParams();
  const id = useRef("");
  const siteUrl = atob(url);
  const encodedAuth = btoa(
    process.env.REACT_APP_DFS_API_LOGIN +
      ":" +
      process.env.REACT_APP_DFS_API_PASSWORD
  );
  const authDetails = "Basic " + encodedAuth;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSiteData(siteUrl, authDetails);
      id.current = data?.data?.tasks[0]?.id;
      console.log(id.current);
    };
    fetchData();

    // Define a func
    // const for timer id initially null
    // timer id  = setInterval(func for api call)
    // set state in end of api call func
    // all of this to be in if condition
    // if(state === null) then call timer interval
    // else if (state !== null) clear timer id return data
  }, [authDetails, siteUrl]);

  return <div>{atob(url)}</div>;
};

export default Results;
