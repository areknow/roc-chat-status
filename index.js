require('dotenv').config();
var request = require("request");

//turn off
ufoOff()

//show loading anim
ufoLoading()

//turn off again after 3 seconds
setTimeout(function() {
  ufoOff()
},3000)

//build request for snap
var options = { 
  method: 'GET',
  url: `https://www.snapengage.com/api/v1/chat/${process.env.SNAP_WIDGET}`,
  headers: { 'x-api-key': process.env.SNAP_KEY },
  json: true
};

//get live data
setInterval(function() {
  request(options, function (error, response, body) {
    if (body.online == "true") {
      console.log('chat available')
      ufoGreen()
    } else {
      console.log('chat unavailable')
      ufoRed()
    }
  });
},60000)




//make the rest call to the UFO
function ufoREST(param) {
  request(`http://${process.env.UFO_IP}/api?${param}`, function (error, response, body) {
    if(error) console.log(error)
  });
}





//color and animation functions
function ufoOff() {
  ufoREST('top_init=0&top_bg=000000&bottom_init=0&bottom_bg=000000')
}
function ufoLoading() {
  ufoREST('top_init=1&top=0|1|FFC000|1|3|FF0000|4|1|FFC000&top_bg=00A00a&top_whirl=220')
  ufoREST('bottom_init=1&bottom=0|15|FF0000&bottom_bg=0000FF&bottom_morph=500|6')
}
function ufoGreen() {
  ufoREST('bottom_init=1&bottom=0|15|00ff00&bottom_bg=004e00&bottom_morph=1|1')
  ufoREST('top_init=1&top=0|15|00ff00&top_bg=004e00&top_morph=1|1')
}
function ufoRed() {
  ufoREST('top_init=1&top=0|6|ff0000&top_bg=000000&top_whirl=220')
  ufoREST('bottom_init=1&bottom=6|9|ff0000&bottom_bg=000000&bottom_whirl=220')
}












// request('http://192.168.220.137/api?top_bg=00ff00&bottom_bg=00ff00', function (error, response, body) {});//simple green
// request('http://192.168.220.137/api?top_bg=ff0000&bottom_bg=ff0000', function (error, response, body) {});//simple red