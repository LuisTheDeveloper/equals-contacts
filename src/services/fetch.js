export const fetchWrapper = {
    get,
    post,
    postForm,
    put,
    delete: _delete,
  };
  
  const baseURL = "https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/";
  const requestOptions = {
      mode: 'cors',
      cache: 'no-cache',
      headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
          Pragma: "no-cache",
      }
  }
  
  function get(url) {
      const options = {...requestOptions};
      options.method = 'GET';
      return fetch(baseURL + url, options).then(handleResponse);
  }
  
  function post(url, body) {
      const options = {...requestOptions};
      options.method = 'POST';
      options["headers"]["Content-Type"]= "application/json"
      if (typeof body === 'object' && body !== null) options.body = JSON.stringify(body);
      else options.body = body;
  
      return fetch(baseURL + url, options).then(handleResponse);
  }
  
  function postForm(url, body) {
    const options = {...requestOptions};
    delete options.headers["Content-Type"]
    options.method = 'POST';
    options.body = body;
  
    return fetch(baseURL + url, options).then(handleResponse);
  }
  
  function put(url, body) {
      const options = {...requestOptions};
      options.method = 'PUT';
      if (typeof body === 'object' && body !== null) options.body = JSON.stringify(body);
      else options.body = body;
  
      return fetch(baseURL + url, options).then(handleResponse);
  }
  
  // prefixed with underscored because delete is a reserved word in javascript
  function _delete(url) {
      const options = {...requestOptions};
      options.method = 'DELETE';
      return fetch(baseURL + url, options).then(handleResponse);
  }
  
  // helper functions to parse response
  function handleResponse(response) {
      return response.text().then(text => {
          const contentType = response.headers.get('content-type');
          const data = (!contentType || !contentType.includes('application/json') ? text : JSON.parse(text));
  
          if (!response.ok) {
              const error = (data && data.message) || data || response.statusText;
              return Promise.reject(error);
          }
  
          return data;
      })
  }
  