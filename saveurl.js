$( document ).ready(function() {

    $( "#enterButton" ).click(function() {
      chrome.storage.sync.set({ "url" : $("#inputText").val() }, function() {
        alert( "Saving URL: " + $("#inputText").val());
        if (chrome.runtime.error) {
        console.log("Runtime error.");
        }
      });
    });

});
