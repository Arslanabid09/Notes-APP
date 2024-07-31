const addBtn = document.getElementById('addBtn');
const notesBox = document.querySelector('.child');

function storeNotes() {
    let notesArr = [];
    const notes = document.querySelectorAll('.input-box');
    notes.forEach(note => {
        notesArr.push(note.innerText);
    });
    localStorage.setItem('notes', JSON.stringify(notesArr));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
        notes.forEach(noteText => {
            let inputBox = document.createElement('p');
            let img = document.createElement('img');
            inputBox.setAttribute("class", "input-box");
            inputBox.setAttribute("contenteditable", "true");
            inputBox.innerText = noteText;
            img.setAttribute("src", "./remove.png");
            inputBox.appendChild(img);
            notesBox.appendChild(inputBox);
        });
    }
}

addBtn.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.setAttribute("src", "./remove.png");
    inputBox.appendChild(img);
    notesBox.appendChild(inputBox);
    storeNotes(); 
});

notesBox.addEventListener('click', function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        storeNotes();
    } else if (e.target.tagName === "P") {
        // Handle potential changes in content
        e.target.addEventListener('input', storeNotes);
    }
});

window.onload = loadNotes;
