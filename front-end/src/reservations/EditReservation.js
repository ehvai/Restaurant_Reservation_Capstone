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

  const [reservationErrors, setReservationErrors] = useState([]);
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

  // submit for the reservation edit
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = [];
    const abortController = new AbortController();

  // formats the people in the reservation so that it is a number
  const formattedReservation = {...editReservation, people: Number(editReservation.people)}
  
  //formats the time so it includes the :00 at the end
  const [hours, minutes] = formattedReservation.reservation_time.split(":")
  const reservationTime = `${hours}:${minutes}:00`
  formattedReservation.reservation_time = reservationTime

  const UTCHours = Number(hours) + 5
  const reservationDate = new Date(
    `${formattedReservation.reservation_date}T${UTCHours}:${minutes}:00.000Z`
  );
    if (Date.now() > Date.parse(reservationDate)) {
      errors.push({ message: `The reservation cannot be in the past` });
    }

    const reservationDay = new Date(`${formattedReservation.reservation_date}T${formattedReservation.reservation_time}`)
    if (reservationDay.getDay() === 2) {
      errors.push({ message: `The restaurant is closed on Tuesdays` });
    }

    if ((hours <= 10 && minutes < 30) || hours <= 9) {
      errors.push({ message: `We open at 10:30am` });
    }
    if ((hours >= 21 && minutes > 30) || hours >= 22) {
      errors.push({ message: `We stop accepting reservations after 9:30pm` });
    }
    if (formattedReservation.people < 1) {
      errors.push({ message: `Reservations must have at least 1 person` });
    }

    setReservationErrors(errors);

    !errors.length &&
    updateReservation(formattedReservation, reservation_id, abortController.signal)
      .then(() =>
        history.push(`/dashboard?date=${formattedReservation.reservation_date}`)
      )
      .catch(setReservationErrors);
    return () => abortController.abort();
  };


  // checks if there are any errors, and if there are, it shows them above the reservations form
  let displayErrors = reservationErrors.map((error) => (
    <ErrorAlert key={error.message} error={error} />
  ));

  return (
    <div>
      <div className="container">
        <h1 className="row dashHeading">Edit Reservation</h1>
      </div>
      {displayErrors}
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
