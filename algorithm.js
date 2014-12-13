var moment = require('moment')

var data = get_data();
data = get_time_differentials(data);
transformed_data = transform_data_to_probability(data)
console.log(transformed_data)
//check_matching_locations(data,1)

// console.log(data)
// console.log(moment().subtract(1,'days').calendar())
// console.log(moment().format('YYMMDDhhmmss'))
// console.log(Math.min(-1,2))

function get_data(){
	// Key = hash prefix + date

	var array_data = [[1412091200, 101.32, 166.5, 0.43],
					  [1412081200, 101.32, 160.5, 0.2]];


	var data = { 
			"1412091200":{"location": [101.32, 160.5],"confidence": 0.43},

			"1412081200":{"location":[101.32,160.5],"confidence":0.2}
	};

	return array_data
};


function get_time_differentials(data){
	// Method to compare dates to cpu time 
	// Future data outside of threshold will be trashed.
	// delta(t) * 0.01
	var current_time = moment().format('YYMMDDhhmm');
	
	for (var piece in data){
	data[piece][0] = current_time - data[piece][0];
	}

	return data

};

function transform_data_to_probability(data){
	var output = [];
	for (var i in data){
		ki = 0.00001;
		prob = data[i][3] * Math.exp(-1 * data[i][0] * ki)
		radius = (1/data[i][3]) * Math.exp(data[i][0] * ki);
		output.push([data[i][1],data[i][2],prob,radius])
	}
	return output
};

