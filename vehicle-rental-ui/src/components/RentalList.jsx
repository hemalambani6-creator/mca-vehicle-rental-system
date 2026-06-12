import { useEffect, useState } from "react";

function RentalList({ loggedInUser }) {

const [rentals, setRentals] = useState([]);

useEffect(() => {


fetch("http://localhost:8080/api/rentals")
  .then(response => response.json())
  .then(data => {

    if (
      loggedInUser?.role === "ADMIN"
    ) {
      setRentals(data);
    }
    else {

      const myRentals =
        data.filter(
          rental =>
            rental.user.userId ===
            loggedInUser?.userId
        );

      setRentals(myRentals);
    }

  })
  .catch(error =>
    console.error(error)
  );


}, [loggedInUser]);

return (


<div>

  <h2>

    {loggedInUser?.role === "ADMIN"
      ? "All Rentals"
      : "My Rentals"}

  </h2>

  <table border="1" cellPadding="10">

    <thead>

      <tr>

        <th>ID</th>

        <th>User ID</th>

        <th>Vehicle ID</th>

        <th>Start Date</th>

        <th>End Date</th>

        <th>Total Amount</th>

      </tr>

    </thead>

    <tbody>

      {rentals.map((rental) => (

        <tr key={rental.rentalId}>

          <td>{rental.rentalId}</td>

          <td>{rental.user.userId}</td>

          <td>{rental.vehicle.vehicleId}</td>

          <td>{rental.startDate}</td>

          <td>{rental.endDate}</td>

          <td>{rental.totalAmount}</td>

        </tr>

      ))}

    </tbody>

  </table>

</div>


);
}

export default RentalList;
