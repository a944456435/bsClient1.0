export function setSession(sessionName, data) {
  sessionStorage.setItem(sessionName, data);
}
export function getSession(sessionName) {
  return sessionStorage.getItem(sessionName);
}
export function removeSession(sessionName) {
  sessionStorage.removeItem(sessionName);
}
