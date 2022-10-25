function Tables({ tables }) {
  // mapping through the table list of the selected day
  const tableList = tables.map((table) => {
    return (
      <tr key={table.table_id}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>
          {table.reservation_id ? "Occupied" : "Free"}
        </td>
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
