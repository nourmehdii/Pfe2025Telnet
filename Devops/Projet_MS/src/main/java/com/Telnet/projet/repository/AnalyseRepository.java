package com.Telnet.projet.repository;

import com.Telnet.projet.models.Analyse;
import com.Telnet.projet.models.Kpi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnalyseRepository extends JpaRepository<Analyse,Long> {

    Optional<Analyse> findById(Long id);
    List<Analyse> findByProjectId(Long projectId);
    List<Analyse> findByKpi(Kpi kpi);
    long countByProjectId(Long projectId); // Ajoutez cette ligne


}