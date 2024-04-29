//LISTAGEM DE LIVROS E AUTORES

const livroList = document.querySelector('#book-list');

function renderBook(doc) {

    // console.log(doc.data());
    //Criação dos elementos html
    let li = document.createElement('li');
    let titulo = document.createElement('span');
    let autor = document.createElement('span');
    let excluir = document.createElement('div');
    excluir.textContent='x'

    //Carrega os dados ns elementos html
    li.setAttribute('data-id', doc.id);
    titulo.textContent = doc.data().titulo;
    autor.textContent = doc.data().autor;

    // console.log(autor);

    //Adicionando os dados de autor e titulo na tag li
    li.appendChild(titulo);
    li.appendChild(autor);
    li.appendChild(excluir);

    // console.log(li);

    excluir.addEventListener('click', (event)=>{
        event.stopPropagation();
        let id = event.target.parentElement.getAttribute('data-id');

        db.collection('libri-firestore').doc(id).delete()
        .then(()=>{window.location.reload ()})
    });

    //Adicionando o li na tag ul
    livroList.appendChild(li);
}

db.collection('libri-firestore')
    .get()
    .then(
        (snapshot)=> {
            //console.log(snapshot.docs)
            snapshot.docs.forEach(doc => {
                // console.log(doc.data());
                renderBook(doc);
            });
        }
    )

//INSERÇÃO DE LIVROS E AUTORES

const form = document.querySelector('#add-book-form');

form.addEventListener('submit', (event)=> {

    event.preventDefault();
    db.collection('libri-firestore').add({
        autor: form.autor.value,
        titulo: form.titulo.value
    }).then(()=> {
        form.autor.value = '';
        form.titulo.value = '';
        window.location.reload(); /*!*/
    });
})
