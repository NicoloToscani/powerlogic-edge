
'use strict';

const readline = require('readline')
const Modbus = require('jsmodbus')
const os = require('os');

var PIPE_PATH = "";

console.log('Start Powerlogic');

if(os.platform == 'win32'){
    console.log('win32');
    PIPE_PATH = "\\\\.\\pipe\\HmiRuntime";
   // PIPE_PATH = "\\.\pipe\HmiRuntime";
    console.log(PIPE_PATH);
}

else {
    //console.log(os.tmpdir() + '/HmiRuntime');
    //PIPE_PATH = os.tmpdir() + '/HmiRuntime';
    PIPE_PATH = "/tempcontainer/HmiRuntime";
    console.log(PIPE_PATH);
}


var net = require('net');

//const PIPE_PATH = "\\\\.\\pipe\\HmiRuntime";

var Enable = false;  // Enable reading
var Ip_Address;      // Device IPv4
var Port;            // Device Modbus port
var Unit_Id;         // Modbus unit id

// Socket
const socket = new net.Socket()

// Client Modbus
let clientModbus;

/*
const options = {
    'host': '192.168.100.3',
    'port': '502'
  }

socket.connect(options)

*/

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
   // var In = 0;
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

    try{
    // If reading process is enable
    if(Enable == true){

        

        // socket.on('connect', function () {  Check connection
    
        // Current
         // Start register -1
         // Word count
         clientModbus.readHoldingRegisters(2999, 12).then(function (resp) {
            I1 = resp.response.body.valuesAsBuffer.readFloatBE(0);  // I1
            I2 = resp.response.body.valuesAsBuffer.readFloatBE(4);  // I2
            I3 = resp.response.body.valuesAsBuffer.readFloatBE(8);  // I3
            //In = resp.response.body.valuesAsBuffer.readFloatBE(12);  // In
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
         

    var query = '{"Message":"WriteTag","Params":{"Tags":[{"Name":"I1","Value":"' + I1 + '"},{"Name":"I2","Value":"' + I2 + '"},{"Name":"I3","Value":"' + I3 + '"}, {"Name":"I_Avg","Value":"' + I_Avg + '"},{"Name":"L1_L2","Value":"' + L1_L2 + '"},{"Name":"L2_L3","Value":"' + L2_L3 + '"},{"Name":"L3_L1","Value":"' + L3_L1 + '"},{"Name":"LL_Avg","Value":"' + LL_Avg + '"},{"Name":"L1_N","Value":"' + L1_N + '"},{"Name":"L2_N","Value":"' + L2_N + '"},{"Name":"L3_N","Value":"' + L3_N + '"},{"Name":"LN_Avg","Value":"' + LN_Avg + '"},{"Name":"Active_Power_Ph1","Value":"' + Active_Power_Ph1 + '"},{"Name":"Active_Power_Ph2","Value":"' + Active_Power_Ph2 + '"},{"Name":"Active_Power_Ph3","Value":"' + Active_Power_Ph3 + '"},{"Name":"Active_Power_Tot","Value":"' + Active_Power_Tot + '"},{"Name":"Power_Factor","Value":"' + Power_Factor + '"},{"Name":"Frequency","Value":"' + Frequency + '"},{"Name":"Total_Active_Energy_Imported","Value":"' + Total_Active_Energy_Imported + '"}]},"ClientCookie":"CookieReadTags123"}\n'
     

    var tagWriteCommand = query;
    client.write(tagWriteCommand);

    }
    

    }catch(error){

        console.error

    }
}



let client = net.connect(PIPE_PATH, function() {
    console.log('Client: on connection');

    // Subscription tag
    var Subscribecommand = `{"Message":"SubscribeTag","Params":{"Tags":["Enable", "Ip_Address", "Port_Number", "Unit_Id"]},"ClientCookie":"mySubscription1"}\n`;
    client.write(Subscribecommand);

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
        if (obj.Message == 'NotifySubscribeTag') {
            printOnSuccess(obj.Params.Tags)

            // Enable = obj.Params.Tags[0].Value;
            console.log(obj.Params.Tags[0].Value)
            if(obj.Params.Tags[0].Value == 'TRUE'){
                Enable = true;

                // Check values from HMI
                console.log('IPv4: ' + Ip_Address)
                console.log('Port: ' + Port)
                console.log('Unit ID: ' + Unit_Id)
            }
            else if(obj.Params.Tags[0].Value == "FALSE"){
                Enable = false;
            }
            // console.log('Valore ENABLE: ' + obj.Params.Tags[0].Value )
            Ip_Address = obj.Params.Tags[1].Value;
            // console.log('Valore IP: ' + obj.Params.Tags[1].Value )
            Port = obj.Params.Tags[2].Value;
            // console.log('Valore PORT: ' + obj.Params.Tags[2].Value )
            Unit_Id = obj.Params.Tags[3].Value;
            // console.log('Valore UNIT ID: ' + obj.Params.Tags[3].Value )

            if(Enable == true){
                // Socket connection parameters from HMI
                const options = {
                    'host': Ip_Address,
                    'port': Port
               }
               // Socket connection
               socket.connect(options)

               // Modbus client
               clientModbus = new Modbus.client.TCP(socket, Unit_Id);
            }

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