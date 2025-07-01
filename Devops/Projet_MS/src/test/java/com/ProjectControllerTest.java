package com;

import com.Telnet.projet.Controller.ProjectController;
import com.Telnet.projet.Service.ProjectService;
import com.Telnet.projet.models.Project;
import com.Telnet.projet.models.Processus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.persistence.EntityNotFoundException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProjectControllerTest {

    @Mock
    private ProjectService projectService;

    @InjectMocks
    private ProjectController projectController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getProcessusByProjectId_Success() {
        Long projectId = 1L;
        List<Processus> processusList = Collections.singletonList(new Processus());
        when(projectService.getProcessusByProjectId(projectId)).thenReturn(processusList);

        ResponseEntity<List<Processus>> response = projectController.getProcessusByProjectId(projectId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void getProcessusByProjectId_NotFound() {
        Long projectId = 1L;
        when(projectService.getProcessusByProjectId(projectId)).thenThrow(new EntityNotFoundException());

        ResponseEntity<List<Processus>> response = projectController.getProcessusByProjectId(projectId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void getDetails_Success() {
        Long projectId = 1L;
        Project project = new Project();
        when(projectService.getDetails(projectId)).thenReturn(project);

        ResponseEntity<?> response = projectController.getDetails(projectId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(project, response.getBody());
    }

    @Test
    void getDetails_NotFound() {
        Long projectId = 1L;
        when(projectService.getDetails(projectId)).thenThrow(new EntityNotFoundException());

        ResponseEntity<?> response = projectController.getDetails(projectId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void getDetailsByKpi_Success() {
        Long kpiId = 1L;
        List<Project> projects = Collections.singletonList(new Project());
        when(projectService.getDetailsByKpi(kpiId)).thenReturn(projects);

        ResponseEntity<?> response = projectController.getDetailsByKpi(kpiId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(projects, response.getBody());
    }

    @Test
    void getDetailsByKpi_NotFound() {
        Long kpiId = 1L;
        when(projectService.getDetailsByKpi(kpiId)).thenReturn(Collections.emptyList());

        ResponseEntity<?> response = projectController.getDetailsByKpi(kpiId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }



    @Test
    void getProcessusAndKpiByProjectId_NotFound() {
        Long projectId = 1L;
        when(projectService.getProcessusAndKpiByProjectId(projectId)).thenThrow(new EntityNotFoundException());

        ResponseEntity<Map<String, List<String>>> response = projectController.getProcessusAndKpiByProjectId(projectId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void deleteProject_Success() {
        Long projectId = 1L;
        doNothing().when(projectService).deleteProject(projectId);

        ResponseEntity<?> response = projectController.deleteProject(projectId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void deleteProject_NotFound() {
        Long projectId = 1L;
        doThrow(new EntityNotFoundException()).when(projectService).deleteProject(projectId);

        ResponseEntity<?> response = projectController.deleteProject(projectId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void deleteProject_Error() {
        Long projectId = 1L;
        doThrow(new RuntimeException("Deletion error")).when(projectService).deleteProject(projectId);

        ResponseEntity<?> response = projectController.deleteProject(projectId);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    void updateProject_Success() {
        Long projectId = 1L;
        Project projectRequest = new Project();
        Project updatedProject = new Project();
        when(projectService.updateProject(projectId, projectRequest)).thenReturn(updatedProject);

        ResponseEntity<?> response = projectController.updateProject(projectId, projectRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(updatedProject, response.getBody());
    }

    @Test
    void updateProject_NotFound() {
        Long projectId = 1L;
        Project projectRequest = new Project();
        when(projectService.updateProject(projectId, projectRequest)).thenThrow(new EntityNotFoundException());

        ResponseEntity<?> response = projectController.updateProject(projectId, projectRequest);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void updateProject_BadRequest() {
        Long projectId = 1L;
        Project projectRequest = new Project();
        when(projectService.updateProject(projectId, projectRequest)).thenThrow(new IllegalArgumentException("Invalid project data"));

        ResponseEntity<?> response = projectController.updateProject(projectId, projectRequest);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void createProject_Success() {
        Project projectRequest = new Project();
        Project savedProject = new Project();
        when(projectService.createProject(projectRequest)).thenReturn(savedProject);

        ResponseEntity<?> response = projectController.createProject(projectRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(savedProject, response.getBody());
    }

    @Test
    void createProject_BadRequest() {
        Project projectRequest = new Project();
        when(projectService.createProject(projectRequest)).thenThrow(new IllegalArgumentException("Invalid project data"));

        ResponseEntity<?> response = projectController.createProject(projectRequest);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void getProjectById_Success() {
        Long projectId = 1L;
        Project project = new Project();
        when(projectService.getProjectById(projectId)).thenReturn(project);

        ResponseEntity<Project> response = projectController.getProjectById(projectId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(project, response.getBody());
    }

    @Test
    void getProjectById_NotFound() {
        Long projectId = 1L;
        when(projectService.getProjectById(projectId)).thenThrow(new EntityNotFoundException());

        ResponseEntity<Project> response = projectController.getProjectById(projectId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void getKpiAverageForProcessus_Success() {
        Long processusId = 1L;
        double average = 75.0;
        when(projectService.getKpiAverageForProcessus(processusId)).thenReturn(average);

        ResponseEntity<Double> response = projectController.getKpiAverageForProcessus(processusId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(average, response.getBody());
    }

    @Test
    void getKpiAverageForProcessus_NotFound() {
        Long processusId = 1L;
        when(projectService.getKpiAverageForProcessus(processusId)).thenThrow(new EntityNotFoundException());

        ResponseEntity<Double> response = projectController.getKpiAverageForProcessus(processusId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void getProjectsByActivityId_Success() {
        Long activityId = 1L;
        List<Project> projects = Collections.singletonList(new Project());
        when(projectService.getProjectsByActivityId(activityId)).thenReturn(projects);

        ResponseEntity<List<Project>> response = projectController.getProjectsByActivityId(activityId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(projects, response.getBody());
    }


}
