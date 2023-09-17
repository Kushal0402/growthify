import axios from "axios";

const getSiteSummary = async (id, authDetails) => {
  try {
    const data = await axios.get(
      `https://api.dataforseo.com/v3/on_page/summary/${id}`,
      {
        headers: {
          Authorization: authDetails,
          "content-type": "application/json",
        },
      }
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default getSiteSummary;
