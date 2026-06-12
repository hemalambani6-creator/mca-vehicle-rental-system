package com.vehicle.rental.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.vehicle.rental.entity.Vehicle;
import com.vehicle.rental.repository.VehicleRepository;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class VehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;

    // GET ALL VEHICLES
    @GetMapping("/api/vehicles")
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // GET VEHICLE BY ID
    @GetMapping("/api/vehicles/{id}")
    public Optional<Vehicle> getVehicleById(@PathVariable Integer id) {
        return vehicleRepository.findById(id);
    }

    // CREATE VEHICLE
    @PostMapping("/api/vehicles")
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    // UPDATE VEHICLE
    @PutMapping("/api/vehicles/{id}")
    public Vehicle updateVehicle(@PathVariable Integer id,
                                 @RequestBody Vehicle updatedVehicle) {

        Vehicle vehicle = vehicleRepository.findById(id).orElse(null);

        if (vehicle != null) {
            vehicle.setVehicleName(updatedVehicle.getVehicleName());
            vehicle.setRegistrationNumber(updatedVehicle.getRegistrationNumber());
            vehicle.setColor(updatedVehicle.getColor());
            vehicle.setModelYear(updatedVehicle.getModelYear());
            vehicle.setPricePerDay(updatedVehicle.getPricePerDay());
            vehicle.setAvailability(updatedVehicle.getAvailability());

            return vehicleRepository.save(vehicle);
        }

        return null;
    }

    // DELETE VEHICLE
    @DeleteMapping("/api/vehicles/{id}")
    public String deleteVehicle(@PathVariable Integer id) {

        vehicleRepository.deleteById(id);

        return "Vehicle deleted successfully!";
    }

}