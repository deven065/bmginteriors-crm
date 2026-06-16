package com.bmginteriors.crm.controller;

import com.bmginteriors.crm.model.Document;
import com.bmginteriors.crm.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentRepository documentRepository;

    @GetMapping
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    @GetMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<Document> getDocumentById(@PathVariable Long id) {
        return documentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @SuppressWarnings("null")
    public Document createDocument(@RequestBody Document document) {
        return documentRepository.save(document);
    }

    @PutMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<Document> updateDocument(@PathVariable Long id, @RequestBody Document details) {
        return documentRepository.findById(id).map(document -> {
            document.setName(details.getName());
            document.setType(details.getType());
            document.setSize(details.getSize());
            document.setUploader(details.getUploader());
            document.setUploadedDate(details.getUploadedDate());
            document.setUrl(details.getUrl());
            return ResponseEntity.ok(documentRepository.save(document));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        if (documentRepository.existsById(id)) {
            documentRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
