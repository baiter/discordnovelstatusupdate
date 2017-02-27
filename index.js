//// header
// Get authentication data
try { var AuthDetails = require("./auth.json");} catch (e){
	console.log("Please create an auth.json like auth.json.example with at least an email and password.\n"+e.stack);
	process.exit();
}
var fs = require('fs');
try {var statusUpdate = require('./statusUpdate.js');} catch (e){console.log("missing statusUpdate.js");process.exit();}
const Discord = require("discord.js");
const client = new Discord.Client();

// error check
fs.readFile('./lmsCurrent.json', 'utf8', function (err,data) {
  	if (err) {
    	fs.writeFile("./lmsCurrent.json", "", function(err) {
		    if(err) {
		    	return console.log(err);
		    }
		    // update found
			console.log("New lmsCurrent.json file created!");
		});
  	}
});

//// body
// login success. ready!
client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  var statusChannel = client.channels.get("171236566759374848"); // status update channel
  //var statusChannel = client.channels.get("171236216455430145"); // general channel

  // Automatic Update Section!
  // LMS!
  		var displayLMS = function(err, data) {
        	var newData = data;
    		fs.readFile('./lmsCurrent.json', 'utf8', function (err,data) {
  				if (err) {
    				return console.log(err);
  				}
  				if (data === JSON.stringify(newData)){
  					// no change
  					console.log("equality is wonderful");
  				}
  				else {
  					fs.writeFile("./lmsCurrent.json", JSON.stringify(newData), function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("The file was saved!");
					});

  					// Display Status Update to Channel
					var l_volume = newData.volume;
		            var l_chapter = newData.chapter;
		            var l_desc = newData.desc;
		            var l_url = newData.url;
		        
		            if (err) throw err; // Check for the error and throw if it exists.
		            statusChannel.sendMessage(
		                "**Moonlight Sculptor " + l_volume + ", " + l_chapter + " has been released**" +
		                "\nDescription: " + l_desc +
		                "\nLink: <" + l_url +">"
		            );
  				}
  				//console.log("new data: \n" + JSON.stringify(newData));
  				//console.log("old data:");
  				//console.log(data);
			});
        };

    // DS!

    	var displayDS = function(err, data) {
        	var newData = data;
    		fs.readFile('./dsCurrent.json', 'utf8', function (err,data) {
    			data = data.replace(/(\r\n|\n|\r)/gm,"");
  				if (err) {
  					// if file not found, write latest as current chapter
    				fs.writeFile("./dsCurrent.json", newData, function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("ds file wasn't found. new file made!");
					});
  				}
  				if (data === newData){
  					// no change
  					console.log("ds, there was no update. i checked.");
  				}
  				else {
  					fs.writeFile("./dsCurrent.json", newData, function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("The file was saved!");
			    		console.log(data);
			    		console.log(newData);
					});

  					// Display Status Update to Channel
					for (var i = parseInt(data) + 1; i <= newData; i++){
						statusChannel.sendMessage(
			                "**Dimensional Sovereign Chapter " + i + " has been released** " +
			                "\nLink: <" + "http://gravitytales.com/novel/dimensional-sovereign/ds-chapter-" + i + ">"
		            	);
					}
  				}
			});
        };

    // Breakers!

    	var displayBK = function(err, data) {
        	var newData = data;
    		fs.readFile('./bkCurrent.json', 'utf8', function (err,data) {
    			data = data.replace(/(\r\n|\n|\r)/gm,"");
  				if (err) {
  					// if file not found, write latest as current chapter
    				fs.writeFile("./bkCurrent.json", newData, function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("bk file wasn't found. new file made!");
					});
  				}
  				if (data === newData){
  					// no change
  					console.log("bk, there was no update. i checked.");
  				}
  				else {
  					fs.writeFile("./bkCurrent.json", newData, function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("The file was saved!");
			    		console.log(data);
			    		console.log(newData);
					});

  					// Display Status Update to Channel
					for (var i = parseInt(data) + 1; i <= newData; i++){
						statusChannel.sendMessage(
			                "**Breakers Chapter " + i + " has been released** " +
			                "\nLink: <" + "http://gravitytales.com/novel/breakers/breakers-chapter-" + i + ">"
		            	);
					}
  				}
			});
        };

        // grab data from website
      //  statusUpdate.bkStatusUpdate(displayBK);

        // grab data from website
      //  statusUpdate.dsStatusUpdate(displayDS);
        // grab data from website
      //  statusUpdate.lmsStatusUpdate(displayLMS);

        setInterval(function () {statusUpdate.lmsStatusUpdate(displayLMS);}, 185000);
        setInterval(function () {statusUpdate.dsStatusUpdate(displayDS);}, 180000);
        setInterval(function () {statusUpdate.bkStatusUpdate(displayBK);}, 190000);
//
/*
        // grab data from website
        statusUpdate.lmsStatusUpdate(displayLMS);

        for (var i = 0; i< 99999999;i++){
        	if (i % 3 == 0) {
        		console.log("eye"+i);
        		setInterval(statusUpdate.lmsStatusUpdate(displayLMS), 180000);
        	}
        	else if (i % 3 == 1) {
        		console.log("eye"+i);
        		setTimeout(function() {statusUpdate.dsStatusUpdate(displayDS);}, 1000*60*3);
        	}
        	else if (i % 3 == 2) {
        		console.log("eye"+i);
        		setTimeout(function() {statusUpdate.lmsStatusUpdate(displayLMS);}, 1000*60*3);
        	}
        }
*/

  //setTimeout(statusUpdate.bkStatusUpdate(displayBK), 1000*60*3);
  //setTimeout(statusUpdate.dsStatusUpdate(displayDS), 1000*60*3);
  //setTimeout(statusUpdate.lmsStatusUpdate(displayLMS), 1000*60*3);
});

//// trigger and command section

// ping
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

// !test
client.on('message', msg => {
  if (msg.content === '!test') {
    {
    	// check if there was an update or not
        var displayLMS = function(err, data) {
        	var newData = data;
    		fs.readFile('./lmsCurrent.json', 'utf8', function (err,data) {
  				if (err) {
    				return console.log(err);
  				}
  				if (data === JSON.stringify(newData)){
  					// no change
  					console.log("equality is wonderful");
  				}
  				else {
  					fs.writeFile("./lmsCurrent.json", JSON.stringify(newData), function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("The file was saved!");
					});

  					// Display Status Update to Channel
					var l_volume = newData.volume;
		            var l_chapter = newData.chapter;
		            var l_desc = newData.desc;
		            var l_url = newData.url;
		        
		            if (err) throw err; // Check for the error and throw if it exists.
		            msg.reply(
		                "**Moonlight Sculptor " + l_volume + ", " + l_chapter + " has been released**" +
		                "\nDescription: " + l_desc +
		                "\nLink: <" + l_url +">"
		            );
  				}
  				//console.log("new data: \n" + JSON.stringify(newData));
  				//console.log("old data:");
  				//console.log(data);
			});
        };

        // grab data from website
        statusUpdate.lmsStatusUpdate(displayLMS);
    }
  }
});

// !test ds
client.on('message', msg => {
  if (msg.content === '!testds') {
    {
    	// check if there was an update or not
        var displayDS = function(err, data) {
        	var newData = data;
    		fs.readFile('./dsCurrent.json', 'utf8', function (err,data) {
    			data = data.replace(/(\r\n|\n|\r)/gm,"");
  				if (err) {
  					// if file not found, write latest as current chapter
    				fs.writeFile("./dsCurrent.json", newData, function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("ds file wasn't found. new file made!");
					});
  				}
  				if (data === newData){
  					// no change
  					console.log("ds, there was no update. i checked.");
  				}
  				else {
  					fs.writeFile("./dsCurrent.json", newData, function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("The file was saved!");
			    		console.log(data);
			    		console.log(newData);
					});

  					// Display Status Update to Channel
					for (var i = parseInt(data) + 1; i <= newData; i++){
						msg.reply(
			                "**Dimensional Sovereign Chapter " + i + " has been released** " +
			                "\nLink: <" + "http://gravitytales.com/novel/dimensional-sovereign/ds-chapter-" + i + ">"
		            	);
					}
  				}
			});
        };

        // grab data from website
        statusUpdate.dsStatusUpdate(displayDS);
    }
  }
});

// !test bk
client.on('message', msg => {
  if (msg.content === '!testbk') {
    {
    	// check if there was an update or not
        var displayBK = function(err, data) {
        	var newData = data;
    		fs.readFile('./bkCurrent.json', 'utf8', function (err,data) {
    			data = data.replace(/(\r\n|\n|\r)/gm,"");
  				if (err) {
  					// if file not found, write latest as current chapter
    				fs.writeFile("./bkCurrent.json", newData, function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("bk file wasn't found. new file made!");
					});
  				}
  				if (data === newData){
  					// no change
  					console.log("bk, there was no update. i checked.");
  				}
  				else {
  					fs.writeFile("./bkCurrent.json", newData, function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("The file was saved!");
			    		console.log(data);
			    		console.log(newData);
					});

  					// Display Status Update to Channel
					for (var i = parseInt(data) + 1; i <= newData; i++){
						msg.reply(
			                "**Breakers Chapter " + i + " has been released** " +
			                "\nLink: <" + "http://gravitytales.com/novel/breakers/breakers-chapter-" + i + ">"
		            	);
					}
  				}
			});
        };

        // grab data from website
        statusUpdate.bkStatusUpdate(displayBK);
    }
  }
});



// !test msg
client.on('message', msg => {
  if (msg.content === '!testmsg') {
  	const statusChannel = client.channels.get("171236566759374848");
  	//console.log(client.channels.171236566759374848);
  	//console.log(statusChannel);
	statusChannel.sendMessage("final test");
  }
});

// !test msgbyid
client.on('message', msg => {
  if (msg.content === '!testmsgbyid') {
  	const statusChannel = client.channels.get("171236216455430145");
  	//console.log(statusChannel);
	statusChannel.sendMessage("sup dood");
  }
});










// !update
client.on('message', msg => {
  if (msg.content === '!update') {
  	var statusChannel = client.channels.get("171236566759374848"); // status update channel
  //var statusChannel = client.channels.get("171236216455430145"); // general channel
  	  		var displayLMS = function(err, data) {
        	var newData = data;
    		fs.readFile('./lmsCurrent.json', 'utf8', function (err,data) {
  				if (err) {
    				return console.log(err);
  				}
  				if (data === JSON.stringify(newData)){
  					// no change
  					console.log("equality is wonderful");
  				}
  				else {
  					fs.writeFile("./lmsCurrent.json", JSON.stringify(newData), function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("The file was saved!");
					});

  					// Display Status Update to Channel
					var l_volume = newData.volume;
		            var l_chapter = newData.chapter;
		            var l_desc = newData.desc;
		            var l_url = newData.url;
		        
		            if (err) throw err; // Check for the error and throw if it exists.
		            statusChannel.sendMessage(
		                "**Moonlight Sculptor " + l_volume + ", " + l_chapter + " has been released**" +
		                "\nDescription: " + l_desc +
		                "\nLink: <" + l_url +">"
		            );
  				}
  				//console.log("new data: \n" + JSON.stringify(newData));
  				//console.log("old data:");
  				//console.log(data);
			});
        };

    // DS!

    	var displayDS = function(err, data) {
        	var newData = data;
    		fs.readFile('./dsCurrent.json', 'utf8', function (err,data) {
    			data = data.replace(/(\r\n|\n|\r)/gm,"");
  				if (err) {
  					// if file not found, write latest as current chapter
    				fs.writeFile("./dsCurrent.json", newData, function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("ds file wasn't found. new file made!");
					});
  				}
  				if (data === newData){
  					// no change
  					console.log("ds, there was no update. i checked.");
  				}
  				else {
  					fs.writeFile("./dsCurrent.json", newData, function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("The file was saved!");
			    		console.log(data);
			    		console.log(newData);
					});

  					// Display Status Update to Channel
					for (var i = parseInt(data) + 1; i <= newData; i++){
						statusChannel.sendMessage(
			                "**Dimensional Sovereign Chapter " + i + " has been released** " +
			                "\nLink: <" + "http://gravitytales.com/novel/dimensional-sovereign/ds-chapter-" + i + ">"
		            	);
					}
  				}
			});
        };

    // Breakers!

    	var displayBK = function(err, data) {
        	var newData = data;
    		fs.readFile('./bkCurrent.json', 'utf8', function (err,data) {
    			data = data.replace(/(\r\n|\n|\r)/gm,"");
  				if (err) {
  					// if file not found, write latest as current chapter
    				fs.writeFile("./bkCurrent.json", newData, function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("bk file wasn't found. new file made!");
					});
  				}
  				if (data === newData){
  					// no change
  					console.log("bk, there was no update. i checked.");
  				}
  				else {
  					fs.writeFile("./bkCurrent.json", newData, function(err) {
		    			if(err) {
		        			return console.log(err);
		    			}
		    			// update found
			    		console.log("The file was saved!");
			    		console.log(data);
			    		console.log(newData);
					});

  					// Display Status Update to Channel
					for (var i = parseInt(data) + 1; i <= newData; i++){
						statusChannel.sendMessage(
			                "**Breakers Chapter " + i + " has been released** " +
			                "\nLink: <" + "http://gravitytales.com/novel/breakers/breakers-chapter-" + i + ">"
		            	);
					}
  				}
			});
        };

        // grab data from website
        statusUpdate.bkStatusUpdate(displayBK);
        // grab data from website
        statusUpdate.dsStatusUpdate(displayDS);
        // grab data from website
        statusUpdate.lmsStatusUpdate(displayLMS);
  }
});

// reconnect feature
client.on("disconnected", function () {
    console.log("Disconnected!");
    //process.exit(1); //exit node.js with an error

    setTimeout(function () {
        client.login(AuthDetails.token);
    }, 5000);
});

// all ready. login!
client.login(AuthDetails.token);