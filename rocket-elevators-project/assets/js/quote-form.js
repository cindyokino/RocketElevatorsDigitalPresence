/** ********************************************** **
	@Author			Cindy Okino
	@Website		https://github.com/cindyokino
	@Last Update	September 16, 2020


	TABLE CONTENTS
	-------------------------------


	INLINE SCRIPTS
	-------------------------------

*************************************************** **/

var numElevators = 0;
var priceElevators = 0;
var priceInstallation = 0;



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


/***** CALCULATE NUMBER OF ELEVATORS - CORPORATE BUILDING *****/
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
	elevators = totalOccupants / 1000;
	numColumns = floors / 20;
	numberElevatorsPerColumn = elevators / numColumns;

	$("#calculatedNumOfElevators").text(elevators);	
	numElevators = elevators;
};



/***** CALCULATE NUMBER OF ELEVATORS - CORPORATE BUILDING - call function numElevatorsCorporateAndHybrid() *****/
var numElevatorsCorporate = function () { 
	var elevators = 0;
	var numColumns = 0;
	var numberElevatorsPerColumn = 0;
	var companies = parseInt($("#numCompaniesCorporate").val());
	var floors = parseInt($("#numFloorsCorporate").val());
	var basements = parseInt($("#numBasementsCorporate").val());
	var parkings = parseInt($("#numParkingCorporate").val());
	var occupants = parseInt($("#numOccupantsFloorCorporate").val());

	var totalOccupants = occupants * floors;
	elevators = totalOccupants / 1000;
	numColumns = floors / 20;
	numberElevatorsPerColumn = elevators / numColumns;

	$("#calculatedNumOfElevators").text(elevators);	
	numElevators = elevators;
};



/***** CALCULATE NUMBER OF ELEVATORS - HYBRID BUILDING  - call function numElevatorsCorporateAndHybrid() *****/
var numElevatorsHybrid = funtion () {
	
}



// /***** CALCULATE PRICE BY LINE OF  *****/
// var calculatePricesByLine = function () {
// 	$("#calculatedNumOfElevators").text(elevators);	
// }



/***** RADIO BUTTONS - SHOW & HIDE FORMS *****/
var onChangeBuildingType = function () {
	var optionName = this.id;
	optionName = optionName.replace("Radio", "Form");
	$(".hideForm").hide();
	$("#" + optionName).show();
};

$("input[name=typeOfBuilding]").on("change", onChangeBuildingType); 

$(document).ready(function () {
	$("#residentialRadio").change();
});








// $("#termsAndConditions").click(function(){
// 	var str = "I accept all risks using elevators";
// 	alert(str);
// });
