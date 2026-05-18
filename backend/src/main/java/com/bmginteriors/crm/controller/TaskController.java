package com.bmginteriors.crm.controller;

import com.bmginteriors.crm.model.Project;
import com.bmginteriors.crm.model.Task;
import com.bmginteriors.crm.model.User;
import com.bmginteriors.crm.model.UserRole;
import com.bmginteriors.crm.repository.ProjectRepository;
import com.bmginteriors.crm.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

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
    public List<Task> getAllTasks() {
        User user = getAuthenticatedUser();
        if (user != null && user.getRole() == UserRole.CUSTOMER) {
            String clientName = user.getFullName();
            
            // Get all projects belonging to this customer
            List<String> customerProjectNames = projectRepository.findAll().stream()
                    .filter(p -> p.getClient() != null && p.getClient().equalsIgnoreCase(clientName))
                    .map(Project::getName)
                    .toList();

            // Return tasks belonging to the customer's projects
            return taskRepository.findAll().stream()
                    .filter(t -> t.getProject() != null && customerProjectNames.contains(t.getProject()))
                    .toList();
        }
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id) {
        User user = getAuthenticatedUser();
        return taskRepository.findById(id).map(task -> {
            if (user != null && user.getRole() == UserRole.CUSTOMER) {
                String taskProject = task.getProject();
                boolean projectBelongsToCustomer = projectRepository.findAll().stream()
                        .anyMatch(p -> p.getName().equalsIgnoreCase(taskProject) && 
                                       p.getClient() != null && 
                                       p.getClient().equalsIgnoreCase(user.getFullName()));
                if (!projectBelongsToCustomer) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied: You are not authorized to view this task.");
                }
            }
            return ResponseEntity.ok((Object) task);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return taskRepository.findById(id).map(task -> {
            task.setTitle(taskDetails.getTitle());
            task.setProject(taskDetails.getProject());
            task.setAssignedTo(taskDetails.getAssignedTo());
            task.setDueDate(taskDetails.getDueDate());
            task.setStatus(taskDetails.getStatus());
            task.setPriority(taskDetails.getPriority());
            task.setProgress(taskDetails.getProgress());
            task.setDaysRemaining(taskDetails.getDaysRemaining());
            task.setType(taskDetails.getType());
            return ResponseEntity.ok(taskRepository.save(task));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
