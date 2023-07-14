const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  },
};
const getMovie = async (title) => {
  const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=ca&show_type=all&output_language=en`;
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

const sortObjects = (array) => [...array.result].sort((a, b) => b.year - a.year);

const sendRequest = () => {
  const searchBar = getElement(".input_search");
  const searchBtn = getElement(".btn_search");
  searchBtn.addEventListener("click", async () => {
    parseResponse(await getMovie(searchBar.value));
  });
  document.addEventListener("keypress", async (e) => {
    if (e.code == "Enter") {
      parseResponse(await getMovie(searchBar.value));
    }
  });
};

const clearCard = () => {
  const cardContainer = document.querySelector(".grid");
  cardContainer.innerHTML = "";
};

const hideElement = (element) => {
  element.classList.add("hidden");
  return element;
};

const unHideElement = (element) => {
  element.classList.remove("hidden");
  return element;
};
const createCard = (imageSrc, title, overview, streamingInfo) => {
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

  // streaming details
  const streamingLocations = createElem("p");
  streamingLocations.textContent = streamingInfo;

  // append elements to content div
  contentDiv.appendChild(image);
  contentDiv.appendChild(heading);
  contentDiv.appendChild(description);
  contentDiv.appendChild(streamingBtn);
  contentDiv.appendChild(streamingLocations);

  // append to main container div
  containerDiv.appendChild(contentDiv);

  // append to page
  grid.appendChild(containerDiv);
};

sendRequest();

const parseResponse = (response) => {
  clearCard();
  console.log(response);
  response.result.forEach((obj) => {
    const title = obj.title;
    const imageSrc = obj.posterURLs[185];
    const overview = obj.overview;
    const streamingInfo = Object.keys(obj.streamingInfo.ca || {});
    createCard(imageSrc, title, overview, streamingInfo);
  });
};
