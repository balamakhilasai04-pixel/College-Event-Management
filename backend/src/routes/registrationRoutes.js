const express =
require("express");

const router =
express.Router();

const {

registerEvent,
getMyRegistrations

}
=
require(
"../controllers/registrationController"
);


// Register Event
router.post(
"/register",
registerEvent
);


// Get My Registrations
router.get(
"/my/:email",
getMyRegistrations
);

module.exports =
router;