package com.vehicle.rental.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.vehicle.rental.entity.User;
import com.vehicle.rental.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {


@Autowired
private UserRepository userRepository;

@GetMapping("/api/users")
public List<User> getAllUsers() {
    return userRepository.findAll();
}

@GetMapping("/api/users/{id}")
public Optional<User> getUserById(
        @PathVariable Integer id) {

    return userRepository.findById(id);
}

@PostMapping("/api/users")
public User createUser(
        @RequestBody User user) {

    return userRepository.save(user);
}

@PutMapping("/api/users/{id}")
public User updateUser(
        @PathVariable Integer id,
        @RequestBody User updatedUser) {

    User user =
            userRepository.findById(id)
                          .orElse(null);

    if (user != null) {

        user.setFullName(
                updatedUser.getFullName());

        user.setEmail(
                updatedUser.getEmail());

        user.setPassword(
                updatedUser.getPassword());

        user.setPhoneNumber(
                updatedUser.getPhoneNumber());

        user.setDateOfBirth(
                updatedUser.getDateOfBirth());

        return userRepository.save(user);
    }

    return null;
}

@DeleteMapping("/api/users/{id}")
public String deleteUser(
        @PathVariable Integer id) {

    userRepository.deleteById(id);

    return "User deleted successfully!";
}

@PostMapping("/api/login")
public User login(
        @RequestBody User loginUser) {

    return userRepository.findByEmailAndPassword(
            loginUser.getEmail(),
            loginUser.getPassword()
    );
}

@GetMapping("/api/users/count")
public long getUserCount() {
    return userRepository.count();
}


}
