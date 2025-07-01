package com.Telnet.projet.Controller;


import com.Telnet.projet.Service.ActivityService;
import com.Telnet.projet.models.Activity;
import com.Telnet.projet.models.Processus;
import com.Telnet.projet.repository.ActivitiesRepository;
import com.Telnet.projet.repository.ProcessusRepository;
import com.Telnet.projet.repository.ProjectRepository;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;



@RestController
@CrossOrigin("*")





    public class ActivitiesController {


    @Autowired
    private ProjectRepository projectRepository;


    @Autowired
    private ActivityService activityService;


    @GetMapping("/activities")
    public ResponseEntity<List<Activity>> getActivities() {
        List<Activity> activities = activityService.getAllActivities();
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/activity/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable(value = "id") Long activitiesId) {
        return activityService.getActivityById(activitiesId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found ::" + activitiesId));
    }

    @GetMapping("/user/activity/{userId}")
    public ResponseEntity<List<Activity>> getActivitiesByUserId(@PathVariable(value = "userId") Integer userId) {
        List<Activity> activities = activityService.getActivitiesByUserId(userId);
        if (activities.isEmpty()) {
            throw new ResourceNotFoundException("Activities not found for user with ID :: " + userId);
        }
        return ResponseEntity.ok().body(activities);
    }

    @GetMapping("/project/{projectId}/activities")
    public ResponseEntity<List<String>> getActivitiesNamesByProjectId(@PathVariable Long projectId) {
        List<String> activityNames = activityService.getActivitiesNamesByProjectId(projectId);
        if (!activityNames.isEmpty()) {
            return ResponseEntity.ok(activityNames);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Activity> createActivity(@RequestBody Activity activity) {
        Activity savedActivity = activityService.createActivity(activity);
        return new ResponseEntity<>(savedActivity, HttpStatus.CREATED);
    }

    @PutMapping("/updateactivity/{id}")
    public ResponseEntity<Activity> updateActivity(
            @PathVariable(value = "id") Long activityId,
            @RequestBody Activity activityDetails) {
        return activityService.updateActivity(activityId, activityDetails)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found :: " + activityId));
    }
    @DeleteMapping("/activity/{id}")
    @Transactional
    public ResponseEntity<String> deleteActivityAssociations(@PathVariable(value = "id") Long activityId) {
        try {
            activityService.deleteActivityAssociations(activityId);
            return ResponseEntity.ok("Associations for activity with ID " + activityId + " deleted successfully.");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/activities/countactivity")
    public ResponseEntity<Long> getTotalActivities() {
        long totalActivities = activityService.countTotalActivities();
        return ResponseEntity.ok(totalActivities);
    }


}