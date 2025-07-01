package com.Telnet.projet.Service;

import com.Telnet.projet.models.*;
import com.Telnet.projet.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ActivitiesRepository activityRepository;

    @Autowired
    private ProcessusRepository processusRepository;

    @Autowired
   private kpiRepository kpiRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<Processus> getProcessusByProjectId(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        return project.getProcessus();
    }

    public Project getDetails(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));
    }

    public List<Project> getDetailsByKpi(Long kpiId) {
        return projectRepository.findByKpisId(kpiId);
    }

    public Map<String, List<String>> getProcessusAndKpiByProjectId(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));

        Map<String, List<String>> processusAndKpiMap = new HashMap<>();
        for (Processus processus : project.getProcessus()) {
            List<String> kpiNames = processus.getKpis().stream()
                    .map(Kpi::getName)
                    .collect(Collectors.toList());
            processusAndKpiMap.put(processus.getName(), kpiNames);
        }
        return processusAndKpiMap;
    }

    public void deleteProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        project.setKpis(null);
        projectRepository.save(project);
        projectRepository.delete(project);
    }



    public Map<String, Integer> getTotalProjetsParType() {
        List<Object[]> results = projectRepository.getTotalProjetsParType();
        Map<String, Integer> typeProjectCount = new HashMap<>();

        for (Object[] result : results) {
            String projectType = (String) result[0];
            Long count = (Long) result[1];
            typeProjectCount.put(projectType, count.intValue());
        }

        return typeProjectCount;
    }


    public Project updateProject(Long projectId, Project projectRequest) {
        if (projectRequest == null) {
            throw new IllegalArgumentException("Project request cannot be null");
        }

        // Récupération du projet existant
        Project existingProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));

        // Mise à jour des champs du projet
        existingProject.setName(projectRequest.getName());
        existingProject.setType(projectRequest.getType());

        if (projectRequest.getProjectDate() != null) {
            existingProject.getProjectDate().setStartDate(projectRequest.getProjectDate().getStartDate());
            existingProject.getProjectDate().setEndDate(projectRequest.getProjectDate().getEndDate());
        }

        // Mise à jour du client s'il est fourni dans la requête
        if (projectRequest.getCli() != null) {
            Client existingClient = clientRepository.findById(projectRequest.getCli().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Client not found with id: " + projectRequest.getCli().getId()));

            // Mise à jour du client associé au projet sans modifier les détails du client
            existingProject.setCli(existingClient);
        }

        existingProject.setProcessus(projectRequest.getProcessus());

        try {
            // Log des données avant la sauvegarde pour le débogage
            System.out.println("Updating project with ID: " + projectId);
            System.out.println("Project details before update: " + existingProject);

            // Sauvegarde du projet mis à jour
            Project updatedProject = projectRepository.save(existingProject);

            // Log des données après la sauvegarde pour le débogage
            System.out.println("Project updated successfully: " + updatedProject);

            return updatedProject;
        } catch (DataIntegrityViolationException e) {
            // Gestion des violations de contraintes de base de données
            System.err.println("Database constraint violation: " + e.getMessage());
            throw new IllegalStateException("Database constraint violated: " + e.getMessage(), e);
        } catch (Exception e) {
            // Gestion générale des exceptions
            System.err.println("Failed to update project: " + e.getMessage());
            throw new RuntimeException("Failed to update project: " + e.getMessage(), e);
        }
    }


    public Project createProject(Project projectRequest) {
        Project newProject = new Project(
                projectRequest.getName(),
                projectRequest.getType(),
                projectRequest.getProjectDate(),
                projectRequest.getProcessus(),
                projectRequest.getCli(),
                null,
                projectRequest.getActivity()
        );
        newProject.setKpis(retrieveKpisForProcessusList(projectRequest.getProcessus()));
        return projectRepository.save(newProject);
    }

    private Set<Kpi> retrieveKpisForProcessusList(List<Processus> processusList) {
        Set<Kpi> kpiList = new HashSet<>();
        for (Processus processus : processusList) {
            List<Kpi> kpis = kpiRepository.findByProcessusList(processus);
            kpiList.addAll(kpis);
        }
        return kpiList;
    }

    public Project getProjectById(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
    }

    public double getKpiAverageForProcessus(Long id) {
        Processus processus = processusRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Processus not found with id: " + id));
        return processus.getKpis().size();
    }

    public List<Project> getProjectsByActivityId(Long activityId) {
        return projectRepository.findByActivityId(activityId);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<Processus> getProcessusByActivityId(Long activityId) {
        return processusRepository.findByActivities_Id(activityId);
    }

    public int getProjectCountByType(String type) {
        return projectRepository.countByType(type);
    }

    public List<Object[]> getTotalProjetsParClient() {
        return projectRepository.getTotalProjetsParClient();
    }
}
