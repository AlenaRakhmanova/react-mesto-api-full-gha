export class Auth {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkError(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getContent(token) {
    const currentUrl = `${this._url}/users/me`;
    return fetch(currentUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => this._checkError(response));
  }

  register(password, email) {
    const currentUrl = `${this._url}/signup`;
    return fetch(currentUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    }).then((response) => this._checkError(response));
  }

  login(password, email) {
    const currentUrl = `${this._url}/signin`;
    return fetch(currentUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    }).then((response) => this._checkError(response));
  }
}

export const dataAuth = {
  url: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
};

export const auth = new Auth(dataAuth);

// export const BASE_URL = "https://auth.nomoreparties.co";

// // function checkError(response) {
// //   if (response.ok) {
// //     return response.json();
// //   }
// //   return Promise.reject(`Ошибка: ${response.status}`);
// // }

// export function register(password, email) {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ password, email }),
//   }).then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//     return Promise.reject(`Ошибка: ${response.status}`);
//     // checkError(response);
//   });
// }

// export function login(password, email) {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ password, email }),
//   }).then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//     return Promise.reject(`Ошибка: ${response.status}`);
//   });
// }

// export function getContent(token) {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//     return Promise.reject(`Ошибка: ${response.status}`);
//   });
// }
