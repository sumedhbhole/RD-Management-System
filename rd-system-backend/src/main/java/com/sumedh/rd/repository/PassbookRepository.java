package com.sumedh.rd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sumedh.rd.entity.RdUserPassbook;
import com.sumedh.rd.passbookdto.UserPassbookDTO;


public interface PassbookRepository extends JpaRepository<RdUserPassbook, Integer> {
	
	@Query(value = "select sum(rdamount) from rd_user_passbook", nativeQuery = true)
	Long sumOfrdAmount();
	
	// 	API FOR TO GET THE ALL DATA USING USER ID
	@Query(value = "select * from rd_user_passbook where rd_id = :rdId",nativeQuery = true)
	List<RdUserPassbook> getAllByRdId(@Param("rdId") int rdId);
	
	// JOIN QUERY USING OBJECT
	@Query(value = "select customer_name, account_number, rd_user_passbook.rdamount, rd_user_passbook.rddate \r\n"
			+ "from rd_user inner join rd_user_passbook on rd_user.rd_id = rd_user_passbook.rd_id",nativeQuery = true)
	List<Object[]> getUserPassbookDetails();
	
	// DTO USING SERVICE LAYER
	@Query(value = "select customer_name, account_number, rd_user_passbook.rdamount, rd_user_passbook.rddate \r\n"
			+ "from rd_user inner join rd_user_passbook on rd_user.rd_id = rd_user_passbook.rd_id",nativeQuery = true)
	List<UserPassbookDTO> getUserPassbookDetailsDto();
	// DTO USING WITHOUT SERVICE LAYES
	
	@Query(
			  value = "select customer_name, account_number, rd_user_passbook.rdamount, rd_user_passbook.rddate \r\n"
			        + "from rd_user inner join rd_user_passbook \r\n"
			        + "on rd_user.rd_id = rd_user_passbook.rd_id \r\n"
			        + "where rd_user_passbook.rd_id = :rd_id",
			  nativeQuery = true
			)
			List<UserPassbookDTO> getUserPassbookDetailDto(@Param("rd_id") int rd_id);

	

    @Query(
        value = """
            select * from rd_user_passbook
            where rd_id = :rdId and flag = 0
            order by rddate asc
            limit 1
        """,
        nativeQuery = true
    )
    RdUserPassbook findNextPendingInstallment(@Param("rdId") int rdId);
	
	
}

