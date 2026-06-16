package com.bmginteriors.crm.controller;

import com.bmginteriors.crm.model.Project;
import com.bmginteriors.crm.model.User;
import com.bmginteriors.crm.model.UserRole;
import com.bmginteriors.crm.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    private User getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof User) {
            return (User) principal;
        }
        return null;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        User user = getAuthenticatedUser();
        if (user != null && user.getRole() == UserRole.CUSTOMER) {
            String clientName = user.getFullName();
            return projectRepository.findAll().stream()
                    .filter(p -> p.getClient() != null && p.getClient().equalsIgnoreCase(clientName))
                    .toList();
        }
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<?> getProjectById(@PathVariable Long id) {
        User user = getAuthenticatedUser();
        return projectRepository.findById(id).map(project -> {
            if (user != null && user.getRole() == UserRole.CUSTOMER) {
                if (project.getClient() == null || !project.getClient().equalsIgnoreCase(user.getFullName())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied: You are not authorized to view this project.");
                }
            }
            return ResponseEntity.ok((Object) project);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @SuppressWarnings("null")
    public Project createProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }

    @PutMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        return projectRepository.findById(id).map(project -> {
            project.setName(projectDetails.getName());
            project.setStatus(projectDetails.getStatus());
            project.setPercentage(projectDetails.getPercentage());
            project.setDate(projectDetails.getDate());
            project.setLocation(projectDetails.getLocation());
            project.setTasksCompleted(projectDetails.getTasksCompleted());
            project.setTotalTasks(projectDetails.getTotalTasks());
            project.setAvatarSeed(projectDetails.getAvatarSeed());
            project.setClient(projectDetails.getClient());
            project.setStartDate(projectDetails.getStartDate());
            project.setDeadline(projectDetails.getDeadline());
            project.setBudget(projectDetails.getBudget());
            project.setSpent(projectDetails.getSpent());
            return ResponseEntity.ok(projectRepository.save(project));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
