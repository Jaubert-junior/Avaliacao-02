function getById(id) {
    return document.getElementById(id)
}
const seletorTema = document.getById("temaSelect");

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
        avaliacao: getById('avaliacao').value
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

    // Remove apenas o tbody antigo
    let antigo = tabela.querySelector("tbody")
    if (antigo) tabela.removeChild(antigo)

    for (let i = 0; i < li.length; i++) {

        let tr = document.createElement("tr")

        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${li[i].titulo}</td>
            <td>${li[i].autor}</td>
            <td>${li[i].genero}</td>
            <td>${li[i].avaliacao}</td>
            <td class="excluir" data-id="${i}">excluir</td>
        `

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