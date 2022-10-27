import React from "react";
import { finishTable } from "../utils/api";

function Tables({ table, loadDashboard }) {
  function handleFinish() {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      finishTable(table.table_id)
        .then(loadDashboard)
        .catch((error) => console.log("error", error));
    }
  }

  return (
    <tr key={table.table_id}>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>
        {table.reservation_id ? "Occupied" : "Free"}
      </td>
      {table.reservation_id ? (
        <td
          type="button"
          className="btn btn-outline-secondary"
          data-table-id-finish={table.table_id}
          onClick={handleFinish}
        >
          Finish
        </td>
      ) : (
        <td></td>
      )}
    </tr>
  );
}

export default Tables;
