const getElement = (string) => {
  return document.querySelector(string);
};

const getInput = () => {
  const searchBar = getElement(".input_search");
  const searchBtn = getElement(".btn_search");
  searchBtn.addEventListener("click", () => {
    return searchBar.value;
  });
};

const options = {
  method: "GET",
  url: "https://streaming-availability.p.rapidapi.com/v2/search/title",
  params: {
    title: getInput(),
    country: "us",
    show_type: "movie",
    output_language: "en",
  },
  headers: {
    "X-RapidAPI-Key": "Your key here",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  },
};

const getMovie = async () => {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
