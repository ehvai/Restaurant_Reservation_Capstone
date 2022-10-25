import React from "react";

function TableForm({
  formName,
  handleChange,
  handleSubmit,
  handleCancel,
  tables,
  tableId = "",
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group col">
        <div>
          <label htmlFor="table_name">Table Name</label>
        </div>
        <div>
          <input
            name="table_name"
            id="table_name"
            onChange={handleChange}
            value={tables.table_name}
            placeholder={
              (formName = "New Table" ? "Table Name" : `${tables.table_name}`)
            }
            required={true}
          />
        </div>
      </div>
      <div className="form-group col">
        <div>
          <label htmlFor="capacity">Capacity</label>
        </div>
        <div>
          <input
            name="capacity"
            id="capacity"
            onChange={handleChange}
            value={tables.capacity}
            placeholder={
              (formName = "New Table" ? "Capacity" : `${tables.capacity}`)
            }
            required={true}
            min="1"
          />
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col-5">
            <button type="submit" className="btn btn-primary mr-2">
              <span className="oi oi-check"></span>
              &nbsp;Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary button"
              onClick={handleCancel}
            >
              <span className="oi oi-x"></span>
              &nbsp;Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default TableForm;
