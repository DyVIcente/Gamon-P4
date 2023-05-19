function editNav() {
  var x = document.getElementById("myTopnav")
  if (x.className === "topnav") {
    x.className += " responsive"
  } else {
    x.className = "topnav"
  }
}

// Récupération de tout les éléments du DOM utiles
const modalbg = document.querySelector("#modalForm")
const form = document.getElementById("form")
const formData = document.querySelectorAll(".formData")
const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const email = document.querySelector("#email")
const birthdate = document.querySelector("#birthdate")
const quantity = document.querySelector("#quantity")
const tournamentLocation = document.getElementsByName("location")
const checkboxCondition = document.getElementById("checkbox1")
const modalBtn = document.querySelectorAll(".modal-btn")
const closeFormBtn = document.querySelector(".close")
const confirmModal = document.querySelector("#confirmationModal")
const closeModalBtn = document.querySelector("#closeModalBtn")
const submitBtn = document.getElementById('btn-submit')

//////////////////////////

function launchModal() {
  modalbg.style.display = "block"
}


function closeModal() {
  modalbg.style.display = "none"
}


modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))


closeFormBtn.addEventListener("click", closeModal)


submitBtn.addEventListener("click", isValid)

// get confirmation modal from the DOM /////////////////////////


function displayConfirmModal() {
  confirmModal.style.display = "block"
}

function closeconfirmModal() {
  confirmModal.style.display = "none"
}

closeModalBtn.addEventListener("click", closeconfirmModal)

//////////////////////////////////////////////////////////////////////


// Fonction qui passe le message d'erreur en true
function displayError(element, message) {
  element.setAttribute('data-error', message)
  element.setAttribute('data-error-visible', true)
}

// Fonction qui enlève le message d'erreur d'un élément
function removeError(element) {
  element.removeAttribute('data-error')
  element.removeAttribute('data-error-visible')
}

//////////////////////////////////////////////////////////////////////

const emailRegex = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/

// Définir la date d'aujourd'hui
const today = new Date()
let day = today.getDate();
let month = today.getMonth() + 1
let year = today.getFullYear()
let currentDate = `${day}-${0}${month}-${year}`

// Fonction pour valider le formulaire
function isValid() {

  // on rajoute la vérification si le champ contient des chiffres
  if (firstName.value === "" || firstName.value.length < 2 || /\d/.test(firstName.value)) {
    displayError(formData[0], 'Veuillez renseigner votre prénom')
  } else {
    removeError(formData[0])
  }

  if (lastName.value === "" || lastName.value.length < 2 || /\d/.test(firstName.value)) {
    displayError(formData[1], 'Veuillez renseigner votre nom')
  } else {
    removeError(formData[1])
  }

  if (email.value === "" || !email.value.match(emailRegex)) {
    displayError(formData[2], 'Veuillez renseigner un email valide')
  } else {
    removeError(formData[2])
  }

  if (birthdate.value === "") {
    displayError(formData[3], 'Veuillez renseigner votre date de naissance')
  } 
  else if (birthdate.value >= currentDate) {
    displayError(formData[3], 'Vous ne pouvez pas être né dans le futur !')
  }
  else {
    removeError(formData[3])
  }

  if (quantity.value === "") {
    displayError(formData[4], 'Veuillez renseigner ce champs par un chiffre')
  } else {
    removeError(formData[4])
  }

  // Les boutons "radio"
  let radioIsChecked = false;
  for (let i = 1; i < tournamentLocation.length; i++) {
    if (tournamentLocation[i].checked) {
      radioIsChecked= true;
      break;
  }
  }

  if(!radioIsChecked) {
    displayError(formData[5], 'Veuillez cocher une localisation')
  }
  else {
    removeError(formData[5])
  } 

  // La case conditions d'utilisations
  let conditionIsChecked

  if(checkboxCondition.checked) {
    conditionIsChecked = true
  }

  if(!conditionIsChecked) {
    displayError(formData[6], `Veuillez accepter les conditions d'utilisations`)
  }
  else{
    removeError(formData[6])
  }
} 


////////////////////////////////////////////////////////////////////////

// On vérifie si le formulaire est valide et si c'est le cas on valide le formulaire
form.addEventListener("submit", event => {
	if (!isValid) {
    event.preventDefault()
  }
  else {
    event.preventDefault()

    formValidation()
  }
});

// Formulaire validé
function formValidation() {
  closeModal()
  displayConfirmModal()
  form.reset()
}