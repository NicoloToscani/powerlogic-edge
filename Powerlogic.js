'use strict';


const readline = require('readline');
const Modbus = require('jsmodbus')

console.log('Start Powerlogic');

var net = require('net');

const PIPE_PATH = "\\\\.\\pipe\\HmiRuntime";

// Modbus client
var unitId = 1;
const socket = new net.Socket()
const options = {
    'host': '192.168.100.3',
    'port': '502'
  }

socket.connect(options)

const clientModbus = new Modbus.client.TCP(socket, unitId)
/*
socket.on('connect', function () {

    // make some calls
    
    clientModbus.readCoils(0, 13).then(function (resp) {
    
    // resp will look like { response : [TCP|RTU]Response, request: [TCP|RTU]Request }
    // the data will be located in resp.response.body.coils: <Array>, resp.response.body.payload: <Buffer>
    
    console.log(resp);
    
    }, console.error);
    
    });

    */

    // Current
    var I1 = 0;
    var I2 = 0;
    var I3 = 0;
    var In = 0;
    var I_Avg = 0;

    // Voltage
    var L1_L2 = 0;
    var L2_L3 = 0;
    var L3_L1 = 0;
    var LL_Avg = 0;
    var L1_N = 0;
    var L2_N = 0;
    var L3_N = 0;
    var LN_Avg = 0;

    // Active power
    var Active_Power_Ph1 = 0;
    var Active_Power_Ph2 = 0;
    var Active_Power_Ph3 = 0;
    var Active_Power_Tot = 0;

    // Power factor
    var Power_Factor = 0;

    // Frequency
    var Frequency = 0;

    // Total active energy import
    var Total_Active_Energy_Imported = 0;

    

function Write() {

        // socket.on('connect', function () {  Check connection
    
        // Current
         // Start register -1
         // Word count
         clientModbus.readHoldingRegisters(2999, 12).then(function (resp) {
            I1 = resp.response.body.valuesAsBuffer.readFloatBE(0);  // I1
            I2 = resp.response.body.valuesAsBuffer.readFloatBE(4);  // I2
            I3 = resp.response.body.valuesAsBuffer.readFloatBE(8);  // I3
            In = resp.response.body.valuesAsBuffer.readFloatBE(12);  // In
            I_Avg = resp.response.body.valuesAsBuffer.readFloatBE(20);  // I_Avg
            
            console.log()
        }, console.error);


         // Voltage
         // Start register -1
         // Word count
         clientModbus.readHoldingRegisters(3019, 18).then(function (resp) {
            
            // Offfset sui byte non sulle word
            L1_L2 = resp.response.body.valuesAsBuffer.readFloatBE(0);  // L1-L2
            L2_L3 = resp.response.body.valuesAsBuffer.readFloatBE(4);  // L2-L3
            L3_L1 = resp.response.body.valuesAsBuffer.readFloatBE(8);  // L3-L1
            LL_Avg = resp.response.body.valuesAsBuffer.readFloatBE(12); // L-L Avg
            L1_N = resp.response.body.valuesAsBuffer.readFloatBE(16);  // L1-N
            L2_N = resp.response.body.valuesAsBuffer.readFloatBE(20);  // L2-N
            L3_N = resp.response.body.valuesAsBuffer.readFloatBE(24);  // L3-N
            LN_Avg = resp.response.body.valuesAsBuffer.readFloatBE(32);  // LN_Avg
            
            
            console.log()
        }, console.error);

         // Active power
         // Start register -1
         // Word count
         clientModbus.readHoldingRegisters(3053, 8).then(function (resp) {
            
            // Offfset sui byte non sulle word
            Active_Power_Ph1 = resp.response.body.valuesAsBuffer.readFloatBE(0);  // Active_Power_Ph1
            Active_Power_Ph2 = resp.response.body.valuesAsBuffer.readFloatBE(4);  // Active_Power_Ph2
            Active_Power_Ph3 = resp.response.body.valuesAsBuffer.readFloatBE(8);  // Active_Power_Ph3
            Active_Power_Tot = resp.response.body.valuesAsBuffer.readFloatBE(12);  // Active_Power_Tot

            console.log()
        }, console.error);

        // Power factor
         // Start register -1
         // Word count
         clientModbus.readHoldingRegisters(3083, 2).then(function (resp) {
        
            Power_Factor = resp.response.body.valuesAsBuffer.readFloatBE(0);  // Power_Factor
            
            console.log()
        }, console.error);

         // Frequency
         // Start register -1
         // Word count
         clientModbus.readHoldingRegisters(3109, 2).then(function (resp) {
        
            Frequency = resp.response.body.valuesAsBuffer.readFloatBE(0);  // Frequency
            
            console.log()
        }, console.error);

        // Frequency
         // Start register -1
         // Word count
         clientModbus.readHoldingRegisters(3109, 2).then(function (resp) {
        
            Frequency = resp.response.body.valuesAsBuffer.readFloatBE(0);  // Frequency
            
            console.log()
        }, console.error);

        // Total active energy import
         // Start register -1
         // Word count
         clientModbus.readHoldingRegisters(3203, 4).then(function (resp) {
        
            Total_Active_Energy_Imported = resp.response.body.valuesAsBuffer.readDoubleBE(0);
            console.log(Total_Active_Energy_Imported);
            console.log()
        }, console.error);
         
         

    // Esempio query
    // var c = `{"Message":"WriteTag","Params":{"Tags":[{"Name":"Tag_0","Value":"50"},{"Name":"Tag_1","Value":"40"}]},"ClientCookie":"CookieReadTags123"}\n`;

     var query = '{"Message":"WriteTag","Params":{"Tags":[{"Name":"I1","Value":"' + I1 + '"},{"Name":"I2","Value":"' + I2 + '"},{"Name":"I3","Value":"' + I3 + '"},{"Name":"In","Value":"' + In + '"}, {"Name":"I_Avg","Value":"' + I_Avg + '"},{"Name":"L1_L2","Value":"' + L1_L2 + '"},{"Name":"L2_L3","Value":"' + L2_L3 + '"},{"Name":"L3_L1","Value":"' + L3_L1 + '"},{"Name":"LL_Avg","Value":"' + LL_Avg + '"},{"Name":"L1_N","Value":"' + L1_N + '"},{"Name":"L2_N","Value":"' + L2_N + '"},{"Name":"L3_N","Value":"' + L3_N + '"},{"Name":"LN_Avg","Value":"' + LN_Avg + '"}]},"ClientCookie":"CookieReadTags123"}\n'
     

    var tagWriteCommand = query;
    client.write(tagWriteCommand);
    console.log('Start reading');
}

let client = net.connect(PIPE_PATH, function() {
    console.log('Client: on connection');

    // Scheduling write on HMI
    setInterval(function(){
        Write();
    }, 5000);
    
    const rl = readline.createInterface({
        input: client,
        crlfDelay: Infinity
    });

    // Get response from HMI
    rl.on('line', (line) => {
        let obj = JSON.parse(line);
        // On success
        if (obj.Message == 'NotifyWriteTag') {
            printOnSuccess(obj.Params.Tags)
        }
        // On error
        if (obj.Message == 'ErrorWriteTag') {
            printError(obj)
        }
    });   
});

    client.on('end', function() {
    console.log('on end');
});


function printError(data) {
    let message = data.Message;
    let errorCode = data.ErrorCode;
    let errorDescription = data.ErrorDescription;
    let clientCookie = data.ClientCookie;
    console.log("\nMessage:" + message + "\nClientCookie: " + clientCookie + "\n Error: " + errorCode + "\n Description: " + errorDescription);
}

function printOnSuccess(data) {
    for (var i = 0; i < data.length; i++) {
        let name = data[i].Name;
        let errorCode = data[i].ErrorCode;
        let errorDescription = data[i].ErrorDescription;
        console.log("\name: " + name + "\n Error: " + errorCode + "\n Description: " + errorDescription);
    }
}