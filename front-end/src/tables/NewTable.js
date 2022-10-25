import React, { useState } from "react";
import { createTable } from "../utils/api";
import { useHistory } from "react-router-dom";
import TableForm from "./TableForm";
import "../App.css";

const initialTable = {
  table_name: "",
  capacity: "",
};

function NewTable() {
  const [newTable, setNewTable] = useState({
    ...initialTable,
  });
  const history = useHistory();

  const handleChange = (event) => {
    setNewTable({
      ...newTable,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formatTable = {
      ...newTable,
      capacity: Number(newTable.capacity),
    };
    const abortController = new AbortController();
    await createTable(formatTable, abortController.signal);
    history.push(`/dashboard`);
    return () => abortController.abort();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <div>
      <h1>New Table</h1>
      <TableForm
        formName="New Table"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCancel={handleCancel}
        tables={newTable}
      />
    </div>
  );
}

export default NewTable;
