// import '@tensorflow/tfjs-node';
import * as faceapi from 'face-api.js';
import * as canvas from 'canvas';
import * as downloader from "image-downloader";

export class FaceDetector { 

    ready : boolean = false;
    
    async detect(url: string): Promise<boolean> {
        if(!this.ready) {
            await this.waitToBeReady();
        }
        const result = await this.loadImageAndDetectFace(url);

        return result !== undefined;
    }

    async waitToBeReady() {
        const { Canvas, Image, ImageData } = <any>canvas;
        faceapi.env.monkeyPatch({ Canvas , Image, ImageData });
        await faceapi.nets.tinyFaceDetector.loadFromDisk('./models');
        this.ready = true;
    }

    private async loadImageAndDetectFace(url: string) {
        const { filename, image } = await downloader.image( {
            url: url,
            dest: '/var/images' 
        })
        const loadedImage = await canvas.loadImage(filename);
        const detectorOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: 1024 });
        const results = await faceapi.detectSingleFace(loadedImage as any, detectorOptions);
        return results;
    }
}