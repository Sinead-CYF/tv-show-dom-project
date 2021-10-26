//GLOBAL ELEMENTS
const body = document.querySelector("body");
body.classList.add("body");
const searchInput = document.createElement("input");
const allEpisodes = getAllEpisodes();
const cardsWrapper = document.createElement("div");
const dropdownSelection = document.createElement("select");
const options = document.createElement("option");

function projectTitle() {
  const titleWrap = document.createElement("div");
  titleWrap.classList.add("title-wrapper");
  const header = document.createElement("h1");
  header.innerText = "TV DOM Project";
  body.appendChild(titleWrap);
  titleWrap.appendChild(header);
}

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

function createSearchArea() {
  //SEARCH BAR WRAPPER
  const searchBarWrapper = document.createElement("section");
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
  allEpisodes.forEach((episode) => {
    let seasonNum = episode.season;
    let episodeNum = episode.number;

    if (seasonNum < 10) {
      seasonNum = `0${seasonNum}`;
    }

    if (episodeNum < 10) {
      episodeNum = `0${episodeNum}`;
    }
    let formattedName = `S${seasonNum}E${episodeNum}`;

    const options = document.createElement("option");
    options.setAttribute("label", `${formattedName} - ${episode.name}`);
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

  //EPISODE COUNT DISPLAY
  const counterWrapper = document.createElement("div");
  counterWrapper.classList.add("counter-wrapper");
  const countH2 = document.createElement("h2");
  countH2.classList.add("counter-heading");
  countH2.textContent = `${allEpisodes.length} Episodes`;
  counterWrapper.appendChild(countH2);
  searchBarWrapper.appendChild(counterWrapper);
}

function createTvMazeLink() {
  const tvMazeWrapper = document.createElement("div");
  tvMazeWrapper.classList.add("tv-maze-wrapper");
  body.appendChild(tvMazeWrapper);
  const tvMazeLink = document.createElement("a");
  tvMazeLink.classList.add("tv-maze-link");
  tvMazeLink.innerHTML = "SOURCED FROM TV-MAZE.COM";
  tvMazeLink.href = "https://www.tvmaze.com";
  tvMazeWrapper.appendChild(tvMazeLink);
}

/******************************************************************************************************************* 
 
I TRIED CREATING A FUNCTION TO FORMAT THE SEASON & EPISODE NUM BUT IT KEPT RETURNING UNDEFINED 

function formatSeasonAndEpisode(allEpisodes) {
  allEpisodes.forEach((episode) => {
    //CAPTURING SEASON & EPISODE DETAILS
    let seasonNum = episode.season;
    let episodeNum = episode.number;

    //ZERO-PADDING NUMBERS
    if (seasonNum < 10) {
      seasonNum = `0${seasonNum}`;
    }

    if (episodeNum < 10) {
      episodeNum = `0${episodeNum}`;
    }
    let formattedName = `S${seasonNum}E${episodeNum}`;
    return formattedName;
  });
}

console.log(formatSeasonAndEpisode(allEpisodes)); 

******************************************************************************************************************/

//TILE-AREA WRAPPER
function createCardsWrapper() {
  body.appendChild(cardsWrapper);
  cardsWrapper.classList.add("cards-wrapper");
}

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

    //ZERO-PADDING NUMBERS
    if (seasonNum < 10) {
      seasonNum = `0${seasonNum}`;
    }

    if (episodeNum < 10) {
      episodeNum = `0${episodeNum}`;
    }

    let formattedName = `S${seasonNum}E${episodeNum}`;

    //CARD HEADER
    const cardHeader = document.createElement("h2");
    cardHeader.classList.add("card-header");
    cardHeader.textContent = `${formattedName}`;
    card.appendChild(cardHeader);

    //CARD PARAGRAPH
    const cardParagraph = document.createElement("p");
    cardParagraph.classList.add("card-paragraph-wrapper");
    cardParagraph.innerHTML = episode.summary;
    card.appendChild(cardParagraph);
  });
}

//ADD EVENT LISTENER TO DROPDOWN OPTIONS
dropdownSelection.addEventListener("click", (e) => {
  const selectedOption = dropdownSelection.value; 
  const displaySelected = allEpisodes.filter((episode) => {
    return episode.name.includes(selectedOption);
  });
  //  console.log(selectedOption);
  displayEpisodeCards(displaySelected);
});

//ADD EVENT LISTENER TO SEARCH BAR
searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value;
  const filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.includes(searchValue) ||
      episode.summary.includes(searchValue)
    );
  });
  // console.log(searchValue);
  displayEpisodeCards(filteredEpisodes);
});

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

/****************************************************************************************

*** Level 100 - minimal features: ***

All episodes must be shown - DONE 
For each episode, AT LEAST following must be displayed:

the episode's name -- DONE
the season number  --  DONE
the episode number  -- DONE
the episode's medium-sized image -- DONE
the episode's summary text -- DONE

You should combine season number and episode number into an episode code:
Each part should be zero-padded to two digits.
Example: S02E07 would be the code for the 7th episode of the 2nd season. 
S2E7 would be incorrect. -- DONE

Your page should state somewhere that the data has 
(originally) come from TVMaze.com, and link back to that site 
(or the specific episode on that site). See tvmaze.com/api#licensing. -- DONE

*****************************************************************************************

*** Level 200 - add Search:*** 

Add a "live" search input:
Only episodes whose summary OR name contains the search term should be displayed
The search should be case-insensitive
The display should update immediately after each keystroke changes the input.
Display how many episodes match the current search
If the search box is cleared, all episodes should be shown. - DONE 

*** NO IDEA WHAT ANY OF THIS MEANS ****
If you have been fetching the episode data from the API, 
be careful not to cause many frequent requests with this search feature. 
The search should look through an in-memory copy of the episode list. 
Do not fetch the data again each time something is typed!

*****************************************************************************************

*** Level 300 - add an Episode Selector: ***

Add a select input which allows you to jump quickly to an episode:
The select input should list all episodes in the format: "S01E01 - Winter is Coming"
When the user makes a selection, they should be taken directly to that episode in the list
Bonus: if you prefer, when the select is used, ONLY show the selected episode. 
If you do this, be sure to provide a way for the user to see all episodes again.

*/
