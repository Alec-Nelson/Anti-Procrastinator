  //uses chrome synch storage to retrive url saved in popup
  // if no url saved redirts to google.com
  chrome.storage.sync.get("url", function(items) {
    if (items.url == null) {
      window.location.href = "https://www.google.com/";
    }
    else {
      window.location.href = items.url;
    }
  });
