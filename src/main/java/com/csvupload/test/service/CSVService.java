package com.csvupload.test.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.csvupload.test.bean.DeveloperTutorials;
import com.csvupload.test.repository.DeveloperTutorialRepository;
import com.csvupload.test.util.CSVHelper;

@Service

public class CSVService {
	@Autowired
	  DeveloperTutorialRepository repository;

	  public void save(MultipartFile file) {
	    try {
	      List<DeveloperTutorials> tutorials = CSVHelper.csvToTutorials(file.getInputStream());
	      repository.saveAll(tutorials);
	    } catch (IOException e) {
	      throw new RuntimeException("fail to store csv data: " + e.getMessage());
	    }
	  }

	  public ByteArrayInputStream load() {
	    List<DeveloperTutorials> tutorials = repository.findAll();

	    ByteArrayInputStream in = CSVHelper.tutorialsToCSV(tutorials);
	    return in;
	  }

	  public List<DeveloperTutorials> getAllTutorials() {
	    return repository.findAll();
	  }
}