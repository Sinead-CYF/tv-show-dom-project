/***** GLOBAL ELEMENTS *****/

const body = document.querySelector("body");
body.classList.add("body");
const searchInput = document.createElement("input");
const allEpisodes = getAllEpisodes();
const cardsWrapper = document.createElement("div");
const dropdownSelection = document.createElement("select");
const options = document.createElement("option");
const searchBarWrapper = document.createElement("section");
const counterWrapper = document.createElement("div");
const countH2 = document.createElement("h2");
countH2.textContent = `${allEpisodes.length} Episodes`;

// const count = allEpisodes.length;

/***** PROJECT TITLE *****/

function projectTitle() {
  const titleWrap = document.createElement("div");
  titleWrap.classList.add("title-wrapper");
  const header = document.createElement("h1");
  header.innerText = "TV DOM Project";
  body.appendChild(titleWrap);
  titleWrap.appendChild(header);
}

/***** SHOW TITLE *****/

function showTitle() {
  //SHOW TITLE WRAPPER
  const showTitleWrapper = document.createElement("div");
  showTitleWrapper.classList.add("show-title-wrapper");
  body.appendChild(showTitleWrapper);

  //SHOW TITLE TEXT
  const showTitle = document.createElement("h1");
  showTitle.classList.add("show-title");
  showTitle.textContent = `Game of Thrones`;
  showTitleWrapper.appendChild(showTitle);
}

  /***** FORMAT SHOW DATA *****/
  function formatShowData(seasonNum, episodeNum) {
    if (seasonNum < 10) {
      seasonNum = `0${seasonNum}`;
    }
  
    if (episodeNum < 10) {
      episodeNum = `0${episodeNum}`;
    }
  
    let format = `S${seasonNum}E${episodeNum}`;
    return format;
  }

/***** SEARCH AREA *****/

function createSearchArea() {
  //SEARCH BAR WRAPPER
  searchBarWrapper.classList.add("search-bar-wrapper");
  body.appendChild(searchBarWrapper);

  //SELECT DROP DOWN OPTIONS
  const dropdownWrapper = document.createElement("form");
  dropdownWrapper.classList.add("dropdown-form");
  dropdownSelection.classList.add("dropdown-selector");
  dropdownSelection.setAttribute("name", "dropdown-selection");
  dropdownSelection.setAttribute("label", "select-episode");
  searchBarWrapper.appendChild(dropdownWrapper);
  dropdownWrapper.appendChild(dropdownSelection);

  //POPULATE OPTIONS FROM ARRAY - FORMATTED SEASON & EPISODE NUM (CODE USED TWICE)
  const arrDropdown = [...allEpisodes];
  arrDropdown.unshift({ name: "default" });

  arrDropdown.forEach((episode, index) => {
    const options = document.createElement("option");
    options.setAttribute("label", `${formatShowData(episode.season, episode.number)} - ${episode.name}`);

    //Setting a default value
    if (index === 0) {
      options.setAttribute("selected", "selected");
      options.setAttribute("label", `List all Episodes`);
    }

    options.setAttribute("value", episode.name);
    dropdownSelection.appendChild(options);
  });

  //SEARCH INPUT
  searchInput.classList.add("search-input");
  searchInput.type = "text";
  searchInput.setAttribute("placeholder", "Search");
  searchInput.setAttribute("Name", "searchBar");
  searchInput.setAttribute("label", "search-episodes");
  searchBarWrapper.appendChild(searchInput);

  /***** EPISODE COUNT WRAPPER *****/
  counterWrapper.classList.add("counter-wrapper");
  counterWrapper.appendChild(countH2);
  searchBarWrapper.appendChild(counterWrapper);
  countH2.classList.add("counter-heading");
}

/***** TV-MAZE LINK *****/

function createTvMazeLink() {
  const tvMazeWrapper = document.createElement("div");
  tvMazeWrapper.classList.add("tv-maze-wrapper");
  body.appendChild(tvMazeWrapper);
  const tvMazeLink = document.createElement("a");
  tvMazeLink.setAttribute("target", "_blank");
  tvMazeLink.setAttribute("rel", "noreferrer noopener");
  tvMazeLink.classList.add("tv-maze-link");
  tvMazeLink.innerHTML = "SOURCED FROM TV-MAZE.COM";
  tvMazeLink.href = "https://www.tvmaze.com";
  tvMazeWrapper.appendChild(tvMazeLink);
}



/***** TILE AREA WRAPPER *****/

function createCardsWrapper() {
  body.appendChild(cardsWrapper);
  cardsWrapper.classList.add("cards-wrapper");
}

/***** DISPLAY EPISODE CARDS *****/

function displayEpisodeCards(episodeList) {
  cardsWrapper.innerHTML = ""; //why is this needed when the wrapper is empty of content anyway?
  episodeList.forEach((episode) => {
    //CREATING AN EPISODE CARD
    const card = document.createElement("div");
    card.classList.add("card");
    cardsWrapper.appendChild(card);

    //CARD IMG WRAPPER
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("img-wrapper");
    card.appendChild(imgWrapper);

    //IMAGES
    const images = document.createElement("img");
    images.classList.add("images");
    images.src = episode.image.medium;
    imgWrapper.appendChild(images);

    //CAPTURING SEASON & EPISODE DETAILS
    let seasonNum = episode.season;
    let episodeNum = episode.number;

    //CARD HEADER
    const cardHeader = document.createElement("h2");
    cardHeader.classList.add("card-header");
    cardHeader.textContent = episode.name + formatShowData(episode.season, episode.number);
    card.appendChild(cardHeader);

    //CARD PARAGRAPH
    const cardParagraph = document.createElement("p");
    cardParagraph.classList.add("card-paragraph-wrapper");
    cardParagraph.innerHTML = episode.summary;
    card.appendChild(cardParagraph);
  });
}

/***** ADD EVENT LISTENER TO DROPDOWN OPTIONS *****/
dropdownSelection.addEventListener("click", (e) => {
  const selectedOption = dropdownSelection.value;
  const displaySelected = allEpisodes.filter((episode) => {
    return episode.name.includes(selectedOption);
  });

  if (dropdownSelection.value === "default") {
    displayEpisodeCards(allEpisodes);
  } else {
    displayEpisodeCards(displaySelected);
  }
  countH2.textContent = `73 / 73 Episodes`;
  if (dropdownSelection.value !== "default") {
    countH2.textContent = `1 / 73 Episodes`;
  }
});

/***** EPISODE COUNT TEXT *****/
function counterText(filtered) {
  countH2.textContent = `${filtered.length} / 73 Episodes`;
}

/***** ADD EVENT LISTENER TO SEARCH BAR *****/
searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  let filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchValue) ||
      episode.summary.toLowerCase().includes(searchValue)
    );
  });
  displayEpisodeCards(filteredEpisodes);
  counterText(filteredEpisodes);
});

/***** ON SET UP *****/
function setup() {
  const allEpisodes = getAllEpisodes();
  projectTitle();
  showTitle(allEpisodes);
  createTvMazeLink();
  createSearchArea();
  createCardsWrapper();
  displayEpisodeCards(allEpisodes);
}

window.onload = setup;

/****************************************************************************************/

