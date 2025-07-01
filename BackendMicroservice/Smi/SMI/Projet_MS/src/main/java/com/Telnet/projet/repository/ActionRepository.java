package com.Telnet.projet.repository;

import com.Telnet.projet.models.Action;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface ActionRepository  extends JpaRepository<Action,Long> {
}
