import "../App.css"


function Reservations({reservations}) {

  // mapping through the reservation list to create the table of selected day reservations based on loadDashboard results
  const reservationList = reservations.map((reservation) => {
    return (
      reservation.status !== "finished"?
<tr key={reservation.reservation_id}>
        <td>{reservation.reservation_id}</td>
        <td>
          {reservation.last_name}, {reservation.first_name}
        </td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
        <td>{reservation.status === "booked" ? <a
            href={`/reservations/${reservation.reservation_id}/seat`}
            className="btn btn-outline-secondary"
          >
            Seat
          </a> : ""}
        </td>
      </tr>
    : null)})

  return (
    <div className="row">
      <div>
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
            <tbody>{reservationList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reservations;
