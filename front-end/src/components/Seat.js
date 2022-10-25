import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { readReservation, listTables, seatTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Seat() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [reservation, setReservation] = useState([]);
  const [reservationError, setReservationError] = useState(null);
  const [tableId, setTableId] = useState("");
  const { reservation_id } = useParams();
  const resId = Number(reservation_id);
  const history = useHistory();

  useEffect(loadSingleReservation, [resId]);

  function loadSingleReservation() {
    const abortController = new AbortController();
    setReservationError(null);
    readReservation(resId, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);

    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const availableTables = tables.map((table) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  const handleChange = (event) => {
    setTableId(Number(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await seatTable(reservation_id, tableId, abortController.signal);
      history.push(`/dashboard`);
    } catch (error) {
      setTablesError(error);
      setReservationError(error);
      return () => abortController.abort();
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <div>
      <h1>Seat Reservation</h1>
      <ErrorAlert error={reservationError} />
      <ErrorAlert error={tablesError} />
      <div className="container">
        <table className="table">
          <tbody key={reservation.reservation_id}>
            <tr>
              <td>Reservation:</td>
              <td>{reservation.reservation_id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>
                {reservation.last_name}, {reservation.first_name}
              </td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>{reservation.reservation_date}</td>
            </tr>
            <tr>
              <td>Time:</td>
              <td>{reservation.reservation_time}</td>
            </tr>
            <tr>
              <td>People:</td>
              <td>{reservation.people}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h3>Seat at table:</h3>
          <h4>
            <select required name="table_id" onChange={handleChange}>
              <option>Select a table</option>
              {availableTables}
            </select>
          </h4>
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
    </div>
  );
}

export default Seat;
