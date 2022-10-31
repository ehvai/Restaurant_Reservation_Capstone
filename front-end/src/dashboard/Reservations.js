import "../App.css";
import { setStatus } from "../utils/api";

function Reservations({ reservations, loadDashboard }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  } = reservations;

  const handleCancel = () => {
    if (
      window.confirm(
        "Do you want the cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      setStatus(reservation_id, { status: "cancelled" }, abortController.signal)
        .then(loadDashboard)
        .catch((error) => console.log(error));
      return () => abortController.abort();
    }
  };

  // mapping through the reservation list to create the table of selected day reservations based on loadDashboard results
  return (
    <tr key={reservation_id}>
      <td>{reservation_id}</td>
      <td>
        {last_name}, {first_name}
      </td>
      <td>{mobile_number}</td>
      <td>{reservation_date}</td>
      <td>{reservation_time}</td>
      <td>{people}</td>
      <td data-reservation-id-status={reservation_id}>{status}</td>
      <td>
        {status === "booked" && (
          <a
            href={`/reservations/${reservation_id}/seat`}
            className="btn btn-seat"
          >
            Seat
          </a>
        )}
      </td>
      <td>
        {status === "booked" && (
          <a
            href={`/reservations/${reservation_id}/edit`}
            className="btn btn-edit"
          >
            Edit
          </a>
        )}
      </td>
      <td>
        {status === "booked" && (
          <button
            data-reservation-id-cancel={reservation_id}
            className="btn btn-cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
}

export default Reservations;
