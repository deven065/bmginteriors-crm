package com.bmginteriors.crm.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String project;
    private String assignedTo;
    private LocalDate dueDate;
    private String status;
    private String priority;
    private Integer progress;
    private Integer daysRemaining;
    private String type; // e.g. Design, Build, Electrical
}
