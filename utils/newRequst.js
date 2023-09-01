import axios from "axios";
export default newRequest = async (search, query) => {
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${search}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": "119128ac75msh8a31a2cbd0392bcp12a848jsn79d875548023",
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
