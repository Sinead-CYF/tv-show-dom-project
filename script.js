/***** ON SETUP *****/
window.onload = setup;

/***** GLOBAL ELEMENTS *****/
const body = document.querySelector("body");
body.classList.add("body");
const searchInput = document.createElement("input");
const cardsWrapper = document.createElement("div");
const showDropdownSelection = document.createElement("select");
const dropdownSelection = document.createElement("select");
const options = document.createElement("option");
const searchBarWrapper = document.createElement("section");
const counterWrapper = document.createElement("div");
const countH2 = document.createElement("h2");


/*****Episodes API *****/
const TvShowApi = "https://api.tvmaze.com/shows/82/episodes";
let allEpisodes;

/***** SET UP *****/
function setup() {
  fetch(TvShowApi)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw `${response.status} ${response.statusText}`;
    })
    .then((data) => {
      allEpisodes = data;
      pageTitle();
      createTvMazeLink();
      searchAreaWrapper();
      allShowsDropdown();
      allEpisodesDropdown();
      searchBar();
      showsAndEpisodeCounter();
      countH2.textContent = `${allEpisodes.length} / ${allEpisodes.length} Episodes`;
      createCardsWrapper();
      displayEpisodeCards(allEpisodes);
    })
    .catch((error) => {
      console.log("An Error Occurred:", error);
    });
}

/***** PAGE TITLE *****/
function pageTitle() {
  //SHOW TITLE WRAPPER
  const showTitleWrapper = document.createElement("div");
  showTitleWrapper.classList.add("show-title-wrapper");
  body.appendChild(showTitleWrapper);

  //SHOW TITLE TEXT
  const showTitle = document.createElement("h1");
  showTitle.classList.add("show-title");
  showTitle.innerHTML = `TV on Demand`;
  showTitleWrapper.appendChild(showTitle);
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

/***** CREATE SEARCH SECTION *****/
function searchAreaWrapper() {
  searchBarWrapper.classList.add("search-bar-wrapper");
  body.appendChild(searchBarWrapper);
}

/***** ALL SHOWS API *****/

let allShows_API = "https://api.tvmaze.com/shows";
let allShows;

fetch(allShows_API)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw `${response.status} ${response.statusText}`;
  })
  .then((data) => {
    allShows = data;
    console.log(allShows);
  })
  .catch((error) => {
    console.log("An Error Occurred:", error);
  });

/***** SEARCH BAR*****/
function searchBar() {
  searchInput.classList.add("search-input");
  searchInput.type = "text";
  searchInput.setAttribute("placeholder", "Search");
  searchInput.setAttribute("Name", "searchBar");
  searchInput.setAttribute("label", "search-episodes");
  searchBarWrapper.appendChild(searchInput);
}

/***** SHOWS DROP DOWN *****/
function allShowsDropdown() {
  const showDropdownWrapper = document.createElement("form");
  showDropdownWrapper.classList.add("dropdown-form");
  showDropdownSelection.classList.add("dropdown-selector");
  showDropdownSelection.setAttribute("name", "show-dropdown-selection");
  showDropdownSelection.setAttribute("label", "select-show");
  searchBarWrapper.appendChild(showDropdownWrapper);
  showDropdownWrapper.appendChild(showDropdownSelection);

  //POPULATE ALL SHOWS OPTIONS
  const arrShowsDropdown = [...allShows];
  
  const sortedShows = arrShowsDropdown.sort((a, b) =>
    a.name < b.name ? -1 : 1
  );

  sortedShows.unshift({ name: "default" });
  console.log(arrShowsDropdown);

  sortedShows.forEach((show, index) => {
    const showOptions = document.createElement("option");
    showOptions.setAttribute("label", `${show.name}`);

    if (index === 0) {
      showOptions.setAttribute("selected", "selected");
      showOptions.setAttribute("label", `List all shows`);
    }

    showOptions.setAttribute("value", show.name);
    showDropdownSelection.appendChild(showOptions);
  });
}

/***** EPISODE DROPDOWN *****/
function allEpisodesDropdown() {
  const dropdownWrapper = document.createElement("form");
  dropdownWrapper.classList.add("dropdown-form");
  dropdownSelection.classList.add("dropdown-selector");
  dropdownSelection.setAttribute("name", "dropdown-selection");
  dropdownSelection.setAttribute("label", "select-episode");
  searchBarWrapper.appendChild(dropdownWrapper);
  dropdownWrapper.appendChild(dropdownSelection);

  //POPULATE EPISODE OPTIONS FROM ARRAY - FORMATTED SEASON & EPISODE NUM
  const arrDropdown = [...allEpisodes];
  arrDropdown.unshift({ name: "default" });

  arrDropdown.forEach((episode, index) => {
    const options = document.createElement("option");
    options.setAttribute(
      "label",
      `${formatShowData(episode.season, episode.number)} - ${episode.name}`
    );

    //Setting a default value
    if (index === 0) {
      options.setAttribute("selected", "selected");
      options.setAttribute("label", `List all Episodes`);
    }

    options.setAttribute("value", episode.name);
    dropdownSelection.appendChild(options);
  });
}

/***** SHOW & EPISODE COUNTER *****/
function showsAndEpisodeCounter() {
  counterWrapper.classList.add("counter-wrapper");
  counterWrapper.appendChild(countH2);
  searchBarWrapper.appendChild(counterWrapper);
  countH2.classList.add("counter-heading");
}

/***** EPISODE COUNT TEXT *****/
function counterText(filtered) {
  countH2.textContent = `${filtered.length} / ${allEpisodes.length}`;
}

/***** TILE AREA WRAPPER *****/
function createCardsWrapper() {
  body.appendChild(cardsWrapper);
  cardsWrapper.classList.add("cards-wrapper");
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

/***** DISPLAY EPISODE CARDS *****/
function displayEpisodeCards(episodeList) {
  cardsWrapper.innerHTML = "";
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

    //CARD HEADER
    const cardHeader = document.createElement("h2");
    cardHeader.classList.add("card-header");
    cardHeader.textContent = `${episode.name} - ${formatShowData(
      episode.season,
      episode.number
    )}`;
    card.appendChild(cardHeader);

    //CARD PARAGRAPH
    const cardParagraph = document.createElement("p");
    cardParagraph.classList.add("card-paragraph-wrapper");
    cardParagraph.innerHTML = episode.summary;
    card.appendChild(cardParagraph);
  });
}

/***** ALL SHOWS - CARDS *****/
function showCards(shows) {
  cardsWrapper.innerHTML = "";
  shows.forEach((show) => {
    //CREATING AN SHOW CARD
    const card = document.createElement("div");
    card.classList.add("show-card");
    cardsWrapper.appendChild(card);

    //CARD IMG WRAPPER
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("show-img-wrapper");
    card.appendChild(imgWrapper);

    //IMAGES
    const images = document.createElement("img");
    images.classList.add("show-images");
    images.src = show.image.medium;
    imgWrapper.appendChild(images);

    //TITLE & PARAGRAPH WRAPPER
    const showTextWrapper = document.createElement("div");
    showTextWrapper.classList.add("show-text-wrapper");
    card.appendChild(showTextWrapper);

    //CARD HEADER
    const cardHeader = document.createElement("h2");
    cardHeader.classList.add("show-card-header");
    cardHeader.textContent = `${show.name}`;
    showTextWrapper.appendChild(cardHeader);

    //CARD PARAGRAPH
    const cardParagraph = document.createElement("p");
    cardParagraph.classList.add("show-card-paragraph-wrapper");
    cardParagraph.innerHTML = show.summary;
    showTextWrapper.appendChild(cardParagraph);

    //SHOW LINK
    const showLink = document.createElement("a");
    showLink.classList.add("show-link");
    showLink.href = show.url;
    showLink.setAttribute("target", "_blank");
    showLink.textContent= "Read More ...";
    showTextWrapper.appendChild(showLink);
  });
}

/***** ADD EVENT LISTENER TO EPISODE DROPDOWN OPTIONS *****/
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
  countH2.textContent = `${allEpisodes.length} / ${allEpisodes.length} Episodes`;
  if (dropdownSelection.value !== "default") {
    countH2.textContent = `1 / ${allEpisodes.length} Episodes`;
  }
});

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

/***** ADD EVENT LISTENER TO SHOW DROPDOWN OPTIONS *****/
showDropdownSelection.addEventListener("click", (e) => {
  const selectedShowOption = showDropdownSelection.value;
  console.log(selectedShowOption);
  const displaySelectedShows = allShows.filter((show) => {
    return show.name.includes(selectedShowOption);
  });

  if (showDropdownSelection.value === "default") {
    showCards(allShows);
  } else {
    showCards(displaySelectedShows);
  }
  countH2.textContent = `${allShows.length} / ${allShows.length} Shows`;
  if (showDropdownSelection.value !== "default") {
    countH2.textContent = `1 / ${allShows.length} Shows`;
  }
});

/****************************************************************************************/
