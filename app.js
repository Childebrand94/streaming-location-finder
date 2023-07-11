const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3b60a8e8f7mshdf601e24dafb99ep1f434ejsn080c28ad1a37",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  },
};
const getMovie = async (title) => {
  const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=us&show_type=all&output_language=en`;
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
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

// const getMovie = async (title) => {
//   const movieOptions = {
//     ...options,
//     params: {
//       ...options.params,
//       title: title,
//     },
//   };
//   console.log(movieOptions);
//   try {
//     const response = await axios.request(movieOptions);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };
