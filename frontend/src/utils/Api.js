export class Api {
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

  getInfoUser(token) {
    let headers = this._headers
    headers.Authorization = `Bearer ${token}`;
    const currentUrl = `${this._url}/users/me`;
    return fetch(currentUrl, {
      method: "GET",
      headers: this._headers,
    }).then((response) => this._checkError(response));
  }

  getAllCards(token) {
    let headers = this._headers
    headers.Authorization = `Bearer ${token}`;
    const currentUrl = `${this._url}/cards`;
    return fetch(currentUrl, {
      method: "GET",
      headers: this._headers,
    }).then((response) => this._checkError(response));
  }

  setInfoUser(data) {
    const currentUrl = `${this._url}/users/me`;
    return fetch(currentUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((response) => this._checkError(response));
  }

  addNewCard(data) {
    const currentUrl = `${this._url}/cards`;
    return fetch(currentUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((response) => this._checkError(response));
  }

  // addLike(id) {
  //   const currentUrl = `${this._url}/cards/${id}/likes`;
  //   return fetch(currentUrl, {
  //     method: "PUT",
  //     headers: this._headers,
  //   }).then((response) => this._checkError(response));
  // }

  // deleteLike(id) {
  //   const currentUrl = `${this._url}/cards/${id}/likes`;
  //   return fetch(currentUrl, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   }).then((response) => this._checkError(response));
  // }

  changeLikeCardStatus(id, isLiked) {
    const currentUrl = `${this._url}/cards/${id}/likes`;
    return fetch(currentUrl, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((response) => this._checkError(response));
  }

  deleteCard(idCard) {
    const currentUrl = `${this._url}/cards/${idCard}`;
    return fetch(currentUrl, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._checkError(response));
  }

  updateAvatar(avatar) {
    const currentUrl = `${this._url}/users/me/avatar`;
    return fetch(currentUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then((response) => this._checkError(response));
  }
}

const token = localStorage.getItem("token");

export const dataApi = {
  url: "https://av-rakhmanova.nomoredomains.xyz/api",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

export const api = new Api(dataApi);
