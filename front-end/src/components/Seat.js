import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { readReservation, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Seat() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState([]);
  const [tableSeat, setTableSeat] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [reservationError, setReservationError] = useState([]);
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

    //setTablesError(null);
   // listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }

  const handleChange = (event) => {
    event.preventDefault();
    setTableSeat({
      ...tableSeat,
      reservation_id: reservation_id,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push("/dashboard");
  };

  return (
    <div>
      <h1>Seat Reservation</h1>
      <ErrorAlert error={reservationError} />
      <div className="container">
        <table className="table">
          <tbody key={reservation.reservation_id}>
            <tr>
              <h4>
                <td>Reservation:</td>
                <td>{reservation.reservation_id}</td>
              </h4>
            </tr>
            <tr>
              <h4>
                <td>Name:</td>
                <td>
                  {reservation.last_name}, {reservation.first_name}
                </td>
              </h4>
            </tr>
            <tr>
              <h4>
                <td>Date:</td>
                <td>{reservation.reservation_date}</td>
              </h4>
            </tr>
            <tr>
              <h4>
                <td>Time:</td>
                <td>{reservation.reservation_time}</td>
              </h4>
            </tr>
            <tr>
              <h4>
                <td>People:</td>
                <td>{reservation.people}</td>
              </h4>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container">
        <ErrorAlert error={tablesError} />
        <h3>
          Seat at table:
          <select required name="table_id" onChange={handleChange}>
            <option>Select a table</option>
            {tables}
          </select>
        </h3>
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
    </div>
  );
}

export default Seat;
