import { useState } from "react";

function VehicleForm() {

  const [vehicleName, setVehicleName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [color, setColor] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [availability, setAvailability] = useState(true);

  function handleAddVehicle() {

    if (
      !vehicleName ||
      !registrationNumber ||
      !color ||
      !modelYear ||
      !pricePerDay
    ) {
      alert("Please fill all fields!");
      return;
    }

    if (vehicleName.trim().length < 2) {
      alert("Vehicle name must contain at least 2 characters!");
      return;
    }

    const registrationPattern =
      /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/i;

    if (!registrationPattern.test(registrationNumber)) {
      alert("Enter a valid registration number!");
      return;
    }

    const currentYear = new Date().getFullYear();

    if (
      Number(modelYear) < 1990 ||
      Number(modelYear) > currentYear + 1
    ) {
      alert(
        `Model year must be between 1990 and ${currentYear + 1}`
      );
      return;
    }

    if (Number(pricePerDay) <= 0) {
      alert("Price per day must be greater than 0!");
      return;
    }

    const vehicleData = {
      vehicleName,
      registrationNumber,
      color,
      modelYear,
      pricePerDay,
      availability
    };

    fetch("http://localhost:8080/api/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(vehicleData)
    })
      .then(response => response.json())
      .then(data => {

        console.log(data);

        alert("Vehicle Added Successfully!");

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

      <h2>Vehicle Registration</h2>

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

      <button
        type="button"
        onClick={handleAddVehicle}
      >
        Add Vehicle
      </button>

    </div>
  );
}

export default VehicleForm;