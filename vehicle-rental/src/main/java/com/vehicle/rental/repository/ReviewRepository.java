package com.vehicle.rental.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehicle.rental.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

}