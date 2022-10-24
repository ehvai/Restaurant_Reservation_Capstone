import React from "react";

function ReservationForm({formName, handleSubmit, handleChange, handleCancel, reservation, reservationId = ''}){


return ( <div>
    <form onSubmit={handleSubmit}>
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
              value={reservation.first_name}
              placeholder={formName = "New Reservation" ? "First Name" : `${reservation.first_name}`}
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
              value={reservation.last_name}
              placeholder={formName = "New Reservation" ? "Last Name" : `${reservation.last_name}`}
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
              value={reservation.mobile_number}
              placeholder={formName = "New Reservation" ? "Mobile Number" : `${reservation.mobile_number}`}
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
              value={reservation.reservation_date}
              placeholder={formName = "New Reservation" ? '' : `${reservation.reservation_date}`}
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
              value={reservation.reservation_time}
              placeholder={formName = "New Reservation" ? "" : `${reservation.reservation_time}`}
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
              value={reservation.people}
              placeholder={formName = "New Reservation" ? "" : `${reservation.people}`}
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
  </div>)    
}

export default ReservationForm;