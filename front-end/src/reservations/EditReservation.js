import React, { useEffect, useState } from "react";
import { updateReservation, readReservation } from "../utils/api";
import { useHistory, useParams } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import "../App.css";

const initialReservation = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: "",
};

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [reservationErrors, setReservationErrors] = useState(null);
  const [editReservation, setEditReservation] = useState({
    ...initialReservation,
  });

  useEffect(loadReservations, [reservation_id]);

  function loadReservations() {
    const abortController = new AbortController();
    readReservation(reservation_id, abortController.signal)
      .then(setEditReservation)
      .catch(setReservationErrors);
    return () => abortController.abort();
  }

  const handleChange = (event) => {
    setEditReservation({
      ...editReservation,
      [event.target.name]: event.target.value,
    });
  };

  const formattedReservation = {...editReservation, people: Number(editReservation.people)}

  // submit for the reservation edit
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateReservation(formattedReservation, reservation_id, abortController.signal)
      .then(() =>
        history.push(`/dashboard?date=${formattedReservation.reservation_date}`)
      )
      .catch(setReservationErrors);
    return () => abortController.abort();
  };

  const showErrors = reservationErrors && <ErrorAlert error={reservationErrors} />

  return (
    <div>
      <h1>Edit Reservation</h1>
      {showErrors}
      <ReservationForm
        formName="Edit Reservation"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        reservation={editReservation}
      />
    </div>
  );
}

export default EditReservation;