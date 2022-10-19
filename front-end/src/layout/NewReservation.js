import React, { useState } from "react";
import { createReservation } from "../utils/api";

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

  async function addNewReservation() {
    const abortcontroller = new AbortController();
    return await createReservation(newReservation, AbortController.signal);
  }

  const handleChange = (event) => {
    setNewReservation({
      ...newReservation,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setNewReservation({ ...initialReservation });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    addNewReservation();
    setNewReservation({ ...initialReservation });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <div>
          <label htmlFor="first_name">First Name</label>
        </div>

        <div>
          <input
            name="first_name"
            id="first_name"
            onChange={handleChange}
            value={newReservation.first_name}
            required={true}
          />
        </div>
      </div>
      <div className="form-group">
        <div>
          <label htmlFor="last_name">Last Name</label>
        </div>
        <div>
          <input
            name="last_name"
            id="last_name"
            onChange={handleChange}
            value={newReservation.last_name}
            required={true}
          />
        </div>
      </div>
      <div className="form-group">
        <div>
          <label htmlFor="mobile_number">Mobile Number</label>
        </div>
        <div>
          <input
            name="mobile_number"
            id="mobile_number"
            onChange={handleChange}
            value={newReservation.mobile_number}
            required={true}
          />
        </div>
      </div>
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
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
          />
        </div>
      </div>
      <div>
        <div>
          <button type="submit" class="btn btn-secondary">Submit</button>
          <button type="button" class="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </form>
  );
}

export default NewReservation;
