package com.bmginteriors.crm.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "workers")
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role;
    private String phone;
    private String email;
    private String empId;
    private String site;
    private LocalDate joinedDate;
    private String status; // Active, On Leave, Inactive
    private String avatarSeed;
}
