//GLOBAL ELEMENTS
const body = document.querySelector("body");
body.classList.add("body");
const searchInput = document.createElement("input");
const allEpisodes = getAllEpisodes();

function createTitle() {
  //PAGE TITLE
  const titleWrap = document.createElement("div");
  titleWrap.classList.add("title-wrapper");
  const header = document.createElement("h1");
  header.innerText = "TV DOM Project";
  body.appendChild(titleWrap);
  titleWrap.appendChild(header);
}

function episodeCounter(allEpisodes) {
  //EPISODE COUNT WRAPPER
  const episodeCountWrap = document.createElement("div");
  episodeCountWrap.classList.add("episode-count-wrapper");
  body.appendChild(episodeCountWrap);

  //EPISODE COUNT PARAGRAPH
  const episodeCountPara = document.createElement("p");
  episodeCountPara.classList.add("episode-count-para");
  episodeCountPara.innerHTML = `${allEpisodes.length} Episodes`;
  episodeCountWrap.appendChild(episodeCountPara);
}

function createSearchBar() {
  //SEARCH BAR WRAPPER
  const searchBarWrapper = document.createElement("section");
  searchBarWrapper.classList.add("search-bar-wrapper");
  body.appendChild(searchBarWrapper);

  //SEARCH INPUT
  searchInput.classList.add("search-input");
  searchInput.type = "text";
  searchInput.setAttribute("placeholder", "Search");
  searchInput.setAttribute("Name", "searchBar");
  searchBarWrapper.appendChild(searchInput);
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

function displayEpisodeCards(episodeList) {

  //TILE-AREA WRAPPER
  const cardsWrapper = document.createElement("div");
  body.appendChild(cardsWrapper);
  cardsWrapper.classList.add("cards-wrapper");

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

    //CARD HEADER
    const cardHeader = document.createElement("h2");
    cardHeader.classList.add("card-header");
    cardHeader.textContent = `${episode.name} - S${seasonNum}${episodeNum}`;
    card.appendChild(cardHeader);

    //CARD PARAGRAPH
    const cardParagraph = document.createElement("p");
    cardParagraph.classList.add("card-paragraph-wrapper");
    cardParagraph.innerHTML = episode.summary;
    card.appendChild(cardParagraph);
  });
}

//ADD EVENT LISTENER TO SEARCH BAR
searchInput.addEventListener("keyup", (e) => {
  const searchValue = e.target.value;
  const filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.includes(searchValue) ||
      episode.summary.includes(searchValue)
    );
  });
  console.log(searchValue);
  // makePageForEpisodes(filteredEpisodes);
});

function setup() {
  const allEpisodes = getAllEpisodes();
  createTitle();
  episodeCounter(allEpisodes);
  createTvMazeLink();
  createSearchBar();
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
If the search box is cleared, all episodes should be shown.

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
