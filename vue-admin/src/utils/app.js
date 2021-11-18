import cookie from "cookie_js";

const adminToken = "admin_token";

const usernameKey = "username";

export function getToken() {
  return cookie.get(adminToken);
}

export function setToKen(token) {
  return cookie.set(adminToken, token);
}

export function removeToKen() {
  return cookie.remove(adminToken);
}

export function setUserName(value) {
  return cookie.set("username", value);
}

export function getUserName() {
  return cookie.get(usernameKey);
}

export function removeUserName() {
  return cookie.remove(usernameKey);
}
