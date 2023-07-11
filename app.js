const options = {
  method: "GET",
  url: "https://streaming-availability.p.rapidapi.com/v2/search/title",
  params: {
    title: "batman",
    country: "us",
    show_type: "movie",
    output_language: "en",
  },
  headers: {
    "X-RapidAPI-Key": "3b60a8e8f7mshdf601e24dafb99ep1f434ejsn080c28ad1a37",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  },
};

const getElement = (string) => {
  return document.querySelector(string);
};

const getInput = () => {
  const searchBar = getElement(".input_search");
  const searchBtn = getElement(".btn_search");
  searchBtn.addEventListener("click", () => {
    console.log("Hello");
    getMovie(searchBar.value);
  });
};

getInput();

const getMovie = async (title) => {
  const movieOptions = {
    ...options,
    params: {
      ...options.params,
      title: title,
    },
  };
  console.log(movieOptions);
  try {
    const response = await axios.request(movieOptions);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// const sendRequest = () => {
//   const title = getInput(searchBtn, searchBar);
//   options.params.title = title;
//   searchBtn.addEventListener("click", () => {
//     return getMovie();
//   });
// };

// console.log(sendRequest());
