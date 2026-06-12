import { useEffect, useState } from "react";

function ReviewList() {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/reviews")
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>

      <h2>Review List</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Vehicle ID</th>
            <th>Rating</th>
            <th>Feedback</th>
          </tr>
        </thead>

        <tbody>

          {reviews.map((review) => (
            <tr key={review.reviewId}>
              <td>{review.reviewId}</td>
              <td>{review.user.userId}</td>
              <td>{review.vehicle.vehicleId}</td>
              <td>{review.rating}</td>
              <td>{review.feedback}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ReviewList;