//GLOBAL ELEMENTS
const body = document.querySelector("body");
body.classList.add("body");

//PAGE TITLE
const titleWrap = document.createElement("div");
titleWrap.classList.add("title-wrapper");
const header = document.createElement("h1");
header.innerText = "TV DOM Project";
body.appendChild(titleWrap);
titleWrap.appendChild(header);

function makePageForEpisodes(episodeList) {
  //EPISODE COUNT BANNER
  const episodeCountWrap = document.createElement("div");
  episodeCountWrap.classList.add("episode-count-wrapper");
  const episodeCountPara = document.createElement("p");
  episodeCountPara.textContent = `${episodeList.length} episode(s)`;
  body.appendChild(episodeCountWrap);
  episodeCountWrap.appendChild(episodeCountPara);

  //TILE-AREA WRAPPER
  const cardsWrapper = document.createElement("div");
  body.appendChild(cardsWrapper);
  cardsWrapper.classList.add("cards-wrapper");

  episodeList.forEach(episode => {

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
  cardHeader.textContent = `${episode.name} - S1E12`;
  card.appendChild(cardHeader);

  //CARD PARAGRAPH
  const cardParagraph = document.createElement("div");
  cardParagraph.classList.add("card-paragraph-wrapper");
  cardParagraph.innerHTML = episode.summary;
  card.appendChild(cardParagraph);
  });

  
}

function setup() {
  const allEpisodes = getAllEpisodes(); //all episodes array
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;

/****************************************************************************************

*** Level 100 - minimal features: ***

All episodes must be shown
For each episode, AT LEAST following must be displayed:

the episode's name
the season number
the episode number
the episode's medium-sized image
the episode's summary text

You should combine season number and episode number into an episode code:
Each part should be zero-padded to two digits.
Example: S02E07 would be the code for the 7th episode of the 2nd season. 
S2E7 would be incorrect.
Your page should state somewhere that the data has 
(originally) come from TVMaze.com, and link back to that site 
(or the specific episode on that site). See tvmaze.com/api#licensing. 

*****************************************************************************************

*** Level 200 - add Search:*** 

Add a "live" search input:
Only episodes whose summary OR name contains the search term should be displayed
The search should be case-insensitive
The display should update immediately after each keystroke changes the input.
Display how many episodes match the current search
If the search box is cleared, all episodes should be shown.
If you have been fetching the episode data from the API, 
be careful not to cause many frequent requests with this search feature. 
The search should look through an in-memory copy of the episode list. 
Do not fetch the data again each time something is typed!

*****************************************************************************************

*** Level 300 - add an Episode Selector: ***

Complete all requirements from level 200
Add a select input which allows you to jump quickly to an episode:
The select input should list all episodes in the format: "S01E01 - Winter is Coming"
When the user makes a selection, they should be taken directly to that episode in the list
Bonus: if you prefer, when the select is used, ONLY show the selected episode. 
If you do this, be sure to provide a way for the user to see all episodes again.

*/
