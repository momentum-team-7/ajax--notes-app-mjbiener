// const moment = require("moment")

// const moment = require("moment")

console.log ("hello")

const url = 'http://localhost:3000/notes/'
const form =document.querySelector('#notes-form')
const noteList = document.querySelector('#note-list')

form.addEventListener('submit', function (event) {
    event.preventDefault()
    const noteText = document.querySelector('#note-text').value
    createNote(noteText)
})

noteList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        deleteNote(event.target)
    }
    if (event.target.classList.contains('edit')) {
        editNote(event.target)
    }
    if (event.target.classList.contains('update-note')) {
        updateNote(event.target)
    }
    if (event.target.classList.contains('cancel')) {
        hideControls(event.target.parentElement)
    }
})

listNotes()

function listNotes () {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        for (let note of data) {
            console.log(note)
            renderNoteItem(note)
        }
    })
}
function renderNoteItem (noteObj) {
    const itemEL = document.createElement('li')
    itemEL.id = noteObj.id
    // let delButton = document.createElement("button");
    // delButton.className = "delete-note-button";
    // delButton.innerHTML = "Delete Note"
    itemEL.classList.add(
        'lh-copy',
        'pv3',
        'ba',
        'bl-0',
        'bt-0',
        'br-0',
        'b--dotted',
        'b--black-3'
    )
    renderNoteText(itemEL, noteObj)
    // noteList.appendChild(delButton)
    noteList.appendChild(itemEL)
    clearInput()
}

// noteListItem
function renderNoteText(noteListItem, noteObj) {
    console.log(noteObj)
    noteListItem.innerHTML = //`<p> ${noteObj.body}</p>`
    `<span class="dib w-60">${noteObj.body}</span><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`
}

function createNote (noteText) {
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json' },
        body: JSON.stringify({
            body: noteText,
            created_at: moment().format()
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            renderNoteItem(data)
        })
}

function deleteNote(note) {
    const noteId = note.parentElement.id
    fetch(url+noteId, {method: 'DELETE'})
    .then(()=> {
        note.parentElement.remove()
        // listNotes();
    })
}

function editNote(element) {
    showEditInput(element.parentElement)
}

function showEditInput (noteItem) {
    noteItem.innerHTML = `
    <input class="edit-text bw0 pl0 outline-0 w-60" type="text" value="${noteItem.textContent}" autofocus>
    <button class='update-note f6 link br-pill p1 ml1 dib white bg-green' data-note=${noteItem.id}>save</button>
      <button class='cancel f6 link br-pill p1 ml2 dib white light-purple'>cancel</button>
      `
    noteItem.querySelector('input').select()
}

function updateNote (element) {
    const noteId = element.parentElement.id
    const noteText = document.querySelector('.edit-text')
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            body: noteText.value,
            updated_at: moment().format()
        })
    })
    .then(function (res) {
        return res.json()
    })
    .then(function (data){
        console.log(data)
        renderNoteText(element.parentElement, data)
    })
}

function hideEditControls (noteItem) {
    fetch(`http://localhost:3000/notes/${noteItem.id}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        renderNoteText(noteItem, data)
    })
}

    function clearInput () {
        const inputs = document.querySelectorAll('input')
            for (let field of inputs) {
                field.value = ''
            }
    }