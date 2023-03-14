import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [msgValidacao, setMsgValidacao] = useState([]);
  const [listaTarefas, setListaTarefas] = useState([]);

  const itemTarefa = {
    id: id =="" ? Date.now() : id,
    titulo: titulo,
    categoria: categoria,
    data: data,
    descricao: descricao,
  }

  const validaCampo = (tarefa) =>{
    setMsgValidacao([]);
    let msg = [];
    if(tarefa.titulo == "")
      msg.push("titulo");
    
    if(tarefa.categoria == "")
      msg.push("categoria");
    
    if(tarefa.data == "")
      msg.push("data");

    if(tarefa.descricao == "")
      msg.push("descricao")
      
    if(msg != ""){
      setMsgValidacao(msg);
      return true;
    }
    return false;
  }

  const limpaFormulario = () =>{
    setId("");
    setTitulo("");
    setCategoria("");
    setData("");
    setDescricao("");
    setMsgValidacao([]);
  }

  const adicionaTarefa = (event) => {
    // debugger;
    event.preventDefault();
    if(validaCampo(itemTarefa))
      return
    setListaTarefas([...listaTarefas,itemTarefa ]);
    limpaFormulario();
  }

  const editarTarefa = (event) => {
    event.preventDefault();
    if(validaCampo(itemTarefa))
      return
    const newListaTarefas = listaTarefas.slice();
    let index = newListaTarefas.findIndex(item => {
      return item.id = id
    })
    newListaTarefas[index].titulo = itemTarefa.titulo
    newListaTarefas[index].categoria = itemTarefa.categoria
    newListaTarefas[index].data = itemTarefa.data
    newListaTarefas[index].descricao = itemTarefa.descricao
    limpaFormulario();
  }

  const carregarDados = (index) => {
    const itemResult = listaTarefas[index];
    setId(itemResult.id);
    setTitulo(itemResult.titulo);
    setCategoria(itemResult.categoria);
    setData(itemResult.data);
    setDescricao(itemResult.descricao);
  }

  const apagarTarefa = (id) => {
    if(confirm("Deseja realmente apagar a tarefa?")){
      const result = listaTarefas.filter((item) => item.id != id )
      setListaTarefas(result);
    }
  }

  return (
    <div className="container">
      <div className="col-12 div_body" >
        <div className="col-4 div_input">
          <div className="col-12 div_form">
            <div className="div_form_input">
              <h1 className="titulo">Cadastrar Tarefa</h1>
              <form>
                <p>Titulo</p>
                <input type="text" required onChange={(event) => setTitulo(event.target.value)} value={titulo} style={msgValidacao.indexOf('titulo') != -1 && titulo.length == 0 ? { borderColor: "red"}: {marginBottom:"20px"}} />
                {msgValidacao.indexOf('titulo') != -1 && titulo.length == 0  ? <span className="alet_input">Campo obrigatório</span> : <span></span>}

                <p>Categoria</p>
                <select required onChange={(event) => setCategoria(event.target.value)} value={categoria} style={msgValidacao.indexOf('categoria') != -1 && categoria.length == 0 ? { borderColor: "red"}: {marginBottom:"20px"}}  >
                  <option value="">Selecione uma opção</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Prioridade">Prioridade</option>
                  <option value="Outros">Outros</option>
                </select>
                {msgValidacao.indexOf('categoria') != -1 && categoria.length == 0  ? <span className="alet_input">Campo obrigatório</span> : <span></span>}

                <p>Data</p>
                <input type="date" required onChange={(event) => setData(event.target.value)} value={data} style={msgValidacao.indexOf('data') != -1 && data.length == 0 ? { borderColor: "red"}: {marginBottom:"20px"}} />
                {msgValidacao.indexOf('data') != -1 && data.length == 0  ? <span className="alet_input">Campo obrigatório</span> : <span></span>}

                <p>Descrição</p>
                <input type="text" required onChange={(event) => setDescricao(event.target.value)} value={descricao} style={msgValidacao.indexOf('descricao') != -1 && descricao.length == 0 ? { borderColor: "red"}: {marginBottom:"20px"}} />
                {msgValidacao.indexOf('descricao') != -1 && descricao.length == 0  ? <span className="alet_input">Campo obrigatório</span> : <span></span>}

                <div className="btn_form">
                  <button className="btn btn_lg success " onClick={(event) => id ? editarTarefa(event) : adicionaTarefa(event) } > {id ? "Atualizar" : "Aidiconar"} </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-8">
          <span className="titulo_body_tarefa"><h1>Minhas Tarefas</h1> <span>Total: {listaTarefas.length} {listaTarefas.length <= 1 ? "tarefa" : "tarefas"}</span></span>
          {listaTarefas.length > 0 ? (
            <ul>
              {listaTarefas.map((item, index) => (
              <li key={index}>
                <h3 className="titulo_tarefa"> <span>{item.titulo}</span> <span>{item.data}</span>  </h3>
                <p className="subtitulo_tarefa">{item.categoria}</p>
                <p className="conteudo_tarefa">{item.descricao}</p>
                <div className="right">
                  <button className="btn_icon alert_outline" onClick={() => carregarDados(index)}> <FontAwesomeIcon icon={faPencil} /> </button>
                  <button className="btn_icon danger_outline" onClick={() => apagarTarefa(item.id)} > <FontAwesomeIcon icon={faTrashAlt} /> </button>
                </div>
              </li>
              ))}
            </ul>
          ) : (<p>Nenhum item cadastrado</p>)}
        </div>
      </div>
    </div>
  )
}

export default App
