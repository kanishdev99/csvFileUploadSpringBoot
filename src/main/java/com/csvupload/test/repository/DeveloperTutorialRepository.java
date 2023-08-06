package com.csvupload.test.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csvupload.test.bean.DeveloperTutorial;

@Repository
public interface DeveloperTutorialRepository extends JpaRepository<DeveloperTutorial, Integer>
{
	
}
