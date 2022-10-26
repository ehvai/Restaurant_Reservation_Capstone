import React from "react";
import { finishTable, listTables} from "../utils/api"

function Tables({ tables }) {

  const handleFinish = async (event) =>{
    event.preventDefault();
    if(window.confirm("Is this table ready to seat new guests? This cannot be undone.") === true){
    const tableId = event.target.value
    const abortController = new AbortController();
    await finishTable(tableId, abortController.signal);
    await listTables(abortController.signal)
    return () => abortController.abort();}
  }


  // mapping through the table list of the selected day
  const tableList = tables.map((table) => {
    return (
      <tr key={table.table_id}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>
          {table.reservation_id ? "Occupied" : "Free"}
        </td>
        {table.reservation_id ? <td type="button" className="btn btn-outline-secondary" data-table-id-finish={table.table_id} onClick={handleFinish}>Finish</td> : ''}
      </tr>
    );
  });

  return (
    <div className="row">
      <div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Table Name</th>
                <th scope="col">Capacity</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>{tableList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tables;
