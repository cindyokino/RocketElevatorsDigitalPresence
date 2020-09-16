/** ********************************************** **
	@Author			Cindy Okino
	@Website		https://github.com/cindyokino
	@Last Update	September 16, 2020


	TABLE CONTENTS 
	-------------------------------
		GLOBAL VARIABLES AND CONSTANTS
		-------------------------------
		FUNCTIONS

			CHECK THE INPUT IS INVALID
			CALCULATE NUMBER OF ELEVATORS - RESIDENTIAL BUILDING
			CALCULATE NUMBER OF ELEVATORS - COMMERCIAL BUILDING
			CALCULATE NUMBER OF ELEVATORS - CORPORATEBUILDING
			CALCULATE NUMBER OF ELEVATORS - HYBRID BUILDING		
			RADIO BUTTONS - SHOW & HIDE FORMS AND ITS BUTTONS
			FORMAT MONEY - JAVASCRIPT NUMBER FORMATTER
			CALCULATE PRICES STANDARD
			CALCULATE PRICES PREMIUM
			CALCULATE PRICES EXCELIUM
			CALCULATE PRICE BY LINE OF PRODUCT SELECTED
		-------------------------------
		LISTENERS
		-------------------------------		
	-------------------------------

*************************************************** **/




/* ------------------------------------------------------------------------------
======================== GLOBAL VARIABLES AND CONSTANTS ======================== 
--------------------------------------------------------------------------------*/
let numElevators = 0;
let priceElevators = 0;
let priceInstallation = 0;
let totalPrice = 0;

let baseUrl = "https://rocket-elevators-calculator.herokuapp.com"; 
// let baseUrl = "http://localhost:5000";


/* ------------------------------------------------------------------------------
================================== FUNCTIONS ================================== 
--------------------------------------------------------------------------------*/

/***** CLICK THE RIGHT FORM BUTTON WHEN ENTER IS PRESSED INSIDE AN INPUT *****/
$(function() { // $(function() {}    *is the same as*    $(document).ready(function () {}
    $("#quoteForm input").keypress(function (e) { 
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			let optionValue = $('input[name=typeOfBuilding]:checked').val();
			$('#' + optionValue + 'Button').find('button').click()
			return false;
		} 
    });
});



/***** CHECK THE INPUT IS INVALID *****/
isInvalidInput = function(id) {
	return !$(id).get(0).checkValidity();
}



/***** CALCULATE NUMBER OF ELEVATORS - RESIDENTIAL BUILDING *****/
let numElevatorsResidential = function () {
	
	if (isInvalidInput("#numApartmentsResidential")
	|| isInvalidInput("#numFloorsResidential")
	|| isInvalidInput("#numBasementsResidential")) {
		return false;
	}	
	
	let elevators = 0;
	let apartments = $("#numApartmentsResidential").val();
	let floors = $("#numFloorsResidential").val();
	let basements = $("#numBasementsResidential").val();
	
	$.get({
		url: baseUrl + "/elevatorsResidential?apartments="+ apartments + "&floors=" + floors + "&basements=" + basements,
		dataType: "text",
		async: false,
		contentType: "application/text",
		success: function (data) {
			elevators = data;
		},
		error: function (res) {
			console.log("ERROR " + res);
			return false;
		}
	});

	$("#calculatedNumOfElevators").text(elevators);	
	numElevators = elevators;
};


/***** CALCULATE NUMBER OF ELEVATORS - COMMERCIAL BUILDING *****/
let numElevatorsCommercial = function () {
	if (isInvalidInput("#numCagesCommercial")) {
		return false;
	}

	let elevators = 0;
	elevators = parseInt($("#numCagesCommercial").val());

	$("#calculatedNumOfElevators").text(elevators);	
	numElevators = elevators;
};


/***** CALCULATE NUMBER OF ELEVATORS - CORPORATE BUILDING *****/
let numElevatorsCorporate = function () { 
	if (isInvalidInput("#numFloorsCorporate")
	|| isInvalidInput("#numBasementsCorporate")
	|| isInvalidInput("#numOccupantsFloorCorporate")) {
		return false;
	}

	let elevatorsTotal = 0;
	let floors = $("#numFloorsCorporate").val();
	let basements = $("#numBasementsCorporate").val();
	let occupants = $("#numOccupantsFloorCorporate").val();

	$.get({
		url: baseUrl + "/elevatorsCorporate?floors=" + floors + "&basements=" + basements + "&occupants=" + occupants,
		dataType: "text",
		async: false,
		contentType: "application/text",
		success: function (data) {
			elevatorsTotal = data;
		},
		error: function (res) {
			console.log("ERROR " + res);
			return false;
		}
	});
	
	$("#calculatedNumOfElevators").text(elevatorsTotal);	
	numElevators = elevatorsTotal;
};


/***** CALCULATE NUMBER OF ELEVATORS - HYBRID BUILDING *****/
let numElevatorsHybrid= function () { 
	if (isInvalidInput("#numFloorsHybrid")
	|| isInvalidInput("#numBasementsHybrid")
	|| isInvalidInput("#numOccupantsFloorHybrid")) {
		return false;
	}

	let elevators = 0;
	let elevatorsTotal = 0;
	let floors = parseInt($("#numFloorsHybrid").val());
	let basements = parseInt($("#numBasementsHybrid").val());
	let occupants = parseInt($("#numOccupantsFloorHybrid").val());

	$.get({
		url: baseUrl + "/elevatorsHybrid?floors="+ floors + "&basements=" + basements + "&occupants=" + occupants,
		dataType: "text",
		async: false,
		contentType: "application/text",
		success: function (data) {
			elevatorsTotal = data;
		},
		error: function (res) {
			console.log("ERROR " + res);
			return false;
		}
	});

	$("#calculatedNumOfElevators").text(elevatorsTotal);	
	numElevators = elevatorsTotal;
};



/***** RADIO BUTTONS - SHOW & HIDE FORMS AND ITS BUTTONS *****/
let onChangeBuildingTypeform = function () {
	let optionName = this.value;
	
	let optionNameForm = optionName + "Form"; 
	let optionNameButton = optionName + "Button";

	$(".hideForm").hide();
	$("#" + optionNameForm).show();
	$("#" + optionNameButton).show();

	// Reset the values when change the building type, wait to send on click button or press enter
	numElevators = 0;
	priceInstallation = 0;
	totalPrice = 0;
	$("#calculatedNumOfElevators").text(numElevators);
	$("#feeCost").text(formatter.format(priceInstallation));
	$("#calculatedTotalPrice").text(formatter.format(totalPrice));	
};



/***** FORMAT MONEY - JAVASCRIPT NUMBER FORMATTER eg.:(formater.format(value) *****/ 
let formatter = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'USD',
});
  


/***** CALCULATE PRICES STANDARD *****/
let standardCalculetedPrices = function () {
	$.get({
		url: baseUrl + "/standard?numElevators="+ numElevators,
		dataType: "text",
		async: false,
		contentType: "application/text",
		success: function (data) {
			let body = JSON.parse(data);
			standardPrice = body.standardPrice;
			priceInstallation = body.priceInstallation;
			totalPrice = body.totalPrice;
		},
		error: function (res) {
			console.log("ERROR " + res);
			return false;
		}
	});

	$("#chosenLine").text("standard");
	$("#unitPrice").text(formatter.format(standardPrice));
	$("#feeCost").text(formatter.format(priceInstallation));
	$("#calculatedTotalPrice").text(formatter.format(totalPrice));
};


// /***** CALCULATE PRICES PREMIUM *****/
let premiumCalculetedPrices = function () {
	$.get({
		url: baseUrl + "/premium?numElevators="+ numElevators,
		dataType: "text",
		async: false,
		contentType: "application/text",
		success: function (data) {
			let body = JSON.parse(data);
			premiumPrice = body.premiumPrice;
			priceInstallation = body.priceInstallation;
			totalPrice = body.totalPrice;
		},
		error: function (res) {
			console.log("ERROR " + res);
			return false;
		}
	});

	$("#chosenLine").text("premium");
	$("#unitPrice").text(formatter.format(premiumPrice));
	$("#feeCost").text(formatter.format(priceInstallation));
	$("#calculatedTotalPrice").text(formatter.format(totalPrice));
};


// /***** CALCULATE PRICES EXCELIUM *****/
let exceliumCalculetedPrices = function () {
	$.get({
		url: baseUrl + "/excelium?numElevators="+ numElevators,
		dataType: "text",
		async: false,
		contentType: "application/text",
		success: function (data) {
			let body = JSON.parse(data);
			exceliumPrice = body.exceliumPrice;
			priceInstallation = body.priceInstallation;
			totalPrice = body.totalPrice;
		},
		error: function (res) {
			console.log("ERROR " + res);
			return false;
		}
	});

	$("#chosenLine").text("excelium");
	$("#unitPrice").text(formatter.format(exceliumPrice));
	$("#feeCost").text(formatter.format(priceInstallation));
	$("#calculatedTotalPrice").text(formatter.format(totalPrice));
};



/***** CALCULATE PRICE BY LINE OF PRODUCT SELECTED *****/
let onChangeProductLine = function () {
	if ($('#standardLine').is(':checked')) { 		
		$("#unitPrice").text(formatter.format(unitPrice));
		standardCalculetedPrices();
	}
	else if ($('#premiumLine').is(':checked')) { 
		$("#unitPrice").text(formatter.format(unitPrice));
		premiumCalculetedPrices();
	}
	else {
		$("#unitPrice").text(formatter.format(unitPrice)); 
		exceliumCalculetedPrices();
	}
};




/* ------------------------------------------------------------------------------
=================================== LISTENERS ===================================
--------------------------------------------------------------------------------*/

$(document).ready(function () {
	/***** RADIO BUTTONS - SHOW & HIDE FORMS AND ITS BUTTONS *****/
	$("input[name=typeOfBuilding]").on("change", onChangeBuildingTypeform); 
	$("#residentialRadio").change();
	/***** RADIO BUTTONS - SELECT PRODUCT LINE *****/
	$("input[name=productLine]").on("change", onChangeProductLine); 
	$("#standardLine").change();
});




