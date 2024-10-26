import ConnectToDB from "./models/Database.js";


const loginButton = document.getElementById("loginbutton");
const registerButton = document.getElementById("registerbutton");
const database = new ConnectToDB();


loginButton.addEventListener("click", login);
registerButton.addEventListener("click", register);


async function login() {
  const inputUsername = document.getElementById("loginUsername").value;
  const inputPassword = document.getElementById("loginPassword").value;

  const allUsers = await database.readAll();

  for (const user of allUsers) {
    if (user["username"] === inputUsername && user["password"] === inputPassword) {
      window.open(`shop.html?id=${user["id"]}`);
      clearFields();
      return;
    }
  }
  alert("Usuario no encontrado");
}


async function register() {
  if (!validateRegister()) {
    return;
  }

  const inputUsername = document.getElementById("signupUsername").value;
  const inputPassword = document.getElementById("registerPassword").value;
  const repeatPassword = document.getElementById("confirmPassword").value;

  const allUsers = await database.readAll();

  for (const user of allUsers) {
    if (user["username"] === inputUsername) {
      alert("Error: Nombre de usuario ya en uso. Por favor, usa otro nombre de usuario.");
      return;
    }
  }

  if (inputPassword === repeatPassword) {
    const data = {
      username: inputUsername,
      password: inputPassword,
      balance: 10000,
      wishlist: [],
      inventory: [],
      shoppingCart: []
    };
    await database.create(data);
    alert(`Nuevo usuario ${inputUsername} creado. Por favor, inicia sesión para acceder a la tienda.`);
    clearFields();
    location.reload();
  } else {
    alert("Las contraseñas no coinciden.");
  }
}


const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;


function validateRegister() {
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return false;
  }

  if (!passwordPattern.test(password)) {
    alert("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.");
    return false;
  }

  return true;
}

function clearFields() {
  document.getElementById("loginUsername").value = "";
  document.getElementById("loginPassword").value = "";
  document.getElementById("signupUsername").value = "";
  document.getElementById("registerPassword").value = "";
  document.getElementById("confirmPassword").value = "";
}