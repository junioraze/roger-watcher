
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "inject_bowser_script") {
        var script = document.createElement("script");
        script.innerHTML = `
        window["${request.datalayer}"].forEach(elem=>{
          window.postMessage({
            dataLayer:"dispatch_datalayer_object_from_window",
            datalayer_object:JSON.parse(JSON.stringify(elem))
          },"*");
        });
  
  
        if (!window["${request.datalayer}"].push_c) {
          console.log("DataLayer Name sent from Background Script: ${request.datalayer}");
          window["${request.datalayer}"].push_c = window["${request.datalayer}"].push;
          window["${request.datalayer}"].push = function (obj) {
            window["${request.datalayer}"].push_c(obj);
            window.postMessage({
              dataLayer:"dispatch_datalayer_object_from_window",
              datalayer_object:obj
            },"*");
          }
      };`;
        document.head.appendChild(script);
      }
      sendResponse({
        message: "script_injected_successfully",
      });
 
  });

  window.addEventListener("message", function (event) {
    if (
      event.data.dataLayer &&
      event.data.dataLayer == "dispatch_datalayer_object_from_window"
    ) {
      console.log(
        "Content script received message: " +
          JSON.stringify(event.data.datalayer_object)
      );
  
      chrome.runtime.sendMessage("ADDICIONAR O SEU ID DA EXTENSÃO",{
        message: "accepted",
        datalayer_object: event.data.datalayer_object,
      },function(response){});
    }
  });
  