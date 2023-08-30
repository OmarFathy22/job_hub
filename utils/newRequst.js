import axios from "axios";
import { useState, useEffect } from "react";
export default newRequest = async () => {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query: "Python developer in Texas, USA",
      page: "1",
      num_pages: "1",
    },
    headers: {
      "X-RapidAPI-Key": "8922bb81bemsha3476b0f910c70dp1f3246jsn0a9380fb1e3b",
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
