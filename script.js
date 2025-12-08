function getById(id){
    return document.getElementById(id)
}


getById(botaoAdicionar).addEventListener('click', (e)=>{
    let titulo = getById(titulo)
    let autor = getById(autor)
    let genero = getById(genero)
    let avaliação = getById(avaliação)

    e.preventDefault
})