package com.vehicle.rental.controller;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.vehicle.rental.entity.Rental;
import com.vehicle.rental.entity.Vehicle;
import com.vehicle.rental.repository.RentalRepository;
import com.vehicle.rental.repository.VehicleRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class RentalController {


@Autowired
private RentalRepository rentalRepository;

@Autowired
private VehicleRepository vehicleRepository;

@GetMapping("/api/rentals")
public List<Rental> getAllRentals() {
    return rentalRepository.findAll();
}

@GetMapping("/api/rentals/{id}")
public Optional<Rental> getRentalById(@PathVariable Integer id) {
    return rentalRepository.findById(id);
}

@PostMapping("/api/rentals")
public Rental createRental(@RequestBody Rental rental) {

    Integer vehicleId =
            rental.getVehicle().getVehicleId();

    Vehicle vehicle =
            vehicleRepository.findById(vehicleId)
                             .orElse(null);

    if (vehicle == null) {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Vehicle not found!"
        );
    }

    if (!vehicle.getAvailability()) {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Vehicle is not available for rent!"
        );
    }

    long days =
            ChronoUnit.DAYS.between(
                    rental.getStartDate(),
                    rental.getEndDate()
            );

    if (days <= 0) {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "End date must be after start date!"
        );
    }

    Double totalAmount =
            days * vehicle.getPricePerDay();

    rental.setTotalAmount(totalAmount);

    Rental savedRental =
            rentalRepository.save(rental);

    vehicle.setAvailability(false);

    vehicleRepository.save(vehicle);

    return savedRental;
}

@PutMapping("/api/rentals/{id}")
public Rental updateRental(
        @PathVariable Integer id,
        @RequestBody Rental updatedRental) {

    Rental rental =
            rentalRepository.findById(id)
                            .orElse(null);

    if (rental != null) {

        rental.setUser(updatedRental.getUser());
        rental.setVehicle(updatedRental.getVehicle());
        rental.setStartDate(updatedRental.getStartDate());
        rental.setEndDate(updatedRental.getEndDate());

        return rentalRepository.save(rental);
    }

    return null;
}

@DeleteMapping("/api/rentals/{id}")
public String deleteRental(@PathVariable Integer id) {

    rentalRepository.deleteById(id);

    return "Rental deleted successfully!";
}
}
