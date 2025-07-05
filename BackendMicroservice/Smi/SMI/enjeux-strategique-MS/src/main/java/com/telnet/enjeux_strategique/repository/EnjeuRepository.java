package com.telnet.enjeux_strategique.repository;

import com.telnet.enjeux_strategique.model.Enjeu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnjeuRepository extends JpaRepository<Enjeu, Long> {}

