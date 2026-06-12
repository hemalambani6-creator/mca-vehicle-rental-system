package com.vehicle.rental.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer vehicleId;

    @Column(name = "vehicle_name")
    private String vehicleName;

    @Column(name = "registration_number")
    private String registrationNumber;

    private String color;

    @Column(name = "model_year")
    private Integer modelYear;

    @Column(name = "price_per_day")
    private Double pricePerDay;

    private Boolean availability;

}