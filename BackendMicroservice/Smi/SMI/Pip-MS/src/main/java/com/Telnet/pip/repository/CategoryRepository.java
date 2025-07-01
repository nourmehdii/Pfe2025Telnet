package com.Telnet.pip.repository;

import com.Telnet.pip.model.Category;
import com.Telnet.pip.model.Interaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByInteraction(Interaction interaction);
}