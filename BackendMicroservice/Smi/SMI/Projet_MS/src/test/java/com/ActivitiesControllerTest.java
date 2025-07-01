package com;



import com.Telnet.projet.Controller.ActivitiesController;
import com.Telnet.projet.Service.ActivityService;
import com.Telnet.projet.models.Activity;
import com.Telnet.projet.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ActivitiesControllerTest {

    @InjectMocks
    private ActivitiesController activitiesController;

    @Mock
    private ActivityService activityService;

    @Mock
    private ProjectRepository projectRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetActivities() {
        List<Activity> activities = Collections.singletonList(new Activity());
        when(activityService.getAllActivities()).thenReturn(activities);

        ResponseEntity<List<Activity>> response = activitiesController.getActivities();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(activities, response.getBody());
    }

    @Test
    void testGetActivityById() {
        Long activityId = 1L;
        Activity activity = new Activity();
        when(activityService.getActivityById(activityId)).thenReturn(Optional.of(activity));

        ResponseEntity<Activity> response = activitiesController.getActivityById(activityId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(activity, response.getBody());
    }

    @Test
    void testGetActivityByIdNotFound() {
        Long activityId = 1L;
        when(activityService.getActivityById(activityId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            activitiesController.getActivityById(activityId);
        });
    }

    @Test
    void testGetActivitiesByUserId() {
        Integer userId = 1;
        List<Activity> activities = Collections.singletonList(new Activity());
        when(activityService.getActivitiesByUserId(userId)).thenReturn(activities);

        ResponseEntity<List<Activity>> response = activitiesController.getActivitiesByUserId(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(activities, response.getBody());
    }

    @Test
    void testGetActivitiesByUserIdNotFound() {
        Integer userId = 1;
        when(activityService.getActivitiesByUserId(userId)).thenReturn(Collections.emptyList());

        assertThrows(ResourceNotFoundException.class, () -> {
            activitiesController.getActivitiesByUserId(userId);
        });
    }

    @Test
    void testGetActivitiesNamesByProjectId() {
        Long projectId = 1L;
        List<String> activityNames = Collections.singletonList("Activity1");
        when(activityService.getActivitiesNamesByProjectId(projectId)).thenReturn(activityNames);

        ResponseEntity<List<String>> response = activitiesController.getActivitiesNamesByProjectId(projectId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(activityNames, response.getBody());
    }

    @Test
    void testGetActivitiesNamesByProjectIdNotFound() {
        Long projectId = 1L;
        when(activityService.getActivitiesNamesByProjectId(projectId)).thenReturn(Collections.emptyList());

        ResponseEntity<List<String>> response = activitiesController.getActivitiesNamesByProjectId(projectId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testCreateActivity() {
        Activity activity = new Activity();
        when(activityService.createActivity(activity)).thenReturn(activity);

        ResponseEntity<Activity> response = activitiesController.createActivity(activity);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(activity, response.getBody());
    }

    @Test
    void testUpdateActivity() {
        Long activityId = 1L;
        Activity activityDetails = new Activity();
        Activity updatedActivity = new Activity();
        when(activityService.updateActivity(activityId, activityDetails)).thenReturn(Optional.of(updatedActivity));

        ResponseEntity<Activity> response = activitiesController.updateActivity(activityId, activityDetails);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedActivity, response.getBody());
    }

    @Test
    void testUpdateActivityNotFound() {
        Long activityId = 1L;
        Activity activityDetails = new Activity();
        when(activityService.updateActivity(activityId, activityDetails)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            activitiesController.updateActivity(activityId, activityDetails);
        });
    }

    @Test
    @Transactional
    void testDeleteActivityAssociations() {
        Long activityId = 1L;
        doNothing().when(activityService).deleteActivityAssociations(activityId);

        ResponseEntity<String> response = activitiesController.deleteActivityAssociations(activityId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Associations for activity with ID " + activityId + " deleted successfully.", response.getBody());
    }

    @Test
    @Transactional
    void testDeleteActivityAssociationsNotFound() {
        Long activityId = 1L;
        doThrow(new ResourceNotFoundException("Activity not found")).when(activityService).deleteActivityAssociations(activityId);

        ResponseEntity<String> response = activitiesController.deleteActivityAssociations(activityId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
