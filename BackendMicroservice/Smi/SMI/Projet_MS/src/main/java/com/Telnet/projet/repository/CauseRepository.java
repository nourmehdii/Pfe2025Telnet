package com.Telnet.projet.repository;

import com.Telnet.projet.models.Cause;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface CauseRepository extends JpaRepository<Cause, Long> {
}
