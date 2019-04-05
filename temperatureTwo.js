var five = require('johnny-five');
var board = new five.Board();
var axios = require("axios");

board.on('ready', function () {
    console.log("working")
    var temperature = new five.Thermometer({
        controller: "Analog",
        pin: "A0", //Plug signal cable into this pin
        freq: 1000 //Change this figure to increase,decrease frequency of value being checked
    
        
    });

    temperature.on("change", function () {
        axios.post('https://lit-tor-28006.herokuapp.com/addData',{
            date : new Date ().toLocaleDateString(),
            time : new Date ().toLocaleTimeString(),
            temperature : this.celsius / 10 + " °C"
            
        })
    })
    console.log("added")
});
