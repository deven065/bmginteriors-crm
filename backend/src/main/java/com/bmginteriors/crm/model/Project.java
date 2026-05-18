package com.bmginteriors.crm.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String status;
    private Integer percentage;
    private String date;
    private String location;
    private Integer tasksCompleted;
    private Integer totalTasks;
    private String avatarSeed;
    private String client;
    private LocalDate startDate;
    private LocalDate deadline;
    private Double budget;
    private Double spent;
}
