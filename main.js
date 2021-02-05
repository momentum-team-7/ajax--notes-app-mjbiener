console.log ("hello")

const url = 'http://localhost:3000/notes/'
const form =document.querySelector('#notes-form')
const noteList = document.querySelector('#note-list')

form.addEventListener('submit', function (event) {
    event.preventDefault()
    const noteText = document.querySelector('#note-text').Value
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
            console.log(note.body)
            renderNoteItem(note)
        }
    })
}
function renderNoteItem (noteObj) {
    const itemEL = document.createElement('li')
    itemEL.id = noteObj.id
    // itemEL.classList.add(
    //     'lh-copy',
    //     'pv3',
    //     'ba',
    //     'bl-0',
    //     'bt-0',
    //     'br-0',
    //     'b--dotted',
    //     'b--black-3'
    // )
    renderNoteText(itemEl, noteObj)
    noteList.appendChild(itemEl)
    // clearInput()
}


function renderNoteText(noteItem, noteObj) {
    console.log("noteObj.body")
    noteListItem.innerHTML =` ${noteObj.body}`
}

    // function clearInput () {

    // }