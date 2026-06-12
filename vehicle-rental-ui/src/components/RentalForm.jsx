import { useEffect, useState } from "react";

function RentalForm({ loggedInUser }) {

const [vehicles, setVehicles] =
useState([]);

const [vehicleId, setVehicleId] =
useState("");

const [startDate, setStartDate] =
useState("");

const [endDate, setEndDate] =
useState("");

useEffect(() => {


fetch("http://localhost:8080/api/vehicles")
  .then(response => response.json())
  .then(data => {

    const availableVehicles =
      data.filter(
        vehicle =>
          vehicle.availability === true
      );

    setVehicles(availableVehicles);

  })
  .catch(error =>
    console.error(error)
  );


}, []);

function handleRentVehicle() {


if (
  !vehicleId ||
  !startDate ||
  !endDate
) {
  alert("Please fill all fields!");
  return;
}

const rentalData = {

  user: {
    userId:
      loggedInUser.userId
  },

  vehicle: {
    vehicleId
  },

  startDate,

  endDate

};

fetch(
  "http://localhost:8080/api/rentals",
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json"
    },

    body:
      JSON.stringify(rentalData)
  }
)
  .then(async response => {

    if (!response.ok) {

      const errorData =
        await response.json();

      throw new Error(
        errorData.message
      );

    }

    return response.json();

  })
  .then(data => {

    alert(
      "Vehicle Rented Successfully!\n\n" +
      "Total Amount = ₹" +
      data.totalAmount
    );

    setVehicleId("");

    setStartDate("");

    setEndDate("");

  })
  .catch(error => {

    console.error(error);

    alert(error.message);

  });


}

return (

<div>

  <h2>Rent Vehicle</h2>

  <p>
    Logged In User:
    {" "}
    <b>
      {loggedInUser?.fullName}
    </b>
  </p>

  <select
    value={vehicleId}
    onChange={(e) =>
      setVehicleId(
        e.target.value
      )
    }
  >

    <option value="">
      Select Vehicle
    </option>

    {vehicles.map(vehicle => (

      <option
        key={vehicle.vehicleId}
        value={vehicle.vehicleId}
      >

        {vehicle.vehicleName}
        {" | "}
        {vehicle.color}
        {" | ₹"}
        {vehicle.pricePerDay}
        /day

      </option>

    ))}

  </select>

  <br /><br />

  <input
    type="date"
    value={startDate}
    onChange={(e) =>
      setStartDate(
        e.target.value
      )
    }
  />

  <br /><br />

  <input
    type="date"
    value={endDate}
    onChange={(e) =>
      setEndDate(
        e.target.value
      )
    }
  />

  <br /><br />

  <button
    onClick={
      handleRentVehicle
    }
  >
    Rent Vehicle
  </button>

</div>


);
}

export default RentalForm;
