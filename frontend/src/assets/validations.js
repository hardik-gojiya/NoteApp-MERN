export function seePassword(e, id) {
  e.preventDefault();
  const passwordInput = document.getElementById(id);
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else if (passwordInput.type === "text") {
    passwordInput.type = "password";
  }
}
