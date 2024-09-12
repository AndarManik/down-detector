function buildPage(model, data) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
        display:flex;
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
        height: 21rem;
        padding-left: 6rem;
        padding-right: 6rem;
        display: flex;
        width: calc(100% - 12rem);
        max-width: 50rem;
      }

      #model {
        display: flex;
        flex: 2;
        align-items: center;
        height: 100%;
      }

      #graph {
        display: flex;
        flex: 3;
        align-items: center;
        height: 100%;
      }

      #dumbbutton {
        border-radius: 2px;
        margin-top: 1rem;
        height: 3rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border: 0px solid #dbe0df;
        background-color: #5ea797;
        color: #f4f9f8;
        box-shadow: 5px 5px 0px #f4f9f8;
        transition: margin 0.1s, box-shadow 0.1s;
        box-shadow: 0rem 0rem 0px #c5c9c8;
        font-size: 1.25rem;
      }

      #dumbbutton:hover {
        border: 0px solid #dbe0df;
        background-color: #5ea797;
        box-shadow: 0.25rem 0.25rem 0px #c5c9c8;
        margin-top: 0.75rem;
        margin-bottom: 0.25rem;
        margin-left: -0.25rem;
        margin-right: 0.25rem;
      }

      #dumbbutton:active {
        border: 0px solid #dbe0df;
        background-color: #5ea797;
        box-shadow: 0rem 0rem 0px #c5c9c8;
        margin-top: 1rem;
        margin-left: 0rem;
        margin-bottom: 0rem;
        margin-right: 0rem;
      }

      #myChart {
        display: block;
        width: 100%;
        height: 100%;
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
        -webkit-appearance: none;
      }

      #searchbar:focus {
        outline: none;
        border: 0px solid black;
        border-bottom: 1px solid #c5c9c8;
        -webkit-appearance: none;
      }

      #search {
        margin-left: 1rem;
        font-size: 0.75rem;
        border-radius: 2px;
        height: 2rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border: 0px solid #dbe0df;
        background-color: #5ea797;
        color: #f4f9f8;
        box-shadow: 5px 5px 0px #f4f9f8;
        transition: margin 0.1s, box-shadow 0.1s;
        box-shadow: 0rem 0rem 0px #c5c9c8;
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
      <a href="/">Dumb Detector</a>
      <div> 
        <input id="searchbar" type="text" placeholder="Search..." />
        <div id="search-recommendation" style="position: absolute;">
        </div>
      </div>
      <button id="search">Search</button>
    </div>
    <div id="content">
      <div id="graph">
        <canvas id="myChart"></canvas>
      </div>      
      <div id="model">
        <div style="width: 100%; text-align: center;">
          <div style="display: flex; justify-content: center">
            <h1>${model}</h1>
          </div>
          <div style="display: flex; justify-content: center">
            <button id="dumbbutton">I think it got dumber</button>
          </div>
          <div style="display: flex; justify-content: center">
            <p id="received" style="position: absolute; display: none; margin-top: 1rem; color: #5ea797;"> Received </p>
          </div>

        </div>

      </div>
    </div>
  </body>
  <script>
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ${JSON.stringify(data[0])},
        datasets: [
          {
            label: "Detections",
            data: ${JSON.stringify(data[1])},
            backgroundColor: ["#b3dcd0"],
            borderColor: ["#5ea797"],
            borderWidth: 2,
            pointRadius: 2,
            fill: true,
          },
        ],
      },
      options: {
        border: {
          display: false,
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: true,
            },
            border:{
                display:false,
            },
            ticks: {
                stepSize: 1
            },
            beginAtZero: true,
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
        },
        plugins: {
          legend: {
            labels: {
              font: {
                family: "Poppins",
              },
            },
          },
        },
      },
    });

    document.getElementById("search").addEventListener("click", function() {
        window.location = document.querySelector("#searchbar").value;
    });

    document.querySelector("#searchbar").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        window.location = this.value;
    }
    });

    document.getElementById("dumbbutton").addEventListener("click", function() {
        document.getElementById("received").style.display = "block";

        const model = window.location.pathname.split('/')[1];
        fetch("/"+ model + "/increment")
        .then(response => response.json())
        .then(data => {
          myChart.data.labels = data[0];
          myChart.data.datasets[0].data = data[1];
          myChart.update();
        });
    });

    document.getElementById("searchbar").addEventListener("input", function() {
    const query = this.value;
    fetch('/fuzzy/search/' + query)
        .then(response => response.json())
        .then(data => {
            const searchRecommendation = document.getElementById("search-recommendation");
            searchRecommendation.innerHTML = "";
            data.forEach(item => {
                const resultItem = document.createElement("div");
                resultItem.textContent = item;
                resultItem.addEventListener("click", function() {
                    document.getElementById("searchbar").value = item;
                    document.getElementById("search").click();
                });
                resultItem.classList.add("searchResult");
                searchRecommendation.appendChild(resultItem);
            });
        });
});

document.getElementById("searchbar").addEventListener("input", function() {
    const query = this.value;
    if (!query) {
        document.getElementById("search-recommendation").innerHTML = "";
    }
});

document.getElementById("searchbar").addEventListener("blur", function() {
    setTimeout(() => {
        document.getElementById("search-recommendation").innerHTML = "";
    }, 500); // Clear recommendations after a delay when user leaves the search bar
});
  </script>
</html>
`;
}

module.exports = buildPage;
