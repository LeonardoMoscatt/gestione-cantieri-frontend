import { useState, useEffect } from "react";
import axios from "axios";

function CantiereUpdate({ cantiere, onUpdateCantiere }) {
  const [aziende, setAziende] = useState([]);
  const [newCantiere, setNewCantiere] = useState({
    nome: "",
    committente: "",
    cap: "",
    nazione: "",
    dataInizioCantiere: "",
    dataFineCantiere: "",
    idAzienda: "",
  });

  useEffect(() => {
    if (cantiere) {
      setNewCantiere(cantiere);
    }

    axios
      .get("http://localhost:9002/aziende")
      .then((response) => {
        setAziende(response.data);
      })
      .catch((err) => console.error("Errore aziende:", err));
  }, [cantiere]);

  const changeNome = (e) => {
    setNewCantiere({ ...newCantiere, nome: e.target.value });
  };

  const changeCommittente = (e) => {
    setNewCantiere({ ...newCantiere, committente: e.target.value });
  };

  const changeCap = (e) => {
    setNewCantiere({ ...newCantiere, cap: e.target.value });
  };

  const changeNazione = (e) => {
    setNewCantiere({ ...newCantiere, nazione: e.target.value });
  };

  const changeDataInizioCantiere = (e) => {
    setNewCantiere({ ...newCantiere, dataInizioCantiere: e.target.value });
  };

  const changeDataFineCantiere = (e) => {
    setNewCantiere({ ...newCantiere, dataFineCantiere: e.target.value });
  };

  const changeIdAzienda = (e) => {
    setNewCantiere({ ...newCantiere, idAzienda: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...newCantiere,
      aziendeId: [parseInt(newCantiere.idAzienda, 10)],
    };

    delete payload.idAzienda;

    onUpdateCantiere(payload);
  };

  return (
    <form className="mt-4 mb-4" onSubmit={handleSubmit}>
      <h2>Aggiorna Cantiere</h2>

      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          className="form-control"
          type="text"
          value={newCantiere.nome}
          onChange={changeNome}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Committente</label>
        <input
          className="form-control"
          type="text"
          value={newCantiere.committente}
          onChange={changeCommittente}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">CAP</label>
        <input
          className="form-control"
          type="text"
          value={newCantiere.cap}
          onChange={changeCap}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nazione</label>
        <input
          className="form-control"
          type="text"
          value={newCantiere.nazione}
          onChange={changeNazione}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Data Inizio</label>
        <input
          className="form-control"
          type="date"
          value={newCantiere.dataInizioCantiere}
          onChange={changeDataInizioCantiere}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Data Fine</label>
        <input
          className="form-control"
          type="date"
          value={newCantiere.dataFineCantiere}
          onChange={changeDataFineCantiere}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Azienda</label>
        <select
          className="form-select"
          value={newCantiere.idAzienda}
          onChange={changeIdAzienda}
        >
          <option value="">Seleziona azienda</option>
          {aziende.map((azienda) => (
            <option key={azienda.id} value={azienda.id}>
              {azienda.ragioneSociale}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Aggiorna
      </button>
    </form>
  );
}

export default CantiereUpdate;
