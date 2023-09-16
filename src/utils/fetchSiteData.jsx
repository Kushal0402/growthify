import axios from "axios";
const fetchSiteData = async (url,authDetails) => {
        const post_array = [];
  
        post_array.push({
          target: url,
          max_crawl_pages: 1,
          start_url: url,
        });
  
        try {
          const res = await axios.post(
            "https://api.dataforseo.com/v3/on_page/task_post",
            post_array,
            {
              headers: {
                Authorization: authDetails,
                "content-type": "application/json",
              },
            }
          );
          return res;
        } catch (err) {
          console.error(err);
        }

}

export default fetchSiteData