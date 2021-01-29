import React from "react";
//COMPONENTS
import Fazer from "../Components/Fazer";
import Fazendo from "../Components/Fazendo";
import Feito from "../Components/Feito";
import axios from "axios";
//FONT AWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

library.add(faCheckSquare, faCoffee);

const Home = () => {
  const deleteTarefa = async (id) => {
    await axios.delete(`https://tarefass-api.herokuapp.com/api/v1/${id}`);
    window.location.reload();
  };
  return (
    <>
      <section className="section">
        <h1 className="is-size-1 has-text-weight-bold has-text-centered pt-6 is-uppercase">
          Tarefas
        </h1>
      </section>
      <section className="section">
        <div className="container">
          {/* <div className="columns is-variable is-7"> */}
          <div className="columns">
            <Fazer deleteTarefa={deleteTarefa} />
            <Fazendo deleteTarefa={deleteTarefa} />
            <Feito deleteTarefa={deleteTarefa} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
