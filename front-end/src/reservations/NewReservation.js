import React, { useState } from "react";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
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

  const handleChange = (event) => {
    setNewReservation({
      ...newReservation,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formatReservation = {
      ...newReservation,
      people: Number(newReservation.people),
    };
    const abortController = new AbortController();
    await createReservation(formatReservation, abortController.signal);
    history.push(`/dashboard?date=${newReservation.reservation_date}`);
    return () => abortController.abort();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push("/dashboard");
  };

  return (
    <div>
      <h1>Create Reservation</h1>
      <ReservationForm
        formName="New Reservation"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCancel={handleCancel}
        reservation={newReservation}
      />
    </div>
  );
}

export default NewReservation;
