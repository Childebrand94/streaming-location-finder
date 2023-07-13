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

const app = (imageSrc, title, overview) => {
  const button = getElement(".btn_search");
  const grid = getElement(".grid");
  const searchBar = getElement(".input_search");

  button.addEventListener("click", () => {
    // container Div
    const containerDiv = addClass(createElem("div"), "grid_item");

    //inner content Div
    const contentDiv = addClass(createElem("div"), "grid_item_content");

    // image
    const image = createElem("img");
    image.src = imageSrc;

    // title
    const heading = addClass(createElem("h3"), "title");
    console.log(heading);
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
  });
};

sendRequest();

const parseResponse = (response) => {
  const title = response.result[0].title;
  const imageSrc = response.result[0].backdropURLs[300];
  const overview = response.result[0].overview;

  app(imageSrc, title, overview);
};
