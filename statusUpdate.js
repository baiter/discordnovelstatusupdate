var request = require('request');
var cheerio = require('cheerio');

var toSource = require('tosource');

var lms_url = "http://www.rainbowturtletranslation.com/legendary-moonlight-sculptor-table-of-contents/";
var ds_url = "http://gravitytales.com/feed/dimensional-sovereign";
var bk_url = "http://gravitytales.com/feed/breakers";

module.exports.lmsStatusUpdate = function(callback){
	request(lms_url, function(err, resp, body) {
		if (err) throw err;

		$ = cheerio.load(body);
		// TODO: scraping goes here!
		var data = $('#content .entry-content').html().split('<div class="wpcnt">');

		data = data[0].split('Volume ');
		data = data[data.length-1];
		var volume = "Volume " + data.substring(0, 2); 
		data = data.split('</a><br>');
		data = data[data.length-2];
		data = data.split(': <a href="');
		var chapter = data[0].substring(1,data[0].length);
		data = data[1].split('/">');
		var url = data[0];
		var desc = data[1]; // need to convert description's html code to string
		//console.log(desc);
		var latest = {
			volume: volume,
			chapter: chapter,
			url: url,
			desc: desc
		};
		//latest = JSON.stringify(latest, null, 4);
		//console.log(latest);
		
		callback(null,latest);
	});
}

// dimensional sovereign
module.exports.dsStatusUpdate = function(callback){
	request(ds_url, function(err, resp, body) {
		if (err) throw err;

		var $ = cheerio.load(body);
		var data = $.xml().split("<item>")[1];
		var data = data.split("Dimensional Sovereign Chapter ")[1];
		var data = data.split("</title>")[0];

		var latest = data;
		callback(null,latest);
	});
}

// breakers
module.exports.bkStatusUpdate = function(callback){
	request(bk_url, function(err, resp, body) {
		if (err) throw err;

		var $ = cheerio.load(body);
		var data = $.xml().split("<item>")[1];
		var data = data.split("Breakers Chapter ")[1];
		var data = data.split("</title>")[0];
		
		var latest = data;
		callback(null,latest);
	});
}