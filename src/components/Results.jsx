import React from "react";
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchSiteData from "../utils/fetchSiteData";
import getSiteSummary from "../utils/getSiteSummary";
import MetricCard from "./MetricCard";
const Results = () => {
  const { url } = useParams();
  const id = useRef("");
  const [siteData, setSiteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageMetrics, setPageMetrics] = useState([]);
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
    };
    fetchData();

    const getSiteSummaryData = async () => {
      if (id.current !== null) {
        const timerId = setInterval(async () => {
          const data = await getSiteSummary(id.current, authDetails);
          if (data?.data?.tasks[0].status_code === 20000) {
            if (data?.data?.tasks[0].result[0].crawl_progress === "finished") {
              const metrics = Object.entries(
                data?.data?.tasks[0].result[0].page_metrics
              ).filter((metric) => metric[0] !== "checks");
              setPageMetrics(metrics);
              setSiteData(data?.data?.tasks[0].result[0]);
              setIsLoading(false);
              clearInterval(timerId);
            }
          }
        }, 1000);
      }
    };

    getSiteSummaryData();
  }, [authDetails, siteUrl]);

  if (isLoading) {
    return (
      <div className="font-bold flex flex-col h-full justify-center items-center animate-pulse">
        <h1 className="text-3xl text-center">
          We are analysing your URL <br />
          Please Wait as this may take some time...
        </h1>
        <div className="w-6 h-6 border-8 my-4 border-black border-t-slate-600 rounded-full animate-spin" />
      </div>
    );
  } else {
    return (
      <div className="bg-gray-100 h-screen w-screen p-4">
        <div className="main-head flex flex-col justify-center items-center gap-4">
          <h1 className="text-xl font-semibold text-center">
            URL: <span className="font-normal text-lg">{atob(url)}</span>
          </h1>
          <h1 className="text-xl font-semibold">
            IP:{" "}
            <span className="font-normal text-lg">
              {siteData.domain_info.ip}
            </span>
          </h1>
          <h1 className="text-xl font-semibold">
            Domain Name:{" "}
            <span className="font-normal text-lg">
              {siteData.domain_info.name}
            </span>
          </h1>
          <h1 className="text-xl font-semibold">
            No. of Pages Crawled:{" "}
            <span className="font-normal text-lg">
              {siteData.crawl_status.pages_crawled}
            </span>
          </h1>
        </div>

        <div className="score p-4 my-2 w-full bg-white rounded-lg border-2 flex flex-col sm:flex-row justify-evenly items-center">
          <h1 className="text-xl font-bold">Page Score: </h1>
          <div className="w-[80%] h-8 border-2 border-black rounded-lg">
            <div
              style={{
                height: "100%",
                backgroundColor: "black",
                width: `${siteData.page_metrics.onpage_score}%`,
                textAlign: "center",
              }}
            >
              <span className="font-normal text-white">
                {siteData.page_metrics.onpage_score}
              </span>
            </div>
          </div>
        </div>

        <div className="pageMetrics p-4 my-4 w-full bg-white rounded-lg border-2 flex flex-col justify-evenly">
          <h1 className="text-3xl font-bold">Page Metrics</h1>
          <div className="grid grid-cols-12">
            {pageMetrics.map((metric) => (
              <MetricCard key={metric[0]} name={metric[0]} value={metric[1]} />
            ))}
          </div>
        </div>

        <div className="sslInfo p-4 my-4 w-full bg-white rounded-lg border-2 flex flex-col justify-evenly gap-6">
          <h1 className="text-3xl font-bold my-2">SSL Info</h1>
          <p className="text-sm md:text-lg font-bold">
            Valid Certificate:{" "}
            <span className="font-normal">
              {siteData.domain_info.ssl_info.valid_certificate
                ? "Certificate Present"
                : "Certificate Not Present"}
            </span>
          </p>
          <p className="text-sm md:text-lg font-bold">
            Certificate issuer:{" "}
            <span className="font-normal">
              {siteData.domain_info.ssl_info.certificate_issuer}
            </span>
          </p>
          <p className="text-sm md:text-lg font-bold">
            Certificate Hash:{" "}
            <span className="font-normal">
              {siteData.domain_info.ssl_info.certificate_hash}
            </span>
          </p>
          <p className="text-sm md:text-lg font-bold">
            Certificate Expiration Data:{" "}
            <span className="font-normal">
              {siteData.domain_info.ssl_info.certificate_expiration_date}
            </span>
          </p>
        </div>
      </div>
    );
  }
};

export default Results;
