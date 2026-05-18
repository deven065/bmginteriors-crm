package com.bmginteriors.crm.controller;

import com.bmginteriors.crm.model.Project;
import com.bmginteriors.crm.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }

    @PutMapping("/{id}")
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
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
