package com.bmginteriors.crm.controller;

import com.bmginteriors.crm.model.Worker;
import com.bmginteriors.crm.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workers")
public class WorkerController {

    @Autowired
    private WorkerRepository workerRepository;

    @GetMapping
    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Worker> getWorkerById(@PathVariable Long id) {
        return workerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Worker createWorker(@RequestBody Worker worker) {
        return workerRepository.save(worker);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Worker> updateWorker(@PathVariable Long id, @RequestBody Worker workerDetails) {
        return workerRepository.findById(id).map(worker -> {
            worker.setName(workerDetails.getName());
            worker.setRole(workerDetails.getRole());
            worker.setPhone(workerDetails.getPhone());
            worker.setEmail(workerDetails.getEmail());
            worker.setEmpId(workerDetails.getEmpId());
            worker.setSite(workerDetails.getSite());
            worker.setJoinedDate(workerDetails.getJoinedDate());
            worker.setStatus(workerDetails.getStatus());
            worker.setAvatarSeed(workerDetails.getAvatarSeed());
            return ResponseEntity.ok(workerRepository.save(worker));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorker(@PathVariable Long id) {
        if (workerRepository.existsById(id)) {
            workerRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
