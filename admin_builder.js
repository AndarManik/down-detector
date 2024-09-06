const uuidv4 = require("uuid").v4;
const { models, requestedModels } = require("./files");

let rotatingAdminUrl = uuidv4();
setInterval(() => (rotatingAdminUrl = uuidv4()), 1000 * 60 * 60);
function getRotatingAdminUrl() {
  return rotatingAdminUrl;
}

function buildLoginPage() {
  return `
<html>
<head>
    <title>Send Input to Server</title>
</head>
<body>
    <input id="textInput" type="text" placeholder="Enter your text here">
    <button onclick="sendInput()">Send</button>

    <script>
        function sendInput() {
            const input = document.getElementById('textInput').value;
            const url = '/get/rotating/' + encodeURIComponent(input);

            fetch(url)
            .then(response => response.json())
            .then(data => window.location.href = data)
            .catch(error => console.error('Error:', error));
        }
    </script>
</body>
</html>
`;
}

function buildAdminPage() {
  let data = "";
  Object.keys(models).forEach((key) => {
    data += `
    <div style="display: flex; justify-content: space-between;">
        ${key}
        <a class="click" onClick="document.getElementById('${(key + getRotatingAdminUrl() + "model").toLowerCase()}').style.display = 'block'; this.style.display='none';">remove</a>
        <a id="${(key + getRotatingAdminUrl()).toLowerCase() + "model"}" href="/remove/model/${key}/${getRotatingAdminUrl()}" style="display: none;">confirm</a>
    </div>`;
  });

  let data2 = "";
  requestedModels.forEach((model) => {
    data2 += `
    <div style="display: flex; justify-content: space-between;">
        ${model}
        <a class="click" onClick="document.getElementById('${(model + getRotatingAdminUrl()).toLowerCase() + "req"}').style.display = 'block'; this.style.display='none';">remove</a>
        <a id="${(model + getRotatingAdminUrl()).toLowerCase() + "req"}" href="/remove/request/${model}/${getRotatingAdminUrl()}" style="display: none;">confirm</a>
    </div>`;
  });

  return `
  <html>
  <head>
      <title>Send Input to Server</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <style>
        * {
          font-family: "Poppins", sans-serif;
          padding: 0;
          margin: 0;
          background-color: #f4f9f8;
          color: #040706;
        }

        .click {
            text-decoration: underline;
        }

        .click:hover {
            cursor: pointer;
        }
  
        html,
        body {
          width: 100svw;
          height: 100svh;
        }
        ::selection {
          background-color: #5ea797;
          color: #f4f9f8;
        }
    </style>
  </head>
  <body>
    <div style="padding: 3rem;">  
    <h1>Add new</h1>    
    <input id="textInput" type="text" placeholder="Enter your text here">
    <button onclick="window.location.href= '/new/model/'+ document.getElementById('textInput').value + '/${getRotatingAdminUrl()}'">Send</button>
    </div>
    

    <div style="padding: 3rem;">  
    <h1>Models</h1>    
    ${data}
    </div>

    <div style="padding: 3rem;">   
    <h1>Requested</h1>   
    ${data2}
    </div>

  </body>
  </html>
  `;
}

module.exports = { buildLoginPage, getRotatingAdminUrl, buildAdminPage };
