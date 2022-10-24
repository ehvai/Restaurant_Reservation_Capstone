import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import useQuery from "../utils/useQuery";
import { previous, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import Tables from "./Tables";
import Reservations from "./Reservations";
import ErrorAlert from "../layout/ErrorAlert";
import "../App.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  // getting the current day in YYYY-MM-DD format
  const today = new Date().toJSON().slice(0, 10);

  // determine the date from the parameters if provided
  const query = useQuery();
  const dateQuery = query.get("date");
  const [dashDate, setDashDate] = useState(dateQuery ? dateQuery : today);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  // Previous, Today and Next button functionality
  const handlePrevious = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${previous(dashDate)}`);
    setDashDate(previous(dashDate));
  };

  const handleNext = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${next(dashDate)}`);
    setDashDate(next(dashDate));
  };

  const handleToday = (event) => {
    event.preventDefault();
    setDashDate(today);
    history.push(`/dashboard?date=${today}`);
  };

  return (
    <main>
        <div className="container row dashTitle">
          <h1 className="row dashHeading">Dashboard</h1>
        </div>
          <h4 className="row dashHeading">Reservations for {date}</h4>
          <div className="row">
            <div
              className="btn-group col"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handlePrevious}
              >
                <span className="oi oi-chevron-left"></span>
                &nbsp;Previous
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleToday}
              >
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
          </div>
        <div className="d-md-flex">
          <div className="container">
            <ErrorAlert error={reservationsError} />
            <Reservations reservations={reservations} />
          </div>
          <div className="container">
            <ErrorAlert error={tablesError} />
            <Tables tables={tables} />
          </div>
        </div>
    </main>
  );
}

export default Dashboard;
