"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CloudEvent = require("cloudevents-sdk");
var enums_1 = require("./enums");
function emitVerificationSuccess(image) {
    emitEvent(image, enums_1.Verification.SUCCESS);
}
exports.emitVerificationSuccess = emitVerificationSuccess;
function emitVerificationFailure(image) {
    emitEvent(image, enums_1.Verification.FAILURE);
}
exports.emitVerificationFailure = emitVerificationFailure;
function emitEvent(image, status) {
    var cloudevent = new CloudEvent(CloudEvent.specs["0.2"])
        .type("image.verification." + status)
        .source("urn:event:from:myapi/resourse/123"); //ToDo
    var config = {
        method: "POST",
        url: process.env.BROKER_URL,
        data: {
            imageTitle: image,
            status: status
        }
    };
    var binding = new CloudEvent.bindings["http-structured0.2"](config);
    binding.emit(cloudevent)
        .then(function (response) {
        // Treat the response
        console.log("Successful emitting of event: $$$\n" + response.data);
    }).catch(function (err) {
        // Treat the error
        console.error("Failure during emitting of event: $$$\n" + err);
    });
}
//# sourceMappingURL=eventService.js.map