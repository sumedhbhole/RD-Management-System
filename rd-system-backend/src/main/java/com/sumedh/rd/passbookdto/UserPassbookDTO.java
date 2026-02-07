package com.sumedh.rd.passbookdto;

import java.time.LocalDate;

public interface UserPassbookDTO {
	
//	String getName();
//	String getAcno();
//	Double getRdamount();
//	LocalDate getRddate();
	

    String getCustomer_name();     // matches DB column customer_name

    String getAccount_number();    // matches DB column account_number

    Double getRdamount();         // matches rdamount

    LocalDate getRddate();         // matches rddate
    
    

}

