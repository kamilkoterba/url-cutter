(function () {
  'use strict';
  var host = 'http://54.174.44.247/';
  var apiUrl = host + 'api/shorten/';
  var fieldLongUrl = 'long_url';
  var fieldShortUrl = 'short_url';
  var form = document.getElementById('cutUrlForm');
  var inputElement = document.getElementById('urlInput');
  var instructionElement = document.getElementById('instructions');
  var messages = {
    instructionsDefault: instructionElement.innerHTML,
    instructionsErrorGeneral: 'Something went wrong. Please try again.',
    instructionsErrorWrongUrl: 'Enter a valid URL',
    instructionsSuccess: 'Here\'s your short URL',
    instructionsSuccessRepeated: 'This URL is already shortened',
  };

  function init() {
    if (form.attachEvent) {
      form.attachEvent('submit', processForm);
    } else {
      form.addEventListener('submit', processForm);
    }
  }

  function resetErrorState() {
    form.className = 'cut-form';
    inputElement.className = 'cut-field';
    instructionElement.innerHTML = messages.instructionsDefault;
  }

  function showError(message) {
    form.className = 'cut-form--errored';
    inputElement.className = 'cut-field--errored';
    instructionElement.innerHTML = message;
  }

  function showSuccess(message) {
    form.className = 'cut-form--succeded';
    instructionElement.innerHTML = message;
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
            showSuccess(messages.instructionsSuccess);
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

    // Don't short already shortened URL
    if (inputElement.value.indexOf(host) > -1) {
      showSuccess(messages.instructionsSuccessRepeated);
      return false;
    }

    resetErrorState();
    sendRequest();
    return false;
  }

  init();
})();
