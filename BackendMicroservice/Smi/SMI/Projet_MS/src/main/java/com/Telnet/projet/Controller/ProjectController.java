package com.Telnet.projet.Controller;

import com.Telnet.projet.Service.ProjectService;
import com.Telnet.projet.models.*;
import com.Telnet.projet.repository.ActivitiesRepository;
import com.Telnet.projet.repository.ClientRepository;
import com.Telnet.projet.repository.ProcessusRepository;
import com.Telnet.projet.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
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
    private ProjectRepository projectRepository;
    private ClientRepository clientRepository;

    private ProcessusRepository processusRepository;
    private ActivitiesRepository activitiesRepository;

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
            // Appel du service pour mettre à jour le projet
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

   /* @PutMapping("/updateproject/{id}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<?> updateProject(@PathVariable(value = "id") Long projectId, @RequestBody Project projectRequest) {
        try {
            // Recherche du projet dans la base de données
            Project existingProject = projectRepository.findById(projectId)
                    .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));

            // Récupération des données du projet à mettre à jour
            String projectName = projectRequest.getName();
            String projectType = projectRequest.getType();
            DateRangee projectDate = projectRequest.getProjectDate();
            Client client = projectRequest.getCli();
            List<Processus> processusList = projectRequest.getProcessus();

            // Vérification de l'existence du client sélectionné
            Client existingClient = clientRepository.findById(client.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Client not found with id: " + client.getId()));

            // Vérification des processus
            if (processusList == null || processusList.isEmpty()) {
                return ResponseEntity.badRequest().body("Processus list cannot be empty");
            }

            // Mise à jour des champs du projet existant avec les nouvelles valeurs
            existingProject.setName(projectName);
            existingProject.setType(projectType);
            if (projectDate != null) {
                existingProject.getProjectDate().setStartDate(projectDate.getStartDate());
                existingProject.getProjectDate().setEndDate(projectDate.getEndDate());
            }
            existingProject.setCli(existingClient);
            existingProject.setProcessus(processusList);

            // Enregistrement des modifications dans la base de données
            Project updatedProject = projectRepository.save(existingProject);

            return ResponseEntity.ok(updatedProject);
        } catch (EntityNotFoundException e) {
            // Gestion de l'erreur si le projet ou le client n'est pas trouvé
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            // Gestion de l'erreur si les données du projet sont invalides
            return ResponseEntity.badRequest().body("Invalid project data: " + e.getMessage());
        } catch (Exception e) {
            // Gestion de toutes les autres exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update project: " + e.getMessage());
        }
    }
*/


    @GetMapping("/listp")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public List<Project> getProjectList() {
        return projectService.getAllProjects();
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

    @GetMapping("/projectbyid/{id}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<Project> getProjectByIdd(@PathVariable("id") Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with ID: " + projectId));
        return ResponseEntity.ok().body(project);
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


    @GetMapping("/total-projets-par-client")
    // @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE')")
    public ResponseEntity<List<Object[]>> getTotalProjetsParClient() {
        List<Object[]> data = projectService.getTotalProjetsParClient();
        return ResponseEntity.ok(data);
    }

    @GetMapping("/count/type/{type}")
    public ResponseEntity<Map<String, Object>> getProjectCountByType(@PathVariable String type) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Effectuer le comptage des projets selon le type
            int count = projectRepository.countByType(type);

            // Construire la réponse
            response.put("type", type);
            response.put("count", count);

            // Retourner une réponse OK avec le résultat
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Log de l'erreur pour le débogage
           // logger.error("Erreur lors du comptage des projets pour le type {}: {}", type, e.getMessage(), e);

            // Construire une réponse d'erreur
            response.put("error", "Échec de la récupération du nombre de projets. Veuillez réessayer plus tard.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



    @GetMapping("/count/by-type")
    public ResponseEntity<Map<String, Integer>> getTotalProjetsParType() {
        try {
            Map<String, Integer> projectCountByType = projectService.getTotalProjetsParType();
            return ResponseEntity.ok(projectCountByType);
        } catch (Exception e) {
            // Log the error for debugging
            e.printStackTrace();
            Map<String, Integer> errorResponse = new HashMap<>();
            errorResponse.put("error", -1); // Placeholder for error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Méthode pour valider le type de projet
    private Optional<String> validateProjectType(String type) {
        if ("Régie".equals(type) || "Forfait".equals(type)) {
            return Optional.of(type);
        }
        return Optional.empty();
    }}




