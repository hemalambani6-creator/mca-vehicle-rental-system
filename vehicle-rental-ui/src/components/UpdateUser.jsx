import { useState } from "react";

function UpdateUser() {

  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  function handleUpdateUser() {

    const userData = {
      fullName,
      email,
      password,
      phoneNumber,
      dateOfBirth
    };

    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert("User Updated Successfully!");

        setUserId("");
        setFullName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setDateOfBirth("");
      })
      .catch(error => {
        console.error(error);
        alert("Something went wrong!");
      });

  }

  return (
    <div>

      <h2>Update User</h2>

      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
      />

      <br /><br />

      <button
        type="button"
        onClick={handleUpdateUser}
      >
        Update User
      </button>

    </div>
  );
}

export default UpdateUser;