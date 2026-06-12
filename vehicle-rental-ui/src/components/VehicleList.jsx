import { useEffect, useState } from "react";

function VehicleList({ loggedInUser }) {

const [vehicles, setVehicles] = useState([]);

useEffect(() => {


fetch("http://localhost:8080/api/vehicles")
  .then(response => response.json())
  .then(data => setVehicles(data))
  .catch(error => console.error(error));


}, []);

function deleteVehicle(id) {


if (
  !window.confirm(
    "Are you sure you want to delete this vehicle?"
  )
) {
  return;
}

fetch(
  `http://localhost:8080/api/vehicles/${id}`,
  {
    method: "DELETE"
  }
)
  .then(() => {

    alert("Vehicle Deleted!");

    setVehicles(
      vehicles.filter(
        vehicle =>
          vehicle.vehicleId !== id
      )
    );

  })
  .catch(error => {

    console.error(error);

    alert("Something went wrong!");

  });


}

return ( <div>


  <h2>Vehicle List</h2>

  <table border="1" cellPadding="10">

    <thead>

      <tr>

        <th>ID</th>

        <th>Vehicle Name</th>

        <th>Registration Number</th>

        <th>Color</th>

        <th>Model Year</th>

        <th>Price Per Day</th>

        <th>Available</th>

        {loggedInUser?.role === "ADMIN" && (
          <th>Action</th>
        )}

      </tr>

    </thead>

    <tbody>

      {vehicles.map((vehicle) => (

        <tr key={vehicle.vehicleId}>

          <td>{vehicle.vehicleId}</td>

          <td>{vehicle.vehicleName}</td>

          <td>{vehicle.registrationNumber}</td>

          <td>{vehicle.color}</td>

          <td>{vehicle.modelYear}</td>

          <td>{vehicle.pricePerDay}</td>

          <td>
            {vehicle.availability
              ? "Yes"
              : "No"}
          </td>

          {loggedInUser?.role === "ADMIN" && (
            <td>

              <button
                onClick={() =>
                  deleteVehicle(
                    vehicle.vehicleId
                  )
                }
              >
                Delete
              </button>

            </td>
          )}

        </tr>

      ))}

    </tbody>

  </table>

</div>


);
}

export default VehicleList;
