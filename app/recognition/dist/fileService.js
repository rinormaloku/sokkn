"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
function findImagePath(name) {
    console.log("Image Name @ " + name);
    var imagePath = path.resolve(process.env.IMAGES_DIRECTORY, name);
    console.log("Image Path @ " + imagePath);
    if (fs.existsSync(imagePath))
        return imagePath;
    return null;
}
exports.findImagePath = findImagePath;
//# sourceMappingURL=fileService.js.map