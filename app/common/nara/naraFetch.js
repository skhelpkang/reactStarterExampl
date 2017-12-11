
import 'whatwg-fetch';


class NaraResponse {
  //
  constructor(response) {
    //
    this.ok = response.ok;
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
    this.contentType = response.headers.get('Content-Type');

    if (this.contentType === undefined || this.contentType === null) {
      this.body = response.blob();
    }
    else if (this.contentType.includes('text')) {
      this.body = response.text();
    }
    else if (this.contentType.includes('json')) {
      this.body = response.json();
    }
    else {
      this.body = response.blob();
    }
  }
}

class NaraFetchError extends Error {
  //
  constructor(message, naraResponse) {
    super(message);

    return {
      ...naraResponse,
      name: 'NaraAjxError',
      message: message,
    };
  }
}


let errorCallback;

function checkStatus(naraResponse) {
  //
  if (!naraResponse.ok) {
    if (typeof errorCallback === 'function') errorCallback(naraResponse.status, naraResponse);
    throw new NaraFetchError(naraResponse.statusText, naraResponse);
  }

  return naraResponse.body;
}

function request(url, method, { dataJson, contentType }) {
  //
  if (!url || typeof url !== 'string') {
    throw new NaraFetchError(`Invalid url for fetch json. -> url: ${url}`);
  }

  if (typeof dataJson === 'object') {
    dataJson = JSON.stringify(dataJson);
  }

  return fetch(url, {
    method: method,
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
    body: dataJson
  }).then((response) => new NaraResponse(response));
}

function requestJson(url, method, reqJson, { contentType } = {}) {
  //
  if (!url || typeof url !== 'string') {
    throw new NaraFetchError(`Invalid url for fetch json. -> url: ${url}`);
  }

  if (typeof reqJson === 'object') {
    reqJson = JSON.stringify(reqJson);
  }

  const headers =     {
    'Content-Type': contentType || 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  };

  const fetchOptions = {
    method: method,
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: headers,
  };

  if (method !== 'GET') {
    fetchOptions.body = reqJson;
  }

  return fetch(url, fetchOptions)
    .then((response) => new NaraResponse(response));
}

function setErrorCallback(callback) {
  //
  if (typeof callback === 'function') {
    errorCallback = callback;
  }
}

// TOOD: get 방식은 encodeURI 추가해줘야 쿼리 파람에 특수 문자가 문자열로 처리 됨
function getJson(url, options) {
  return requestJson(url, 'GET', null, options).then(checkStatus);
}

function getJsons(urls) {
  //
  if (!Array.isArray(urls)) {
    throw new NaraFetchError(`Invalid url for fetch Jsons. Urls argument type must be array. -> urls: ${urls}`);
  }

  const requests = urls.map(url => getJson(url));
  return Promise.all(requests);
}

function postJson(url, reqJson) {
  return requestJson(url, 'POST', reqJson).then(checkStatus);
}

function putJson(url, reqJson) {
  return requestJson(url, 'PUT', reqJson).then(checkStatus);
}

function deleteJson(url) {
  return requestJson(url, 'DELETE').then(checkStatus);
}

function postFormData(url, formData) {
  //
  if (!url || typeof url !== 'string') {
    throw new NaraFetchError(`Invalid url for fetch form data. -> url: ${url}`);
  }

  return fetch(url, {
    method: 'POST',
    mode: "same-origin",
    credentials: "same-origin",
    body: formData
  }).then((response) => new NaraResponse(response)).then(checkStatus);
}

function uploadFile(url, file) {
  //
  if (!url || typeof url !== 'string') {
    throw new NaraFetchError(`Invalid url for fetch file upload. -> url: ${url}`);
  }

  let formData = new FormData();
  formData.append('file', file);

  return fetch(url, {
    method: 'POST',
    mode: "same-origin",
    credentials: "same-origin",
    body: formData,
  }).then((response) => new NaraResponse(response)).then(checkStatus);
}


const publicApi = {
  setErrorCallback,
  fetchJson: requestJson,
  getJson,
  getJsons,
  postJson,
  putJson,
  deleteJson,
  postFormData,
  uploadFile,
};

export default publicApi;
