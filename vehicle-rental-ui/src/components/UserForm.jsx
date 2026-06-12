import { useState } from "react";

function UserForm() {

const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [dateOfBirth, setDateOfBirth] = useState("");

function handleRegister() {


if (
  !fullName ||
  !email ||
  !password ||
  !phoneNumber ||
  !dateOfBirth
) {
  alert("Please fill all fields!");
  return;
}

if (fullName.trim().length < 3) {
  alert("Name must contain at least 3 characters!");
  return;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
  alert("Please enter a valid email address!");
  return;
}

if (password.length < 6) {
  alert("Password must contain at least 6 characters!");
  return;
}

const phonePattern = /^\d{10}$/;

if (!phonePattern.test(phoneNumber)) {
  alert("Phone number must contain exactly 10 digits!");
  return;
}

const dob = new Date(dateOfBirth);
const today = new Date();

let age = today.getFullYear() - dob.getFullYear();

const monthDifference =
  today.getMonth() - dob.getMonth();

if (
  monthDifference < 0 ||
  (
    monthDifference === 0 &&
    today.getDate() < dob.getDate()
  )
) {
  age--;
}

if (age < 18) {
  alert("User must be at least 18 years old!");
  return;
}

const userData = {
  fullName,
  email,
  password,
  phoneNumber,
  dateOfBirth,
  role: "CUSTOMER"
};

fetch("http://localhost:8080/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(userData)
})
  .then(response => response.json())
  .then(data => {

    console.log(data);

    alert("User Registered Successfully!");

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

return ( <div>


  <h2>User Registration</h2>

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
    onClick={handleRegister}
  >
    Register
  </button>

</div>


);
}

export default UserForm;
