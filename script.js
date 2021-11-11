/***** GLOBAL ELEMENTS *****/
const body = document.querySelector("body");
body.classList.add("body");
const searchInput = document.createElement("input");
const cardsWrapper = document.createElement("div");
const showDropdownSelection = document.createElement("select");
showDropdownSelection.setAttribute("id", "show-options-value");
const dropdownSelection = document.createElement("select");
const options = document.createElement("option");
const searchBarWrapper = document.createElement("section");
const counterWrapper = document.createElement("div");
const countH2 = document.createElement("h2");
const showDropdownWrapper = document.createElement("form");

/***** ALL SHOWS API *****/
const allShows = getAllShows();
console.log(allShows);
// const allShows_URL: "https://api.tvmaze.com/shows"

/***** ON SETUP *****/
window.onload = setup;

function setup() {
  // getEpisodeData();
  pageTitle();
  createTvMazeLink();
  searchAreaWrapper();
  allShowsDropdown();
  allEpisodesDropdown();
  searchBar();
  showsAndEpisodeCounter();
  showCount(allShows, allShows);
  createCardsWrapper();
  showCards(allShows);
}

/***** EPISODES API *****/
let selectedShow;
let episodes_API = `https://api.tvmaze.com/shows/22/episodes`;
let allEpisodes;
console.log(allEpisodes); // << undefined

// function getEpisodeData(showId) {
// << doesn't work as a function can't find allEpisodes array
fetch(episodes_API)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw `${response.status} ${response.statusText}`;
  })
  .then((data) => {
    allEpisodes = data; // << not iterable as a function
  })
  .catch((error) => {
    console.log("An Error Occurred:", error);
  });
// }

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

/***** CREATE SEARCH BAR*****/
function searchBar() {
  searchInput.classList.add("search-input");
  searchInput.type = "text";
  searchInput.setAttribute("placeholder", "Search");
  searchInput.setAttribute("Name", "searchBar");
  searchInput.setAttribute("label", "search-episodes");
  searchBarWrapper.appendChild(searchInput);
}

/***** SHOWS DROPDOWN OPTIONS *****/
function allShowsDropdown() {
  // const showDropdownWrapper = document.createElement("form");
  showDropdownWrapper.setAttribute("id", "show-dropdown-wrapper");
  showDropdownWrapper.classList.add("dropdown-form");
  showDropdownSelection.classList.add("dropdown-selector");
  showDropdownSelection.setAttribute("name", "show-dropdown-selection");
  showDropdownSelection.setAttribute("label", "select-show");
  searchBarWrapper.appendChild(showDropdownWrapper);
  showDropdownWrapper.appendChild(showDropdownSelection);

  //POPULATE SHOW OPTIONS
  const arrShowsDropdown = [...allShows];
  sortedShows = arrShowsDropdown.sort((a, b) => (a.name < b.name ? -1 : 1));
  sortedShows.unshift({ id: "default" });
  console.log(arrShowsDropdown);

  sortedShows.forEach((show, index) => {
    const showOptions = document.createElement("option");
    showOptions.setAttribute("label", `${show.name}`);

    if (index === 0) {
      showOptions.setAttribute("selected", "selected");
      showOptions.setAttribute("label", `List all shows`);
    }

    showOptions.setAttribute("value", show.id);
    showDropdownSelection.appendChild(showOptions);
  });
}

/***** SHOW & EPISODE COUNTER *****/
function showsAndEpisodeCounter() {
  counterWrapper.classList.add("counter-wrapper");
  counterWrapper.appendChild(countH2);
  searchBarWrapper.appendChild(counterWrapper);
  countH2.classList.add("counter-heading");
}

/***** SHOW COUNT TEXT *****/
function showCount(arr, arr2) {
  countH2.textContent = `${arr.length} / ${arr2.length} Shows`;
}

/***** EPISODE COUNT TEXT *****/
function episodeCount(arr, arr2) {
  countH2.textContent = `${arr.length} / ${arr2.length} Episodes`;
}

/***** ALL CARDS WRAPPER *****/
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

/***** CREATE SHOW CARDS *****/
function showCards(shows) {
  cardsWrapper.innerHTML = "";
  shows.forEach((show) => {
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
    showLink.textContent = "Read More ...";
    showTextWrapper.appendChild(showLink);
  });
}

/***** EVENT LISTENER - SHOW DROPDOWN OPTIONS *****/
showDropdownSelection.addEventListener("click", (e) => {
  selectedShow = showDropdownSelection.value;
  episodes_API = `https://api.tvmaze.com/shows/${selectedShow}/episodes`;
  console.log(selectedShow);
  console.log(episodes_API);

  const displaySelectedShows = allShows.filter((show) => {
    return selectedShow == show.id;
  });

  if (showDropdownSelection.value === "default") {
    showCards(allShows);
  } else {
    showCards(displaySelectedShows);
  }

  if (showDropdownSelection.value !== "default") {
    showCount(displaySelectedShows, allShows);
    // showDropdownWrapper.style.display = "none";
  }
});



/***** POPULATE EPISODE OPTIONS *****/
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

/***** CREATE EPISODE CARDS *****/
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

/***** EVENT LISTENER - EPISODE DROPDOWN OPTIONS *****/
dropdownSelection.addEventListener("click", (e) => {
  let selectedEpisode = dropdownSelection.value;
  const displaySelected = allEpisodes.filter((episode) => {
    return episode.name.includes(selectedEpisode);
  });

  if (dropdownSelection.value === "default") {
    displayEpisodeCards(allEpisodes);
  } else {
    displayEpisodeCards(displaySelected);
  }

  episodeCount(allEpisodes, allEpisodes);

  if (dropdownSelection.value !== "default") {
    episodeCount(displaySelected, allEpisodes);
  }
});

/***** ADD EVENT LISTENER TO SEARCH BAR *****/
searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  let filteredShows = allShows.filter((show) => {
    return show.name.toLowerCase().includes(searchValue);
    // || show.summary.toLowerCase().includes(searchValue)
  });
  showCards(filteredShows);
  counterText(filteredShows);

  // let filteredEpisodes = allEpisodes.filter((episode) => {
  //   return (
  //     episode.name.toLowerCase().includes(searchValue) ||
  //     episode.summary.toLowerCase().includes(searchValue)
  //   );
  // });
  // displayEpisodeCards(filteredEpisodes);
  // counterText(filteredEpisodes);
});
