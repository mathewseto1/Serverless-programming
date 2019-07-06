module.exports = async function (context, myTimer) {
//The serverless application sends weather forecast in Auckland every 20 minutes using the OpenWeatherMap API.

    const accountSid = "AC9bafeed3c3742e79eb6d4558d65b635c";
    const authToken = "c8039dcaaa51d0e486b264dd51b25418";

    const client = require('twilio')(accountSid, authToken);

    const https = require('http');
f();


async function get_result() {

    return new Promise((resolve, reject) => {
      https.get('http://api.openweathermap.org/data/2.5/weather?q=Auckland&appid=0feedae1263ba3f2705af9f058fb34ab', (resp) => {
        let data = '';
        var json_to_string = "";
        resp.on('data', (chunk) => {
          data += chunk;
        });
  
        resp.on('end', () => {
          json_to_string = JSON.parse(data)
          final_value = json_to_string.weather[0].description
          resolve(final_value);
        });
  
      }).on("error", (err) => {
        reject("Error: " + err.message);
      })
    })
  }

async function f() {
  var x = await get_result()
  return x;
}
var y;
f().then((v) => {
  y = v;

    var timeStamp = new Date().toISOString();
    
    if (myTimer.IsPastDue)
    {
        context.log('JavaScript is running late!');
    }

    client.messages.create({
        to:"+64210754991",
        from:"+12548701164",
        body:"The weather Forecast currently in Auckland: " + y
    }) 

});


};

