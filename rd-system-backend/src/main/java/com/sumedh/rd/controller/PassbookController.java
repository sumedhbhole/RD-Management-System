package com.sumedh.rd.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sumedh.rd.entity.RdUserPassbook;
import com.sumedh.rd.passbookdto.UserPassbookDTO;
import com.sumedh.rd.repository.PassbookRepository;
import com.sumedh.rd.service.PassbookService;

@RestController
public class PassbookController {
	@Autowired
	private PassbookRepository passbookRepository;
	

    @Autowired
    private PassbookService passbookService;
	
	@GetMapping("/passbook")
	public List<RdUserPassbook> getPassbooks(){
		List<RdUserPassbook> list = passbookRepository.findAll();
		return list;
		
	}
	@PostMapping("/insertpassbook")
	public RdUserPassbook insertPassbook(@RequestBody RdUserPassbook rdinsert) {
		return passbookRepository.save(rdinsert);
	}	
	@PutMapping("/updatepassbook")
	public RdUserPassbook updatePassbook(@RequestBody RdUserPassbook rdupdate) {
		return passbookRepository.save(rdupdate);
	}	
	@DeleteMapping("/deletepassbook/{passbookid}")
	public String deletePassbook(@PathVariable("passbookid") int passbookid) {
	    passbookRepository.deleteById(passbookid);
	    return "Delete passbook successfully... " + passbookid;
	}


	@GetMapping("/sumofrdamount")
	public Map<String, Object> getSummary(){
		Long total = passbookRepository.sumOfrdAmount();
		Map<String, Object> result = new HashMap<>();
		result.put("total", total);
		return result;
	}
	// 	API FOR TO GET THE ALL DATA USING USER ID
	@GetMapping("/passbookbyid/{rdId}")
    public List<RdUserPassbook> getPassbooksByRdId(@PathVariable("rdId") int rdId) {
        return passbookRepository.getAllByRdId(rdId);
    }
	// JOIN QUERY USING OBJECT 
	@GetMapping("/detailsUsingObj")
	public List<Object[]> getDetails(){
		return passbookRepository.getUserPassbookDetails();
	}
	@Autowired
	private PassbookService servicePassbookService;
	@GetMapping("/passbookdetails-dto-service")
	public List<UserPassbookDTO> getdetaiList(){
		return servicePassbookService.getDetail();
	}	
    @GetMapping("/passbook-dto/{rd_id}")
    public List<UserPassbookDTO> getPassbookDto(@PathVariable("rd_id") int rd_id) {
        return passbookRepository.getUserPassbookDetailDto(rd_id);
    }
    
	
	 @PostMapping("/pay-rd/{passbookId}")
	 public String payRdInstallment(@PathVariable("passbookId") int passbookId) {
	     return passbookService.payInstallmentByPassbookId(passbookId);
	 }

    
}
