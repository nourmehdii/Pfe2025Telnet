package com.Telnet.projet.Service;



import com.Telnet.projet.models.Activity;
import com.Telnet.projet.models.Processus;
import com.Telnet.projet.models.User;
import com.Telnet.projet.repository.ActivitiesRepository;
import com.Telnet.projet.repository.ProcessusRepository;
import com.Telnet.projet.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    @Autowired
    private ActivitiesRepository activitiesRepository;


    @Autowired
    private ProcessusRepository processusRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<Activity> getAllActivities() {
        return activitiesRepository.findAll();
    }

    public Optional<Activity> getActivityById(Long id) {
        return activitiesRepository.findById(id);
    }

    public List<Activity> getActivitiesByUserId(Integer userId) {
        return activitiesRepository.findByUsers_Id(userId);
    }

    public List<String> getActivitiesNamesByProjectId(Long projectId) {
        List<Activity> activities = projectRepository.findActivitiesByProjectId(projectId);
        return activities.stream()
                .map(Activity::getName)
                .collect(Collectors.toList());
    }

    public Activity createActivity(Activity activity) {
        Set<Processus> processusSet = activity.getProcessus();
        if (processusSet != null) {
            for (Processus processus : processusSet) {
                processus.getActivities().add(activity);
            }
        }
        return activitiesRepository.save(activity);
    }

    public Optional<Activity> updateActivity(Long activityId, Activity activityDetails) throws ResourceNotFoundException {
        return activitiesRepository.findById(activityId)
                .map(activity -> {
                    activity.setName(activityDetails.getName());
                    activity.setDescription(activityDetails.getDescription());

                    Set<Processus> processusSet = activityDetails.getProcessus().stream()
                            .map(processus -> processusRepository.findById(processus.getId())
                                    .orElseThrow(() -> new ResourceNotFoundException("Processus not found :: " + processus.getId())))
                            .collect(Collectors.toSet());

                    activity.setProcessus(processusSet);

                    return activitiesRepository.save(activity);
                });
    }

    @Transactional
    public void deleteActivityAssociations(Long activityId) throws ResourceNotFoundException {
        // Vérifie si l'activité existe
        Activity activity = activitiesRepository.findById(activityId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found :: " + activityId));

        // Supprimer l'activité de la liste des activités de chaque utilisateur
        for (User user : activity.getUsers()) {
            user.getActivities().remove(activity);
        }

        // Effacer la liste des utilisateurs associés à cette activité
        activity.getUsers().clear();

        // Supprimer les processus liés à cette activité
        activity.getProcessus().clear();

        // Enregistrer les modifications dans la base de données
        activitiesRepository.save(activity);

        // Enfin, supprimer l'activité elle-même
        activitiesRepository.delete(activity);
    }

    public long countTotalActivities() {
        return activitiesRepository.count();
    }

}
