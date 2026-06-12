package com.vehicle.rental.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.vehicle.rental.entity.Review;
import com.vehicle.rental.repository.ReviewRepository;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // GET ALL REVIEWS
    @GetMapping("/api/reviews")
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // GET REVIEW BY ID
    @GetMapping("/api/reviews/{id}")
    public Optional<Review> getReviewById(@PathVariable Integer id) {
        return reviewRepository.findById(id);
    }

    // CREATE REVIEW
    @PostMapping("/api/reviews")
    public Review createReview(@RequestBody Review review) {
        return reviewRepository.save(review);
    }

    // UPDATE REVIEW
    @PutMapping("/api/reviews/{id}")
    public Review updateReview(@PathVariable Integer id,
                               @RequestBody Review updatedReview) {

        Review review = reviewRepository.findById(id).orElse(null);

        if (review != null) {
            review.setUser(updatedReview.getUser());
            review.setVehicle(updatedReview.getVehicle());
            review.setRating(updatedReview.getRating());
            review.setFeedback(updatedReview.getFeedback());

            return reviewRepository.save(review);
        }

        return null;
    }

    // DELETE REVIEW
    @DeleteMapping("/api/reviews/{id}")
    public String deleteReview(@PathVariable Integer id) {

        reviewRepository.deleteById(id);

        return "Review deleted successfully!";
    }
}