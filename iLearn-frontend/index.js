document.addEventListener("DOMContentLoaded", function(){
fetchCards()
createCard()
deleteCard()
editCard()
updateCard()

postDeck()
fetchDeck()
fetchSubject()

filterDeck()
})

let deckSelection = document.querySelector("#deck-list")

function postDeck() {
  let deckForm = document.querySelector(".add-deck-form")
  deckForm.addEventListener("submit", function(event){
    event.preventDefault()
    let newDeck = event.target.querySelector('#deck-input').value
    fetch("http://localhost:3000/api/v1/decks", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"name": newDeck})
    }).then(res => {
      let optionTag = document.createElement("option")
      optionTag.vale = newDeck
      optionTag.innerText = newDeck
      deckSelection.append(optionTag)
      event.target.reset()
    })
  })
}

function fetchDeck(){
  fetch("http://localhost:3000/api/v1/decks")
  .then(res => res.json())
  .then(decks => showDecks(decks))
}

function showDecks(decks){
  decks.forEach(function(deck){
    let optionTag = document.createElement("option")
    optionTag.vale = `${deck.name}`
    optionTag.innerText = `${deck.name}`
    deckSelection.append(optionTag)
  })
}


function fetchSubject(){
  fetch("http://localhost:3000/api/v1/subjects")
  .then(res => res.json())
  .then(subjects => showSubjects(subjects))
}
let subjectSelection = document.querySelector("#subject-list")

function showSubjects(subjects){
  subjects.forEach(function(subject){
    let optionTag = document.createElement("option")
    optionTag.vale = `${subject.name}`
    optionTag.innerText = `${subject.name}`
    subjectSelection.append(optionTag)
  })
}

function fetchCards(){
  fetch("http://localhost:3000/api/v1/cards")
  .then(res => res.json())
  .then(cards => showCards(cards))
}

let parentDiv = document.querySelector(".maincontainer")

function showCards(cards){

  cards.forEach(function(card){
    let childDiv = document.createElement("div")
    childDiv.className = "thecard"
    childDiv.dataset.id = card.id
    let frontDiv = document.createElement("div")
    frontDiv.className = "thefront"

    let backDiv = document.createElement("div")
    backDiv.className = "theback"
    let newH2 = document.createElement("h2")
    newH2.innerText = card.question
    let newH3 = document.createElement("h3")
    newH3.innerText = card.answer
    let newH5 = document.createElement("h5")
    newH5.className = "deck-title"
    newH5.innerText = card.deck.name
    let newH6 = document.createElement("h6")
    newH6.innerText = card.subject.name
    let cardSpan = document.createElement("span")
      cardSpan.style = "display:none"
      cardSpan.innerText = card.id
      let deleteButton = document.createElement("button")
      deleteButton.className = "delete-button"
      deleteButton.innerText = "X"

      let editButton = document.createElement("button")
      editButton.className = "edit-button"
      editButton.innerText = "Edit"

    parentDiv.append(childDiv)
    frontDiv.append(newH2)
    childDiv.append(frontDiv)
    childDiv.append(backDiv)
    backDiv.append(newH3)
    frontDiv.append(newH5)
    frontDiv.append(newH6)
    childDiv.append(cardSpan)
    backDiv.append(deleteButton)
    backDiv.append(editButton)
  })
}

function createCard(){
  let newCardForm = document.querySelector(".add-card-form")
  newCardForm.addEventListener("submit", function(event){

    event.preventDefault()
    let newQuestion = event.target.querySelector("#question-input").value
    let newAnswer = event.target.querySelector("#answer-input").value
    let selectedDeck = deckSelection.options[deckSelection.selectedIndex].value;
    let selectedSubject = subjectSelection.options[subjectSelection.selectedIndex].value;

    fetch("http://localhost:3000/api/v1/cards", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"question": newQuestion, "answer": newAnswer, "deck": selectedDeck, "subject": selectedSubject})

  }).then(res => res.json()).then(newData => {


    let parentDiv = document.querySelector(".maincontainer")
    let childDiv = document.createElement("div")
    childDiv.className = "thecard"
    let frontDiv = document.createElement("div")
    frontDiv.className = "thefront"

    let backDiv = document.createElement("div")
    backDiv.className = "theback"
    let newH2 = document.createElement("h2")
    newH2.innerText = newQuestion
    let newH3 = document.createElement("h3")
    newH3.innerText = newAnswer
    let newH5 = document.createElement("h5")
    newH5.innerText = selectedDeck
    let newH6 = document.createElement("h6")
    newH6.innerText = selectedSubject
    let cardSpan = document.createElement("span")
      cardSpan.style = "display:none"
      cardSpan.innerText = newData.id
      let deleteButton = document.createElement("button")
      deleteButton.className = "delete-button"
      deleteButton.innerText = "X"

      let editButton = document.createElement("button")
      editButton.className = "edit-button"
      editButton.innerText = "Edit"

    parentDiv.append(childDiv)
    frontDiv.append(newH2)
    childDiv.append(frontDiv)
    childDiv.append(backDiv)
    backDiv.append(newH3)
    frontDiv.append(newH5)
    frontDiv.append(newH6)
    childDiv.append(cardSpan)
    backDiv.append(deleteButton)
    backDiv.append(editButton)
  })

    event.target.reset()
  })
}

// parentDiv.addEventListener("click", deleteCard, false)

function deleteCard(){

  parentDiv.addEventListener("click", function(event){
    event.preventDefault()

  let cardId = parseInt(event.target.parentElement.parentNode.querySelector("span").innerText)

    if (event.target.className === "delete-button") {
      fetch(`http://localhost:3000/api/v1/cards/${cardId}`, { method: "DELETE" }).then(res => {
      event.target.parentNode.parentNode.remove()
    })
    }
  })
}


function editCard(){
  parentDiv.addEventListener("click", function(event){
    event.preventDefault()
    if(event.target.className === "edit-button") {

      let editQuestion = event.target.parentNode.parentNode.querySelector("h2").innerText
      // let editDeck = event.target.parentNode.parentNode.querySelector("h5").innerText
      // let editSubject = event.target.parentNode.parentNode.querySelector("h6").innerText
      let editAnswer = event.target.parentNode.parentNode.querySelector("h3").innerText
      let editCardId = event.target.parentNode.parentNode.querySelector("span").innerText



      // document.querySelector("#edit-question-input").value = editQuestion
      document.querySelector("p").innerText = editCardId
      document.querySelector("#edit-question-input").value = editQuestion
      // document.querySelector("#edit-deck-input").value = editDeck
      // document.querySelector("#edit-subject-input").value = editSubject
      document.querySelector("#edit-answer-input").value = editAnswer
      // updateCard(event)
    }
  })
}

function updateCard() {

  let editCardForm = document.querySelector("#edit-card-form")
  editCardForm.addEventListener("submit", function(updateEvent){
    updateEvent.preventDefault()
    let cardId = parseInt(updateEvent.target.querySelector("p").innerText)
    let editedQuestion = updateEvent.target.querySelector("#edit-question-input").value
    // let editedDeck = updateEvent.target.querySelector("#edit-deck-input").value
    // let editedSubject = updateEvent.target.querySelector("#edit-subject-input").value
    let editedAnswer = updateEvent.target.querySelector("#edit-answer-input").value



    fetch(`http://localhost:3000/api/v1/cards/${cardId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"question": editedQuestion, "answer": editedAnswer})
    }).then(res => {
      // editQuestion = editedQuestion
      // event.target.parentNode.parentNode.querySelector("h5").innerText = editedDeck
      // event.target.parentNode.parentNode.querySelector("h6").innerText = editedSubject
      // editAnswer = editedAnswer
      let theCard = document.querySelector(`[data-id = '${cardId}']`)
      theCard.querySelector("h2").innerText = editedQuestion
      theCard.querySelector("h3").innerText = editedQuestion
    })

     updateEvent.target.reset()
  })
}


function filterDeck() {
  searchInput = document.getElementById("filter-input")
  searchInput.addEventListener("input", (event) => {

    allDeckTitle = document.getElementsByClassName("deck-title")
    deckArr = Array.from(allDeckTitle)

    deckArr.forEach((deck) => {

      if (deck.innerText.toLowerCase().includes(event.target.value.toLowerCase())) {

        deck.parentNode.parentNode.style.display = 'block'
        // block === show the object but blocks everything else

      } else {
        deck.parentNode.parentNode.style.display = 'none'
        // none === dont show me anythign
      }
    })
  })
}
