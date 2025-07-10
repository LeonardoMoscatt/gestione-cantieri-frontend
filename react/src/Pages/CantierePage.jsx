import { useEffect, useState } from "react";
import axios from "axios";
import CantiereAdd from "../components/CantiereAdd";
import CantiereUpdate from "../components/CantiereUpdate";
import CantiereTable from "../components/CantiereTable";

function CantieriPage() {
  const [cantieri, setCantieri] = useState([]);
  const [aziende, setAziende] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [cantiereToEdit, setCantiereToEdit] = useState(null);

  useEffect(() => {
    loadCantieri();
    loadAziende();
  }, []);

  const loadCantieri = () => {
    axios
      .get("http://localhost:9002/cantieri")
      .then((response) => setCantieri(response.data))
      .catch((err) => console.error("Errore:", err));
  };

  const loadAziende = () => {
    axios
      .get("http://localhost:9002/aziende")
      .then((response) => setAziende(response.data))
      .catch((err) => console.error("Errore aziende:", err));
  };

  const addCantiere = (newCantiere) => {
    axios
      .post("http://localhost:9002/cantieri", newCantiere)
      .then((response) => {
        setCantieri([...cantieri, response.data]);
      })
      .catch((err) => console.error("Errore aggiunta:", err));
  };

  const deleteCantiere = (cantiere) => {
    const deleteUrl = `http://localhost:9002/cantieri/${cantiere.id}`;
    axios
    .delete(deleteUrl)
    .then(() => {
        setCantieri(cantieri.filter(c => c.id !== cantiere.id));
    })
    .catch((err) => console.error("Errore eliminazione:", err));
  }

  const startEditCantiere = (cantiere) => {
    setCantiereToEdit(cantiere);
    setEditMode(true);
  };

  const updateCantiere = (updatedCantiere) => {
    axios
      .put(`http://localhost:9002/cantieri/${updatedCantiere.id}`, updatedCantiere)
      .then((response) => {
        setCantieri(
          cantieri.map(c =>
            c.id === updatedCantiere.id ? response.data : c
          )
        );
        setEditMode(false);
        setCantiereToEdit(null);
      })
      .catch((err) => console.error("Errore aggiornamento:", err));
  };


  const cancelEdit = () => {
    setEditMode(false);
    setCantiereToEdit(null);
  };

  return (
    <div className="container">
      <h1>Elenco Cantieri</h1>

      {editMode ? (
        <>
          <CantiereUpdate
            cantiere={cantiereToEdit}
            onUpdateCantiere={updateCantiere}
          />
          <button className="btn btn-secondary" onClick={cancelEdit}>Annulla modifica</button>
        </>
      ) : (
        <CantiereAdd
          onAddCantiere={addCantiere}
          aziende={aziende}
        />
      )}

      <CantiereTable
        data={cantieri}
        onCantiereDelete={deleteCantiere}
        onCantiereUpdate={startEditCantiere}
      />
    </div>
  );
}

export default CantieriPage;
