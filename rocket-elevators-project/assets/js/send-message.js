/** ********************************************** **
	@Author			Cindy Okino
	@Website		https://github.com/cindyokino
	@Last Update	September 16, 2020


	TABLE CONTENTS 
	-------------------------------
		GLOBAL VARIABLES AND CONSTANTS
		-------------------------------
		FUNCTIONS

			CALCULATE NUMBER OF ELEVATORS - RESIDENTIAL BUILDING
			CALCULATE NUMBER OF ELEVATORS - COMMERCIAL BUILDING
			CALCULATE NUMBER OF ELEVATORS - CORPORATE & HYBRID BUILDINGS
			CALCULATE NUMBER OF ELEVATORS - CORPORATE BUILDING - call function numElevatorsCorporateAndHybrid()
			CALCULATE NUMBER OF ELEVATORS - HYBRID BUILDING  - call function numElevatorsCorporateAndHybrid()
			RADIO BUTTONS - SHOW & HIDE FORMS AND ITS BUTTONS
			CALCULATE PRICE EQUIPMENTS
			CALCULATE PRICE BY LINE OF PRODUCT SELECTED
		-------------------------------
		SCRIPTS
		-------------------------------		
	-------------------------------

*************************************************** **/

/***** CHECK THE INPUT IS INVALID AND SHOW ALERT FOR CONTACT FORM*****/
var sendMessage = function () {
	if (isInvalidInput("#contactName")
	|| isInvalidInput("#contactEmail")
	|| isInvalidInput("#contactDescription")
	|| isInvalidInput("#contactMessage")) {
		alert("Please fill out all the required* fields");	
		return false;
	}
	$("#alert_success").show();
}