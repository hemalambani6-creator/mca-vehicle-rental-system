package com.vehicle.rental.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "users")
public class User {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer userId;

@Column(name = "full_name")
private String fullName;

private String email;

private String password;

@Column(name = "phone_number")
private String phoneNumber;

@Column(name = "date_of_birth")
private LocalDate dateOfBirth;

private String role;


}
