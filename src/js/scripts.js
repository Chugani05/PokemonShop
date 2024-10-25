import ConnectToDB from "./models/Database.js";
// Coneccion a la base de datos
//
// 

const loginButton = document.getElementById("loginbutton");
const registerButton = document.getElementById("registerbutton");
const database = new ConnectToDB()

loginButton.addEventListener("click", login);

registerButton.addEventListener("click", register);

async function login() {
  console.log("Hola")
  const inputUsername = document.getElementById("loginUsername").value;
  const inputPassword = document.getElementById("loginPassword").value;

  const allUsers = await database.readAll()

  for (const user of allUsers) {
    console.log(user)
    if (user["username"] == inputUsername & user["password"] == inputPassword) {
      window.open(`shop.html?id=${user["id"]}`)
      return;
    }
  }
  alert("User not found")
}

async function register() {
  
}

// Validación del login y el registro
//
// 
// Expresión regular de contraseña que acepte al menos una letra mayúscula, un número, y una longitud mínima de 8 caracteres (sin símbolos)
const passwordPattern =
  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

function validateLogin() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  // Limito la longitud del nombre de usuario (debe tener al menos 3 caracteres)
  if (username.length < 3) {
    alert("El nombre de usuario debe tener al menos 3 caracteres.");
    return false;
  }

  // Compruebo el formato mínimo de la contraseña
  if (!passwordPattern.test(password)) {
    alert(
      "La contraseña debe tener al menos 8 caracteres, al menos una mayúscula y un número."
    );
    return false;
  }

  return true;
}

function validateRegister() {
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Confirmo que las contraseñas coinciden
  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return false;
  }

  // Compruebo el formato mínimo de la contraseña en el registro
  if (!passwordPattern.test(password)) {
    alert(
      "La contraseña debe tener al menos 8 caracteres, al menos una mayúscula y un número."
    );
    return false;
  }

  return true;
}