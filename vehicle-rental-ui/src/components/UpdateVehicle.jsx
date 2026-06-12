import { useState } from "react";

function UpdateVehicle() {

  const [vehicleId, setVehicleId] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [color, setColor] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [availability, setAvailability] = useState(true);

  function handleUpdateVehicle() {

    const vehicleData = {
      vehicleName,
      registrationNumber,
      color,
      modelYear,
      pricePerDay,
      availability
    };

    fetch(`http://localhost:8080/api/vehicles/${vehicleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(vehicleData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert("Vehicle Updated Successfully!");

        setVehicleId("");
        setVehicleName("");
        setRegistrationNumber("");
        setColor("");
        setModelYear("");
        setPricePerDay("");
        setAvailability(true);
      })
      .catch(error => {
        console.error(error);
        alert("Something went wrong!");
      });

  }

  return (
    <div>

      <h2>Update Vehicle</h2>

      <input
        type="number"
        placeholder="Vehicle ID"
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Vehicle Name"
        value={vehicleName}
        onChange={(e) => setVehicleName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Registration Number"
        value={registrationNumber}
        onChange={(e) => setRegistrationNumber(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Model Year"
        value={modelYear}
        onChange={(e) => setModelYear(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Price Per Day"
        value={pricePerDay}
        onChange={(e) => setPricePerDay(e.target.value)}
      />

      <br /><br />

      <label>
        Available :
        <input
          type="checkbox"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked)}
        />
      </label>

      <br /><br />

      <button onClick={handleUpdateVehicle}>
        Update Vehicle
      </button>

    </div>
  );
}

export default UpdateVehicle;