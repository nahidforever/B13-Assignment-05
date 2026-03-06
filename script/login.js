document.getElementById("signIn").addEventListener("click", () => {
  const inputUsername = document.getElementById("input-username");

  const username = inputUsername.value;

  const inputPassword = document.getElementById("input-password");

  const password = inputPassword.value;

  if (username === "admin" && password === "admin123") {
    window.location.href = "home.html";
  } else {
    alert("Login Failed!! Try Again");
    return;
  }
});
