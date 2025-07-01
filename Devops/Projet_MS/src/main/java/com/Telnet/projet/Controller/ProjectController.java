package com.Telnet.projet.Controller;

import com.Telnet.projet.Service.ProjectService;
import com.Telnet.projet.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/{projectId}/processus")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<List<Processus>> getProcessusByProjectId(@PathVariable Long projectId) {
        try {
            List<Processus> processusList = projectService.getProcessusByProjectId(projectId);
            return new ResponseEntity<>(processusList, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/projetDetails/{id}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<?> getDetails(@PathVariable Long id) {
        try {
            Project projetDetails = projectService.getDetails(id);
            return ResponseEntity.ok(projetDetails);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/projetDetailsByKpi/{kpiId}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<?> getDetailsByKpi(@PathVariable Long kpiId) {
        List<Project> projets = projectService.getDetailsByKpi(kpiId);
        if (projets.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(projets);
    }

    @GetMapping("/{projectId}/processusAndKpi")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<Map<String, List<String>>> getProcessusAndKpiByProjectId(@PathVariable Long projectId) {
        try {
            Map<String, List<String>> processusAndKpiMap = projectService.getProcessusAndKpiByProjectId(projectId);
            return ResponseEntity.ok(processusAndKpiMap);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        try {
            projectService.deleteProject(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete project: " + e.getMessage());
        }
    }

    @PutMapping("/updateproject/{id}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody Project projectRequest) {
        try {
            Project updatedProject = projectService.updateProject(id, projectRequest);
            return ResponseEntity.ok(updatedProject);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid project data: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update project: " + e.getMessage());
        }
    }

    @PostMapping("/create-project")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<?> createProject(@RequestBody Project projectRequest) {
        try {
            Project savedProject = projectService.createProject(projectRequest);
            return ResponseEntity.ok(savedProject);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid project data: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create project: " + e.getMessage());
        }
    }

    @GetMapping("/{projectId}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<Project> getProjectById(@PathVariable Long projectId) {
        try {
            Project project = projectService.getProjectById(projectId);
            return new ResponseEntity<>(project, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/kpis/{id}/average")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<Double> getKpiAverageForProcessus(@PathVariable Long id) {
        try {
            double average = projectService.getKpiAverageForProcessus(id);
            return new ResponseEntity<>(average, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/activities/{activityId}/projects")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<List<Project>> getProjectsByActivityId(@PathVariable Long activityId) {
        List<Project> projects = projectService.getProjectsByActivityId(activityId);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/activities/{activityId}/processus")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<List<Processus>> getProcessusByActivityId(@PathVariable Long activityId) {
        List<Processus> processusList = projectService.getProcessusByActivityId(activityId);
        return new ResponseEntity<>(processusList, HttpStatus.OK);
    }
}

