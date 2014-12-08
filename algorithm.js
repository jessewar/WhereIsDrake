var moment = require('moment')
var data = get_data();

check_matching_locations(data,1)

// console.log(data)
// console.log(moment().subtract(1,'days').calendar())
// console.log(moment().format('YYMMDDhhmmss'))
// console.log(Math.min(-1,2))

function get_data(){
	var data = { 
			"787512":{"location": [101.32, 160.5],"confidence": 0.43},

			"787513":{"location":[101.32,160.5],"confidence":0.2}
	}
	return data
};


function check_matching_locations(data,radius_threshold){
	// Method to check data for matching locations within a radius.
	// Each data piece is assigned a location_var field with the
	// corresponding location.
	var distance = 0;
	for (var namei in data) {
    	for (var namej in data) {
    		if (namei == namej){continue};
    		distance = Math.sqrt(Math.pow(data[namei].location[0]-data[namej].location[0],2) + Math.pow(data[namei].location[1]-data[namej].location[1],2))
    		if (distance < radius_threshold){
    			// Add location_var to data, return data
    		}
    	}
    }
};

function get_time_differentials(){
	// Method to compare dates to cpu time and to each other. 
	// Future data outside of threshold will be trashed.
};

function compute_probabilities(){
	// Method will consume data and compute
	// the probability at each independent location
	// P(A) = e^-t*P(B1)^2 + e^-t*P(B2)^2 - e^-t*P(C1)^2
	// This needs to compare each location to within a radius threshold
	// Any "future" data within a threshhold will be treated as current
};