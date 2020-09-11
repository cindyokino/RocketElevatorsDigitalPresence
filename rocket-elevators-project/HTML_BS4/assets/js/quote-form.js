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



// /***** CALCULATE NUMBER OF ELEVATORS - COMMERCIAL BUILDING *****/
// var numElevatorsCommercial = function () {

// };



// /***** CALCULATE NUMBER OF ELEVATORS - CORPORATE BUILDING *****/
// var numElevatorsCorporate = funtion () {

// }



// /***** CALCULATE NUMBER OF ELEVATORS - HYBRID BUILDING *****/
// var numElevatorsHybrid = funtion () {
	
// }



// /***** CALCULATE PRICE BY TYPE *****/
// var calculatePriceBytype = function () {
// 	var optionName = this.id;
// 	optionName = optionName.replace("Radio", "Form");
// }



/***** RADIO BUTTONS - SHOW & HIDE FORMS *****/
var onChangeBuildingType = function () {
	var optionName = this.id;
	optionName = optionName.replace("Radio", "Form");
	$(".hideForm").hide();
	$("#" + optionName).show();
};

$("input[name=typeOfBuilding]").on("change", onChangeBuildingType); //calculatePriceBytype - ADD THIS PARAMETER??

$(document).ready(function () {
	$("#residentialRadio").change();
});








// $("#termsAndConditions").click(function(){
// 	var str = "I accept all risks using elevators";
// 	alert(str);
// });
