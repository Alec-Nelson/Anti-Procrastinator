  chrome.storage.sync.get("url", function(items) {
    window.location.href = items.url;
  });
