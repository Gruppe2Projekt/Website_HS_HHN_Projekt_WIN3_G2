var directionsService;
var directionsDisplay;

function initialize() {

	/*
	 * Create the map.
	 */
	var mapOptions = {
		zoom: 10,
		center: new google.maps.LatLng( 49.168350, 9.188392 ), // Heilbronn
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		streetViewControl: false
	};

	var map = new google.maps.Map( document.getElementById( 'map-canvas' ), mapOptions );

	/*
	 * Directions service
	 */

	var rendererOptions = {
		draggable: true
	};

	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer( rendererOptions );

	directionsDisplay.setMap( map );
	directionsDisplay.setPanel( document.getElementById( 'directionsPanel' ) );

	/*
	 * autocomplete object.
	 */
	var autocompleteStart = new google.maps.places.Autocomplete( document.getElementById( 'inputAddressStart' ) );
	autocompleteStart.bindTo( 'bounds', map );

	//var autocompleteDestination = new google.maps.places.Autocomplete( document.getElementById( 'inputAddressDestination' ) );
	//autocompleteDestination.bindTo( 'bounds', map );
}

function calcRoute() {

	var inputStart = document.getElementById( 'inputAddressStart' ).value;
	//var inputDestination = document.getElementById( 'inputAddressDestination' ).value;
	var inputTravelMode = document.getElementById( 'inputTravelMode' ).value;
	var avoidHighways = document.getElementById( 'inputAvoidHighways' ).checked;


	var request = {
		origin: inputStart,
		destination: "49.122604, 9.206499",
		travelMode: google.maps.TravelMode[inputTravelMode],
		avoidHighways: avoidHighways,

		provideRouteAlternatives: true
	};

	directionsService.route( request, function( response, status ) {

		if( status == google.maps.DirectionsStatus.OK ) {
			directionsDisplay.setDirections( response );
		}
	});
}
