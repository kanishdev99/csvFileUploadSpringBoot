package com.csvupload.test.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csvupload.test.bean.DeveloperTutorials;

@Repository
public interface DeveloperTutorialRepository extends JpaRepository<DeveloperTutorials, Integer>
{
	
}
