package com.bmginteriors.crm.controller;

import com.bmginteriors.crm.model.Attendance;
import com.bmginteriors.crm.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    @GetMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<Attendance> getAttendanceById(@PathVariable Long id) {
        return attendanceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @SuppressWarnings("null")
    public Attendance createAttendance(@RequestBody Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    @PutMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<Attendance> updateAttendance(@PathVariable Long id, @RequestBody Attendance details) {
        return attendanceRepository.findById(id).map(attendance -> {
            attendance.setWorkerName(details.getWorkerName());
            attendance.setRole(details.getRole());
            attendance.setCheckIn(details.getCheckIn());
            attendance.setCheckOut(details.getCheckOut());
            attendance.setDate(details.getDate());
            attendance.setStatus(details.getStatus());
            attendance.setAvatarSeed(details.getAvatarSeed());
            return ResponseEntity.ok(attendanceRepository.save(attendance));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Long id) {
        if (attendanceRepository.existsById(id)) {
            attendanceRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
