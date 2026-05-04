(function () {
  var button = document.querySelector("[data-share-button]");
  var status = document.querySelector("[data-share-status]");

  if (!button) {
    return;
  }

  var shareData = {
    title:"Daijoubu Studios",
    text:"Daijoubu Studios links",
    url:window.location.href
  };

  function showStatus(message) {
    if (status) {
      status.textContent = message;
    }
    button.classList.add("is-copied");
    window.setTimeout(function () {
      button.classList.remove("is-copied");
    }, 1800);
  }

  function fallbackCopy() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(shareData.url).then(function () {
        showStatus("Link copied");
      });
    }

    showStatus("Copy failed");
    return Promise.resolve();
  }

  button.addEventListener("click", function () {
    if (navigator.share) {
      navigator.share(shareData).catch(function (error) {
        if (!error || error.name !== "AbortError") {
          fallbackCopy();
        }
      });
      return;
    }

    fallbackCopy();
  });
}());
