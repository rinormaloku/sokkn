import { FaceDetector } from "./faceDetector";
import * as express from "express";
import { emitVerificationSuccess, emitVerificationFailure } from "./eventService";
import '@tensorflow/tfjs-node';
import * as Unmarshaller from "cloudevents-sdk/http/unmarshaller/v02"
import * as util from "util";

const app = express();
const port = 8080;
const faceDetector = new FaceDetector();
const unmarshaller = new Unmarshaller(); 

app.use((req, res, next) => {
    let data='';
    
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
       data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        next();
    });
});

app.post("/", async (req, res) => {

    const cloudevent = await unmarshaller.unmarshall(req.body, req.headers)

    console.log(util.inspect(cloudevent, { showHidden: true, depth: null }));

    const data = JSON.parse(cloudevent.spec.payload.data);

    res.send('Verification Started');

    const result = await faceDetector.detect(data.url);

    if (result)
        emitVerificationSuccess(data.title, data.url);
    else
        emitVerificationFailure(data.title, data.url);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});