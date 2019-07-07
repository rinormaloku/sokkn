import * as CloudEvent from 'cloudevents-sdk';
import {Verification} from "./enums";
import * as util from "util";


export function emitVerificationSuccess(image: string, url: string) {
    emitEvent(image, url, Verification.SUCCESS);
}

export function emitVerificationFailure(image: string, url: string) {
    emitEvent(image, url, Verification.FAILURE);
}

function emitEvent(image: string, url: string, status: string) {
    console.log(`${status} of recognizing faces in image '${image}'`);

    const cloudevent = new CloudEvent(CloudEvent.specs["0.2"]);
    cloudevent
        .type(`image.verification.${status}`)
        .source("urn:recog.dev:recog")
        .contenttype("application/json")
        .time(new Date())
        .schemaurl("https://raw.githubusercontent.com/cloudevents/spec/v0.2/spec.json")
        .data({
            imageTitle: image,
            imageUrl: url,
            status: status
        })

    const config = {
        method: "POST",
        url: process.env.BROKER_URL
    };
    
    const binding = new CloudEvent.bindings["http-binary0.2"](config);
    binding.emit(cloudevent)
        .then(response => {
            // Treat the response
            console.log("Successful emitting of event: $$$\n" + response.data);
        }).catch(err => {
            // Treat the error
            console.log(util.inspect(err, { showHidden: true, depth: 3 }));
            console.error("Failure during emitting of event: $$$\n" + err);
        });
}
