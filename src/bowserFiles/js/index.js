import validateObject from '../lib/ajv.js';
//import schema from "./lib/teste.js";
//var file;
window.bowserjr = {};

window.bowserjr.result = [];
window.bowserjr.resultWithoutObject = [];

// Get DOM elements.
const inputElement = document.getElementById("inputFile");
const dataLayerName = document.getElementById("inputDataLayerName");
const startButton = document.getElementById("startTest");
const stopButton = document.getElementById("stopTest");
const buttonExport = document.getElementById("export");
window.bowserjr.file;



// When a user uploads a file, the function handleFiles will be called.
inputElement.addEventListener("change", handleFiles, false);

// handleFiles will get the files, reader, and verify if the file is a .JSON file.
function handleFiles() {
  const fileTest = event.target.files;
  const reader = new FileReader();
  reader.readAsText(fileTest[0]);
  reader.onload = function () {
    try {
      startButton.disabled = false;
      window.bowserjr.file = JSON.parse(reader.result);
    } catch{
      alert("Selecione um arquivo JSON para prosseguir !!")
      startButton.disabled = true;
    }
  };
}


window.bowserjr.validateObject = validateObject;

window.bowserjr.validateObject ? console.log("Yay! BowserJR Loaded!") : console.log("BowserJR didn't load :'( ");


startButton.addEventListener("click", () => {
  // Verify if the dataLayer name and file exist.
  if (window.bowserjr.file && window[dataLayerName.value]) {

    window[dataLayerName.value].push_c = window[dataLayerName.value].push;
    window[dataLayerName.value].push = function (obj) {
      window[dataLayerName.value].push_c(obj);
      validateObject(window.file, obj);
    }
    // dlObj is an array with each event.
    let dlObj = [{ event: "update", aplicacao: { bandeira: "ex", dominio: "extra.com.br", ambiente: "producao", device: "desktop", servidor: "vitrineex109" } }, { event: "teste", usuario: { statusLogin: "visitante", idUnicoVia: "123456", idUsuario: "78910" } }, { event: "update", pagina: { url: "https://www.extra.com.br/site/paginavitrinenew.aspx", nomePagina: "/vitrine/home", templatePagina: "home", tituloPagina: "extracombr o site da familia e a maior loja de informatica do brasil" } }, { event: "checkout", ecommerce: { checkout: { etapa: 1, tipoFrete: "normal", tipoVendedor: "marketplace", quantidadeTotal: 1, produtos: [{ idDepartamento: "111", idLojista: "1111", idMarca: "1111", idProduto: "1111", nome: "TesteMonstro", nomeDepartamento: "1111111", nomeMarca: "1111111", preco: 111.1, quantidade: 0, sku: "1111111111", tipoVendedor: "marketplace1111" }, { idDepartamento: "836", idLojista: "11578", idMarca: "3615", idProduto: "9984900", nome: "pneu aro 13 goodyear 17570 direction touring sl 82t", nomeDepartamento: "automotivo", nomeMarca: "goodyear", preco: 197.9, quantidade: 1, sku: "13566580", tipoVendedor: "marketplace" }] } } }]
    // Events are sent to the dataLayer.
    dlObj.forEach((event) => {
      window[dataLayerName.value].push(event);
    });
    // After clicked on the start button, the button will be hidden.
    startButton.disabled = true;
    stopButton.disabled = false;
    inputElement.disabled = true;
  } else {
    if (!window[dataLayerName.value]) alert("O dataLayer informado não existe!");
    alert("Informe o nome do dataLayer e carregue o arquivo.");
  }
});


// When clicked in the stop button, the arrow function will do the last eval and verify if some event was forgotten.
stopButton.addEventListener("click", () => {
  console.log("Realizing last eval");
  validateObject(window.file, {});
  stopButton.disabled = true;
  buttonExport.disabled = false;

  logify("table");
});

function logify(elementTag) {
  const divLogs = document.getElementById("logs");
  const pdfLogs = document.createElement("div");
  let b;
  for (let i = 0; i < window.bowserjr.result.length; i++) {
    let message = window.bowserjr.result[i];
    let messageWithoutObject = window.bowserjr.resultWithoutObject[i];

    let paragraphy = document.createElement("p");
    paragraphy.setAttribute("class", "content")

    let divTrack = document.createElement("div");

    let divQsWrapper = document.createElement("div");
    divQsWrapper.setAttribute("class", "qsWrapper");

    let queryString = document.createElement(elementTag);
    queryString.setAttribute("class", "queryString");
    queryString.setAttribute("style", "list-style: none;");

    //const divLogs = document.getElementById("logs");
    //const pdfLogs = document.createElement("div");

    let sectionSucessfuly = document.createElement("section");
    sectionSucessfuly.setAttribute("class", "sucessfuly");

    let sectionErro = document.createElement("section");
    sectionErro.setAttribute("class", "erro");

    paragraphy.appendChild(document.createTextNode(messageWithoutObject));

    if (message.includes("Validated Successfully")) {
      let labelOk = document.createElement("hr");
      labelOk.setAttribute("class", "label ok");
      divTrack.setAttribute("class", "track pageview");
      //divLogs.appendChild(divTrack);
      divTrack.appendChild(labelOk);
      divTrack.appendChild(sectionSucessfuly);
      sectionSucessfuly.appendChild(paragraphy);
      sectionSucessfuly.appendChild(divQsWrapper);
      divQsWrapper.appendChild(queryString);

    } else if (message.includes("ERROR")) {
      let labelErro = document.createElement("hr");
      labelErro.setAttribute("class", "label error");
      divTrack.setAttribute("class", "track erro");
      //divLogs.appendChild(divTrack);
      divTrack.appendChild(labelErro);
      divTrack.appendChild(sectionErro);
      sectionErro.appendChild(paragraphy);
      sectionErro.appendChild(divQsWrapper);
      divQsWrapper.appendChild(queryString);
    } else {
      let labelWarning = document.createElement("hr");
      labelWarning.setAttribute("class", "label warn");
      divTrack.setAttribute("class", "track exception");
      //divLogs.appendChild(divTrack);
      divTrack.appendChild(labelWarning);
      divTrack.appendChild(sectionErro);
      sectionErro.appendChild(paragraphy);
      sectionErro.appendChild(divQsWrapper);
      divQsWrapper.appendChild(queryString);
    }

    function treatment(event, objName, index, doc) {
      let keys = Object.keys(event); // Get the keys in the object.
      let countAux = 0;

      keys.forEach((key) => {
        if (message.includes(key)) countAux++;
      });
 
      // Verify if all keys are included in the message.
      if (keys.length == countAux) {
        switch(doc) {
          case "table": 
            keys.forEach((key) => {
              let logLine = document.createElement("tr");

              if (message.includes("WARNING")) {
                if (messageWithoutObject.includes(key)) {
                  logLine.setAttribute("id", "warning");
                }
              }

              let logKey = document.createElement("td");
              logKey.setAttribute("class", "key");
              let keyText = index || index === 0 ? objName + "[" + index + "]" + "." + key : objName + "." + key;
              logKey.appendChild(document.createTextNode(keyText));
              logLine.appendChild(logKey); // Write the Key in the line

              let logValue = document.createElement("td");
              logValue.setAttribute("class", "value");
              //console.log(event[key]);
              //console.log(typeof event[key]);
              if (Array.isArray(event[key])) {
                //console.log("teste")
                logValue.appendChild(document.createTextNode("Array[ ]"));
                logLine.appendChild(logValue); // Write the Value in the line.
                queryString.appendChild(logLine); // Write the Line in the table.
                for (let i = 0; i < event[key].length; i++) {
                  treatment(event[key][i], keyText, i, elementTag);
                };
              } else if (typeof event[key] == "object") { // Verify if the event[key] was an object.
                logValue.appendChild(document.createTextNode("Object{ }"));
                logLine.appendChild(logValue); // Write the Value in the line.
                queryString.appendChild(logLine); // Write the Line in the table.
                // console.log(event[key]);
                treatment(event[key], keyText, null, elementTag);
              } else {
                // console.log(event[key]);
                logValue.appendChild(document.createTextNode('"' + event[key] + '"'));
                logLine.appendChild(logValue); // Write the Value in the line.
                queryString.appendChild(logLine); // Write the Line in the table.
              }
            });
            break;
          case "div":
            keys.forEach((key) => {
              let logLine = document.createElement("p");

              if (message.includes("WARNING")) {
                if (messageWithoutObject.includes(key)) {
                  logLine.setAttribute("id", "warning");
                }
              }

              let keyText = index || index === 0 ? objName + "[" + index + "]" + "." + key : objName + "." + key;
              logLine.appendChild(document.createTextNode(keyText));

              if (Array.isArray(event[key])) {
                //console.log("teste")
                logLine.innerText += ": Array[ ]";
                queryString.appendChild(logLine); // Write the Line in the table.
                for (let i = 0; i < event[key].length; i++) {
                  treatment(event[key][i], keyText, i, elementTag);
                };
              } else if (typeof event[key] == "object") { // Verify if the event[key] was an object.
                logLine.innerText += ": Object{ }";
                queryString.appendChild(logLine); // Write the Line in the table.
                // console.log(event[key]);
                treatment(event[key], keyText, null, elementTag);
              } else {
                // console.log(event[key]);
                logLine.innerText += ': "' + event[key] + '"';
                queryString.appendChild(logLine); // Write the Line in the table.
              }
            });
            break;
          default:
        }
      };
      if (elementTag === "table"){
        divLogs.appendChild(divTrack);
        return divLogs;
      } else if (elementTag === "div") {
        pdfLogs.appendChild(divTrack);
        return pdfLogs;
      };
    };
    window[dataLayerName.value].forEach((event) => {
      b = treatment(event, "", null, elementTag);
    });
  };
  return b;
}

buttonExport.addEventListener("click", () => {
  let filename = `results_${new Date().getTime()}.pdf`;

  let fullResult = logify("div");
  //console.log("log: ", log);

  const doc = new jsPDF();
  
  let specialElementHandlers = {
    "#export": function (element, renderer) {
        return false;
    }
  };

  doc.fromHTML(fullResult, 15, 15, {
    'width': 170,
    'elementHandlers': specialElementHandlers
  });

  // Save the PDF
  doc.save(filename);
});

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("ludwigBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
