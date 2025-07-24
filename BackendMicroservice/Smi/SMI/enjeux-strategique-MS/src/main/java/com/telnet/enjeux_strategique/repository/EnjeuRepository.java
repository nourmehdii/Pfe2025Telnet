package com.telnet.enjeux_strategique.repository;

import com.telnet.enjeux_strategique.model.Enjeu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EnjeuRepository extends JpaRepository<Enjeu, Long> {

    @Query("SELECT e FROM Enjeu e LEFT JOIN FETCH e.historiqueModifications")
    List<Enjeu> findAllWithHistorique();
}