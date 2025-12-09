function getById(id) {
    return document.getElementById(id)
}
const seletorTema = getById("temaSelect");

const temaSalvo = localStorage.getItem("temaSite") || "claro";
document.body.className = temaSalvo;
seletorTema.value = temaSalvo;

seletorTema.addEventListener("change", () => {
    const tema = seletorTema.value;

    document.body.className = tema;
    localStorage.setItem("temaSite", tema);
});

const input = document.querySelectorAll("[inputForm]")

getById('botaoAdicionar').addEventListener('click', (e) => {
    e.preventDefault()

    let livro = {
        titulo: getById('titulo').value.trim(),
        autor: getById('autor').value.trim(),
        genero: getById('genero').value.trim(),
        avaliacao: getById('avaliacao').value,
        data: Date.now,
    }

  
    if (!livro.titulo || !livro.autor || !livro.genero) {
        alert('Todos os campos devem estar preenchidos')
        return
    }


    let livros = JSON.parse(localStorage.getItem('livros')) || []

  
    livros.push(livro)

   
    localStorage.setItem('livros', JSON.stringify(livros))

    
    input.forEach(i => i.value = '')

   
    contar()
})



function contar () {
    let li = JSON.parse(localStorage.getItem('livros'))
    if (!li) return

    let tabela = getById('tabela')
    let corpoTabela = document.createElement('tbody')
    let total = getById('contador')

    let antigo = tabela.querySelector("tbody")
    if (antigo) tabela.removeChild(antigo)

    for (let i = 0; i < li.length; i++) {

        let tr = document.createElement("tr")
        let td = document.createElement('td')
        let id = document.createElement('td')
        let titulo = document.createElement('td')
        let autor = document.createElement('td')
        let genero = document.createElement('td')
        let avaliacao = document.createElement('td')
        let dataCriacao = document.createElement('td')


        id.innerHTML = i++
        titulo.innerHTML = li[i].titulo
        autor.innerHTML = li[i].autor
        genero.innerHTML = li[i].genero
        avaliacao.innerHTML =  li[i].avaliacao
        dataCriacao.innerHTML =  li[i].data

        corpoTabela.appendChild(tr)

    }

    tabela.appendChild(corpoTabela)

    total.innerHTML = li.length

    document.querySelectorAll('.excluir').forEach(btn => {
        btn.addEventListener('click', () => {
            let id = btn.getAttribute('data-id')
            li.splice(id, 1)
            localStorage.setItem('livros', JSON.stringify(li))
            contar()
        })
    })
}
