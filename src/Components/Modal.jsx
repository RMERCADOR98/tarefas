import React, { Fragment, useState } from "react";
import axios from "axios";

const Modal = ({ data }) => {
  const [show, setShow] = useState(false);
  const selected = data.tarefa;
  const [state, setState] = useState({
    tarefa: data.tarefa,
  });

  const handleShow = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const onKeyPressed = (e) => {
    if (e.key === "Escape") {
      setShow(false);
    }
  };

  //EDITAR TAREFA

  const handleOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submitTarefa = async (e) => {
    e.preventDefault();

    const { id } = data;

    const tarefaEditada = {
      tarefa: state.tarefa,
    };

    await axios.put(
      `https://tarefass-api.herokuapp.com/api/v1/editarTarefa/${id}`,
      tarefaEditada
    );

    window.location.reload();

    setShow(!show);
  };

  let active;
  if (show) {
    active = "is-active";
  } else {
    active = "";
  }
  return (
    <Fragment>
      <button className="button is-warning is-small" onClick={handleShow}>
        <i class="fas fa-pencil-alt"></i>
      </button>
      <div className={`modal ${active}`} onKeyDown={onKeyPressed}>
        <div
          className="modal-background"
          // onRequestClose={handleShow}
          // shouldCloseOnOverlayClick="true"
          onClick={handleShow}
        ></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              Editar tarefa:&nbsp; "
              {selected.length > 8
                ? selected.substring(0, 8) + "..."
                : selected}
              "
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={handleShow}
            ></button>
          </header>
          <section className="modal-card-body">
            <input
              name="tarefa"
              type="text"
              className="input"
              value={state.tarefa}
              onChange={handleOnChange}
            />
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={submitTarefa}>
              Save changes
            </button>
            <button className="button" onClick={handleShow}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
