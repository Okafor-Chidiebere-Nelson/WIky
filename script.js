const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const wikipediaForm = document.querySelector(".wikipedia-form");
const searchInput = document.querySelector(".searchInput");
const submitBtn = document.querySelector(".submitBtn");
const resultsDiv = document.querySelector(".resultsDiv");

const darkmodeIconContainer = document.querySelector(
  ".darkmode-icon-container"
);

// window.addEventListener("DOMContentLoaded", () => {
//   resultsDiv.innerHTML = "";
// });

wikipediaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = searchInput.value;
  if (!value) {
    resultsDiv.innerHTML = `<div class = "error">Please enter a real thing </div>`;
  } else {
    searchAPI(value);
  }
});

async function searchAPI(searchValue) {
  resultsDiv.innerHTML = `<div class = "loading"> </div>`;

  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const result = data.query.search;
    console.log(result);
    if (result.length < 1) {
      resultsDiv.innerHTML = `<div class="error" >No matching results found.</div>`;
    }
    renderAPI(result);
  } catch (error) {
    resultsDiv.innerHTML = `<div class = "error">An error occurred. </div>`;
  }
}

function renderAPI(list) {
  const searchCard = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `<a class="search-card" href=http://en.wikipedia.org/?curid=${pageid} target = "_blank">
                 <h4 class="title"> ${title}</h4>
                <p class="paragraph"> ${snippet}</p>
              </a>`;
    })
    .join("");
  resultsDiv.innerHTML = `<div class="article"> ${searchCard}</div>`;

  const searchCards = document.querySelectorAll(".search-card");
  console.log(searchCards.length);

  searchShadow = searchCards.forEach((item) => {
    item.addEventListener("mouseover", (shadow) => {
      shadow.style.boxShadow = "1px 1px 10px var(--white)";
    });
  });

  nelson = function searchCardDarkMode() {
    for (let i = 0; i < searchCards.length; i++) {
      searchCards[i].classList.toggle("search-card-darkmode");
      console.log(searchCards[i]);
    }
  };
}

darkmodeIconContainer.addEventListener("click", () => {
  document.body.classList.toggle("darkmode");
  wikipediaForm.classList.toggle("wikipedia-form-darkmode-toggle");

  setTimeout(nelson, 50);
  setTimeout(searchShadow, 50);
  //   searchCard.forEach((item) => {
  //     item.classList.toggle("darkmode");

  //   });
  //

  //   searchCard.classList.toggle("darkmode");

  //   searchCard.addEventListener("mouseover", () => {
  //     searchCard.style.backgroundColor = "white";
  //     searchCard.style.color = "black";
  //   });
});
