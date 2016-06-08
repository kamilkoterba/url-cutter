(function () {
  'use strict';
  var apiUrl = 'http://54.174.44.247/api/shorten/';
  var fieldLongUrl = 'long_url';
  var fieldShortUrl = 'short_url';
  var inputElement = document.getElementById('urlInput');
  var instructionElement = document.getElementById('instructions');
  var messages = {
    instructionsDefault: instructionElement.innerHTML,
    instructionsErrorGeneral: 'Something went wrong. Please try again.',
    instructionsErrorWrongUrl: 'Enter a valid URL',
    instructionsSuccess: 'Here\'s your short URL',
  };

  function init() {
    var form = document.getElementById('cutUrlForm');

    if (form.attachEvent) {
      form.attachEvent('submit', processForm);
    } else {
      form.addEventListener('submit', processForm);
    }
  }

  function resetErrorState() {
    inputElement.className = 'cut-field';
    instructionElement.className = 'instructions';
    instructionElement.innerHTML = messages.instructionsDefault;
  }

  function showError(message) {
    inputElement.className = 'cut-field--errored';
    instructionElement.className = 'instructions--errored';
    instructionElement.innerHTML = message;
  }

  function showSuccess() {
    instructionElement.innerHTML = messages.instructionsSuccess;
  }

  function sendRequest() {
    var data = {};
    var xhr;

    data[fieldLongUrl] = inputElement.value;
    xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function eventListener() {
      if (this.readyState === 4) {
        switch (this.status) {
          case 400:
            showError(messages.instructionsErrorWrongUrl);
            break;
          case 200:
            showSuccess();
            inputElement.value =
              JSON.parse(this.responseText)[fieldShortUrl];
            break;
          default:
            showError(messages.instructionsErrorGeneral);// TODO Add logging report
        }
      }
    });

    xhr.open('POST', apiUrl);
    xhr.send(JSON.stringify(data));
  }

  function processForm(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    resetErrorState();
    sendRequest();
    return false;
  }

  init();
})();
