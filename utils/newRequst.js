import axios from "axios";
export default newRequest = async (search, query) => {
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${search}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": "9a5cb629e6mshb00fbb5b1b91b6ap1c1d8fjsnfa9373ac7eab",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
