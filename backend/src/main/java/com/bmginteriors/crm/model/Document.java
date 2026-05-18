package com.bmginteriors.crm.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type; // pdf, image, docx, dwg
    private String size;
    private String uploader;
    private LocalDateTime uploadedDate;
    private String url;
}
