package com.vehicle.rental.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehicle.rental.entity.Rental;

public interface RentalRepository extends JpaRepository<Rental, Integer> {

}