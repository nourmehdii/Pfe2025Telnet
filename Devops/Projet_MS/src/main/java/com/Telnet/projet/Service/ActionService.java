package com.Telnet.projet.Service;
import com.Telnet.projet.models.Action;
import com.Telnet.projet.models.Cause;
import com.Telnet.projet.repository.ActionRepository;
import com.Telnet.projet.repository.CauseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActionService {

    @Autowired
    private ActionRepository actionRepository;

    @Autowired
    private CauseRepository causeRepository;

    public Action planifierAction(Long causeId, Action action) throws ResourceNotFoundException {
        Optional<Cause> optionalCause = causeRepository.findById(causeId);

        if (!optionalCause.isPresent()) {
            throw new ResourceNotFoundException("Cause non trouvée");
        }

        Cause cause = optionalCause.get();
        action.setCause(cause);

        return actionRepository.save(action);
    }

    public Action getActionById(Long actionId) throws ResourceNotFoundException {
        return actionRepository.findById(actionId)
                .orElseThrow(() -> new ResourceNotFoundException("Action non trouvée"));
    }

    public List<Action> getActionsByCauseId(Long causeId) throws ResourceNotFoundException {
        Cause cause = causeRepository.findById(causeId)
                .orElseThrow(() -> new ResourceNotFoundException("Cause non trouvée"));

        return cause.getActions();
    }

    public Action modifierAction(Long actionId, Action actionDetails) throws ResourceNotFoundException {
        Action action = actionRepository.findById(actionId)
                .orElseThrow(() -> new ResourceNotFoundException("Action non trouvée"));

        action.setTypeAction(actionDetails.getTypeAction());
        action.setResponsable(actionDetails.getResponsable());
        action.setDatePlanification(actionDetails.getDatePlanification());
        action.setDateRealisation(actionDetails.getDateRealisation());
        action.setCritereEfficacite(actionDetails.getCritereEfficacite());
        action.setEfficace(actionDetails.isEfficace());
        action.setCommentaire(actionDetails.getCommentaire());

        return actionRepository.save(action);
    }

    public void supprimerAction(Long actionId) throws ResourceNotFoundException {
        Action action = actionRepository.findById(actionId)
                .orElseThrow(() -> new ResourceNotFoundException("Action non trouvée"));

        actionRepository.delete(action);
    }
}
