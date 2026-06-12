function Navbar({ setPage, loggedInUser }) {

return ( <div>


  <h1>MCA DriveHub</h1>

  <button
    onClick={() => setPage("dashboard")}
  >
    Dashboard
  </button>

  {loggedInUser?.role === "ADMIN" && (
    <button
      onClick={() => setPage("users")}
    >
      Users
    </button>
  )}

  <button
    onClick={() => setPage("vehicles")}
  >
    Vehicles
  </button>

  <button
    onClick={() => setPage("rentals")}
  >
    Rentals
  </button>

  <button
    onClick={() => setPage("reviews")}
  >
    Reviews
  </button>

  <hr />

</div>


);
}

export default Navbar;
