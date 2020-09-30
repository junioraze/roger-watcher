import validateObject from './ajv.js';
//import schema from "./lib/teste.js";
//var file;

const windowTab = () => {
  chrome.windows.getCurrent(function (currentWindow) {
    let windowID = currentWindow.id;
    chrome.windows.get(windowID, function (call) {
      console.log(call)
    });
  });
}

windowTab()

window.bowserjr = {};

window.bowserjr.result = [];
window.bowserjr.resultExport = [];
window.bowserjr.resultWithoutObject = [];

// Get DOM elements.
const inputElement = document.getElementById("inputFile");
const dataLayerName = document.getElementById("inputDataLayerName");
const startButton = document.getElementById("startTest");
const stopButton = document.getElementById("stopTest");
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
    } catch {
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

    if (!window[dataLayerName.value].push_c) {
      window[dataLayerName.value].push_c = window[dataLayerName.value].push;
      window[dataLayerName.value].push = function (obj) {
        window[dataLayerName.value].push_c(obj);
        validateObject(window.file, obj);
      }
    }
    // dlObj is an array with each event.
    let dlObj = [
      { event: "update", aplicacao: { bandeira: "ex", dominio: "extra.com.br", ambiente: "producao", device: "desktop", servidor: "vitrineex109" } },
      { event: "teste", usuario: { statusLogin: "visitante", idUnicoVia: "123456", idUsuario: "78910" } },
      { event: "update", pagina: { url: "https://www.extra.com.br/site/paginavitrinenew.aspx", nomePagina: "/vitrine/home", templatePagina: "home", tituloPagina: "extracombr o site da familia e a maior loja de informatica do brasil" } },
      { event: "checkout", ecommerce: { checkout: { etapa: 1, tipoFrete: "normal", tipoVendedor: "marketplace", quantidadeTotal: 1, produtos: [{ idDepartamento: "111", idLojista: "1111", idMarca: "1111", idProduto: "1111", nome: "TesteMonstro", nomeDepartamento: "1111111", nomeMarca: "1111111", preco: 111.1, quantidade: 0, sku: "1111111111", tipoVendedor: "marketplace1111" }, { idDepartamento: "836", idLojista: "11578", idMarca: "3615", idProduto: "9984900", nome: "pneu aro 13 goodyear 17570 direction touring sl 82t", nomeDepartamento: "automotivo", nomeMarca: "goodyear", preco: 197.9, quantidade: 1, sku: "13566580", tipoVendedor: "marketplace" }] } } },
      { event: "checkout", ecommerce: { checkout: { etapa: 2, tipoFrete: "normal", tipoVendedor: "marketplace", quantidadeTotal: 1, produtos: [{ idDepartamento: "111", idLojista: "1111", idMarca: "1111", idProduto: "1111", nome: "TesteMonstro", nomeDepartamento: "1111111", nomeMarca: "1111111", preco: 111.1, quantidade: 0, sku: "1111111111", tipoVendedor: "marketplace1111" }, { idDepartamento: "836", idLojista: "11578", idMarca: "3615", idProduto: "9984900", nome: "pneu aro 13 goodyear 17570 direction touring sl 82t", nomeDepartamento: "automotivo", nomeMarca: "goodyear", preco: 197.9, quantidade: 1, sku: "13566580", tipoVendedor: "marketplace" }] } } },
      { event: "update", aplicacao: { bandeira: "ex2Teste", dominio: "extra.com.br", ambiente: "producao", device: "desktop", servidor: "vitrineex109" } }
    ]
    // Events are sent to the dataLayer.
    dlObj.forEach((event) => {
      window[dataLayerName.value].push(event);
    });
    // After clicked on the start button, the button will be hidden.
    startButton.disabled = true;
    stopButton.disabled = false;
    //inputElement.disabled = true;
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
  window.bowserjr.resultExport = window.bowserjr.resultExport.concat(window.bowserjr.result);
  /*window.result.forEach((message) =>*/
  for (let i = 0; i < window.bowserjr.result.length; i++) {
    let message = window.bowserjr.result[i];
    let messageWithoutObject = window.bowserjr.resultWithoutObject[i];

    let paragraphy = document.createElement("p");
    paragraphy.setAttribute("class", "content")

    let divTrack = document.createElement("div");

    let divQsWrapper = document.createElement("div");
    divQsWrapper.setAttribute("class", "qsWrapper");

    let tableQueryString = document.createElement("table");
    tableQueryString.setAttribute("class", "queryString");

    const divLogs = document.getElementById("logs")

    let sectionSucessfuly = document.createElement("section");
    sectionSucessfuly.setAttribute("id", "sucessfuly");

    let sectionErro = document.createElement("section");
    sectionErro.setAttribute("id", "erro");

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
      creatingLabels("label ok", "track pageview", sectionSucessfuly);
    } else if (message.includes("ERROR")) {
      creatingLabels("label error", "track erro", sectionErro);
    } else {
      creatingLabels("label warn", "track exception", sectionErro);
    }

    function treatment(event, objName, index) {
      let keys = Object.keys(event); // Get the keys in the object.
      let keyCount = 0;
      let valueCount = 0;
      let booleanAux = true;
      //console.log(keys);
      //console.log(message)

      keys.forEach((key) => {
        if (message.includes(`"${key}"`)) keyCount++;

        if (Array.isArray(event[key]) || typeof event[key] == "object") {

          valueCount++;
        } else if (typeof event[key] == "number") {

          if (message.includes(`"${key}":${event[key]},`) || message.includes(`"${key}":${event[key]}}`)) {

            //console.log(event[key])
            valueCount++;
          }

        } else if (message.includes(`"${key}":"${event[key]}",`) || message.includes(`"${key}":"${event[key]}"}`)) {

          //console.log(event[key])
          valueCount++;
        }
      });

      //console.log(valueCount);
      //console.log(keyCount,keys,event);
      // Verify if all keys are included in the message.
      if (keys.length == keyCount && keys.length == valueCount) {
        keys.forEach((key) => {
          let tableLine = document.createElement("tr");

          if (message.includes("WARNING")) {
            if (messageWithoutObject.includes(key)) {
              tableLine.setAttribute("id", "warning");
            }
          }

          let tableKey = document.createElement("td");
          tableKey.setAttribute("class", "key");
          let keyText = index || index === 0 ? objName + "[" + index + "]" + "." + key : objName + "." + key;
          tableKey.appendChild(document.createTextNode(keyText));
          tableLine.appendChild(tableKey); // Write the Key in the line

          let tableValue = document.createElement("td");
          tableValue.setAttribute("class", "value");
          //console.log(event[key]);
          //console.log(typeof event[key]);
          if (Array.isArray(event[key])) {
            //console.log("teste")
            tableValue.appendChild(document.createTextNode("Array[ ]"));
            tableLine.appendChild(tableValue); // Write the Value in the line.
            tableQueryString.appendChild(tableLine); // Write the Line in the table.
            for (let i = 0; i < event[key].length; i++) {
              if (!treatment(event[key][i], keyText, i)) {
                //console.log("false1");
                booleanAux = false;
                for (let index = 0; index < keys.length; index++) {
                  tableQueryString.deleteRow(0);
                }
              }
            };
          } else if (typeof event[key] == "object") { // Verify if the event[key] was an object.
            tableValue.appendChild(document.createTextNode("Object{ }"));
            tableLine.appendChild(tableValue); // Write the Value in the line.
            tableQueryString.appendChild(tableLine); // Write the Line in the table.
            // console.log(event[key]);
            //  console.log(treatment(event[key], keyText))
            if (!treatment(event[key], keyText)) {
              //console.log("false1");
              booleanAux = false;
              for (let index = 0; index < keys.length; index++) {
                tableQueryString.deleteRow(0);
              }
            }
          } else if (typeof event[key] == "string") {
            // console.log(event[key]);
            tableValue.appendChild(document.createTextNode('"' + event[key] + '"'));
            tableLine.appendChild(tableValue); // Write the Value in the line.
            tableQueryString.appendChild(tableLine); // Write the Line in the table.
          } else {
            // console.log(event[key]);
            tableValue.appendChild(document.createTextNode(event[key]));
            tableLine.appendChild(tableValue); // Write the Value in the line.
            tableQueryString.appendChild(tableLine); // Write the Line in the table.
          }

        });
        //console.log(booleanAux);
        return booleanAux;
      };
      //console.log("false2");
      return false;
    };

    for (let index in window[dataLayerName.value]) {
      //console.log(treatment(window[dataLayerName.value][index], ""));
      if (treatment(window[dataLayerName.value][index], "")) {
        // console.log("break")
        break;
      }
    };

    //treatment(window[dataLayerName.value][i], "");
  };
  startButton.disabled = false;
  window.bowserjr.file = false;
  inputElement.value = "";
  window.bowserjr.result = [];
  window.bowserjr.resultWithoutObject = [];
});

const buttonExport = document.getElementById("export");
buttonExport.addEventListener("click", () => {
  let filename = `results_${new Date().getTime()}.txt`;
  let fullResult = ""

  window.bowserjr.resultExport.forEach((line) => {
    fullResult = fullResult + line + "\n"
  });


  let a = document.createElement("a");

  document.body.appendChild(a);

  a.style = "display: none";

  let blob = new Blob([fullResult], { type: "octet/stream" }),
    url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);

});

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("ludwigBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
