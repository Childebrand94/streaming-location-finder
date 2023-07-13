const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "Your Key Here",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  },
};
const getMovie = async (title) => {
  const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=us&show_type=all&output_language=en`;
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
const getElement = (string) => {
  return document.querySelector(string);
};
const createElem = (tag) => document.createElement(tag);

const addClass = (elem, className) => {
  elem.classList.add(className);
  return elem;
};

const sendRequest = () => {
  const searchBar = getElement(".input_search");
  const searchBtn = getElement(".btn_search");
  searchBtn.addEventListener("click", async () => {
    parseResponse(await getMovie(searchBar.value));
  });
};

const clearCard = () => {
  const cardContainer = document.querySelector(".grid");
  cardContainer.innerHTML = "";
};

const createCard = (imageSrc, title, overview) => {
  const grid = getElement(".grid");
  // container Div
  const containerDiv = addClass(createElem("div"), "grid_item");

  //inner content Div
  const contentDiv = addClass(createElem("div"), "grid_item_content");

  // image
  const image = createElem("img");
  image.src = imageSrc;

  // title
  const heading = addClass(createElem("h3"), "title");
  heading.textContent = title;

  // description
  const description = addClass(createElem("p"), "description");
  description.textContent = overview;

  // button
  const streamingBtn = addClass(createElem("button"), "btn_source");
  streamingBtn.textContent = "Streaming Details";

  // append elements to content div
  contentDiv.appendChild(image);
  contentDiv.appendChild(heading);
  contentDiv.appendChild(description);
  contentDiv.appendChild(streamingBtn);

  // append to main container div
  containerDiv.appendChild(contentDiv);

  // append to page
  grid.appendChild(containerDiv);
};

sendRequest();

const parseResponse = (response) => {
  clearCard();
  response.result.forEach((obj) => {
    const title = obj.title;
    const imageSrc = obj.posterURLs[185];
    const overview = obj.overview;
    createCard(imageSrc, title, overview);
  });
};
