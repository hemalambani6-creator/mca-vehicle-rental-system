import { useState } from "react";

import "./App.css";

import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import UpdateUser from "./components/UpdateUser";

import VehicleForm from "./components/VehicleForm";
import VehicleList from "./components/VehicleList";
import UpdateVehicle from "./components/UpdateVehicle";

import RentalForm from "./components/RentalForm";
import RentalList from "./components/RentalList";

import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";

function App() {

const [page, setPage] = useState("home");

const [loggedInUser, setLoggedInUser] =
useState(null);

if (page === "home") {
return ( <HomePage setPage={setPage} />
);
}

if (page === "login" && !loggedInUser) {
return (

  <div className="container">

    <div className="card">

      <LoginForm
        setLoggedInUser={setLoggedInUser}
      />

      <br />

      <button
        onClick={() =>
          setPage("register")
        }
      >
        New User? Register
      </button>

      <br /><br />

      <button
        onClick={() =>
          setPage("home")
        }
      >
        Back
      </button>

    </div>

  </div>

);
}

if (page === "register") {
return (

  <div className="container">

    <div className="card">

      <UserForm />

      <br />

      <button
        onClick={() =>
          setPage("login")
        }
      >
        Already Registered? Login
      </button>

      <br /><br />

      <button
        onClick={() =>
          setPage("home")
        }
      >
        Back
      </button>

    </div>

  </div>

);
}

if (loggedInUser && page === "login") {
setPage("dashboard");
}

return (

<div className="container">

  <h2>
    Welcome, {loggedInUser?.fullName}
  </h2>

  <button
    onClick={() => {

      setLoggedInUser(null);

      setPage("home");
    }}
  >
    Logout
  </button>

  <br /><br />

  <Navbar
    setPage={setPage}
    loggedInUser={loggedInUser}
  />

  {page === "dashboard" && (
    <div className="card">
      <Dashboard />
    </div>
  )}

  {page === "users" &&
    loggedInUser?.role === "ADMIN" && (
      <div className="card">

        <UserList />

        <br />

        <UpdateUser />

      </div>
  )}

  {page === "vehicles" && (

    <div className="card">

      {loggedInUser?.role === "ADMIN" && (
        <>
          <VehicleForm />
          <br />
        </>
      )}

      <VehicleList
        loggedInUser={loggedInUser}
      />

      {loggedInUser?.role === "ADMIN" && (
        <>
          <br />
          <UpdateVehicle />
        </>
      )}

    </div>

  )}

  {page === "rentals" && (

    <div className="card">

      <RentalForm
        loggedInUser={loggedInUser}
      />

      <br />

      <RentalList
        loggedInUser={loggedInUser}
      />

    </div>

  )}

  {page === "reviews" && (

    <div className="card">

      <ReviewForm
      loggedInUser={loggedInUser}
    />

      <br />

      <ReviewList />

    </div>

  )}

</div>
);
}

export default App;
