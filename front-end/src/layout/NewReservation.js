import React, { useState } from "react";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import "../App.css";

const initialReservation = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: "",
};

function NewReservation() {
  const [newReservation, setNewReservation] = useState({
    ...initialReservation,
  });
  const history = useHistory();

  // handles APi error messages
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setNewReservation({
      ...newReservation,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    console.log(newReservation.reservation_date)
    try {
      const formatReservation = {
        ...newReservation,
        people: Number(newReservation.people),
      };
      const abortController = new AbortController();
      await createReservation(formatReservation, abortController.signal);
      history.push(`/dashboard?date=${newReservation.reservation_date}`);
      return () => abortController.abort();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push("/dashboard");
  };

  return (
    <div>
      <div>
        <h1>Create Reservation</h1>
      </div>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger">
            <p>Please fix the following errors:</p>
            <ul>
              <li>{error}</li>
            </ul>
          </div>
        )}
        <div className="row createRes">
          <div className="form-group col">
            <div>
              <label htmlFor="first_name">First Name</label>
            </div>
            <div>
              <input
                name="first_name"
                id="first_name"
                onChange={handleChange}
                value={newReservation.first_name}
                placeholder="First Name"
                required={true}
              />
            </div>
          </div>
          <div className="form-group col">
            <div>
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div>
              <input
                name="last_name"
                id="last_name"
                onChange={handleChange}
                value={newReservation.last_name}
                placeholder="Last Name"
                required={true}
              />
            </div>
          </div>
          <div className="form-group col">
            <div>
              <label htmlFor="mobile_number">Mobile Number</label>
            </div>
            <div>
              <input
                name="mobile_number"
                id="mobile_number"
                onChange={handleChange}
                value={newReservation.mobile_number}
                placeholder="Mobile Number"
                required={true}
              />
            </div>
          </div>
        </div>
        <div className="row createRes">
          <div className="form-group col">
            <div>
              <label htmlFor="reservation_date">Date</label>
            </div>
            <div>
              <input
                type="date"
                name="reservation_date"
                id="reservation_date"
                onChange={handleChange}
                value={newReservation.reservation_date}
                required={true}
              />
            </div>
          </div>
          <div className="form-group col">
            <div>
              <label htmlFor="reservation_time">Time</label>
            </div>
            <div>
              <input
                type="time"
                name="reservation_time"
                id="reservation_time"
                onChange={handleChange}
                value={newReservation.reservation_time}
                required={true}
              />
            </div>
          </div>
          <div className="form-group col">
            <div>
              <label htmlFor="people">People</label>
            </div>
            <div>
              <input
                type="integer"
                name="people"
                id="people"
                onChange={handleChange}
                value={newReservation.people}
                required={true}
                min="1"
              />
            </div>
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
    </div>
  );
}

export default NewReservation;
