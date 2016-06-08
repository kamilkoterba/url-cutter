(function () {
  var apiUrl = 'http://54.174.44.247/api/shorten/';
  var fieldLongUrl = 'long_url';
  var fieldShortUrl = 'short_url';

  function init() {
    var form = document.getElementById('cutUrlForm');
    if (form.attachEvent) {
      form.attachEvent('submit', processForm);
    } else {
      form.addEventListener('submit', processForm);
    }
  }

  function processForm(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    var data = {};
    var xhr;

    data[fieldLongUrl] = document.getElementById('urlInput').value;
    xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        document.getElementById('urlInput').value =
          JSON.parse(this.responseText)[fieldShortUrl];
      }
    });

    xhr.open('POST', apiUrl);
    xhr.send(JSON.stringify(data));
    return false;
  }

  init();
})();
