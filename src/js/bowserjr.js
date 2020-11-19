import validateObject from "./ajv.js";
// import jsPDF from './jspdf.min.js';



window.bowserjr = {};
window.bowserjr.dataLayer = [];
window.bowserjr.result = [];
window.bowserjr.resultExport = [];
window.bowserjr.resultWithoutObject = [];
window.bowserjr.resultWithoutObjectExport = [];
window.bowserjr.count = {
  successful: 0,
  error: 0,
  warning: 0,
};
window.bowserjr.validateObject = validateObject;
window.bowserjr.validateObject
  ? console.log("Yay! BowserJR Loaded!")
  : console.log("BowserJR didn't load :'( ");
window.bowserjr.file;
window.bowserjr.export = [];

//Chrome runtime methods

chrome.tabs.query({ active: true }, function (tabs) {
  let tab = tabs[0];
  chrome.tabs.executeScript(tab.id, {
    file: 'js/bowserContentScript.js'
  });
  console.log("Executed contentScript");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "accepted") {
    console.log(request.datalayer_object);
    console.log(window.bowserjr.file);
    window.bowserjr.validateObject(window.bowserjr.file, request.datalayer_object);
    window.bowserjr.dataLayer.push(request.datalayer_object);
  }
});


// Get DOM elements.
const inputJSONFile = document.getElementById("inputFile");
const inputDataLayerName = document.getElementById("inputDataLayerName");
const btnStartBowser = document.getElementById("startTest");
const btnStopBowser = document.getElementById("stopTest");
const btnExportLogs = document.getElementById("export");
const btnLudwig = document.getElementById("ludwigBtn");

const headerDOM = document.querySelector("#log-header");
const pageURL = document.querySelector(".page-info");
const browser = document.querySelector(".browser-info");
const validationDate = document.querySelector(".date-info");
const successfulData = document.querySelector("#successful-data");
const warningData = document.querySelector("#warning-data");
const errorData = document.querySelector("#error-data");

const modalContent = document.getElementById("myModal");
const btnModalClose = document.getElementsByClassName("close")[0];

pageURL.innerHTML = window.location.origin;
browser.innerHTML =
  "Chrome Version " + navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)[1];

var doc = new jsPDF();
var accSizeContent = 0;
var data = new Date();
var today =
  data.getDate() + "-" + (data.getMonth() + 1) + "-" + data.getFullYear();

let dlObj = [
  {
    event: "update",
    aplicacao: {
      bandeira: "ex",
      dominio: "extra.com.br",
      ambiente: "producao",
      device: "desktop",
      servidor: "vitrineex109",
    },
  },
  {
    event: "teste",
    usuario: {
      statusLogin: "visitante",
      idUnicoVia: "123456",
      idUsuario: "78910",
    },
  },
  {
    event: "update",
    pagina: {
      url: "https://www.extra.com.br/site/paginavitrinenew.aspx",
      nomePagina: "/vitrine/home",
      templatePagina: "home",
      tituloPagina:
        "extracombr o site da familia e a maior loja de informatica do brasil",
    },
  },
  {
    event: "checkout",
    ecommerce: {
      checkout: {
        etapa: 1,
        tipoFrete: "normal",
        tipoVendedor: "marketplace",
        quantidadeTotal: 1,
        produtos: [
          {
            idDepartamento: "111",
            idLojista: "1111",
            idMarca: "1111",
            idProduto: "1111",
            nome: "TesteMonstro",
            nomeDepartamento: "1111111",
            nomeMarca: "1111111",
            preco: 111.1,
            quantidade: 0,
            sku: "1111111111",
            tipoVendedor: "marketplace1111",
          },
          {
            idDepartamento: "836",
            idLojista: "11578",
            idMarca: "3615",
            idProduto: "9984900",
            nome: "pneu aro 13 goodyear 17570 direction touring sl 82t",
            nomeDepartamento: "automotivo",
            nomeMarca: "goodyear",
            preco: 197.9,
            quantidade: 1,
            sku: "13566580",
            tipoVendedor: "marketplace",
          },
        ],
      },
    },
  },
  {
    event: "checkout",
    ecommerce: {
      checkout: {
        etapa: 2,
        tipoFrete: "normal",
        tipoVendedor: "marketplace",
        quantidadeTotal: 1,
        produtos: [
          {
            idDepartamento: "111",
            idLojista: "1111",
            idMarca: "1111",
            idProduto: "1111",
            nome: "TesteMonstro",
            nomeDepartamento: "1111111",
            nomeMarca: "1111111",
            preco: 111.1,
            quantidade: 0,
            sku: "1111111111",
            tipoVendedor: "marketplace1111",
          },
          {
            idDepartamento: "836",
            idLojista: "11578",
            idMarca: "3615",
            idProduto: "9984900",
            nome: "pneu aro 13 goodyear 17570 direction touring sl 82t",
            nomeDepartamento: "automotivo",
            nomeMarca: "goodyear",
            preco: 197.9,
            quantidade: 1,
            sku: "13566580",
            tipoVendedor: "marketplace",
          },
        ],
      },
    },
  },
  {
    event: "update",
    aplicacao: {
      bandeira: "ex2Teste",
      dominio: "extra.com.br",
      ambiente: "producao",
      device: "desktop",
      servidor: "vitrineex109",
    },
  },
];

// When a user uploads a file, the function handleFiles will be called.
inputJSONFile.addEventListener("change", handleFiles, false);

// handleFiles will get the files, reader, and verify if the file is a .JSON file.
function handleFiles() {
  const reader = new FileReader();
  reader.readAsText(event.target.files[0]);
  reader.onload = () => {
    try {
      btnStartBowser.disabled = false;
      window.bowserjr.file = JSON.parse(reader.result);
    } catch {
      alert("Select a JSON file to proceed!");
      btnStartBowser.disabled = true;
    }
  };
}

btnStartBowser.onclick = () => {
  chrome.runtime.sendMessage(
    {
      message: "background_bowser_script",
      dataLayerName: inputDataLayerName.value,
    },
    function (response) {
      console.log(response);
      if (response.message == "teste_ok") {
        var data = new Date();
        validationDate.innerHTML =
          data.getDate() +
          "/" +
          (data.getMonth() + 1) +
          "/" +
          data.getFullYear();
      }
    }
  );
  btnStartBowser.disabled = true;
  btnStopBowser.disabled = false;
};
// Verify if the dataLayer name and file exist.
// if (window.bowserjr.file && window[inputDataLayerName.value]) {
//   if (!window[inputDataLayerName.value].push_c) {
//     window[inputDataLayerName.value].push_c =
//       window[inputDataLayerName.value].push;
//     window[inputDataLayerName.value].push = (obj) => {
//       window[inputDataLayerName.value].push_c(obj);
//       validateObject(window.file, obj);
//     };
//   }
// Events are sent to the dataLayer.
// dlObj.forEach((event) => {
//   window[inputDataLayerName.value].push(event);
// });

// After clicked on the start button, the button will be hidden.


//   } else {
//     if (!window[inputDataLayerName.value])
//       alert("The entered dataLayer doesn't exist");
//     alert("Enter the name of the dataLayer and upload the file");
//   }
// };

// When clicked in the stop button, the arrow function will do the last eval and verify if some event was forgotten.
btnStopBowser.onclick = () => {
  validateObject(window.file, {});
  btnStopBowser.disabled = true;
  window.bowserjr.resultExport = window.bowserjr.resultExport.concat(
    window.bowserjr.result
  );
  window.bowserjr.resultWithoutObjectExport = window.bowserjr.resultWithoutObjectExport.concat(
    window.bowserjr.resultWithoutObject
  );

  for (let i = 0; i < window.bowserjr.result.length; i++) {
    let message = window.bowserjr.result[i];
    let messageWithoutObject = window.bowserjr.resultWithoutObject[i];

    let paragraphy = document.createElement("p");
    paragraphy.setAttribute("class", "content");

    let divTrack = document.createElement("div");

    let divQsWrapper = document.createElement("div");
    divQsWrapper.setAttribute("class", "qsWrapper");

    let tableQueryString = document.createElement("table");
    tableQueryString.setAttribute("class", "queryString");

    const divLogs = document.getElementById("logs");

    let sectionSucessfuly = document.createElement("section");
    sectionSucessfuly.setAttribute("class", "sucessfuly");

    let sectionErro = document.createElement("section");
    sectionErro.setAttribute("class", "erro");

    paragraphy.appendChild(document.createTextNode(messageWithoutObject));

    function creatingLabels(labelType, trackType, section) {
      let label = document.createElement("hr");
      label.setAttribute("class", labelType);
      divTrack.setAttribute("class", trackType);
      divLogs.appendChild(divTrack);
      divTrack.appendChild(label);
      divTrack.appendChild(section);
      section.appendChild(paragraphy);
      section.appendChild(divQsWrapper);
      divQsWrapper.appendChild(tableQueryString);
    }

    if (message.includes("Validated Successfully")) {
      window.bowserjr.count.successful++;
      creatingLabels("label ok", "track pageview", sectionSucessfuly);
    } else if (message.includes("ERROR")) {
      window.bowserjr.count.error++;
      creatingLabels("label error", "track erro", sectionErro);
    } else {
      window.bowserjr.count.warning++;
      creatingLabels("label warn", "track exception", sectionErro);
    }
    function treatment(event, objName, index) {
      let keys = Object.keys(event); // Get the keys in the object.
      let keyCount = 0;
      let valueCount = 0;
      let booleanAux = true;

      keys.forEach((key) => {
        if (message.includes(`"${key}"`)) keyCount++;
        if (Array.isArray(event[key]) || typeof event[key] == "object") {
          valueCount++;
        } else if (typeof event[key] == "number") {
          if (
            message.includes(`"${key}":${event[key]},`) ||
            message.includes(`"${key}":${event[key]}}`)
          ) {
            valueCount++;
          }
        } else if (
          message.includes(`"${key}":"${event[key]}",`) ||
          message.includes(`"${key}":"${event[key]}"}`)
        ) {
          valueCount++;
        }
      });

      // Verify if all keys are included in the message.
      if (keys.length == keyCount && keys.length == valueCount) {
        keys.forEach((key) => {
          let tableLine = document.createElement("tr");
          if (
            message.includes("WARNING") &&
            messageWithoutObject.includes(key)
          ) {
            tableLine.setAttribute("id", "warning");
          }

          let tableKey = document.createElement("td");
          tableKey.setAttribute("class", "key");
          let keyText =
            index || index === 0
              ? objName + "[" + index + "]" + "." + key
              : objName + "." + key;
          tableKey.appendChild(document.createTextNode(keyText));
          tableLine.appendChild(tableKey); // Write the Key in the line

          let tableValue = document.createElement("td");
          tableValue.setAttribute("class", "value");

          if (Array.isArray(event[key])) {
            tableValue.appendChild(document.createTextNode("Array[ ]"));
            tableLine.appendChild(tableValue); // Write the Value in the line.
            tableQueryString.appendChild(tableLine); // Write the Line in the table.
            for (let i = 0; i < event[key].length; i++) {
              if (!treatment(event[key][i], keyText, i)) {
                booleanAux = false;
                for (let index = 0; index < keys.length; index++) {
                  tableQueryString.deleteRow(0);
                }
              }
            }
          } else if (typeof event[key] == "object") {
            // Verify if the event[key] was an object.
            tableValue.appendChild(document.createTextNode("Object{ }"));
            tableLine.appendChild(tableValue); // Write the Value in the line.
            tableQueryString.appendChild(tableLine); // Write the Line in the table.
            if (!treatment(event[key], keyText)) {
              booleanAux = false;
              for (let index = 0; index < keys.length; index++) {
                tableQueryString.deleteRow(0);
              }
            }
          } else if (typeof event[key] == "string") {
            tableValue.appendChild(
              document.createTextNode('"' + event[key] + '"')
            );
            tableLine.appendChild(tableValue); // Write the Value in the line.
            tableQueryString.appendChild(tableLine); // Write the Line in the table.
          } else {
            tableValue.appendChild(document.createTextNode(event[key]));
            tableLine.appendChild(tableValue); // Write the Value in the line.
            tableQueryString.appendChild(tableLine); // Write the Line in the table.
          }
        });
        return booleanAux;
      }
      return false;
    }

    for (let index in window.bowserjr.dataLayer) {
      if (treatment(window.bowserjr.dataLayer[index], "")) {
        break;
      }
    }
  }
  btnStartBowser.disabled = false;
  window.bowserjr.file = false;
  inputJSONFile.value = "";

  successfulData.innerHTML = window.bowserjr.count.successful;
  warningData.innerHTML = window.bowserjr.count.warning;
  errorData.innerHTML = window.bowserjr.count.error;

  window.bowserjr.dataLayer = []
  window.bowserjr.result = [];
  window.bowserjr.resultWithoutObject = [];
};

btnExportLogs.onclick = async () => {
  var arrayURLImg = [];
  var header;
  const tracks = $(".track");
  const contentTracks = $(".qsWrapper");

  for (var i = 0; i < contentTracks.length; i++) {
    contentTracks[i].style = "display: inline";
  }

  await html2canvas(headerDOM).then(function (canvas) {
    header = canvas.toDataURL("image/png");
  });

  for (var i = 0; i < tracks.length; i++) {
    await html2canvas(tracks[i]).then(function (canvas) {
      arrayURLImg.push(canvas.toDataURL("image/png"));
    });
  }

  createPDF(arrayURLImg, header, tracks);

  doc = new jsPDF();

  for (var i = 0; i < contentTracks.length; i++) {
    contentTracks[i].style = "display: none";
  }
};

const createPDF = (arrayURLImgTracks, headerURLImg, tracks) => {
  var pageSize = 267;

  for (var i = 0; i < tracks.length; i++) {
    var currImageSize = tracks[i].offsetHeight * 0.25;
    var currImage = arrayURLImgTracks[i];

    if (i === 0 && currImageSize <= pageSize) {
      addImageJSPDF(headerURLImg, 5, 40);
      addImageJSPDF(currImage, 50, currImageSize);
    } else if (accSizeContent + currImageSize < pageSize) {
      addImageJSPDF(currImage, accSizeContent + 5, currImageSize);
    } else {
      doc.addPage();
      addImageJSPDF(currImage, 5, currImageSize);
      accSizeContent = currImageSize;
    }
  }

  doc.save("BowserJR. - " + today + ".pdf");
};

const addImageJSPDF = (img, verticalPosition, height) => {
  doc.addImage(
    img,
    "JPEG",
    5,
    verticalPosition,
    300,
    height,
    null,
    "FAST",
    180
  );
  accSizeContent += height;
};

// When the user clicks on the button, open the modal
btnLudwig.onclick = () => {
  modalContent.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
btnModalClose.onclick = () => {
  modalContent.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modalContent) {
    modalContent.style.display = "none";
  }
};
