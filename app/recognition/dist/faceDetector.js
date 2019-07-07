"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// import '@tensorflow/tfjs-node';
var faceapi = require("face-api.js");
var canvas = require("canvas");
var downloader = require("image-downloader");
var FaceDetector = /** @class */ (function () {
    function FaceDetector() {
        this.ready = false;
    }
    FaceDetector.prototype.detect = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.ready) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.waitToBeReady()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.loadImageAndDetectFace(url)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result !== undefined];
                }
            });
        });
    };
    FaceDetector.prototype.waitToBeReady = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, Canvas, Image, ImageData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = canvas, Canvas = _a.Canvas, Image = _a.Image, ImageData = _a.ImageData;
                        faceapi.env.monkeyPatch({ Canvas: Canvas, Image: Image, ImageData: ImageData });
                        return [4 /*yield*/, faceapi.nets.tinyFaceDetector.loadFromDisk('./models')];
                    case 1:
                        _b.sent();
                        this.ready = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    FaceDetector.prototype.loadImageAndDetectFace = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filename, image, loadedImage, detectorOptions, results;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, downloader.image({
                            url: url,
                            dest: '/var/images'
                        })];
                    case 1:
                        _a = _b.sent(), filename = _a.filename, image = _a.image;
                        return [4 /*yield*/, canvas.loadImage(filename)];
                    case 2:
                        loadedImage = _b.sent();
                        detectorOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: 1024 });
                        return [4 /*yield*/, faceapi.detectSingleFace(loadedImage, detectorOptions)];
                    case 3:
                        results = _b.sent();
                        return [2 /*return*/, results];
                }
            });
        });
    };
    return FaceDetector;
}());
exports.FaceDetector = FaceDetector;
//# sourceMappingURL=faceDetector.js.map