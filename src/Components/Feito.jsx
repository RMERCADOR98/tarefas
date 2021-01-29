import React, { useState, useEffect } from "react";
import axios from "axios";
//COMPONENTS
import Modal from "../Components/Modal";
import Dropdown from "./Dropdown";

const Feito = ({ deleteTarefa }) => {
  const [tarefa, setTarefa] = useState({
    tarefa: "",
    estado: "feito",
  });

  //ABRIR O "ADICIONAR"
  const [click, setClick] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setClick(!click);
  };

  //TODAS AS TAREFAS "FEITO"
  const [datas, setDatas] = useState([]);
  const fetch = async () => {
    await axios
      .get("https://tarefass-api.herokuapp.com/api/v1/feitoTarefas")
      .then(({ data }) => {
        setDatas(data);
      })
      .catch((err) => console.log(err));
  };

  //ADICIONAR TAREFA
  const handleChange = (e) => {
    setTarefa({
      ...tarefa,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://tarefass-api.herokuapp.com/api/v1/criarTarefa",
      tarefa
    );
    window.location.reload();
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="column is-4">
      <div className="card has-background-grey-lighter">
        <div className="card-content">
          <p className="title is-3">Feito ✅</p>
          {datas.length ? (
            datas.map((data) => {
              return (
                <div
                  key={data.id}
                  className="media box has-background-white-bis "
                >
                  <div className="media-content">
                    <p className="is-size-5">{data.tarefa}</p>
                  </div>
                  <div className="media-right">
                    <div className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
                      <Modal data={data} />
                      <button
                        className="button is-danger is-small"
                        onClick={() => deleteTarefa(data.id)}
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                      {/* Testing the Dropdown */}
                      <Dropdown data={data} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Sem Tarefas!</p>
          )}
          {click ? (
            <>
              <hr className="has-background-grey-light" />
              <div className="control has-text-centered">
                <input
                  className="input is-medium is-size-5"
                  type="text"
                  placeholder="Nova Tarefa"
                  name="tarefa"
                  value={tarefa.tarefa}
                  onChange={handleChange}
                />
                <button
                  className="button is-success has-text-weight-bold is-fullwidth mt-4"
                  onClick={handleSubmit}
                >
                  Adicionar
                </button>
                <button
                  className="button is-danger has-text-weight-bold is-fullwidth mt-2"
                  onClick={handleClick}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <button
              className="button is-info is-fullwidth mt-6 is-medium"
              onClick={handleClick}
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feito;
