package com.telnet.enjeux_strategique.repository;

import com.telnet.enjeux_strategique.model.EnjeuHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnjeuHistoryRepository extends JpaRepository<EnjeuHistory, Long> {
    List<EnjeuHistory> findByEnjeuId(Long enjeuId); // utile pour l'affichage Angular
}
