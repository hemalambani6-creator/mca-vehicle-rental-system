import { useEffect, useState } from "react";

function ReviewForm({ loggedInUser }) {

const [rentals, setRentals] =
useState([]);

const [vehicleId, setVehicleId] =
useState("");

const [rating, setRating] =
useState("");

const [feedback, setFeedback] =
useState("");

useEffect(() => {

fetch("http://localhost:8080/api/rentals")
  .then(response => response.json())
  .then(data => {

    const myRentals =
      data.filter(
        rental =>
          rental.user.userId ===
          loggedInUser?.userId
      );

    setRentals(myRentals);

  })
  .catch(error =>
    console.error(error)
  );


}, [loggedInUser]);

function handleSubmitReview() {

if (
  !vehicleId ||
  !rating ||
  !feedback
) {
  alert("Please fill all fields!");
  return;
}

if (
  Number(rating) < 1 ||
  Number(rating) > 5
) {
  alert(
    "Rating must be between 1 and 5!"
  );
  return;
}

if (
  feedback.trim().length < 5
) {
  alert(
    "Feedback must contain at least 5 characters!"
  );
  return;
}

const reviewData = {

  user: {
    userId:
      loggedInUser.userId
  },

  vehicle: {
    vehicleId
  },

  rating,

  feedback

};

fetch(
  "http://localhost:8080/api/reviews",
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json"
    },

    body:
      JSON.stringify(reviewData)
  }
)
  .then(response =>
    response.json()
  )
  .then(data => {

    console.log(data);

    alert(
      "Review Submitted Successfully!"
    );

    setVehicleId("");

    setRating("");

    setFeedback("");

  })
  .catch(error => {

    console.error(error);

    alert(
      "Something went wrong!"
    );

  });


}

return (

<div>

  <h2>Review Form</h2>

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

    {rentals.map(rental => (

      <option
        key={
          rental.vehicle.vehicleId
        }
        value={
          rental.vehicle.vehicleId
        }
      >

        {rental.vehicle.vehicleName}
        {" | "}
        {rental.vehicle.color}

      </option>

    ))}

  </select>

  <br /><br />

  <input
    type="number"
    placeholder="Rating (1-5)"
    value={rating}
    onChange={(e) =>
      setRating(
        e.target.value
      )
    }
  />

  <br /><br />

  <textarea
    placeholder="Write your feedback"
    value={feedback}
    onChange={(e) =>
      setFeedback(
        e.target.value
      )
    }
  />

  <br /><br />

  <button
    type="button"
    onClick={
      handleSubmitReview
    }
  >
    Submit Review
  </button>

</div>


);
}

export default ReviewForm;
