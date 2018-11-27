const functions = require("firebase-functions");
const {WebhookClient} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
const serviceAccount = require('./chatbot-e90dd-firebase-adminsdk-y4r0g-5381b4d375');
const vindec = require('vindec');
process.env.DEBUG = 'dialogflow:*';
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://chatbot-e90dd.firebaseio.com'
});
const db = admin.database();
const ref = db.ref();
const refUser = ref.child('users');
const refVehicle = ref.child('vehicles');

if(vindec.validate('2C3CCAPT1KH556394')) {
    let vehData = vindec.decode('2C3CCAPT1KH556394');
    console.log(pushToDb('jhsmith', vehData));
} else{
    console.log('Not a valid VIN!');
}
function pushToDb(user, data){
    let newRefVehicle = refVehicle.push();
    newRefVehicle.set(data);
    writeToDb(user, {vehicle: newRefVehicle.key});
}

function writeToDb(user, data){
    refUser.child(user).update(data);
}

/*
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({request, response});

    function addVehicle(agent){
        if(vindec.validate(agent.getParameter('number-sequence'))) {
            let vehData = vindec.decode(agent.getParameter('number-sequence'));
            console.log(db.writeToDb('jhsmith', {vehicle: vehData}));
        } else{
            agent.add('Not a valid VIN!');
        }
    }

    let intentMap = new Map();
    intentMap.set('Add Vehicle', addVehicle);
    console.log(agent.handleRequest(intentMap));
});
*/