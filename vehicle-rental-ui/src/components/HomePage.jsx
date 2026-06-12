import hero from "../assets/hero.jpg";

function HomePage({ setPage }) {

return (


<div
  style={{
    height: "100vh",
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}
>

  <div
    style={{
      backgroundColor: "rgba(0,0,0,0.65)",
      padding: "50px",
      borderRadius: "20px",
      textAlign: "center",
      color: "white",
      width: "500px"
    }}
  >

    <h1
      style={{
        color: "white",
        fontSize: "55px",
        fontWeight: "bold",
        textShadow: "3px 3px 10px black",
        marginBottom: "10px"
      }}
    >
      MCA DriveHub
    </h1>

    <p
      style={{
        color: "#FFD700",
        fontSize: "20px",
        fontWeight: "bold",
        textShadow: "2px 2px 8px black"
      }}
    >
      Vehicle Rental Management System
    </p>

    <h3
      style={{
        color: "white",
        textShadow: "2px 2px 8px black",
        marginTop: "25px"
      }}
    >
      Drive Your Journey With Confidence
    </h3>

    <p
      style={{
        color: "white",
        fontSize: "18px",
        textShadow: "2px 2px 8px black"
      }}
    >
      Rent Cars & Bikes Easily
    </p>

    <br />

    <button
      style={{
        padding: "10px 25px",
        fontSize: "16px",
        cursor: "pointer"
      }}
      onClick={() => setPage("login")}
    >
      Login
    </button>

    <button
      style={{
        marginLeft: "20px",
        padding: "10px 25px",
        fontSize: "16px",
        cursor: "pointer"
      }}
      onClick={() => setPage("register")}
    >
      Register
    </button>

  </div>

</div>


);
}

export default HomePage;
