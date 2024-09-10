function buildHome() {
    return `<!DOCTYPE html>
    <!-- saved from url=(0025)https://dumbdetector.com/ -->
    <html lang="en">
      <link type="text/css" rel="stylesheet" id="dark-mode-custom-link" /><link
        type="text/css"
        rel="stylesheet"
        id="dark-mode-general-link"
      /><style lang="en" type="text/css" id="dark-mode-custom-style"></style
      ><style lang="en" type="text/css" id="dark-mode-native-style"></style
      ><style lang="en" type="text/css" id="dark-mode-native-sheet"></style
      ><head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="" />
        <link href="./Dumb Detector_files/css2" rel="stylesheet" />
        <script src="./Dumb Detector_files/chart.js.download"></script>
        <title>Dumb Detector</title>
        <style>
          * {
            font-family: "Poppins", sans-serif;
            padding: 0;
            margin: 0;
            background-color: #f4f9f8;
            color: #040706;
          }
    
          html,
          body {
            width: 100svw;
            height: 100svh;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
    
          #header {
            display: flex;
            justify-content: space-between;
            height: 6rem;
            padding-left: 6rem;
            padding-right: 6rem;
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            font-weight: 600;
            width: calc(100% - 12rem);
            max-width: 50rem;
          }
    
          #header :nth-child(1) {
            margin-right: auto;
          }
    
          #content {
            height: calc(75svh - 6rem);
            padding-left: 6rem;
            padding-right: 6rem;
            width: calc(100% - 12rem);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            max-width: 50rem;
          }
    
          a {
            text-decoration: none;
          }
    
          a:hover {
            text-decoration: none;
            color: #5ea797;
          }
    
          #searchbar {
            right: auto;
            border: 0px solid black;
            border-bottom: 1px solid #c5c9c8;
            width: 20rem;
            -webkit-appearance: none;
          }
    
          #searchbar:focus {
            outline: none;
            border: 0px solid black;
            border-bottom: 1px solid #c5c9c8;
            -webkit-appearance: none;
          }
    
          #search {
            width: 5rem;
            margin-left: 1rem;
            font-size: 0.75rem;
            border-radius: 2px;
            height: 2.5rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            border: 0px solid #dbe0df;
            background-color: #5ea797;
            color: #f4f9f8;
            box-shadow: 5px 5px 0px #f4f9f8;
            transition: margin 0.1s, box-shadow 0.1s;
            box-shadow: 0rem 0rem 0px #c5c9c8;
          }
    
          h1 {
            font-weight: 500;
            font-size: 2.5rem;
            margin-bottom: 2rem;
          }
    
          #search:hover {
            border: 0px solid #dbe0df;
            box-shadow: 0.25rem 0.25rem 0px #c5c9c8;
            margin-top: -0.25rem;
            margin-bottom: 0.25rem;
            margin-left: 0.75rem;
            margin-right: 0.25rem;
          }
    
          #search:active {
            border: 0px solid #dbe0df;
            box-shadow: 0rem 0rem 0px #c5c9c8;
            margin-top: 0rem;
            margin-bottom: 0rem;
            margin-left: 1rem;
            margin-right: 0rem;
          }
    
          .searchResult {
            font-size: 1rem;
            font-weight: 500;
          }
    
          .searchResult:hover {
            background-color: #5ea797;
            color: #f4f9f8;
            cursor: pointer;
          }
    
          ::selection {
            background-color: #5ea797;
            color: #f4f9f8;
          }
    
          @media only screen and (max-width: 860px) {
            #content {
              margin-top: 3rem;
              flex-direction: column;
              align-items: center;
              width: calc(100% - 2rem);
              padding-left: 1rem;
              padding-right: 1rem;
            }
    
            #header {
              height: 4rem;
              font-size: 1rem;
              width: calc(100% - 2rem);
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }
        </style>
      </head>
      <body>
        <div id="header">
          <a href="https://dumbdetector.com/">Dumb Detector</a>
        </div>
        <div id="content">
          <h1>Monitor LLM nerfs in real-time</h1>
          <div style="display: flex;">
            <input id="searchbar" type="text" placeholder="Search..." />
            <div id="search-recommendation"></div>
            <button id="search">Search</button>
          </div>
        </div>
    
        <script>
          document.getElementById("search").addEventListener("click", function () {
            window.location = document.querySelector("#searchbar").value;
          });
    
          document
            .querySelector("#searchbar")
            .addEventListener("keypress", function (event) {
              if (event.key === "Enter") {
                window.location = this.value;
              }
            });
    
          document
            .getElementById("searchbar")
            .addEventListener("input", function () {
              const query = this.value;
              fetch("/fuzzy/search/" + query)
                .then((response) => response.json())
                .then((data) => {
                  const searchRecommendation = document.getElementById(
                    "search-recommendation"
                  );
                  searchRecommendation.innerHTML = "";
                  data.forEach((item) => {
                    const resultItem = document.createElement("div");
                    resultItem.textContent = item;
                    resultItem.addEventListener("click", function () {
                      document.getElementById("searchbar").value = item;
                      document.getElementById("search").click();
                    });
                    resultItem.classList.add("searchResult");
                    searchRecommendation.appendChild(resultItem);
                  });
                });
            });
    
          document
            .getElementById("searchbar")
            .addEventListener("input", function () {
              const query = this.value;
              if (!query) {
                document.getElementById("search-recommendation").innerHTML = "";
              }
            });
    
          document
            .getElementById("searchbar")
            .addEventListener("blur", function () {
              setTimeout(() => {
                document.getElementById("search-recommendation").innerHTML = "";
              }, 500); // Clear recommendations after a delay when user leaves the search bar
            });
        </script>
      </body>
    </html>
    `;
  }

  module.exports = buildHome;