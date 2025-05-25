let form = document.getElementById("form");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let messageInput = document.getElementById("message");
let submitButton = document.querySelector(".submit");

window.onload = function () {
  messageInput.value = "";
};

form.addEventListener("submit", (e) => {
  checkInputs();
  if (
    nameInput.parentElement.className === "form-control success" &&
    emailInput.parentElement.className === "form-control success" &&
    messageInput.parentElement.className === "form-control success"
  ) {
    form.className = "form";
    end();
    alert("Thanks for reaching out! I will contact you soon!");
  } else if (
    emailInput.parentElement.className === "form-control success" ||
    messageInput.parentElement.className === "form-control success" ||
    nameInput.parentElement.className === "form-control success"
  ) {
    if (
      (nameInput.parentElement.className === "form-control success" &&
        emailInput.parentElement.className === "form-control success") ||
      (nameInput.parentElement.className === "form-control success" &&
        messageInput.parentElement.className === "form-control success") ||
      (emailInput.parentElement.className === "form-control success" &&
        messageInput.parentElement.className === "form-control success")
    ) {
      form.className = "form halferror";
      e.preventDefault();
    } else {
      form.className = "form almosterror";
      e.preventDefault();
    }
  } else {
    form.className = "form fullerror";
    e.preventDefault();
  }
});

function checkInputs() {
  const nameV = nameInput.value.trim();
  const emailV = emailInput.value.trim();
  const messageV = messageInput.value.trim();

  if (nameV === "") {
    setErrorFor(nameInput);
  } else if (!isName(nameV)) {
    setErrorFor(nameInput);
  } else {
    setSuccessFor(nameInput);
  }

  if (emailV === "") {
    setErrorFor(emailInput);
  } else if (!isEmail(emailV)) {
    setErrorFor(emailInput);
  } else {
    setSuccessFor(emailInput);
  }

  if (messageV === "") {
    setErrorFor(messageInput);
  } else {
    setSuccessFor(messageInput);
  }
}

function setErrorFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  input.classList.add("animation");
  setTimeout(function () {
    input.classList.remove("animation");
  }, 1000);
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isName(name) {
  return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
    name
  );
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function end() {
  return true;
}
