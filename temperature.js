const five = require('johnny-five');
const board = new five.Board();
const axios = require("axios");
let temperature;
var temp = new Temp();

board.on('ready', function () {
    photoResistor = new five.Sensor({
        pin: "A2",
        freq: 5000
    });

    board.repl.inject({
        pot: temperature
    });

    temperature.on("data", function () {
        var state = "open";
        var sensorValue = this.value;
        if (sensorValue > 600) {
            axios.post('https://thawing-beyond-54587.herokuapp.com/addData', {
                state: 'off',
                temperature: new Temp().toLocaleTimeString(),
                date: new Temp().toLocaleDateString()
            })
                .then((res) => {
                    console.log('The temperature is ' + new Temp().toLocaleTimeString())
                })

        } else {
            axios.post('https://thawing-beyond-54587.herokuapp.com/addData', {
                state: 'on',
                time: new Date().toLocaleTimeString(),
                temp: new Temp().toLocaleDateString()
            })
                .then((res) => {
                    console.log('Light is on at ' + new Date().toLocaleTimeString())
                })
        }
    });

});
