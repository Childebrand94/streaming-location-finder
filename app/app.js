const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  },
};
const errorHandling = () => {
  const grid = getElement(".grid");
  const container = addClass(createElem("div"), "grid_item");
  const containerContent = addClass(createElem("div"), "grid_item_content");
  const image = addClass(createElem("img"), "error_image");
  image.src = "../images/something_went_wrong.png";

  const description = addClass(createElem("p"), "description_error");
  description.textContent = "An unexpected error has occurred. Please try again.";

  containerContent.appendChild(image);
  containerContent.appendChild(description);
  container.appendChild(containerContent);
  grid.appendChild(container);
};

const getMovie = async (title) => {
  const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=ca&show_type=all&output_language=en`;
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getElement = (string) => {
  return document.querySelector(string);
};

const getAllElements = (string) => {
  return document.querySelectorAll(string);
};

const createElem = (tag) => document.createElement(tag);

const addClass = (elem, classNames) => {
  if (typeof classNames === "string") {
    elem.classList.add(classNames);
  } else if (Array.isArray(classNames)) {
    elem.classList.add(...classNames);
  }
  return elem;
};

const sendRequest = () => {
  const searchBar = getElement(".input_search");
  const searchBtn = getElement(".btn_search");

  const performSearch = async () => {
    try {
      parseResponse(await getMovie(searchBar.value));
    } catch (error) {
      errorHandling();
      return;
    }
  };

  searchBtn.addEventListener("click", performSearch);

  document.addEventListener("keypress", async (e) => {
    if (e.code === "Enter") {
      performSearch();
    }
  });
};

const clearCard = () => {
  const cardContainer = document.querySelector(".grid");
  cardContainer.innerHTML = "";
};

const sortObjects = (array) => {
  return [...array].sort((a, b) => {
    const keyA = a.year !== undefined ? a.year : a.lastAirYear;
    const keyB = b.year !== undefined ? b.year : b.lastAirYear;

    return keyB - keyA;
  });
};

const hideElement = (element) => {
  element.classList.add("hidden");
  return element;
};

const unHideElement = (element) => {
  element.classList.remove("hidden");
  return element;
};

const streamingBtnAnimation = () => {
  const streamLocations = getAllElements(".stream_locations");
  const btns = getAllElements(".btn_source");
  btns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      hideElement(btn);
      unHideElement(streamLocations[index]);
    });
  });
};

const createCard = (imageSrc, title, overview, streamingInfo) => {
  const grid = getElement(".grid");
  // container Div
  const containerDiv = addClass(createElem("div"), ["grid_item", "fade_in"]);

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
  const streamingLocations = addClass(createElem("p"), "stream_locations");
  streamingLocations.textContent = streamingInfo === "" ? "N/A" : streamingInfo;
  hideElement(streamingLocations);

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

const formatStreamingInfo = (array) => {
  return array.map((string) => string[0].toUpperCase() + string.slice(1)).join("|");
};

const parseResponse = (response) => {
  clearCard();

  const sortedResponse = sortObjects(response.result);

  sortedResponse.forEach((obj) => {
    const title = obj.title;
    const imageSrc = obj.posterURLs[185];
    const overview = obj.overview;
    const streamingInfo = Object.keys(obj.streamingInfo.ca || {});
    createCard(imageSrc, title, overview, formatStreamingInfo(streamingInfo));
  });

  fadeInCards();

  streamingBtnAnimation();
};

const fadeInCards = () => {
  const cards = getAllElements(".grid_item");
  setTimeout(function () {
    cards.forEach((card) => {
      addClass(card, "visible");
    });
  }, 50);
};
