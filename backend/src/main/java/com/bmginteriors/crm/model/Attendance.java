package com.bmginteriors.crm.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "attendance")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String workerName;
    private String role;
    private String checkIn;
    private String checkOut;
    private LocalDate date;
    private String status; // Present, Absent, Late
    private String avatarSeed;
}
