const botaoAdicionar = document.getElementById('adicionarTarefa');
botaoAdicionar.addEventListener('click', salvarTarefa);
let arrayTarefas = localStorage.getItem('tarefas')?JSON.parse(localStorage.getItem('tarefas')):[]

carregaTarefaSalva();

function validaInput(){
    const input = document.getElementById('input').value;
    if (input==""){
        alert("Nenhuma tarefa foi informada.");
        return false;
    }
    return true;
}

function carregaTarefaSalva(){
    arrayTarefas.forEach(element => {
        criaTarefaDom(element)
    });
}

function criaTarefaDom({inputTarefaValor, id}){
    const ul = document.getElementById('ul');
    const li = document.createElement('li');
    
    li.className = 'itemLista';
    li.setAttribute('id', id);
    const div = document.createElement('div');
    div.classList.add('container');
    const checkbox = document.createElement('input');
    checkbox.className = 'checkboxTarefa';
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('click', (event)=>{
        if(event.target.checked){
            div.classList.add('checkboxTarefaChecked');
        } else {
            div.classList.remove('checkboxTarefaChecked');
        }
    });
    
   
    div.appendChild(checkbox);
    div.appendChild(document.createTextNode(inputTarefaValor))
    li.appendChild(div);
    ul.appendChild(li);

    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerText = "X";
    botaoExcluir.className = 'removeTarefa';
    li.appendChild(botaoExcluir);
    botaoExcluir.addEventListener('click', ()=>removerTarefa(li));

}

function criaElemento({inputTarefaValor, id}){
    criaTarefaDom({inputTarefaValor, id});    
    arrayTarefas.push({inputTarefaValor, id});
    const arrayTarefasString = JSON.stringify(arrayTarefas);
    localStorage.setItem('tarefas', arrayTarefasString);
}

const removerTarefa=(li)=>{
    if(confirm("Tem certeza de que deseja excluir essa tarefa?")) {
        li.remove();
        arrayTarefas = arrayTarefas.filter(tarefa=> tarefa.id != li.id);
        const arrayTarefasString = JSON.stringify(arrayTarefas);
        localStorage.setItem('tarefas', arrayTarefasString);
    }
}

function salvarTarefa(){
    if(!validaInput()){
        return;
    }

    const inputTarefa = document.getElementById('input');
    const inputTarefaValor = inputTarefa.value;
    const id = "id" + Math.random().toString(16).slice(2);

    criaElemento({inputTarefaValor, id});
    inputTarefa.value = "";
}