function CantiereTable({data, onCantiereDelete, onCantiereUpdate }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Committente</th>
          <th>CAP</th>
          <th>Nazione</th>
          <th>Inizio</th>
          <th>Fine</th>
        </tr>
      </thead>
      <tbody>
        {data.map((cantiere, index) => (
          <tr key={cantiere.id}>
            <td>{index + 1}</td>
            <td>{cantiere.nome}</td>
            <td>{cantiere.committente}</td>
            <td>{cantiere.cap}</td>
            <td>{cantiere.nazione}</td>
            <td>{cantiere.dataInizioCantiere}</td>
            <td>{cantiere.dataFineCantiere}</td>
            <td>
                <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => onCantiereDelete(cantiere)}
                >
                Elimina
                </button>
                <button
                className="btn btn-warning btn-sm"
                onClick={() => onCantiereUpdate(cantiere)}
                >
                Modifica
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CantiereTable;