import React, { useState } from "react";
import Reservations from "./Reservations";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Search() {
  const startSearch = { mobile_number: "" };
  const [newSearch, setNewSearch] = useState({ ...startSearch });

  const [reservations, setReservations] = useState([]);
  const [reservationErrors, setReservationErrors] = useState(null);

  const handleChange = (event) => {
    setNewSearch({
      ...newSearch,
      [event.target.name]: event.target.value,
    });
  };

  const handleFind = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setReservationErrors(null);
    listReservations(newSearch, abortController.signal)
      .then(setReservations)
      .catch(setReservationErrors);
    return () => abortController.abort();
  };

  const showReservationErrors = reservationErrors && (
    <ErrorAlert error={reservationErrors} />
  );

  const displayReservationByMobileNumber = reservations.length ? (
    <Reservations reservations={reservations} />
  ) : (
    <h2>No reservations found</h2>
  );

  return (
    <div>
      <h1>Search</h1>
      <div>{showReservationErrors}</div>
      <div>
        <form className="form" onSubmit={handleFind}>
          <div>
            <label name="find">Mobile Number</label>
            <input
              name="mobile_number"
              placeholder="Enter a customer's phone number"
              onChange={handleChange}
              value={newSearch.mobile_number}
              required
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Find
            </button>
          </div>
        </form>
        <div>{displayReservationByMobileNumber}</div>
      </div>
    </div>
  );
}

export default Search;
