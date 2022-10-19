import React, { useEffect, useState } from "react";
import { listReservations, listReservationsByDate } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [previous, setPrevious] = useState(Date()-1)
  const [next, setNext] = useState(Date()+1)

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const reservationList=reservations.map((reservation)=> {
    return (
      <tr key={reservation.reservation_id}>
      <td>
      {reservation.reservation_id}
      </td>
      <td>
      {reservation.last_name}, {reservation.first_name}
      </td>
      <td>
      {reservation.mobile_number}
      </td>
      <td>
      {reservation.reservation_date}
      </td>
      <td>
      {reservation.reservation_time}
      </td>
      <td>
      {reservation.people}
      </td>
      <td>
       STATUS
      </td>
      </tr>
    )
  })
  const handlePrevious = (event) => {
    event.preventDefault();

  };

  const handleNext = (event) => {
    event.preventDefault();

  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handlePrevious}
        >
          <span className="oi oi-chevron-left"></span>
          &nbsp;Previous
        </button>
        <button type="button" className="btn btn-secondary">
          Today
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleNext}
        >
          Next&nbsp;
          <span className="oi oi-chevron-right"></span>
        </button>
      </div>
      <div className="row">
              <div>
        <ErrorAlert error={reservationsError} />
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NAME</th>
                <th scope="col">PHONE</th>
                <th scope="col">DATE</th>
                <th scope="col">TIME</th>
                <th scope="col">PEOPLE</th>
                <th scope="cold">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {reservationList}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <table className="table">      
        </table>
      </div>
      </div>

    </main>
  );
}

export default Dashboard;
