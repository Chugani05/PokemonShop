// Expresión regular para validar email
const emailPattern = /.+@.+\..+/;

// Expresión regular de contraseña que acepte al menos una letra mayúscula,
// un número, un símbolo y una longitud mínima de 8 caracteres
const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$/;

function validateLogin() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  // Limito longitud del campo
  if (username.length >= 10) {
    alert("El nombre de usuario debe tener al menos 3 caracteres.");
    return false;
  }

  // Compruebo el formato mínimo de la contraseña
  if (!passwordPattern.test(password)) {
    alert(
      "La contraseña debe tener al menos 8 caracteres, incluir una letra, al menos una mayúscula, un símbolo y un número."
    );
    return false;
  }

  return true;
}

function validateRegister() {
  const name = document.getElementById("name").value;
  const apellidos = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Limito longitud del campo name
  if (name.length >= 10) {
    alert("El nombre es muy largo.");
    return false;
  }

  // Limito longitud del campo apellidos
  if (apellidos.length >= 40) {
    alert("La longitud del apellido es muy larga.");
    return false;
  }

  // Compruebo el formato del correo
  if (!emailPattern.test(email)) {
    alert("Por favor, introduce un correo electrónico válido.");
    return false;
  }

  // Compruebo el formato mínimo de la contraseña
  if (!passwordPattern.test(password)) {
    alert(
      "La contraseña debe tener al menos 8 caracteres, incluir una letra y un número."
    );
    return false;
  }

  // Confirmo que ha escrito correctamente la contraseña
  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return false;
  }

  return true;
}
