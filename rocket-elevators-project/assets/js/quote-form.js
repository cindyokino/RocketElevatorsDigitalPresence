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

/***** CLICK THE RIGHT FORM BUTTON WHEN ENTER IS PRESSED INSIDE AN INPUT *****/
$(function() { // $(function() {}    *is the same as*    $(document).ready(function () {}
    $("#quoteForm input").keypress(function (e) { 
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			var optionValue = $('input[name=typeOfBuilding]:checked').val();
			$('#' + optionValue + 'Button').find('button').click()
			return false;
		} 
    });
});



/***** CHECK THE INPUT IS INVALID *****/
var isInvalidInput = function(id) {
	return !$(id).get(0).checkValidity();
}



/***** CALCULATE NUMBER OF ELEVATORS - RESIDENTIAL BUILDING *****/
var numElevatorsResidential = function () {
	if (isInvalidInput("#numApartmentsResidential")
	|| isInvalidInput("#numFloorsResidential")
	|| isInvalidInput("#numBasementsResidential")) {
		return false;
	}

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

	// onChangeProductLine();
};



/***** CALCULATE NUMBER OF ELEVATORS - COMMERCIAL BUILDING *****/
var numElevatorsCommercial = function () {
	if (isInvalidInput("#numCagesCommercial")) {
		return false;
	}

	var elevators = 0;
	elevators = Number($("#numCagesCommercial").val());

	$("#calculatedNumOfElevators").text(elevators);	
	numElevators = elevators;

	// onChangeProductLine();
	// $(":button").on("click", onChangeProductLine);
};



/***** CALCULATE NUMBER OF ELEVATORS - CORPORATE & HYBRID BUILDINGS *****/
var numElevatorsCorporateAndHybrid = function () { 
	if (isInvalidInput("#numFloorsCorporate")
	|| isInvalidInput("#numBasementsCorporate")
	|| isInvalidInput("#numOccupantsFloorCorporate")) {
		return false;
	}

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
	// onChangeProductLine();
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
	var optionName = this.value;
	
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
//========================================================================================================================================
//========================================================================================================================================
/***** CALCULATE PRICES STANDARD *****/
var standardCalculetedPrices = function () {
	priceElevators = numElevators * standardPrice;
	priceInstallation = priceElevators * (standardFee / 100);
	totalPrice = priceElevators + priceInstallation;

	$("#chosenLine").text("standard");
	$("#unitPrice").text(formatter.format(standardPrice));
	$("#feeCost").text(formatter.format(priceInstallation));
	$("#calculatedTotalPrice").text(formatter.format(totalPrice));
};

// /***** CALCULATE PRICES PREMIUM *****/
var premiumCalculetedPrices = function () {
	priceElevators = numElevators * premiumPrice;
	priceInstallation = priceElevators * (premiumFee / 100);
	totalPrice = priceElevators + priceInstallation;

	$("#chosenLine").text("premium");
	$("#unitPrice").text(formatter.format(premiumPrice));
	$("#feeCost").text(formatter.format(priceInstallation));
	$("#calculatedTotalPrice").text(formatter.format(totalPrice));
};

// /***** CALCULATE PRICES EXCELIUM *****/
var exceliumCalculetedPrices = function () {
	priceElevators = numElevators * exceliumPrice;
	priceInstallation = priceElevators * (exceliumFee / 100);
	totalPrice = priceElevators + priceInstallation;

	$("#chosenLine").text("excelium");
	$("#unitPrice").text(formatter.format(exceliumPrice));
	$("#feeCost").text(formatter.format(priceInstallation));
	$("#calculatedTotalPrice").text(formatter.format(totalPrice));
};

//==============================================================================================================================
/***** CALCULATE PRICE BY LINE OF PRODUCT SELECTED *****/
var onChangeProductLine = function () {

	$("input[name=productLine]").change(function() {
		if ($('#standardLine').is(':checked')) { 
			standardCalculetedPrices();
		}
		else if ($('#premiumLine').is(':checked')) { 
			$("#unitPrice").text(formatter.format(premiumPrice)); 
			premiumCalculetedPrices();
		}
		else {
			$("#unitPrice").text(formatter.format(exceliumPrice)); 
			exceliumCalculetedPrices();
		}
	});
};


//==============================================================================================================================
//========================================================================================================================================
//========================================================================================================================================




/* ------------------------------------------------------------------------------
=================================== SCRIPTS ===================================
--------------------------------------------------------------------------------*/

$(document).ready(function () {
	/***** RADIO BUTTONS - SHOW & HIDE FORMS AND ITS BUTTONS *****/
	$("input[name=typeOfBuilding]").on("change", onChangeBuildingTypeform); 
	$("#residentialRadio").change();
	/***** RADIO BUTTONS - SELECT PRODUCT LINE *****/
	$("input[name=productLine]").on("change", onChangeProductLine); 
	$("#standardLine").change();
});
onChangeProductLine();


//****************** DELETAR SE NAO ARRUMAMR!!! sobre alerts no footer!!
// $("#termsAndConditions").click(function(){  DELETE THIS after implement the footer 
// 	var str = "I accept all risks using elevators";
// 	alert(str);
// });
