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




/* ------------------------------------------------------------------------------
======================== GLOBAL VARIABLES AND CONSTANTS ======================== 
--------------------------------------------------------------------------------*/

var numElevators = 0;
var priceElevators = 0;
var priceInstallation = 0;
var totalPrice = 0;

const standardPrice = 7565;
const premiumPrice = 12345;
const exceliumPrice =15400;

const standardFee= 10;
const premiumFee = 13;
const exceliumFee = 16;




/* ------------------------------------------------------------------------------
================================== FUNCTIONS ================================== 
--------------------------------------------------------------------------------*/

/***** CALCULATE NUMBER OF ELEVATORS - RESIDENTIAL BUILDING *****/
var numElevatorsResidential = function () {
	var elevators = 0;
	var numColumns = 0;	
	var apartments = parseInt($("#numApartmentsResidential").val());
	var floors = parseInt($("#numFloorsResidential").val());
	var basements = parseInt($("#numBasementsResidential").val());
	var averageDoorsPerFloor = Math.ceil(apartments / (floors - basements));

	elevators = Math.ceil(averageDoorsPerFloor / 6);
	if (floors > 20) {
		numColumns = Math.ceil(floors / 20);
		elevators = elevators * numColumns;
	}

	$("#calculatedNumOfElevators").text(elevators);	
	numElevators = elevators;
};



/***** CALCULATE NUMBER OF ELEVATORS - COMMERCIAL BUILDING *****/
var numElevatorsCommercial = function () {
	var elevators = 0;
	elevators = Number($("#numCagesCommercial").val());

	$("#calculatedNumOfElevators").text(elevators);	
	numElevators = elevators;
};



/***** CALCULATE NUMBER OF ELEVATORS - CORPORATE & HYBRID BUILDINGS *****/
var numElevatorsCorporateAndHybrid = function () { 
	var elevators = 0;
	var numColumns = 0;	
	var numberElevatorsPerColumn = 0;
	var companies = parseInt($("#numCompaniesCorporate").val());
	var floors = parseInt($("#numFloorsCorporate").val());
	var basements = parseInt($("#numBasementsCorporate").val());
	var parkings = parseInt($("#numParkingCorporate").val());
	var occupants = parseInt($("#numOccupantsFloorCorporate").val());

	var totalOccupants = occupants * floors;
	elevators = Math.ceil(totalOccupants / 1000);
	numColumns = Math.ceil(floors / 20);
	numberElevatorsPerColumn = Math.ceil(elevators / numColumns);

	elevatorsPerColumn = Math.ceil(elevators / numColumns);
	elevatorsTotal = Math.ceil(elevatorsPerColumn * numColumns);

	$("#calculatedNumOfElevators").text(elevatorsTotal);	
	numElevators = elevatorsTotal;
};



/***** CALCULATE NUMBER OF ELEVATORS - CORPORATE BUILDING - call function numElevatorsCorporateAndHybrid() *****/
var numElevatorsCorporate = function () { 
	numElevatorsCorporateAndHybrid();
};



/***** CALCULATE NUMBER OF ELEVATORS - HYBRID BUILDING  - call function numElevatorsCorporateAndHybrid() *****/
var numElevatorsHybrid = function () {
	numElevatorsCorporateAndHybrid();
};



/***** RADIO BUTTONS - SHOW & HIDE FORMS AND ITS BUTTONS *****/
var onChangeBuildingTypeform = function () {
	var optionName = this.id;
	optionName = optionName.replace("Radio", "");

	var optionNameForm = optionName + "Form"; 
	var optionNameButton = optionName + "Button";

	$(".hideForm").hide();
	$("#" + optionNameForm).show();
	$("#" + optionNameButton).show();

	numElevators = 0;

	$("#calculatedNumOfElevators").text(numElevators);
};


//========================================================================================================================================
/***** FORMAT MONEY - JAVASCRIPT NUMBER FORMATTER *****/
var formatter = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'USD',
});
  
// formatter.format(2500); EXAMPLE


//========================================================================================================================================
/***** CALCULATE PRICES STANDARD *****/
var standardCalculetedPrices = function () {
	priceElevators = numElevators * standardPrice;
	priceInstallation = price * (standardFee / 100);
	totalPrice = price + fees;

	$("#feeCost").text(formatter.format(priceInstallation));
	$("#calculatedTotalPrice").text(formatter.format(totalPrice));
};

// /***** CALCULATE PRICES PREMIUM *****/
// var premiumCalculedPrices = function () {
// };

// /***** CALCULATE PRICES EXCELIUM *****/
// var exceliumCalculedPrices = function () {
// };

//==============================================================================================================================
/***** CALCULATE PRICE BY LINE OF PRODUCT SELECTED *****/
var onChangeProductLine = function () {
	priceElevators = 0;
	priceInstallation = 0;
	totalPrice = 0;
	$("#feeCost").text(formatter.format(priceInstallation));
	$("#calculatedTotalPrice").text(formatter.format(totalPrice));


	// $("input[name=productLine]").click(function() {
	// 	if ($('#standardLine').is(':checked')) { 
	// 		$("#unitPrice").text(formatter.format(standardPrice)); 
	// 	}
	// 	else if ($('#premiumLine').is(':checked')) { 
	// 		$("#unitPrice").text(formatter.format(premiumPrice)); 
	// 	}
	// 	else {
	// 		$("#unitPrice").text(formatter.format(exceliumPrice)); 
	// 	}
	//  });

	$("input[name=productLine]").click(function() {
		if ($('#standardLine').checked) {
			// standardCalculetedPrices();
			$("#unitPrice").text(formatter.format(standardPrice));
		} 
		else if ($("#premiumLine").checked) {
			// premiumCalculetedPrices();
			$("#unitPrice").text(formatter.format(premiumPrice)); 
		} 
		else {
			// exceliumCalculetedPrices();
			$("#unitPrice").text(formatter.format(exceliumPrice)); 
		}
	});

	// $("#chosenLine").text(optionName);
	// $("#unitPrice").text(formatter.format(optionPrice));
	// $("#feeCost").text(formatter.format(priceInstallation));
	// $("#calculatedTotalPrice").text(formatter.format(totalPrice));
};

//==============================================================================================================================



/* ------------------------------------------------------------------------------
=================================== SCRIPTS ===================================
--------------------------------------------------------------------------------*/

/***** RADIO BUTTONS - SHOW & HIDE FORMS AND ITS BUTTONS *****/
$("input[name=typeOfBuilding]").on("change", onChangeBuildingTypeform); 

$(document).ready(function () {
	$("#residentialRadio").change();
});



/***** RADIO BUTTONS - SELECT PRODUCT LINE *****/
$("input[name=productLine]").on("change", onChangeProductLine); 

$(document).ready(function () {
	$("#standardLine").change();
});


//TENTANDO FAZER O ENTAR FUNCIONAR COMO UM BUTTON.CLICK() ****************** DELETAR SE NAO ARRUMAMR!!!
// var input = $("input[type=number]");
// input.addEventListener("keyup", function(event) {
//   if (event.keyCode === 13) {
//    event.preventDefault();
//    $("#quote-form button").click();
//   }
// });


//****************** DELETAR SE NAO ARRUMAMR!!! sobre alerts no footer!!
// $("#termsAndConditions").click(function(){  DELETE THIS after implement the footer 
// 	var str = "I accept all risks using elevators";
// 	alert(str);
// });
