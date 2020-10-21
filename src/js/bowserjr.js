import validateObject from './ajv.js';

window.bowserjr = {};
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
window.bowserjr.validateObject ? console.log('Yay! BowserJR Loaded!') : console.log("BowserJR didn't load :'( ");
window.bowserjr.file;
window.bowserjr.export = [];

// Get DOM elements.
const inputJSONFile = document.getElementById('inputFile');
const inputDataLayerName = document.getElementById('inputDataLayerName');
const btnStartBowser = document.getElementById('startTest');
const btnStopBowser = document.getElementById('stopTest');
const btnExportLogs = document.getElementById('export');
const btnLudwig = document.getElementById('ludwigBtn');
const pageURL = document.getElementById('pageURL');
const browser = document.getElementById('browser');
const validationDate = document.getElementById('validationDate');
const successfulData = document.getElementById('successfulData');
const warningData = document.getElementById('warningData');
const errorData = document.getElementById('errorData');

const modalContent = document.getElementById('myModal');
const btnModalClose = document.getElementsByClassName('close')[0];

pageURL.innerHTML += ' ' + window.location.origin;
browser.innerHTML += 'Chrome Version ' + navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)[1];

let dlObj = [
  {
    event: 'update',
    aplicacao: {
      bandeira: 'ex',
      dominio: 'extra.com.br',
      ambiente: 'producao',
      device: 'desktop',
      servidor: 'vitrineex109',
    },
  },
  {
    event: 'teste',
    usuario: {
      statusLogin: 'visitante',
      idUnicoVia: '123456',
      idUsuario: '78910',
    },
  },
  {
    event: 'update',
    pagina: {
      url: 'https://www.extra.com.br/site/paginavitrinenew.aspx',
      nomePagina: '/vitrine/home',
      templatePagina: 'home',
      tituloPagina: 'extracombr o site da familia e a maior loja de informatica do brasil',
    },
  },
  {
    event: 'checkout',
    ecommerce: {
      checkout: {
        etapa: 1,
        tipoFrete: 'normal',
        tipoVendedor: 'marketplace',
        quantidadeTotal: 1,
        produtos: [
          {
            idDepartamento: '111',
            idLojista: '1111',
            idMarca: '1111',
            idProduto: '1111',
            nome: 'TesteMonstro',
            nomeDepartamento: '1111111',
            nomeMarca: '1111111',
            preco: 111.1,
            quantidade: 0,
            sku: '1111111111',
            tipoVendedor: 'marketplace1111',
          },
          {
            idDepartamento: '836',
            idLojista: '11578',
            idMarca: '3615',
            idProduto: '9984900',
            nome: 'pneu aro 13 goodyear 17570 direction touring sl 82t',
            nomeDepartamento: 'automotivo',
            nomeMarca: 'goodyear',
            preco: 197.9,
            quantidade: 1,
            sku: '13566580',
            tipoVendedor: 'marketplace',
          },
        ],
      },
    },
  },
  {
    event: 'checkout',
    ecommerce: {
      checkout: {
        etapa: 2,
        tipoFrete: 'normal',
        tipoVendedor: 'marketplace',
        quantidadeTotal: 1,
        produtos: [
          {
            idDepartamento: '111',
            idLojista: '1111',
            idMarca: '1111',
            idProduto: '1111',
            nome: 'TesteMonstro',
            nomeDepartamento: '1111111',
            nomeMarca: '1111111',
            preco: 111.1,
            quantidade: 0,
            sku: '1111111111',
            tipoVendedor: 'marketplace1111',
          },
          {
            idDepartamento: '836',
            idLojista: '11578',
            idMarca: '3615',
            idProduto: '9984900',
            nome: 'pneu aro 13 goodyear 17570 direction touring sl 82t',
            nomeDepartamento: 'automotivo',
            nomeMarca: 'goodyear',
            preco: 197.9,
            quantidade: 1,
            sku: '13566580',
            tipoVendedor: 'marketplace',
          },
        ],
      },
    },
  },
  {
    event: 'update',
    aplicacao: {
      bandeira: 'ex2Teste',
      dominio: 'extra.com.br',
      ambiente: 'producao',
      device: 'desktop',
      servidor: 'vitrineex109',
    },
  },
];

// When a user uploads a file, the function handleFiles will be called.
inputJSONFile.addEventListener('change', handleFiles, false);

// handleFiles will get the files, reader, and verify if the file is a .JSON file.
function handleFiles() {
  const reader = new FileReader();
  reader.readAsText(event.target.files[0]);
  reader.onload = () => {
    try {
      btnStartBowser.disabled = false;
      window.bowserjr.file = JSON.parse(reader.result);
    } catch {
      alert('Select a JSON file to proceed!');
      btnStartBowser.disabled = true;
    }
  };
}

btnStartBowser.onclick = () => {
  // Verify if the dataLayer name and file exist.
  validationDate.innerHTML = 'Validation Date: ' + Date();
  if (window.bowserjr.file && window[inputDataLayerName.value]) {
    if (!window[inputDataLayerName.value].push_c) {
      window[inputDataLayerName.value].push_c = window[inputDataLayerName.value].push;
      window[inputDataLayerName.value].push = (obj) => {
        window[inputDataLayerName.value].push_c(obj);
        validateObject(window.file, obj);
      };
    }
    // Events are sent to the dataLayer.
    dlObj.forEach((event) => {
      window[inputDataLayerName.value].push(event);
    });

    // After clicked on the start button, the button will be hidden.
    btnStartBowser.disabled = true;
    btnStopBowser.disabled = false;
  } else {
    if (!window[inputDataLayerName.value]) alert("The entered dataLayer doesn't exist");
    alert('Enter the name of the dataLayer and upload the file');
  }
};

// When clicked in the stop button, the arrow function will do the last eval and verify if some event was forgotten.
btnStopBowser.onclick = () => {
  validateObject(window.file, {});
  btnStopBowser.disabled = true;
  window.bowserjr.resultExport = window.bowserjr.resultExport.concat(window.bowserjr.result);
  window.bowserjr.resultWithoutObjectExport = window.bowserjr.resultWithoutObjectExport.concat(
    window.bowserjr.resultWithoutObject
  );

  for (let i = 0; i < window.bowserjr.result.length; i++) {
    let message = window.bowserjr.result[i];
    let messageWithoutObject = window.bowserjr.resultWithoutObject[i];

    let paragraphy = document.createElement('p');
    paragraphy.setAttribute('class', 'content');

    let divTrack = document.createElement('div');

    let divQsWrapper = document.createElement('div');
    divQsWrapper.setAttribute('class', 'qsWrapper');

    let tableQueryString = document.createElement('table');
    tableQueryString.setAttribute('class', 'queryString');

    const divLogs = document.getElementById('logs');

    let sectionSucessfuly = document.createElement('section');
    sectionSucessfuly.setAttribute('class', 'sucessfuly');

    let sectionErro = document.createElement('section');
    sectionErro.setAttribute('class', 'erro');

    paragraphy.appendChild(document.createTextNode(messageWithoutObject));

    function creatingLabels(labelType, trackType, section) {
      let label = document.createElement('hr');
      label.setAttribute('class', labelType);
      divTrack.setAttribute('class', trackType);
      divLogs.appendChild(divTrack);
      divTrack.appendChild(label);
      divTrack.appendChild(section);
      section.appendChild(paragraphy);
      section.appendChild(divQsWrapper);
      divQsWrapper.appendChild(tableQueryString);
    }

    if (message.includes('Validated Successfully')) {
      window.bowserjr.count.successful++;
      creatingLabels('label ok', 'track pageview', sectionSucessfuly);
    } else if (message.includes('ERROR')) {
      window.bowserjr.count.error++;
      creatingLabels('label error', 'track erro', sectionErro);
    } else {
      window.bowserjr.count.warning++;
      creatingLabels('label warn', 'track exception', sectionErro);
    }

    function treatment(event, objName, index) {
      let keys = Object.keys(event); // Get the keys in the object.
      let keyCount = 0;
      let valueCount = 0;
      let booleanAux = true;

      keys.forEach((key) => {
        if (message.includes(`"${key}"`)) keyCount++;
        if (Array.isArray(event[key]) || typeof event[key] == 'object') {
          valueCount++;
        } else if (typeof event[key] == 'number') {
          if (message.includes(`"${key}":${event[key]},`) || message.includes(`"${key}":${event[key]}}`)) {
            valueCount++;
          }
        } else if (message.includes(`"${key}":"${event[key]}",`) || message.includes(`"${key}":"${event[key]}"}`)) {
          valueCount++;
        }
      });

      // Verify if all keys are included in the message.
      if (keys.length == keyCount && keys.length == valueCount) {
        keys.forEach((key) => {
          let tableLine = document.createElement('tr');
          if (message.includes('WARNING') && messageWithoutObject.includes(key)) {
            tableLine.setAttribute('id', 'warning');
          }

          let tableKey = document.createElement('td');
          tableKey.setAttribute('class', 'key');
          let keyText = index || index === 0 ? objName + '[' + index + ']' + '.' + key : objName + '.' + key;
          tableKey.appendChild(document.createTextNode(keyText));
          tableLine.appendChild(tableKey); // Write the Key in the line

          let tableValue = document.createElement('td');
          tableValue.setAttribute('class', 'value');

          if (Array.isArray(event[key])) {
            tableValue.appendChild(document.createTextNode('Array[ ]'));
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
          } else if (typeof event[key] == 'object') {
            // Verify if the event[key] was an object.
            tableValue.appendChild(document.createTextNode('Object{ }'));
            tableLine.appendChild(tableValue); // Write the Value in the line.
            tableQueryString.appendChild(tableLine); // Write the Line in the table.
            if (!treatment(event[key], keyText)) {
              booleanAux = false;
              for (let index = 0; index < keys.length; index++) {
                tableQueryString.deleteRow(0);
              }
            }
          } else if (typeof event[key] == 'string') {
            tableValue.appendChild(document.createTextNode('"' + event[key] + '"'));
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

    for (let index in window[inputDataLayerName.value]) {
      if (treatment(window[inputDataLayerName.value][index], '')) {
        break;
      }
    }
  }
  btnStartBowser.disabled = false;
  window.bowserjr.file = false;
  inputJSONFile.value = '';

  successfulData.innerHTML = window.bowserjr.count.successful;
  warningData.innerHTML = window.bowserjr.count.warning;
  errorData.innerHTML = window.bowserjr.count.error;

  window.bowserjr.result = [];
  window.bowserjr.resultWithoutObject = [];
};

function imprimePDF(imagens) {
  var doc = new jsPDF();
  var tamanhoPagina = 267;
  var auxTamanho = 0;
  var doc = new jsPDF();

  for (var i = 0; i < 13; i++) {
    var tamanhoAtual = $('.track')[i].offsetHeight * 0.25;
    var imagemAtual = imagens[i];
    if (i === 0) {
      if (tamanhoAtual <= tamanhoPagina) {
        console.log("primeira imagem: ", tamanhoAtual)
        doc.addImage(imagemAtual, 'JPG', 5, 20, 300, tamanhoAtual, null, 'FAST', 180);
        auxTamanho += tamanhoAtual + 20;
      }
    } else if (auxTamanho + tamanhoAtual < tamanhoPagina) {
      console.log("imagens seguintes: ", auxTamanho, " - ", tamanhoAtual)
      doc.addImage(imagemAtual, 'JPG', 5, auxTamanho + 2, 300, tamanhoAtual, null, 'FAST', 180);
      auxTamanho += tamanhoAtual;
    } else if (auxTamanho + tamanhoAtual > tamanhoPagina) {
      doc.addPage();
      console.log("imagens que não couberam: ", tamanhoAtual);
      doc.addImage(imagemAtual, 'JPG', 5, 20, 300, tamanhoAtual, null, 'FAST', 180);
      auxTamanho = tamanhoAtual;
    }
  }

  var data = new Date();
  doc.save('BowserJR. - ' + data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear() + '.pdf');
}

btnExportLogs.onclick = async () => {
  // for (var i = 0; i < $('.qsWrapper').length; i++) {
  //   $('.qsWrapper')[i].style = 'display: inline';
  // }

  var imgdata = [];

  await html2canvas($("#logHeader")[0]).then(function (canvas) {
    imgdata.push(canvas.toDataURL('image/png'));
  });

  var tamanho = $('.track').length;

  for (var i = 0; i < tamanho; i++) {
    var track = $('.track')[i];

    await html2canvas(track).then(function (canvas) {
      imgdata.push(canvas.toDataURL('image/png'));
    });
  }

  imprimePDF(imgdata);

  // for (var i = 0; i < $('.qsWrapper').length; i++) {
  //   $('.qsWrapper')[i].style = 'display: none';
  // }
};

// When the user clicks on the button, open the modal
btnLudwig.onclick = () => {
  modalContent.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
btnModalClose.onclick = () => {
  modalContent.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modalContent) {
    modalContent.style.display = 'none';
  }
};
