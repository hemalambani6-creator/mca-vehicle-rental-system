import { useEffect, useState } from "react";

function Dashboard() {

const [users, setUsers] = useState(0);
const [vehicles, setVehicles] = useState(0);
const [rentals, setRentals] = useState(0);
const [reviews, setReviews] = useState(0);

const [availableVehicles, setAvailableVehicles] =
useState(0);

const [rentedVehicles, setRentedVehicles] =
useState(0);

useEffect(() => {


fetch("http://localhost:8080/api/users")
  .then(response => response.json())
  .then(data => setUsers(data.length));

fetch("http://localhost:8080/api/vehicles")
  .then(response => response.json())
  .then(data => {

    setVehicles(data.length);

    const available =
      data.filter(
        vehicle =>
          vehicle.availability === true
      ).length;

    const rented =
      data.filter(
        vehicle =>
          vehicle.availability === false
      ).length;

    setAvailableVehicles(available);

    setRentedVehicles(rented);

  });

fetch("http://localhost:8080/api/rentals")
  .then(response => response.json())
  .then(data => setRentals(data.length));

fetch("http://localhost:8080/api/reviews")
  .then(response => response.json())
  .then(data => setReviews(data.length));


}, []);

return (

<div>

  <h2>Dashboard</h2>

  <table
    border="1"
    cellPadding="15"
  >

    <tbody>

      <tr>
        <td>
          <b>Total Users</b>
        </td>
        <td>{users}</td>
      </tr>

      <tr>
        <td>
          <b>Total Vehicles</b>
        </td>
        <td>{vehicles}</td>
      </tr>

      <tr>
        <td>
          <b>Available Vehicles</b>
        </td>
        <td>{availableVehicles}</td>
      </tr>

      <tr>
        <td>
          <b>Rented Vehicles</b>
        </td>
        <td>{rentedVehicles}</td>
      </tr>

      <tr>
        <td>
          <b>Total Rentals</b>
        </td>
        <td>{rentals}</td>
      </tr>

      <tr>
        <td>
          <b>Total Reviews</b>
        </td>
        <td>{reviews}</td>
      </tr>

    </tbody>

  </table>

</div>


);
}

export default Dashboard;
