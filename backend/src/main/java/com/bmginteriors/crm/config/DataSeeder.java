package com.bmginteriors.crm.config;

import com.bmginteriors.crm.model.*;
import com.bmginteriors.crm.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final WorkerRepository workerRepository;
    private final DocumentRepository documentRepository;
    private final AttendanceRepository attendanceRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedProjects();
        seedTasks();
        seedWorkers();
        seedDocuments();
        seedAttendance();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            // Seed Admin
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("John Doe");
            admin.setRole(UserRole.ADMIN);
            userRepository.save(admin);

            // Seed Customer (Rajesh Mehta)
            User customer1 = new User();
            customer1.setUsername("customer");
            customer1.setPassword(passwordEncoder.encode("customer123"));
            customer1.setFullName("Rajesh Mehta");
            customer1.setRole(UserRole.CUSTOMER);
            userRepository.save(customer1);

            // Seed Another Customer (Acme Corp)
            User customer2 = new User();
            customer2.setUsername("acme");
            customer2.setPassword(passwordEncoder.encode("acme123"));
            customer2.setFullName("Acme Corp");
            customer2.setRole(UserRole.CUSTOMER);
            userRepository.save(customer2);

            System.out.println("--- Seeding Complete: Admin (admin/admin123) and Customer (customer/customer123) users created.");
        }
    }

    private void seedProjects() {
        if (projectRepository.count() == 0) {
            Project p1 = new Project();
            p1.setName("Skyline Apartments");
            p1.setStatus("In Progress");
            p1.setPercentage(75);
            p1.setDate("10 Jun 2024 - 10 Oct 2024");
            p1.setLocation("Mumbai");
            p1.setTasksCompleted(15);
            p1.setTotalTasks(20);
            p1.setAvatarSeed("skyline");
            p1.setClient("Rajesh Mehta");
            p1.setStartDate(LocalDate.of(2024, 6, 10));
            p1.setDeadline(LocalDate.of(2024, 10, 10));
            p1.setBudget(2500000.0);
            p1.setSpent(1800000.0);

            Project p2 = new Project();
            p2.setName("Lake View Homes");
            p2.setStatus("On Hold");
            p2.setPercentage(10);
            p2.setDate("20 Feb 2024 - 20 Nov 2024");
            p2.setLocation("Pune");
            p2.setTasksCompleted(1);
            p2.setTotalTasks(10);
            p2.setAvatarSeed("lakeview");
            p2.setClient("Rajesh Mehta");
            p2.setStartDate(LocalDate.of(2024, 2, 20));
            p2.setDeadline(LocalDate.of(2024, 11, 20));
            p2.setBudget(3500000.0);
            p2.setSpent(350000.0);

            Project p3 = new Project();
            p3.setName("Orchid Commercial");
            p3.setStatus("In Progress");
            p3.setPercentage(40);
            p3.setDate("05 Feb 2024 - 20 Aug 2024");
            p3.setLocation("Delhi");
            p3.setTasksCompleted(6);
            p3.setTotalTasks(15);
            p3.setAvatarSeed("orchid");
            p3.setClient("Acme Corp");
            p3.setStartDate(LocalDate.of(2024, 2, 5));
            p3.setDeadline(LocalDate.of(2024, 8, 20));
            p3.setBudget(5000000.0);
            p3.setSpent(2200000.0);

            Project p4 = new Project();
            p4.setName("Green Valley Villa");
            p4.setStatus("Near Completion");
            p4.setPercentage(90);
            p4.setDate("15 Jun 2024 - 15 Jun 2024");
            p4.setLocation("Bangalore");
            p4.setTasksCompleted(18);
            p4.setTotalTasks(20);
            p4.setAvatarSeed("greenvalley");
            p4.setClient("John Smith");
            p4.setStartDate(LocalDate.of(2024, 6, 15));
            p4.setDeadline(LocalDate.of(2024, 6, 15));
            p4.setBudget(7500000.0);
            p4.setSpent(6700000.0);

            Project p5 = new Project();
            p5.setName("Palm Resort");
            p5.setStatus("Planning");
            p5.setPercentage(20);
            p5.setDate("01 Jul 2024 - 30 Dec 2024");
            p5.setLocation("Goa");
            p5.setTasksCompleted(2);
            p5.setTotalTasks(10);
            p5.setAvatarSeed("palmresort");
            p5.setClient("Goa Leisure Ltd");
            p5.setStartDate(LocalDate.of(2024, 7, 1));
            p5.setDeadline(LocalDate.of(2024, 12, 30));
            p5.setBudget(12000000.0);
            p5.setSpent(2400000.0);

            projectRepository.saveAll(List.of(p1, p2, p3, p4, p5));
        }
    }

    private void seedTasks() {
        if (taskRepository.count() == 0) {
            Task t1 = new Task();
            t1.setTitle("Finalize modular kitchen layouts");
            t1.setProject("Skyline Apartments");
            t1.setAssignedTo("Ravi Kumar");
            t1.setDueDate(LocalDate.now().plusDays(2));
            t1.setStatus("In Progress");
            t1.setPriority("HIGH");
            t1.setProgress(70);
            t1.setDaysRemaining(2);
            t1.setType("Design");

            Task t2 = new Task();
            t2.setTitle("False ceiling wiring layout");
            t2.setProject("Skyline Apartments");
            t2.setAssignedTo("Amit Sharma");
            t2.setDueDate(LocalDate.now().minusDays(1));
            t2.setStatus("Completed");
            t2.setPriority("MEDIUM");
            t2.setProgress(100);
            t2.setDaysRemaining(0);
            t2.setType("Electrical");

            Task t3 = new Task();
            t3.setTitle("Flooring material procurement");
            t3.setProject("Skyline Apartments");
            t3.setAssignedTo("Sunil Sharma");
            t3.setDueDate(LocalDate.now().plusDays(5));
            t3.setStatus("In Progress");
            t3.setPriority("HIGH");
            t3.setProgress(30);
            t3.setDaysRemaining(5);
            t3.setType("Build");

            Task t4 = new Task();
            t4.setTitle("HVAC ducting approval");
            t4.setProject("Orchid Commercial");
            t4.setAssignedTo("Sunil Sharma");
            t4.setDueDate(LocalDate.now().plusDays(10));
            t4.setStatus("In Progress");
            t4.setPriority("HIGH");
            t4.setProgress(40);
            t4.setDaysRemaining(10);
            t4.setType("HVAC");

            Task t5 = new Task();
            t5.setTitle("Wall paint selections");
            t5.setProject("Green Valley Villa");
            t5.setAssignedTo("Amit Singh");
            t5.setDueDate(LocalDate.now().minusDays(3));
            t5.setStatus("Completed");
            t5.setPriority("LOW");
            t5.setProgress(100);
            t5.setDaysRemaining(0);
            t5.setType("Paint");

            taskRepository.saveAll(List.of(t1, t2, t3, t4, t5));
        }
    }

    private void seedWorkers() {
        if (workerRepository.count() == 0) {
            Worker w1 = new Worker();
            w1.setName("Amit Sharma");
            w1.setRole("Carpenter");
            w1.setPhone("+91 98765 43210");
            w1.setStatus("Active");
            w1.setAvatarSeed("amit");

            Worker w2 = new Worker();
            w2.setName("Ramesh Kumar");
            w2.setRole("Plumber");
            w2.setPhone("+91 98765 43211");
            w2.setStatus("Active");
            w2.setAvatarSeed("ramesh");

            Worker w3 = new Worker();
            w3.setName("Vijay Yadav");
            w3.setRole("Electrician");
            w3.setPhone("+91 98765 43212");
            w3.setStatus("Inactive");
            w3.setAvatarSeed("vijay");

            Worker w4 = new Worker();
            w4.setName("Suresh Singh");
            w4.setRole("Painter");
            w4.setPhone("+91 98765 43213");
            w4.setStatus("Active");
            w4.setAvatarSeed("suresh");

            workerRepository.saveAll(List.of(w1, w2, w3, w4));
        }
    }

    private void seedDocuments() {
        if (documentRepository.count() == 0) {
            Document d1 = new Document();
            d1.setName("Skyline Elevation Design.dwg");
            d1.setType("dwg");
            d1.setSize("12.4 MB");
            d1.setUploader("Ravi Kumar");
            d1.setUploadedDate(LocalDateTime.now().minusDays(5));
            d1.setUrl("https://crm.bmginteriors.com/docs/skyline_elevation.dwg");

            Document d2 = new Document();
            d2.setName("Modular Kitchen Layout.pdf");
            d2.setType("pdf");
            d2.setSize("4.2 MB");
            d2.setUploader("Ravi Kumar");
            d2.setUploadedDate(LocalDateTime.now().minusDays(2));
            d2.setUrl("https://crm.bmginteriors.com/docs/modular_kitchen.pdf");

            Document d3 = new Document();
            d3.setName("Flooring Quote.xlsx");
            d3.setType("xlsx");
            d3.setSize("1.1 MB");
            d3.setUploader("Rajesh Mehta");
            d3.setUploadedDate(LocalDateTime.now().minusDays(1));
            d3.setUrl("https://crm.bmginteriors.com/docs/flooring_quote.xlsx");

            documentRepository.saveAll(List.of(d1, d2, d3));
        }
    }

    private void seedAttendance() {
        if (attendanceRepository.count() == 0) {
            List<Worker> workers = workerRepository.findAll();
            if (!workers.isEmpty()) {
                Attendance a1 = new Attendance();
                a1.setWorkerName(workers.get(0).getName());
                a1.setRole(workers.get(0).getRole());
                a1.setAvatarSeed(workers.get(0).getAvatarSeed());
                a1.setDate(LocalDate.now());
                a1.setStatus("Present");
                a1.setCheckIn("09:00 AM");
                a1.setCheckOut("06:00 PM");

                Attendance a2 = new Attendance();
                a2.setWorkerName(workers.get(1).getName());
                a2.setRole(workers.get(1).getRole());
                a2.setAvatarSeed(workers.get(1).getAvatarSeed());
                a2.setDate(LocalDate.now());
                a2.setStatus("Present");
                a2.setCheckIn("09:15 AM");
                a2.setCheckOut("06:00 PM");

                Attendance a3 = new Attendance();
                a3.setWorkerName(workers.get(3).getName());
                a3.setRole(workers.get(3).getRole());
                a3.setAvatarSeed(workers.get(3).getAvatarSeed());
                a3.setDate(LocalDate.now());
                a3.setStatus("Absent");

                attendanceRepository.saveAll(List.of(a1, a2, a3));
            }
        }
    }
}
