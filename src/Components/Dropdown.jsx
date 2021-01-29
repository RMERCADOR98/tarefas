import axios from "axios";
import React, { useState } from "react";

const Dropdown = ({ data }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const pushFazendo = () => {
    const { id } = data;

    const fazendo = {
      estado: "fazendo",
    };

    axios.put(
      `https://tarefass-api.herokuapp.com/api/v1/editarTarefa/${id}`,
      fazendo
    );

    console.log(`data.${id}`);

    window.location.reload();
  };

  const pushFazer = () => {
    const { id } = data;

    const fazer = {
      estado: "fazer",
    };

    axios.put(
      `https://tarefass-api.herokuapp.com/api/v1/editarTarefa/${id}`,
      fazer
    );

    console.log(`data.${id}`);

    window.location.reload();
  };

  const pushFeito = () => {
    const { id } = data;

    const feito = {
      estado: "feito",
    };

    axios.put(
      `https://tarefass-api.herokuapp.com/api/v1/editarTarefa/${id}`,
      feito
    );

    console.log(`data.${id}`);

    window.location.reload();
  };
  console.log(window.location);

  let active;
  if (show) {
    active = "is-active";
  } else {
    active = "";
  }

  return (
    <div className={`dropdown ${active} is-right `} onClick={handleClick}>
      <div className="dropdown-trigger">
        <button
          aria-haspopup="true"
          aria-controls="dropdown-menu3"
          className="is-small button is-light"
        >
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu1" role="menu">
        <div className="dropdown-content">
          <a href="/#" className="dropdown-item" onClick={pushFazer}>
            Fazer
          </a>
          <a href="/#" className="dropdown-item" onClick={pushFazendo}>
            Fazendo
          </a>
          <a href="/#" className="dropdown-item" onClick={pushFeito}>
            Feito
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
