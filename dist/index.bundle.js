(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["testpackage"] = factory();
	else
		root["TEST"] = factory();
})((typeof self!='undefined'?self:this), function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/@alt1/base/dist/alt1api.js":
/*!**************************************************!*\
  !*** ../node_modules/@alt1/base/dist/alt1api.js ***!
  \**************************************************/
/***/ (() => {

"use strict";



/***/ }),

/***/ "../node_modules/@alt1/base/dist/declarations.js":
/*!*******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/declarations.js ***!
  \*******************************************************/
/***/ (() => {

"use strict";



/***/ }),

/***/ "../node_modules/@alt1/base/dist/imagedata-extensions.js":
/*!***************************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imagedata-extensions.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageData": () => (/* binding */ ImageData)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");


//export this so node.js can also use it
var ImageData;
// //TODO revamp this madness a bit?
// (function () {
// 	var globalvar = (typeof self != "undefined" ? self : (typeof (global as any) != "undefined" ? (global as any) : null)) as any;
// 	//use the node-canvas version when on node
// 	if (typeof globalvar.ImageData == "undefined") {
// 		let nodecnv = requireNodeCanvas();
// 		globalvar.ImageData = nodecnv.ImageData;
// 	}
// 	var fill = typeof globalvar.ImageData == "undefined";
// 	//should never be reach anymore
// 	var constr = function (this: any) {
// 		var i = 0;
// 		var data = (arguments[i] instanceof Uint8ClampedArray ? arguments[i++] : null);
// 		var width = arguments[i++];
// 		var height = arguments[i++];
// 		if (fill) {
// 			if (!data) { data = new Uint8ClampedArray(width * height * 4); }
// 			this.width = width;
// 			this.height = height;
// 			this.data = data;
// 		}
// 		else if (oldconstr) {
// 			return (data ? new oldconstr(data, width, height) : new oldconstr(width, height));
// 		} else {
// 			var canvas = document.createElement('canvas');
// 			canvas.width = width;
// 			canvas.height = height;
// 			var ctx = canvas.getContext("2d")!;
// 			var imageData = ctx.createImageData(width, height);
// 			if (data) { imageData.data.set(data); }
// 			return imageData;
// 		}
// 	}
// 	var oldconstr = globalvar.ImageData;
// 	if (typeof document != "undefined") {
// 		try {
// 			new oldconstr(1, 1);
// 		} catch (e) {
// 			//direct constructor call not allowed in ie
// 			oldconstr = null;
// 		}
// 	}
// 	if (!fill) { constr.prototype = globalvar.ImageData.prototype; }
// 	globalvar.ImageData = constr;
// 	ImageData = constr as any;
// })();
(function () {
    var globalvar = (typeof self != "undefined" ? self : (typeof global != "undefined" ? global : null));
    var filltype = typeof globalvar.ImageData == "undefined" || typeof globalvar.document == "undefined";
    var fillconstr = filltype;
    if (!filltype) {
        var oldconstr = globalvar.ImageData;
        try {
            let data = new Uint8ClampedArray(4);
            data[0] = 1;
            let a = new globalvar.ImageData(data, 1, 1);
            fillconstr = a.data[0] != 1;
        }
        catch (e) {
            fillconstr = true;
        }
    }
    if (fillconstr) {
        var constr = function ImageDataShim() {
            var i = 0;
            var data = (arguments[i] instanceof Uint8ClampedArray ? arguments[i++] : null);
            var width = arguments[i++];
            var height = arguments[i++];
            if (filltype) {
                if (!data) {
                    data = new Uint8ClampedArray(width * height * 4);
                }
                this.width = width;
                this.height = height;
                this.data = data;
            }
            else if (fillconstr) {
                //WARNING This branch of code does not use the same pixel data backing store
                //(problem with wasm, however all wasm browser have a native constructor (unless asm.js is used))
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                var imageData = ctx.createImageData(width, height);
                if (data) {
                    imageData.data.set(data);
                }
                return imageData;
            }
            // else {
            // 	//oh no...
            // 	//we need this monstrocity in order to call the native constructor with variable number of args
            // 	//when es5 transpile is enable (that strips the spread operator)
            // 	return new (Function.prototype.bind.apply(oldconstr, [null,...arguments]));
            // }
        };
        if (!filltype) {
            constr.prototype = globalvar.ImageData.prototype;
        }
        globalvar.ImageData = constr;
        ImageData = constr;
    }
    else {
        ImageData = globalvar.ImageData;
    }
})();
//Recast into a drawable imagedata class on all platforms, into a normal browser ImageData on browsers or a node-canvas imagedata on nodejs
ImageData.prototype.toDrawableData = function () {
    if (typeof document == "undefined") {
        return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.imageDataToDrawable(this);
    }
    else {
        return this;
    }
};
ImageData.prototype.putImageData = function (buf, cx, cy) {
    for (var dx = 0; dx < buf.width; dx++) {
        for (var dy = 0; dy < buf.height; dy++) {
            var i1 = (dx + cx) * 4 + (dy + cy) * 4 * this.width;
            var i2 = dx * 4 + dy * 4 * buf.width;
            this.data[i1] = buf.data[i2];
            this.data[i1 + 1] = buf.data[i2 + 1];
            this.data[i1 + 2] = buf.data[i2 + 2];
            this.data[i1 + 3] = buf.data[i2 + 3];
        }
    }
};
ImageData.prototype.pixelOffset = function (x, y) {
    return x * 4 + y * this.width * 4;
};
//creates a hash of a portion of the buffer used to check for changes
ImageData.prototype.getPixelHash = function (rect) {
    if (!rect) {
        rect = new _index_js__WEBPACK_IMPORTED_MODULE_0__.Rect(0, 0, this.width, this.height);
    }
    var hash = 0;
    for (var x = rect.x; x < rect.x + rect.width; x++) {
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            var i = x * 4 + y * 4 * this.width;
            hash = (((hash << 5) - hash) + this.data[i]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 1]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 2]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 3]) | 0;
        }
    }
    return hash;
};
ImageData.prototype.clone = function (rect) {
    return this.toImage(rect).getContext("2d").getImageData(0, 0, rect.width, rect.height);
};
ImageData.prototype.show = function (x = 5, y = 5, zoom = 1) {
    if (typeof document == "undefined") {
        console.error("need a document to show an imagedata object");
        return;
    }
    var imgs = document.getElementsByClassName("debugimage");
    while (imgs.length > ImageData.prototype.show.maxImages) {
        imgs[0].remove();
    }
    var el = this.toImage();
    el.classList.add("debugimage");
    el.style.position = "absolute";
    el.style.zIndex = "1000";
    el.style.left = x / zoom + "px";
    el.style.top = y / zoom + "px";
    el.style.background = "purple";
    el.style.cursor = "pointer";
    el.style.imageRendering = "pixelated";
    el.style.outline = "1px solid #0f0";
    el.style.width = (this.width == 1 ? 100 : this.width) * zoom + "px";
    el.style.height = (this.height == 1 ? 100 : this.height) * zoom + "px";
    el.onclick = function () { el.remove(); };
    document.body.appendChild(el);
    return el;
};
ImageData.prototype.show.maxImages = 10;
ImageData.prototype.toImage = function (rect) {
    if (!rect) {
        rect = new _index_js__WEBPACK_IMPORTED_MODULE_0__.Rect(0, 0, this.width, this.height);
    }
    if (typeof document != "undefined") {
        var el = document.createElement("canvas");
        el.width = rect.width;
        el.height = rect.height;
    }
    else {
        el = _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.createCanvas(rect.width, rect.height);
    }
    var ctx = el.getContext("2d");
    ctx.putImageData(this.toDrawableData(), -rect.x, -rect.y);
    return el;
};
ImageData.prototype.getPixel = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return [this.data[i], this.data[i + 1], this.data[i + 2], this.data[i + 3]];
};
ImageData.prototype.getPixelValueSum = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return this.data[i] + this.data[i + 1] + this.data[i + 2];
};
ImageData.prototype.getPixelInt = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return (this.data[i + 3] << 24) + (this.data[i + 0] << 16) + (this.data[i + 1] << 8) + (this.data[i + 2] << 0);
};
ImageData.prototype.getColorDifference = function (x, y, r, g, b, a = 255) {
    var i = x * 4 + y * 4 * this.width;
    return Math.abs(this.data[i] - r) + Math.abs(this.data[i + 1] - g) + Math.abs(this.data[i + 2] - b) * a / 255;
};
ImageData.prototype.setPixel = function (x, y, ...color) {
    var r, g, b, a;
    var [r, g, b, a] = (Array.isArray(color[0]) ? color[0] : color);
    var i = x * 4 + y * 4 * this.width;
    this.data[i] = r;
    this.data[i + 1] = g;
    this.data[i + 2] = b;
    this.data[i + 3] = a == undefined ? 255 : a;
};
ImageData.prototype.setPixelInt = function (x, y, color) {
    var i = x * 4 + y * 4 * this.width;
    this.data[i] = (color >> 24) & 0xff;
    this.data[i + 1] = (color >> 16) & 0xff;
    this.data[i + 2] = (color >> 8) & 0xff;
    this.data[i + 3] = (color >> 0) & 0xff;
};
ImageData.prototype.toFileBytes = function (format, quality) {
    if (typeof HTMLCanvasElement != "undefined") {
        return new Promise(d => this.toImage().toBlob(b => {
            var r = new FileReader();
            r.readAsArrayBuffer(b);
            r.onload = () => d(new Uint8Array(r.result));
        }, format, quality));
    }
    else {
        return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.imageDataToFileBytes(this, format, quality);
    }
};
ImageData.prototype.toPngBase64 = function () {
    if (typeof HTMLCanvasElement != "undefined") {
        var str = this.toImage().toDataURL("image/png");
        return str.slice(str.indexOf(",") + 1);
    }
    else {
        throw new Error("synchronous image conversion not supported in nodejs, try using ImageData.prototype.toFileBytes");
    }
};
ImageData.prototype.pixelCompare = function (buf, x = 0, y = 0, max) {
    return _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.simpleCompare(this, buf, x, y, max);
};
ImageData.prototype.copyTo = function (target, sourcex, sourcey, width, height, targetx, targety) {
    //convince v8 that these are 31bit uints
    const targetwidth = target.width | 0;
    const thiswidth = this.width | 0;
    const copywidth = width | 0;
    const fastwidth = Math.floor(width / 4) * 4;
    const thisdata = new Int32Array(this.data.buffer, this.data.byteOffset, this.data.byteLength / 4);
    const targetdata = new Int32Array(target.data.buffer, target.data.byteOffset, target.data.byteLength / 4);
    for (let cy = 0; cy < height; cy++) {
        let cx = 0;
        let it = (cx + targetx) + (cy + targety) * targetwidth;
        let is = (cx + sourcex) + (cy + sourcey) * thiswidth;
        //copy 4 pixels per iter (xmm)
        for (; cx < fastwidth; cx += 4) {
            targetdata[it] = thisdata[is];
            targetdata[it + 1] = thisdata[is + 1];
            targetdata[it + 2] = thisdata[is + 2];
            targetdata[it + 3] = thisdata[is + 3];
            it += 4;
            is += 4;
        }
        //copy remainder per pixel
        for (; cx < copywidth; cx++) {
            targetdata[it] = thisdata[is];
            it += 1;
            is += 1;
        }
    }
};
if (typeof HTMLImageElement != "undefined") {
    HTMLImageElement.prototype.toBuffer = function (x = 0, y = 0, w = this.width, h = this.height) {
        var cnv = document.createElement("canvas");
        cnv.width = w;
        cnv.height = h;
        var ctx = cnv.getContext("2d");
        ctx.drawImage(this, -x, -y);
        return ctx.getImageData(0, 0, w, h);
    };
    HTMLImageElement.prototype.toCanvas = function (x = 0, y = 0, w = this.width, h = this.height) {
        var cnv = document.createElement("canvas");
        cnv.width = w;
        cnv.height = h;
        var ctx = cnv.getContext("2d");
        ctx.drawImage(this, -x, -y);
        return cnv;
    };
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/imagedetect.js":
/*!******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imagedetect.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageDataSet": () => (/* binding */ ImageDataSet),
/* harmony export */   "asyncMap": () => (/* binding */ asyncMap),
/* harmony export */   "clearPngColorspace": () => (/* binding */ clearPngColorspace),
/* harmony export */   "coldif": () => (/* binding */ coldif),
/* harmony export */   "findSubbuffer": () => (/* binding */ findSubbuffer),
/* harmony export */   "findSubimage": () => (/* binding */ findSubimage),
/* harmony export */   "imageDataFromBase64": () => (/* binding */ imageDataFromBase64),
/* harmony export */   "imageDataFromFileBuffer": () => (/* binding */ imageDataFromFileBuffer),
/* harmony export */   "imageDataFromUrl": () => (/* binding */ imageDataFromUrl),
/* harmony export */   "isPngBuffer": () => (/* binding */ isPngBuffer),
/* harmony export */   "simpleCompare": () => (/* binding */ simpleCompare),
/* harmony export */   "webpackImages": () => (/* binding */ webpackImages)
/* harmony export */ });
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _wrapper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wrapper.js */ "../node_modules/@alt1/base/dist/wrapper.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
* Downloads an image and returns the ImageData
* Make sure the png image does not have a sRGB chunk or the resulting pixels will differ for different users!!!
* @param url http(s) or data url to the image
*/
function imageDataFromUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof Image != "undefined") {
            var img = new Image();
            img.crossOrigin = "crossorigin";
            return yield new Promise((done, fail) => {
                img.onload = function () { done(img.toBuffer()); };
                img.onerror = fail;
                img.src = url;
            });
        }
        else {
            var hdr = "data:image/png;base64,";
            if (url.startsWith(hdr)) {
                return imageDataFromBase64(url.slice(hdr.length));
            }
            throw new Error("loading remote images in nodejs has been disabled, load the raw bytes and use imageDataFromNodeBuffer instead");
        }
    });
}
/**
* Loads an ImageData object from a base64 encoded png image
* Make sure the png image does not have a sRGB chunk or the resulting pixels will differ for different users!!!
* @param data a base64 encoded png image
*/
function imageDataFromBase64(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof Image != "undefined") {
            return imageDataFromUrl("data:image/png;base64," + data);
        }
        else {
            return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__.imageDataFromBase64(data);
        }
    });
}
/**
 * Loads an ImageData object directly from a png encoded file buffer
 * This method ensures that png color space headers are taken care off
 * @param data The bytes of a png file
 */
function imageDataFromFileBuffer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        clearPngColorspace(data);
        if (typeof Image != "undefined") {
            let blob = new Blob([data], { type: "image/png" });
            let url = URL.createObjectURL(blob);
            let r = yield imageDataFromUrl(url);
            URL.revokeObjectURL(url);
            return r;
        }
        else {
            return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__.imageDataFromBuffer(data);
        }
    });
}
/**
* Checks if a given byte array is a png file (by checking for ?PNG as first 4 bytes)
* @param bytes Raw bytes of the png file
*/
function isPngBuffer(bytes) {
    return bytes[0] == 137 && bytes[1] == 80 && bytes[2] == 78 && bytes[3] == 71;
}
/**
* Resets the colorspace data in the png file.
* This makes sure the browser renders the exact colors in the file instead of filtering it in order to obtain the best real life representation of
* what it looked like on the authors screen. (this feature is often broken and not supported)
* For example a round trip printscreen -> open in browser results in different colors than the original
* @param data Raw bytes of the png file
*/
function clearPngColorspace(data) {
    if (!isPngBuffer(data)) {
        throw new Error("non-png image received");
    }
    var i = 8;
    while (i < data.length) {
        var length = data[i++] * 0x1000000 + data[i++] * 0x10000 + data[i++] * 0x100 + data[i++];
        var ancillary = !!((data[i] >> 5) & 1);
        var chunkname = String.fromCharCode(data[i], data[i + 1], data[i + 2], data[i + 3]);
        var chunkid = chunkname.toLowerCase();
        if (chunkid != "trns" && ancillary) {
            data[i + 0] = "n".charCodeAt(0);
            data[i + 1] = "o".charCodeAt(0);
            data[i + 2] = "P".charCodeAt(0);
            data[i + 3] = "E".charCodeAt(0);
            //calculate new chunk checksum
            //http://www.libpng.org/pub/png/spec/1.2/PNG-CRCAppendix.html
            var end = i + 4 + length;
            var crc = 0xffffffff;
            //should be fast enough like this
            var bitcrc = function (bit) {
                for (var k = 0; k < 8; k++) {
                    if (bit & 1) {
                        bit = 0xedb88320 ^ (bit >>> 1);
                    }
                    else {
                        bit = bit >>> 1;
                    }
                }
                return bit;
            };
            for (var a = i; a < end; a++) {
                if (a >= i + 4) {
                    data[a] = 0;
                }
                var bit = data[a];
                crc = bitcrc((crc ^ bit) & 0xff) ^ (crc >>> 8);
            }
            crc = crc ^ 0xffffffff;
            //new chunk checksum
            data[i + 4 + length + 0] = (crc >> 24) & 0xff;
            data[i + 4 + length + 1] = (crc >> 16) & 0xff;
            data[i + 4 + length + 2] = (crc >> 8) & 0xff;
            data[i + 4 + length + 3] = (crc >> 0) & 0xff;
        }
        if (chunkname == "IEND") {
            break;
        }
        i += 4; //type
        i += length; //data
        i += 4; //crc
    }
}
/**
* finds the given needle ImageBuffer in the given haystack ImgRef this function uses the best optimized available
* code depending on the type of the haystack. It will use fast c# searching if the haystack is an ImgRefBind, js searching
* is used otherwise.
* the checklist argument is no longer used and should ignored or null/undefined
* The optional sx,sy,sw,sh arguments indicate a bounding rectangle in which to search the needle. The rectangle should be bigger than the needle
* @returns An array of points where the needle is found. The array is empty if none are found
*/
function findSubimage(haystackImgref, needleBuffer, sx = 0, sy = 0, sw = haystackImgref.width, sh = haystackImgref.height) {
    if (!haystackImgref) {
        throw new TypeError();
    }
    if (!needleBuffer) {
        throw new TypeError();
    }
    var max = 30;
    //check if we can do this in alt1
    if (haystackImgref instanceof _imgref_js__WEBPACK_IMPORTED_MODULE_0__.ImgRefBind && _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.hasAlt1 && alt1.bindFindSubImg) {
        var needlestr = _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.encodeImageString(needleBuffer);
        var r = alt1.bindFindSubImg(haystackImgref.handle, needlestr, needleBuffer.width, sx, sy, sw, sh);
        if (!r) {
            throw new _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.Alt1Error();
        }
        return JSON.parse(r);
    }
    return findSubbuffer(haystackImgref.read(), needleBuffer, sx, sy, sw, sh);
}
/**
* Uses js to find the given needle ImageBuffer in the given haystack ImageBuffer. It is better to use the alt1.bind- functions in
* combination with a1nxt.findsubimg.
* the optional sx,sy,sw,sh arguments indicate a bounding rectangle in which to search.
* @returns An array of points where the needle is found. The array is empty if none are found
*/
function findSubbuffer(haystack, needle, sx = 0, sy = 0, sw = haystack.width, sh = haystack.height) {
    var r = [];
    var maxdif = 30;
    var maxresults = 50;
    var needlestride = needle.width * 4;
    var heystackstride = haystack.width * 4;
    //built list of non trans pixel to check
    var checkList = [];
    for (var y = 0; y < needle.height; y++) {
        for (var x = 0; x < needle.width; x++) {
            var i = x * 4 + y * needlestride;
            if (needle.data[i + 3] == 255) {
                checkList.push({ x: x, y: y });
            }
            if (checkList.length == 10) {
                break;
            }
        }
        if (checkList.length == 10) {
            break;
        }
    }
    var cw = (sx + sw) - needle.width;
    var ch = (sy + sh) - needle.height;
    var checklength = checkList.length;
    for (var y = sy; y <= ch; y++) {
        outer: for (var x = sx; x <= cw; x++) {
            for (var a = 0; a < checklength; a++) {
                var i1 = (x + checkList[a].x) * 4 + (y + checkList[a].y) * heystackstride;
                var i2 = checkList[a].x * 4 + checkList[a].y * needlestride;
                var d = 0;
                d = d + Math.abs(haystack.data[i1 + 0] - needle.data[i2 + 0]) | 0;
                d = d + Math.abs(haystack.data[i1 + 1] - needle.data[i2 + 1]) | 0;
                d = d + Math.abs(haystack.data[i1 + 2] - needle.data[i2 + 2]) | 0;
                d *= 255 / needle.data[i2 + 3];
                if (d > maxdif) {
                    continue outer;
                }
            }
            if (simpleCompare(haystack, needle, x, y, maxdif) != Infinity) {
                r.push({ x, y });
                if (r.length > maxresults) {
                    return r;
                }
            }
        }
    }
    return r;
}
/**
* Compares two images and returns the average color difference per pixel between them
* @param max The max color difference at any point in the image before short circuiting the function and returning Infinity. set to -1 to always continue.
* @returns The average color difference per pixel or Infinity if the difference is more than max at any point in the image
*/
function simpleCompare(bigbuf, checkbuf, x, y, max = 30) {
    if (x < 0 || y < 0) {
        throw new RangeError();
    }
    if (x + checkbuf.width > bigbuf.width || y + checkbuf.height > bigbuf.height) {
        throw new RangeError();
    }
    if (max == -1) {
        max = 255 * 4;
    }
    var dif = 0;
    for (var step = 8; step >= 1; step /= 2) {
        for (var cx = 0; cx < checkbuf.width; cx += step) {
            for (var cy = 0; cy < checkbuf.height; cy += step) {
                var i1 = (x + cx) * 4 + (y + cy) * bigbuf.width * 4;
                var i2 = cx * 4 + cy * checkbuf.width * 4;
                var d = 0;
                d = d + Math.abs(bigbuf.data[i1 + 0] - checkbuf.data[i2 + 0]) | 0;
                d = d + Math.abs(bigbuf.data[i1 + 1] - checkbuf.data[i2 + 1]) | 0;
                d = d + Math.abs(bigbuf.data[i1 + 2] - checkbuf.data[i2 + 2]) | 0;
                d *= checkbuf.data[i2 + 3] / 255;
                if (step == 1) {
                    dif += d;
                }
                if (d > max) {
                    return Infinity;
                }
            }
        }
    }
    return dif / checkbuf.width / checkbuf.height;
}
/**
* Returns the difference between two colors (scaled to the alpha of the second color)
*/
function coldif(r1, g1, b1, r2, g2, b2, a2) {
    return (Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2)) * a2 / 255; //only applies alpha for 2nd buffer!
}
/**
 * Turns map of promises into a map that contains the resolved values after loading.
 * @param input
 */
function asyncMap(input) {
    var raw = {};
    var promises = [];
    for (var a in input) {
        if (input.hasOwnProperty(a)) {
            raw[a] = null;
            promises.push(input[a].then(function (a, i) { raw[a] = i; r[a] = i; }.bind(null, a)));
        }
    }
    var r = {};
    var promise = Promise.all(promises).then(() => { r.loaded = true; return r; });
    Object.defineProperty(r, "loaded", { enumerable: false, value: false, writable: true });
    Object.defineProperty(r, "promise", { enumerable: false, value: promise });
    Object.defineProperty(r, "raw", { enumerable: false, value: raw });
    return Object.assign(r, raw);
}
/**
* Same as asyncMap, but casts the properties to ImageData in typescript
*/
function webpackImages(input) {
    return asyncMap(input);
}
class ImageDataSet {
    constructor() {
        this.buffers = [];
    }
    matchBest(img, x, y, max) {
        let best = null;
        let bestscore = max;
        for (let a = 0; a < this.buffers.length; a++) {
            let score = img.pixelCompare(this.buffers[a], x, y, bestscore);
            if (isFinite(score) && (bestscore == undefined || score < bestscore)) {
                bestscore = score;
                best = a;
            }
        }
        if (best == null) {
            return null;
        }
        return { index: best, score: bestscore };
    }
    static fromFilmStrip(baseimg, width) {
        if ((baseimg.width % width) != 0) {
            throw new Error("slice size does not fit in base img");
        }
        let r = new ImageDataSet();
        for (let x = 0; x < baseimg.width; x += width) {
            r.buffers.push(baseimg.clone(new _index_js__WEBPACK_IMPORTED_MODULE_3__.Rect(x, 0, width, baseimg.height)));
        }
        return r;
    }
    static fromFilmStripUneven(baseimg, widths) {
        let r = new ImageDataSet();
        let x = 0;
        for (let w of widths) {
            r.buffers.push(baseimg.clone(new _index_js__WEBPACK_IMPORTED_MODULE_3__.Rect(x, 0, w, baseimg.height)));
            x += w;
            if (x > baseimg.width) {
                throw new Error("sampling filmstrip outside bounds");
            }
        }
        if (x != baseimg.width) {
            throw new Error("unconsumed pixels left in film strip imagedata");
        }
        return r;
    }
    static fromAtlas(baseimg, slices) {
        let r = new ImageDataSet();
        for (let slice of slices) {
            r.buffers.push(baseimg.clone(slice));
        }
        return r;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/imgref.js":
/*!*************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imgref.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImgRef": () => (/* binding */ ImgRef),
/* harmony export */   "ImgRefBind": () => (/* binding */ ImgRefBind),
/* harmony export */   "ImgRefCtx": () => (/* binding */ ImgRefCtx),
/* harmony export */   "ImgRefData": () => (/* binding */ ImgRefData)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");

/**
 * Represents an image that might be in different types of memory
 * This is mostly used to represent images still in Alt1 memory that have
 * not been transfered to js yet. Various a1lib api's use this type and
 * choose the most efficient approach based on the memory type
 */
class ImgRef {
    constructor(x, y, w, h) {
        this.t = "none";
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        throw new Error("This imgref (" + this.t + ") does not support toData");
    }
    findSubimage(needle, sx = 0, sy = 0, w = this.width, h = this.height) {
        return _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.findSubimage(this, needle, sx, sy, w, h);
    }
    toData(x = this.x, y = this.y, w = this.width, h = this.height) {
        return this.read(x - this.x, y - this.y, w, h);
    }
    ;
    containsArea(rect) {
        return this.x <= rect.x && this.y <= rect.y && this.x + this.width >= rect.x + rect.width && this.y + this.height >= rect.y + rect.height;
    }
}
/**
 * Represents an image in js render memory (canvas/image tag)
 */
class ImgRefCtx extends ImgRef {
    constructor(img, x = 0, y = 0) {
        if (img instanceof CanvasRenderingContext2D) {
            super(x, y, img.canvas.width, img.canvas.height);
            this.ctx = img;
        }
        else {
            super(x, y, img.width, img.height);
            var cnv = (img instanceof HTMLCanvasElement ? img : img.toCanvas());
            this.ctx = cnv.getContext("2d");
        }
        this.t = "ctx";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        return this.ctx.getImageData(x, y, w, h);
    }
}
/**
 * Represents in image in Alt1 memory, This type of image can be searched for subimages
 * very efficiently and transfering the full image to js can be avoided this way
 */
class ImgRefBind extends ImgRef {
    constructor(handle, x = 0, y = 0, w = 0, h = 0) {
        super(x, y, w, h);
        this.handle = handle;
        this.t = "bind";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.transferImageData)(this.handle, x, y, w, h);
    }
}
/**
 * Represents an image in js memory
 */
class ImgRefData extends ImgRef {
    constructor(buf, x = 0, y = 0) {
        super(x, y, buf.width, buf.height);
        this.buf = buf;
        this.t = "data";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        if (x == 0 && y == 0 && w == this.width && h == this.height) {
            return this.buf;
        }
        var r = new ImageData(w, h);
        for (var b = y; b < y + h; b++) {
            for (var a = x; a < x + w; a++) {
                var i1 = (a - x) * 4 + (b - y) * w * 4;
                var i2 = a * 4 + b * 4 * this.buf.width;
                r.data[i1] = this.buf.data[i2];
                r.data[i1 + 1] = this.buf.data[i2 + 1];
                r.data[i1 + 2] = this.buf.data[i2 + 2];
                r.data[i1 + 3] = this.buf.data[i2 + 3];
            }
        }
        return r;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/index.js":
/*!************************************************!*\
  !*** ../node_modules/@alt1/base/dist/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alt1Error": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.Alt1Error),
/* harmony export */   "ImageData": () => (/* reexport safe */ _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_4__.ImageData),
/* harmony export */   "ImageDetect": () => (/* reexport module object */ _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "ImageStreamReader": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.ImageStreamReader),
/* harmony export */   "ImgRef": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRef),
/* harmony export */   "ImgRefBind": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefBind),
/* harmony export */   "ImgRefCtx": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefCtx),
/* harmony export */   "ImgRefData": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefData),
/* harmony export */   "NoAlt1Error": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.NoAlt1Error),
/* harmony export */   "NodePolyfill": () => (/* reexport module object */ _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_5__),
/* harmony export */   "PasteInput": () => (/* reexport module object */ _pasteinput_js__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "Rect": () => (/* reexport safe */ _rect_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "addResizeElement": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.addResizeElement),
/* harmony export */   "capture": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.capture),
/* harmony export */   "captureAsync": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureAsync),
/* harmony export */   "captureHold": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHold),
/* harmony export */   "captureHoldFullRs": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHoldFullRs),
/* harmony export */   "captureHoldScreen": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHoldScreen),
/* harmony export */   "captureMultiAsync": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureMultiAsync),
/* harmony export */   "captureStream": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureStream),
/* harmony export */   "decodeImageString": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.decodeImageString),
/* harmony export */   "encodeImageString": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.encodeImageString),
/* harmony export */   "getMousePosition": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.getMousePosition),
/* harmony export */   "getdisplaybounds": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.getdisplaybounds),
/* harmony export */   "hasAlt1": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.hasAlt1),
/* harmony export */   "hasAlt1Version": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.hasAlt1Version),
/* harmony export */   "identifyApp": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.identifyApp),
/* harmony export */   "mixColor": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.mixColor),
/* harmony export */   "newestversion": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.newestversion),
/* harmony export */   "on": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.on),
/* harmony export */   "once": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.once),
/* harmony export */   "openbrowser": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.openbrowser),
/* harmony export */   "removeListener": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.removeListener),
/* harmony export */   "requireAlt1": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.requireAlt1),
/* harmony export */   "resetEnvironment": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.resetEnvironment),
/* harmony export */   "skinName": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.skinName),
/* harmony export */   "transferImageData": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.transferImageData),
/* harmony export */   "unmixColor": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.unmixColor)
/* harmony export */ });
/* harmony import */ var _declarations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./declarations.js */ "../node_modules/@alt1/base/dist/declarations.js");
/* harmony import */ var _declarations_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_declarations_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");
/* harmony import */ var _pasteinput_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pasteinput.js */ "../node_modules/@alt1/base/dist/pasteinput.js");
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rect.js */ "../node_modules/@alt1/base/dist/rect.js");
/* harmony import */ var _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./imagedata-extensions.js */ "../node_modules/@alt1/base/dist/imagedata-extensions.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _wrapper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./wrapper.js */ "../node_modules/@alt1/base/dist/wrapper.js");










/***/ }),

/***/ "../node_modules/@alt1/base/dist/nodepolyfill.js":
/*!*******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/nodepolyfill.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCanvas": () => (/* binding */ createCanvas),
/* harmony export */   "imageDataFromBase64": () => (/* binding */ imageDataFromBase64),
/* harmony export */   "imageDataFromBuffer": () => (/* binding */ imageDataFromBuffer),
/* harmony export */   "imageDataToDrawable": () => (/* binding */ imageDataToDrawable),
/* harmony export */   "imageDataToFileBytes": () => (/* binding */ imageDataToFileBytes),
/* harmony export */   "polyfillRequire": () => (/* binding */ polyfillRequire),
/* harmony export */   "requireElectronCommon": () => (/* binding */ requireElectronCommon),
/* harmony export */   "requireNodeCanvas": () => (/* binding */ requireNodeCanvas),
/* harmony export */   "requireSharp": () => (/* binding */ requireSharp)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");
//nodejs and electron polyfills for web api's
//commented out type info as that breaks webpack with optional dependencies
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


var requirefunction = null;
/**
 * Call this function to let the libs require extra dependencies on nodejs in order
 * to polyfill some browser api's (mostly image compression/decompression)
 * `NodePolifill.polyfillRequire(require);` should solve most cases
 */
function polyfillRequire(requirefn) {
    requirefunction = requirefn;
}
function requireSharp() {
    try {
        if (requirefunction) {
            return requirefunction("sharp");
        }
        else {
            return require(/* webpackIgnore: true */ "sharp"); // as typeof import("sharp");
        }
    }
    catch (e) { }
    return null;
}
function requireNodeCanvas() {
    //attempt to require sharp first, after loading canvas the module sharp fails to load
    requireSharp();
    try {
        if (requirefunction) {
            return requirefunction("canvas");
        }
        else {
            return require(/* webpackIgnore: true */ "canvas"); // as typeof import("sharp");
        }
    }
    catch (e) { }
    return null;
}
function requireElectronCommon() {
    try {
        if (requirefunction) {
            return requirefunction("electron/common");
        }
        else {
            return require(/* webpackIgnore: true */ "electron/common");
        }
    }
    catch (e) { }
    return null;
}
function imageDataToDrawable(buf) {
    let nodecnv = requireNodeCanvas();
    if (!nodecnv) {
        throw new Error("couldn't find built-in canvas or the module 'canvas'");
    }
    return new nodecnv.ImageData(buf.data, buf.width, buf.height);
}
function createCanvas(w, h) {
    let nodecnv = requireNodeCanvas();
    if (!nodecnv) {
        throw new Error("couldn't find built-in canvas or the module 'canvas'");
    }
    return nodecnv.createCanvas(w, h);
}
function flipBGRAtoRGBA(data) {
    for (let i = 0; i < data.length; i += 4) {
        let tmp = data[i + 2];
        data[i + 2] = data[i + 0];
        data[i + 0] = tmp;
    }
}
function imageDataToFileBytes(buf, format, quality) {
    return __awaiter(this, void 0, void 0, function* () {
        //use the electron API if we're in electron
        var electronCommon;
        var sharp;
        if (electronCommon = requireElectronCommon()) {
            let nativeImage = electronCommon.nativeImage;
            //need to copy the buffer in order to flip it without destroying the original
            let bufcpy = Buffer.from(buf.data.slice(buf.data.byteOffset, buf.data.byteLength));
            flipBGRAtoRGBA(bufcpy);
            let nativeimg = nativeImage.createFromBitmap(bufcpy, { width: buf.width, height: buf.height });
            return nativeimg.toPNG();
        }
        else if (sharp = requireSharp()) {
            let img = sharp(Buffer.from(buf.data.buffer), { raw: { width: buf.width, height: buf.height, channels: 4 } });
            if (format == "image/png") {
                img.png();
            }
            else if (format == "image/webp") {
                var opts = { quality: 80 };
                if (typeof quality == "number") {
                    opts.quality = quality * 100;
                }
                img.webp(opts);
            }
            else {
                throw new Error("unknown image format: " + format);
            }
            return yield img.toBuffer({ resolveWithObject: false }).buffer;
        }
        throw new Error("coulnd't find build-in image compression methods or the module 'electron/common' or 'sharp'");
    });
}
function imageDataFromBase64(base64) {
    return imageDataFromBuffer(Buffer.from(base64, "base64"));
}
function imageDataFromBuffer(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        (0,_imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.clearPngColorspace)(buffer);
        //use the electron API if we're in electron
        var electronCommon;
        var nodecnv;
        if (electronCommon = requireElectronCommon()) {
            let nativeImage = electronCommon.nativeImage;
            let img = nativeImage.createFromBuffer(buffer);
            let pixels = img.toBitmap();
            let size = img.getSize();
            let pixbuf = new Uint8ClampedArray(pixels.buffer, pixels.byteOffset, pixels.byteLength);
            flipBGRAtoRGBA(pixbuf);
            return new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageData(pixbuf, size.width, size.height);
        }
        else if (nodecnv = requireNodeCanvas()) {
            return new Promise((done, err) => {
                let img = new nodecnv.Image();
                img.onerror = err;
                img.onload = () => {
                    var cnv = nodecnv.createCanvas(img.naturalWidth, img.naturalHeight);
                    var ctx = cnv.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    var data = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
                    //use our own class
                    done(new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageData(data.data, data.width, data.height));
                };
                img.src = Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);
            });
        }
        throw new Error("couldn't find built-in canvas, module 'electron/common' or the module 'canvas'");
    });
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/pasteinput.js":
/*!*****************************************************!*\
  !*** ../node_modules/@alt1/base/dist/pasteinput.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileDialog": () => (/* binding */ fileDialog),
/* harmony export */   "lastref": () => (/* binding */ lastref),
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "startDragNDrop": () => (/* binding */ startDragNDrop),
/* harmony export */   "triggerPaste": () => (/* binding */ triggerPaste),
/* harmony export */   "unlisten": () => (/* binding */ unlisten)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");


var listeners = [];
var started = false;
var dndStarted = false;
var pasting = false;
var lastref = null;
function listen(func, errorfunc, dragndrop) {
    listeners.push({ cb: func, error: errorfunc });
    if (!started) {
        start();
    }
    if (dragndrop && !dndStarted) {
        startDragNDrop();
    }
}
function unlisten(func) {
    let i = listeners.findIndex(c => c.cb == func);
    if (i != -1) {
        listeners.splice(i, 1);
    }
}
/**
 * currently used in multiple document situations (iframe), might be removed in the future
 */
function triggerPaste(img) {
    lastref = img;
    for (var a in listeners) {
        listeners[a].cb(lastref);
    }
}
function pasted(img) {
    pasting = false;
    let cnv = img instanceof HTMLCanvasElement ? img : img.toCanvas();
    triggerPaste(new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImgRefCtx(cnv));
}
function error(error, mes) {
    var _a, _b;
    pasting = false;
    for (var a in listeners) {
        (_b = (_a = listeners[a]).error) === null || _b === void 0 ? void 0 : _b.call(_a, mes, error);
    }
}
function startDragNDrop() {
    var getitem = function (items) {
        var foundimage = "";
        for (var a = 0; a < items.length; a++) {
            var item = items[a];
            var m = item.type.match(/^image\/(\w+)$/);
            if (m) {
                if (m[1] == "png") {
                    return item;
                }
                else {
                    foundimage = m[1];
                }
            }
        }
        if (foundimage) {
            error("notpng", "The image you uploaded is not a .png image. Other image type have compression noise and can't be used for image detection.");
        }
        return null;
    };
    window.addEventListener("dragover", function (e) {
        e.preventDefault();
    });
    window.addEventListener("drop", function (e) {
        if (!e.dataTransfer) {
            return;
        }
        var item = getitem(e.dataTransfer.items);
        e.preventDefault();
        if (!item) {
            return;
        }
        fromFile(item.getAsFile());
    });
}
function start() {
    if (started) {
        return;
    }
    started = true;
    //determine if we have a clipboard api
    //try{a=new Event("clipboard"); a="clipboardData" in a;}
    //catch(e){a=false;}
    var ischrome = !!navigator.userAgent.match(/Chrome/) && !navigator.userAgent.match(/Edge/);
    //old method breaks after chrome 41, revert to good old user agent sniffing
    //nvm, internet explorer (edge) decided that it wants to be chrome, however fails at delivering
    //turns out this one is interesting, edge is a hybrid between the paste api's
    var apipasted = function (e) {
        if (!e.clipboardData) {
            return;
        }
        for (var a = 0; a < e.clipboardData.items.length; a++) { //loop all data types
            if (e.clipboardData.items[a].type.indexOf("image") != -1) {
                var file = e.clipboardData.items[a].getAsFile();
                var img = new Image();
                img.src = (window.URL || window.webkitURL).createObjectURL(file);
                if (img.width > 0) {
                    pasted(img);
                }
                else {
                    img.onload = function () { pasted(img); };
                }
            }
        }
    };
    if (ischrome) {
        document.addEventListener("paste", apipasted);
    }
    else {
        var catcher = document.createElement("div");
        catcher.setAttribute("contenteditable", "");
        catcher.className = "forcehidden"; //retarded ie safety/bug, cant apply styles using js//TODO i don't even know what's going on
        catcher.onpaste = function (e) {
            if (e.clipboardData && e.clipboardData.items) {
                apipasted(e);
                return;
            }
            setTimeout(function () {
                var b = catcher.children[0];
                if (!b || b.tagName != "IMG") {
                    return;
                }
                var img = new Image();
                img.src = b.src;
                var a = img.src.match(/^data:([\w\/]+);/);
                if (img.width > 0) {
                    pasted(img);
                }
                else {
                    img.onload = function () { pasted(img); };
                }
                catcher.innerHTML = "";
            }, 1);
        };
        document.body.appendChild(catcher);
    }
    //detect if ctrl-v is pressed and focus catcher if needed
    document.addEventListener("keydown", function (e) {
        if (e.target.tagName == "INPUT") {
            return;
        }
        if (e.keyCode != "V".charCodeAt(0) || !e.ctrlKey) {
            return;
        }
        pasting = true;
        setTimeout(function () {
            if (pasting) {
                error("noimg", "You pressed Ctrl+V, but no image was pasted by your browser, make sure your clipboard contains an image, and not a link to an image.");
            }
        }, 1000);
        if (catcher) {
            catcher.focus();
        }
    });
}
function fileDialog() {
    var fileinput = document.createElement("input");
    fileinput.type = "file";
    fileinput.accept = "image/png";
    fileinput.onchange = function () { if (fileinput.files && fileinput.files[0]) {
        fromFile(fileinput.files[0]);
    } };
    fileinput.click();
    return fileinput;
}
function fromFile(file) {
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function () {
        var bytearray = new Uint8Array(reader.result);
        if (_imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.isPngBuffer(bytearray)) {
            _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.clearPngColorspace(bytearray);
        }
        var blob = new Blob([bytearray], { type: "image/png" });
        var img = new Image();
        img.onerror = () => error("invalidfile", "The file you uploaded could not be opened as an image.");
        var bloburl = URL.createObjectURL(blob);
        img.src = bloburl;
        if (img.width > 0) {
            pasted(img);
            URL.revokeObjectURL(bloburl);
        }
        else {
            img.onload = function () { pasted(img); URL.revokeObjectURL(bloburl); };
        }
    };
    reader.readAsArrayBuffer(file);
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/rect.js":
/*!***********************************************!*\
  !*** ../node_modules/@alt1/base/dist/rect.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rect)
/* harmony export */ });
//util class for rectangle maths
//TODO shit this sucks can we remove it again?
//more of a shorthand to get {x,y,width,height} than a class
//kinda starting to like it again
//TODO remove rant
;
/**
 * Simple rectangle class with some util functions
 */
class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    static fromArgs(...args) {
        if (typeof args[0] == "object") {
            return new Rect(args[0].x, args[0].y, args[0].width, args[0].height);
        }
        else if (typeof args[0] == "number" && args.length >= 4) {
            return new Rect(args[0], args[1], args[2], args[3]);
        }
        else {
            throw new Error("invalid rect args");
        }
    }
    /**
     * Resizes this Rect to include the full size of a given second rectangle
     */
    union(r2) {
        var x = Math.min(this.x, r2.x);
        var y = Math.min(this.y, r2.y);
        this.width = Math.max(this.x + this.width, r2.x + r2.width) - x;
        this.height = Math.max(this.y + this.height, r2.y + r2.height) - y;
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Resizes this Rect to include a given point
     */
    includePoint(x, y) {
        this.union(new Rect(x, y, 0, 0));
    }
    /**
     * Grows the rectangle with the given dimensions
     */
    inflate(w, h) {
        this.x -= w;
        this.y -= h;
        this.width += 2 * w;
        this.height += 2 * h;
    }
    /**
     * Resizes this Rect to the area that overlaps a given Rect
     * width and height will be set to 0 if the intersection does not exist
     */
    intersect(r2) {
        if (this.x < r2.x) {
            this.width -= r2.x - this.x;
            this.x = r2.x;
        }
        if (this.y < r2.y) {
            this.height -= r2.y - this.y;
            this.y = r2.y;
        }
        this.width = Math.min(this.x + this.width, r2.x + r2.width) - this.x;
        this.height = Math.min(this.y + this.height, r2.y + r2.height) - this.y;
        if (this.width <= 0 || this.height <= 0) {
            this.width = 0;
            this.height = 0;
        }
    }
    /**
     * Returns wether this Rect has at least one pixel overlap with a given Rect
     */
    overlaps(r2) {
        return this.x < r2.x + r2.width && this.x + this.width > r2.x && this.y < r2.y + r2.height && this.y + this.height > r2.y;
    }
    /**
     * Returns wether a given Rect fits completely inside this Rect
     * @param r2
     */
    contains(r2) {
        return this.x <= r2.x && this.x + this.width >= r2.x + r2.width && this.y <= r2.y && this.y + this.height >= r2.y + r2.height;
    }
    /**
     * Returns wether a given point lies inside this Rect
     */
    containsPoint(x, y) {
        return this.x <= x && this.x + this.width > x && this.y <= y && this.y + this.height > y;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/wrapper.js":
/*!**************************************************!*\
  !*** ../node_modules/@alt1/base/dist/wrapper.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alt1Error": () => (/* binding */ Alt1Error),
/* harmony export */   "ImageStreamReader": () => (/* binding */ ImageStreamReader),
/* harmony export */   "NoAlt1Error": () => (/* binding */ NoAlt1Error),
/* harmony export */   "addResizeElement": () => (/* binding */ addResizeElement),
/* harmony export */   "capture": () => (/* binding */ capture),
/* harmony export */   "captureAsync": () => (/* binding */ captureAsync),
/* harmony export */   "captureHold": () => (/* binding */ captureHold),
/* harmony export */   "captureHoldFullRs": () => (/* binding */ captureHoldFullRs),
/* harmony export */   "captureHoldScreen": () => (/* binding */ captureHoldScreen),
/* harmony export */   "captureMultiAsync": () => (/* binding */ captureMultiAsync),
/* harmony export */   "captureStream": () => (/* binding */ captureStream),
/* harmony export */   "decodeImageString": () => (/* binding */ decodeImageString),
/* harmony export */   "encodeImageString": () => (/* binding */ encodeImageString),
/* harmony export */   "getMousePosition": () => (/* binding */ getMousePosition),
/* harmony export */   "getdisplaybounds": () => (/* binding */ getdisplaybounds),
/* harmony export */   "hasAlt1": () => (/* binding */ hasAlt1),
/* harmony export */   "hasAlt1Version": () => (/* binding */ hasAlt1Version),
/* harmony export */   "identifyApp": () => (/* binding */ identifyApp),
/* harmony export */   "mixColor": () => (/* binding */ mixColor),
/* harmony export */   "newestversion": () => (/* binding */ newestversion),
/* harmony export */   "on": () => (/* binding */ on),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "openbrowser": () => (/* binding */ openbrowser),
/* harmony export */   "removeListener": () => (/* binding */ removeListener),
/* harmony export */   "requireAlt1": () => (/* binding */ requireAlt1),
/* harmony export */   "resetEnvironment": () => (/* binding */ resetEnvironment),
/* harmony export */   "skinName": () => (/* binding */ skinName),
/* harmony export */   "transferImageData": () => (/* binding */ transferImageData),
/* harmony export */   "unmixColor": () => (/* binding */ unmixColor)
/* harmony export */ });
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rect.js */ "../node_modules/@alt1/base/dist/rect.js");
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imagedata-extensions.js */ "../node_modules/@alt1/base/dist/imagedata-extensions.js");
/* harmony import */ var _alt1api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alt1api.js */ "../node_modules/@alt1/base/dist/alt1api.js");
/* harmony import */ var _alt1api_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_alt1api_js__WEBPACK_IMPORTED_MODULE_3__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
 * Thrown when a method is called that can not be used outside of Alt1
 */
class NoAlt1Error extends Error {
    constructor() {
        super();
        this.message = "This method can not be ran outside of Alt1";
    }
}
;
/**
 * Thrown when the Alt1 API returns an invalid result
 * Errors of a different type are throw when internal Alt1 errors occur
 */
class Alt1Error extends Error {
}
/**
 * The latest Alt1 version
 */
var newestversion = "1.5.5";
/**
 * Whether the Alt1 API is available
 */
var hasAlt1 = (typeof alt1 != "undefined");
/**
 * The name of the Alt1 interface skin. (Always "default" if running in a browser)
 */
var skinName = hasAlt1 ? alt1.skinName : "default";
/**
 * Max number of bytes that can be sent by alt1 in one function
 * Not completely sure why this number is different than window.alt1.maxtranfer
 */
var maxtransfer = 4000000;
/**
 * Open a link in the default browser
 * @deprecated use window.open instead
 */
function openbrowser(url) {
    if (hasAlt1) {
        alt1.openBrowser(url);
    }
    else {
        window.open(url, '_blank');
    }
}
/**
 * Throw if Alt1 API is not available
 */
function requireAlt1() {
    if (!hasAlt1) {
        throw new NoAlt1Error();
    }
}
/**
 * Returns an object with a rectangle that spans all screens
 */
function getdisplaybounds() {
    if (!hasAlt1) {
        return false;
    }
    return new _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"](alt1.screenX, alt1.screenY, alt1.screenWidth, alt1.screenHeight);
}
/**
 * gets an imagebuffer with pixel data about the requested region
 */
function capture(...args) {
    //TODO change null return on error into throw instead (x3)
    if (!hasAlt1) {
        throw new NoAlt1Error();
    }
    var rect = _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromArgs(...args);
    if (alt1.capture) {
        return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(alt1.capture(rect.x, rect.y, rect.width, rect.height), rect.width, rect.height);
    }
    var buf = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(rect.width, rect.height);
    if (rect.width * rect.height * 4 <= maxtransfer) {
        var data = alt1.getRegion(rect.x, rect.y, rect.width, rect.height);
        if (!data) {
            return null;
        }
        decodeImageString(data, buf, 0, 0, rect.width, rect.height);
    }
    else {
        //split up the request to to exceed the single transfer limit (for now)
        var x1 = rect.x;
        var ref = alt1.bindRegion(rect.x, rect.y, rect.width, rect.height);
        if (ref <= 0) {
            return null;
        }
        while (x1 < rect.x + rect.width) {
            var x2 = Math.min(rect.x + rect.width, Math.floor(x1 + (maxtransfer / 4 / rect.height)));
            var data = alt1.bindGetRegion(ref, x1, rect.y, x2 - x1, rect.height);
            if (!data) {
                return null;
            }
            decodeImageString(data, buf, x1 - rect.x, 0, x2 - x1, rect.height);
            x1 = x2;
        }
    }
    return buf;
}
/**
 * Makes alt1 bind an area of the rs client in memory without sending it to the js client
 * returns an imgref object which can be used to get pixel data using the imgreftobuf function
 * currently only one bind can exist per app and the ref in (v) will always be 1
 */
function captureHold(x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    var r = alt1.bindRegion(x, y, w, h);
    if (r <= 0) {
        throw new Alt1Error("capturehold failed");
    }
    return new _imgref_js__WEBPACK_IMPORTED_MODULE_1__.ImgRefBind(r, x, y, w, h);
}
/**
 * Same as captureHoldRegion, but captures the screen instead of the rs client. it also uses screen coordinates instead and can capture outside of the rs client
 */
function captureHoldScreen(x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    var r = alt1.bindScreenRegion(x, y, w, h);
    if (r <= 0) {
        return false;
    }
    return new _imgref_js__WEBPACK_IMPORTED_MODULE_1__.ImgRefBind(r, x, y, w, h);
}
/**
 * bind the full rs window if the rs window can be detected by alt1, otherwise return the full screen
 */
function captureHoldFullRs() {
    return captureHold(0, 0, alt1.rsWidth, alt1.rsHeight);
}
/**
 * returns a subregion from a bound image
 * used internally in imgreftobuf if imgref is a bound image
 * @deprecated This should be handled internall by the imgrefbind.toData method
 */
function transferImageData(handle, x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    if (alt1.bindGetRegionBuffer) {
        return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(alt1.bindGetRegionBuffer(handle, x, y, w, h), w, h);
    }
    var r = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(w, h);
    var x1 = x;
    while (true) { //split up the request to to exceed the single transfer limit (for now)
        var x2 = Math.min(x + w, Math.floor(x1 + (maxtransfer / 4 / h)));
        var a = alt1.bindGetRegion(handle, x1, y, x2 - x1, h);
        if (!a) {
            throw new Alt1Error();
        }
        decodeImageString(a, r, x1 - x, 0, x2 - x1, h);
        x1 = x2;
        if (x1 == x + w) {
            break;
        }
        ;
    }
    return r;
}
/**
 * decodes a returned string from alt1 to an imagebuffer
 */
function decodeImageString(imagestring, target, x, y, w, h) {
    var bin = atob(imagestring);
    var bytes = target.data;
    w |= 0;
    h |= 0;
    var offset = 4 * x + 4 * y * target.width;
    var target_width = target.width | 0;
    for (var a = 0; a < w; a++) {
        for (var b = 0; b < h; b++) {
            var i1 = (offset + (a * 4 | 0) + (b * target_width * 4 | 0)) | 0;
            var i2 = ((a * 4 | 0) + (b * 4 * w | 0)) | 0;
            bytes[i1 + 0 | 0] = bin.charCodeAt(i2 + 2 | 0); //fix weird red/blue swap in c#
            bytes[i1 + 1 | 0] = bin.charCodeAt(i2 + 1 | 0);
            bytes[i1 + 2 | 0] = bin.charCodeAt(i2 + 0 | 0);
            bytes[i1 + 3 | 0] = bin.charCodeAt(i2 + 3 | 0);
        }
    }
    return target;
}
/**
 * encodes an imagebuffer to a string
 */
function encodeImageString(buf, sx = 0, sy = 0, sw = buf.width, sh = buf.height) {
    var raw = "";
    for (var y = sy; y < sy + sh; y++) {
        for (var x = sx; x < sx + sw; x++) {
            var i = 4 * x + 4 * buf.width * y | 0;
            raw += String.fromCharCode(buf.data[i + 2 | 0]);
            raw += String.fromCharCode(buf.data[i + 1 | 0]);
            raw += String.fromCharCode(buf.data[i + 0 | 0]);
            raw += String.fromCharCode(buf.data[i + 3 | 0]);
        }
    }
    return btoa(raw);
}
/**
 * mixes the given color into a single int. This format is used by alt1
 */
function mixColor(r, g, b, a = 255) {
    return (b << 0) + (g << 8) + (r << 16) + (a << 24);
}
function unmixColor(col) {
    var r = (col >> 16) & 0xff;
    var g = (col >> 8) & 0xff;
    var b = (col >> 0) & 0xff;
    return [r, g, b];
}
function identifyApp(url) {
    if (hasAlt1) {
        alt1.identifyAppUrl(url);
    }
}
function resetEnvironment() {
    hasAlt1 = (typeof alt1 != "undefined");
    skinName = hasAlt1 ? alt1.skinName : "default";
}
function convertAlt1Version(str) {
    var a = str.match(/^(\d+)\.(\d+)\.(\d+)$/);
    if (!a) {
        throw new RangeError("Invalid version string");
    }
    return (+a[1]) * 1000 * 1000 + (+a[2]) * 1000 + (+a[3]) * 1;
}
var cachedVersionInt = -1;
/**
 * checks if alt1 is running and at least the given version. versionstr should be a string with the version eg: 1.3.2
 * @param versionstr
 */
function hasAlt1Version(versionstr) {
    if (!hasAlt1) {
        return false;
    }
    if (cachedVersionInt == -1) {
        cachedVersionInt = alt1.versionint;
    }
    return cachedVersionInt >= convertAlt1Version(versionstr);
}
/**
 * Gets the current cursor position in the game, returns null if the rs window is not active (alt1.rsActive)
 */
function getMousePosition() {
    var pos = alt1.mousePosition;
    if (pos == -1) {
        return null;
    }
    return { x: pos >>> 16, y: pos & 0xFFFF };
}
/**
 * Registers a given HTML element as a frame border, when this element is dragged by the user the Alt1 frame will resize accordingly
 * Use the direction arguements to make a given direction stick to the mouse. eg. Only set left to true to make the element behave as the left border
 * Or set all to true to move the whole window. Not all combinations are permitted
 */
function addResizeElement(el, left, top, right, bot) {
    if (!hasAlt1 || !alt1.userResize) {
        return;
    }
    el.addEventListener("mousedown", function (e) {
        alt1.userResize(left, top, right, bot);
        e.preventDefault();
    });
}
/**
 * Add an event listener
 */
function on(type, listener) {
    if (!hasAlt1) {
        return;
    }
    if (!alt1.events) {
        alt1.events = {};
    }
    if (!alt1.events[type]) {
        alt1.events[type] = [];
    }
    alt1.events[type].push(listener);
}
/**
 * Removes an event listener
 */
function removeListener(type, listener) {
    var elist = hasAlt1 && alt1.events && alt1.events[type];
    if (!elist) {
        return;
    }
    var i = elist.indexOf(listener);
    if (i == -1) {
        return;
    }
    elist.splice(i, 1);
}
/**
 * Listens for the event to fire once and then stops listening
 * @param event
 * @param cb
 */
function once(type, listener) {
    var fn = (e) => {
        removeListener(type, fn);
        listener(e);
    };
    on(type, fn);
}
;
/**
 * Used to read a set of images from a binary stream returned by the Alt1 API
 */
class ImageStreamReader {
    constructor(reader, ...args) {
        this.framebuffer = null;
        this.pos = 0;
        this.reading = false;
        this.closed = false;
        //paused state
        this.pausedindex = -1;
        this.pausedbuffer = null;
        this.streamreader = reader;
        if (args[0] instanceof _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData) {
            this.setFrameBuffer(args[0]);
        }
        else if (typeof args[0] == "number") {
            this.setFrameBuffer(new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(args[0], args[1]));
        }
    }
    /**
     *
     */
    setFrameBuffer(buffer) {
        if (this.reading) {
            throw new Error("can't change framebuffer while reading");
        }
        this.framebuffer = buffer;
    }
    /**
     * Closes the underlying stream and ends reading
     */
    close() {
        this.streamreader.cancel();
    }
    /**
     * Reads a single image from the stream
     */
    nextImage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.reading) {
                throw new Error("already reading from this stream");
            }
            if (!this.framebuffer) {
                throw new Error("framebuffer not set");
            }
            this.reading = true;
            var synctime = -Date.now();
            var starttime = Date.now();
            var r = false;
            while (!r) {
                if (this.pausedindex != -1 && this.pausedbuffer) {
                    r = this.readChunk(this.pausedindex, this.framebuffer.data, this.pausedbuffer);
                }
                else {
                    synctime += Date.now();
                    var res = yield this.streamreader.read();
                    synctime -= Date.now();
                    if (res.done) {
                        throw new Error("Stream closed while reading");
                    }
                    var data = res.value;
                    r = this.readChunk(0, this.framebuffer.data, data);
                }
            }
            synctime += Date.now();
            //console.log("Decoded async image, " + this.framebuffer.width + "x" + this.framebuffer.height + " time: " + (Date.now() - starttime) + "ms (" + synctime + "ms main thread)");
            this.reading = false;
            return this.framebuffer;
        });
    }
    readChunk(i, framedata, buffer) {
        //very hot code, explicit int32 casting with |0 speeds it up by ~ x2
        i = i | 0;
        var framesize = framedata.length | 0;
        var pos = this.pos;
        var datalen = buffer.length | 0;
        //var data32 = new Float64Array(buffer.buffer);
        //var framedata32 = new Float64Array(framedata.buffer);
        //fix possible buffer misalignment
        //align to 16 for extra loop unrolling
        while (i < datalen) {
            //slow loop, fix alignment and other issues
            while (i < datalen && pos < framesize && (pos % 16 != 0 || !((i + 16 | 0) <= datalen && (pos + 16 | 0) <= framesize))) {
                var rel = pos;
                if (pos % 4 == 0) {
                    rel = rel + 2 | 0;
                }
                if (pos % 4 == 2) {
                    rel = rel - 2 | 0;
                }
                framedata[rel | 0] = buffer[i | 0];
                i = i + 1 | 0;
                pos = pos + 1 | 0;
            }
            //fast unrolled loop for large chunks i wish js had some sort of memcpy
            if (pos % 16 == 0) {
                while ((i + 16 | 0) <= datalen && (pos + 16 | 0) <= framesize) {
                    framedata[pos + 0 | 0] = buffer[i + 2 | 0];
                    framedata[pos + 1 | 0] = buffer[i + 1 | 0];
                    framedata[pos + 2 | 0] = buffer[i + 0 | 0];
                    framedata[pos + 3 | 0] = buffer[i + 3 | 0];
                    framedata[pos + 4 | 0] = buffer[i + 6 | 0];
                    framedata[pos + 5 | 0] = buffer[i + 5 | 0];
                    framedata[pos + 6 | 0] = buffer[i + 4 | 0];
                    framedata[pos + 7 | 0] = buffer[i + 7 | 0];
                    framedata[pos + 8 | 0] = buffer[i + 10 | 0];
                    framedata[pos + 9 | 0] = buffer[i + 9 | 0];
                    framedata[pos + 10 | 0] = buffer[i + 8 | 0];
                    framedata[pos + 11 | 0] = buffer[i + 11 | 0];
                    framedata[pos + 12 | 0] = buffer[i + 14 | 0];
                    framedata[pos + 13 | 0] = buffer[i + 13 | 0];
                    framedata[pos + 14 | 0] = buffer[i + 12 | 0];
                    framedata[pos + 15 | 0] = buffer[i + 15 | 0];
                    //could speed it up another x2 but wouldn't be able to swap r/b swap and possible alignment issues
                    //framedata32[pos / 8 + 0 | 0] = data32[i / 8 + 0 | 0];
                    //framedata32[pos / 8 + 1 | 0] = data32[i / 8 + 1 | 0];
                    //framedata32[pos / 4 + 2 | 0] = data32[i / 4 + 2 | 0];
                    //framedata32[pos / 4 + 3 | 0] = data32[i / 4 + 3 | 0];
                    pos = pos + 16 | 0;
                    i = i + 16 | 0;
                }
            }
            if (pos >= framesize) {
                this.pausedbuffer = null;
                this.pausedindex = -1;
                this.pos = 0;
                if (i != buffer.length - 1) {
                    this.pausedbuffer = buffer;
                    this.pausedindex = i;
                }
                return true;
            }
        }
        this.pos = pos;
        this.pausedbuffer = null;
        this.pausedindex = -1;
        return false;
    }
}
/**
 * Asynchronously captures a section of the game screen
 */
function captureAsync(...args) {
    return __awaiter(this, void 0, void 0, function* () {
        requireAlt1();
        var rect = _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromArgs(...args);
        if (alt1.captureAsync) {
            let img = yield alt1.captureAsync(rect.x, rect.y, rect.width, rect.height);
            return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(img, rect.width, rect.height);
        }
        if (!hasAlt1Version("1.4.6")) {
            return capture(rect.x, rect.y, rect.width, rect.height);
        }
        var url = "https://alt1api/pixel/getregion/" + encodeURIComponent(JSON.stringify(Object.assign(Object.assign({}, rect), { format: "raw", quality: 1 })));
        var res = yield fetch(url);
        var imgreader = new ImageStreamReader(res.body.getReader(), rect.width, rect.height);
        return imgreader.nextImage();
    });
}
/**
 * Asynchronously captures multple area's. This method captures the images in the same render frame if possible
 * @param areas
 */
function captureMultiAsync(areas) {
    return __awaiter(this, void 0, void 0, function* () {
        requireAlt1();
        var r = {};
        if (alt1.captureMultiAsync) {
            let bufs = yield alt1.captureMultiAsync(areas);
            for (let a in areas) {
                if (!bufs[a]) {
                    r[a] = null;
                }
                r[a] = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(bufs[a], areas[a].width, areas[a].height);
            }
            return r;
        }
        var capts = [];
        var captids = [];
        for (var id in areas) {
            if (areas[id]) {
                capts.push(areas[id]);
                captids.push(id);
            }
            else {
                r[id] = null;
            }
        }
        if (capts.length == 0) {
            return r;
        }
        if (!hasAlt1Version("1.5.1")) {
            var proms = [];
            for (var a = 0; a < capts.length; a++) {
                proms.push(captureAsync(capts[a]));
            }
            var results = yield Promise.all(proms);
            for (var a = 0; a < capts.length; a++) {
                r[captids[a]] = results[a];
            }
        }
        else {
            var res = yield fetch("https://alt1api/pixel/getregionmulti/" + encodeURIComponent(JSON.stringify({ areas: capts, format: "raw", quality: 1 })));
            var imgreader = new ImageStreamReader(res.body.getReader());
            for (var a = 0; a < capts.length; a++) {
                var capt = capts[a];
                imgreader.setFrameBuffer(new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(capt.width, capt.height));
                r[captids[a]] = yield imgreader.nextImage();
            }
        }
        return r;
    });
}
/**
 * Starts capturing a realtime stream of the game. Make sure you keep reading the stream and close it when you're done or Alt1 WILL crash
 * @param framecb Called whenever a new frame is decoded
 * @param errorcb Called whenever an error occurs, the error is rethrown if not defined
 * @param fps Maximum fps of the stream
 */
function captureStream(x, y, width, height, fps, framecb, errorcb) {
    requireAlt1();
    if (!hasAlt1Version("1.4.6")) {
        throw new Alt1Error("This function is not supported in this version of Alt1");
    }
    var url = "https://alt1api/pixel/streamregion/" + encodeURIComponent(JSON.stringify({ x, y, width, height, fps, format: "raw" }));
    var res = fetch(url).then((res) => __awaiter(this, void 0, void 0, function* () {
        var reader = new ImageStreamReader(res.body.getReader(), width, height);
        try {
            while (!reader.closed && !state.closed) {
                var img = yield reader.nextImage();
                if (!state.closed) {
                    framecb(img);
                    state.framenr++;
                }
            }
        }
        catch (e) {
            if (!state.closed) {
                reader.close();
                if (errorcb) {
                    errorcb(e);
                }
                else {
                    throw e;
                }
            }
        }
        if (!reader.closed && state.closed) {
            reader.close();
        }
    }));
    var state = {
        x, y, width, height,
        framenr: 0,
        close: () => { state.closed = true; },
        closed: false,
    };
    return state;
}


/***/ }),

/***/ "./images/RewardValue.data.png":
/*!*************************************!*\
  !*** ./images/RewardValue.data.png ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "./images/RewardValueLegacy.data.png":
/*!*******************************************!*\
  !*** ./images/RewardValueLegacy.data.png ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "./images/TrailComplete.data.png":
/*!***************************************!*\
  !*** ./images/TrailComplete.data.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "./images/TrailCompleteLegacy.data.png":
/*!*********************************************!*\
  !*** ./images/TrailCompleteLegacy.data.png ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "./images/eocbotleft.data.png":
/*!************************************!*\
  !*** ./images/eocbotleft.data.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAE4SURBVChTfZFNS8NAEIbfbrLpbto0ba0KWqTYQg89CMUKghf/mb/MkyB40IOIHxfRSimWSkNtkzTZrMlYbzUPzO7szs7wziy6g3PNnIY26/u60z/TKcgzZnIDGUIIqFiRnweLIwXGi3SwioL2PJglinCrLoIggFLR+vp/2CoIEab2x17vWK/djVAPKlqBGww68jEZDXOT2PJ7gUglZEnBAk/7mYzHaLR7G5NYtmTVsynZ5RJsx6HAcj7fmGQyvaLqYeCBGSY9zJIzatU6yeufnOLu6hLakmAFLiloOy4aO7s4aHXobKXfI0tlknd7c43u0QCfr88wtpvti0THWKS9eLMpmq1DyHTU3N3Cx/AdJVugUq7Am4ww+5r+TskSkmToKMTL4z2ElHh7ekBicpLl1mrwfR+tThc/Sc6HTgcfco4AAAAASUVORK5CYII=")

/***/ }),

/***/ "./images/eoctopleft.data.png":
/*!************************************!*\
  !*** ./images/eoctopleft.data.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAABmUExURQwaIxMiKhsrNCItNSs6RCMyPCg1Px8KCRolLCsODTQRDzNDTREdJEQaFkIUEzsTEgkVHEoVFEsaFUwcGlIeGjwZFVEkI2mAjXOLl2B2g1pvey09SBMYHFRmcRMlMDlLVyM6RgQSG8bROHQAAAAJbm9QRQAAAAAAAAAAAKGKctUAAABzSURBVBhXNcnbFsIgDETRtI3FIKSQBPBe/f+fFHE5T2evAYBpXhDxsODae3X/wRGdI0/kPXk4hd6Rt8iRISTnOYuIqkFKVNiymKl+sbGJZYvj8cKqVcfjiGNW5fpDabWUer4MtPlaarthx/0xT8+9vd7hA+tIB9rzLA2SAAAAAElFTkSuQmCC")

/***/ }),

/***/ "./images/eocx.data.png":
/*!******************************!*\
  !*** ./images/eocx.data.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAMAAAAcqPc3AAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAFKUExURQAAABkqMxIdIxMiKgQSGwINFAIVIUFTXyQyPAkVHRIgKCYtNUAJBn4xGKUyKNBaSj4JBicuNhMlMAwaIxEcISEnLz8IBe/FY+mcV8ZPQj8JByAkKBwwPGEKBJYlHeGQSP7KXEAKBzlLVyEmKzYGBYgaFNWDOvy/SSEuOTE6Q0sKB2sKB811Kvy0NXIKBgwYHjNDTQMJDBsnL0BETGMLCX4PCcVpG/upI2IMCgMDBBgmLzU5QWIKCJYwCPqgEr9eDjU9Ris6RAYMDxYiKWUWDWQWDTM5QDpOWixBTRwoMDE0OlsMDVoMDSsxOQcVHl1xfS09SAYNEBgkKlsLDCsuNUBQWg8dJic1QRItOwYRGDExNlwLDDY9RjlIUlNmcQweKSYuNTQ+RkxeagEFC0daZSM6RgoiLhokKktgbAIbJwQQFgwRFRMdIwAAAMy8RMYAAABudFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AoAU8MwAAAAlub1BFAAAAAAAAAAAAoYpy1QAAAa1JREFUKFMlkf9T00AQxe+ye/QWbdA8FdBr0GihWmgStYjWggWVICj1Wyl+i4opWvX//9VjfPNmduYzO/vezKq/OiDNZqZmZfbc+Xo4NxfWL1ycVRGTZXDN4tLlK/X5hcXFhfn61WuKyRkJ/uNGvHR9yTtu3FBwLJzYQG7eajTDcHllZTkMmw1lhdnUWmJu32k343h1bW01jpsdZVKBQYb87r37ne76g3XvbmdDsYAYyOTho97j/uZWt7u12d94ooRhWCgbpNs7vaf9jlf/2fNdZQFf05ItsL33Yr/tdfBy95WyTpPVdOh4iNdvem8b7YN370es7JCgB4dHGFMhx3sfPu5/+jyCVrnWMF9KcQxd4Hjn67fvIzitTiTTPyJUgWGKCuSScemQK2bKHFXMKYHLISWAx4ECs05kAi8GnSaYWOSoVIkJbJUlw2rA3KoxjoI8qCI1LlFGtUIDlOifAXwEKg3lyplfhSNMzFQnZ/l5WkWcqnFVFQ4li8lzgaVcrAafKn+FzjKn/jvsKP+dkoj1nCBIxQgk8k3EU9GBUX5Mp2yMYb9tTJoSt/6cmH+D5EJZGWljEQAAAABJRU5ErkJggg==")

/***/ }),

/***/ "./images/legacybotleft.data.png":
/*!***************************************!*\
  !*** ./images/legacybotleft.data.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAHCAIAAACz0DtzAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAADVSURBVChTY5zQWSYsJLZl6xYWZtY/f39fuXaDgYGBjYX515+/fDy8P358AzJAip4/f6mjrbt3376PHz8AVfz99wdIQgAzEwuQywThXLl62dnJiY2NDSjEy80vJCgCJIGIn18AyAYpsnP2sbRxA6rz8fYBcoGWfv/+DUhCGEARxr72skuXrrx4eE/fzBzIB9q7eu0qIAMCINYxa6gp/fzxnUdA8OvXb0B0//797z9AuiEqgNYBuYwJkV6/f4FMhkgAgaiIMCc72+9/v//8/s/Cyvjn938ASgxr+1oDceAAAAAASUVORK5CYII=")

/***/ }),

/***/ "./images/legacytopleft.data.png":
/*!***************************************!*\
  !*** ./images/legacytopleft.data.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAEmSURBVChTTZDJSgNBEIZ7melk9kFRRk0i+ALe9OojePMJvXnw7FkQvXkRNzwFFEVISDJLT3ePf9uDsSh+vir+ql7o5cX5zfUVIeT+7lakKYAzTwgB8LivdGs7s+lDsTeCI9sufM/vTKeNAkgpa1kp1SLZ4dExHJs7Y8whsyzHaBCEPQxDuylhTbF/kKXx1/enbBu0MAoty1XXGcf07PQkzzfeP6aT0Rj1/1iuqjgKANaE5fP57PHpRWnjceZUDKKyXLhybXp+fZvsbmFOGeIxMgyTulyAGaMMr/jdTYTHO8rR5dzqcmkdCGM6FgYRyKkYCDgAcZwAEHYNEt/VyhYqlZZNv7WqSgeUMiRzxV/g2T0RorWGomPv5Au/qtejDhA4DheglP0Aa2SQg761+aoAAAAASUVORK5CYII=")

/***/ }),

/***/ "./images/legacyx.data.png":
/*!*********************************!*\
  !*** ./images/legacyx.data.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4T6WTsWvbUBDGP4MHZegf4S0uZLChQ7QlkKHOlECXGjzUY8dAps6dsmYqmYrJ1GQIOENAHgzq0GIPLWRUIIFnsOG9QaCDCBru7j3ZMZmaWyQ97n7f3XdPtdZm4x9eETUGnHw9wmxmYBYOeASiN5EiS5IHlSsKj/xNsHmB028XEMCX4z6yzMDmFkSEqB5JkkQ9qkABwznWWVxcTxXQ7x3CGLMs8ooMIQIi31AA8xmLDW884POnQ2QMIMLZeSJC3Q+7kOq66g4uUz0/iOXYLAyS8a120P3YgZ1bST77PqzmZgiLDy4VyrG/F8tIJrdIRh7Q73WQ3RstJMKPK1UL6lXxToyC5QE4BoQOGODmFianyrDhjYf46t3ttgAL7y3nJ79XOjDGwuVOXQeQjFJZX+Q9iN+1FVUSinKtg+CB4/ZKQjKeANio5taXAnHrrRRzzJxF+vOFDniuMH+81ZDX9E9WwVrNBlAWYLFnWzD3usb0lwLaLU5cGjmZKqTZbIBQwM0JafCA15U9GClgSPCBC9gDvlDBPNkUd2BXAJ3323ALpzexRDVnmF2LlpbIVbaE6d9MLxK3yz+HJMqa/K7WbCROqbZAyO6MAm7v9BL9TzwBIN4z8nZ7bgEAAAAASUVORK5CYII=")

/***/ }),

/***/ "../node_modules/@alt1/ocr/dist/index.js":
/*!***********************************************!*\
  !*** ../node_modules/@alt1/ocr/dist/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetChatColorMono": () => (/* binding */ GetChatColorMono),
/* harmony export */   "canblend": () => (/* binding */ canblend),
/* harmony export */   "debug": () => (/* binding */ debug),
/* harmony export */   "debugFont": () => (/* binding */ debugFont),
/* harmony export */   "debugout": () => (/* binding */ debugout),
/* harmony export */   "decompose2col": () => (/* binding */ decompose2col),
/* harmony export */   "decompose3col": () => (/* binding */ decompose3col),
/* harmony export */   "decomposeblack": () => (/* binding */ decomposeblack),
/* harmony export */   "findChar": () => (/* binding */ findChar),
/* harmony export */   "findReadLine": () => (/* binding */ findReadLine),
/* harmony export */   "generatefont": () => (/* binding */ generatefont),
/* harmony export */   "getChatColor": () => (/* binding */ getChatColor),
/* harmony export */   "readChar": () => (/* binding */ readChar),
/* harmony export */   "readLine": () => (/* binding */ readLine),
/* harmony export */   "readSmallCapsBackwards": () => (/* binding */ readSmallCapsBackwards),
/* harmony export */   "unblendBlackBackground": () => (/* binding */ unblendBlackBackground),
/* harmony export */   "unblendKnownBg": () => (/* binding */ unblendKnownBg),
/* harmony export */   "unblendTrans": () => (/* binding */ unblendTrans)
/* harmony export */ });
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js");

var debug = {
    printcharscores: false,
    trackread: false
};
var debugout = {};
/**
 * draws the font definition to a buffer and displays it in the dom for debugging purposes
 * @param font
 */
function debugFont(font) {
    var spacing = font.width + 2;
    var buf = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(spacing * font.chars.length, font.height + 1);
    for (var a = 0; a < buf.data.length; a += 4) {
        buf.data[a] = buf.data[a + 1] = buf.data[a + 2] = 0;
        buf.data[a + 3] = 255;
    }
    for (var a = 0; a < font.chars.length; a++) {
        var bx = a * spacing;
        var chr = font.chars[a];
        for (var b = 0; b < chr.pixels.length; b += (font.shadow ? 4 : 3)) {
            buf.setPixel(bx + chr.pixels[b], chr.pixels[b + 1], [chr.pixels[b + 2], chr.pixels[b + 2], chr.pixels[b + 2], 255]);
            if (font.shadow) {
                buf.setPixel(bx + chr.pixels[b], chr.pixels[b + 1], [chr.pixels[b + 3], 0, 0, 255]);
            }
        }
    }
    buf.show();
}
function unblendBlackBackground(img, r, g, b) {
    var rimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(img.width, img.height);
    for (var i = 0; i < img.data.length; i += 4) {
        var col = decomposeblack(img.data[i], img.data[i + 1], img.data[i + 2], r, g, b);
        rimg.data[i + 0] = col[0] * 255;
        rimg.data[i + 1] = rimg.data[i + 0];
        rimg.data[i + 2] = rimg.data[i + 0];
        rimg.data[i + 3] = 255;
    }
    return rimg;
}
/**
 * unblends a imagebuffer into match strength with given color
 * the bgimg argument should contain a second image with pixel occluded by the font visible.
 * @param img
 * @param shadow detect black as second color
 * @param bgimg optional second image to
 */
function unblendKnownBg(img, bgimg, shadow, r, g, b) {
    if (bgimg && (img.width != bgimg.width || img.height != bgimg.height)) {
        throw "bgimg size doesn't match";
    }
    var rimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(img.width, img.height);
    var totalerror = 0;
    for (var i = 0; i < img.data.length; i += 4) {
        var col = decompose2col(img.data[i], img.data[i + 1], img.data[i + 2], r, g, b, bgimg.data[i + 0], bgimg.data[i + 1], bgimg.data[i + 2]);
        if (shadow) {
            if (col[2] > 0.01) {
                console.log("high error component: " + (col[2] * 100).toFixed(1) + "%");
            }
            totalerror += col[2];
            var m = 1 - col[1] - Math.abs(col[2]); //main color+black=100%-bg-error
            rimg.data[i + 0] = m * 255;
            rimg.data[i + 1] = col[0] / m * 255;
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        else {
            rimg.data[i + 0] = col[0] * 255;
            rimg.data[i + 1] = rimg.data[i + 0];
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        rimg.data[i + 3] = 255;
    }
    return rimg;
}
/**
 * Unblends a font image that is already conpletely isolated to the raw image used ingame. This is the easiest mode for pixel fonts where alpha is 0 or 255, or for extracted font files.
 * @param img
 * @param r
 * @param g
 * @param b
 * @param shadow whether the font has a black shadow
 */
function unblendTrans(img, shadow, r, g, b) {
    var rimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(img.width, img.height);
    var pxlum = r + g + b;
    for (var i = 0; i < img.data.length; i += 4) {
        if (shadow) {
            var lum = img.data[i + 0] + img.data[i + 1] + img.data[i + 2];
            rimg.data[i + 0] = img.data[i + 3];
            rimg.data[i + 1] = lum / pxlum * 255;
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        else {
            rimg.data[i + 0] = img.data[i + 3];
            rimg.data[i + 1] = rimg.data[i + 0];
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        rimg.data[i + 3] = 255;
    }
    return rimg;
}
/**
 * Determised wether color [rgb]m can be a result of a blend with color [rgb]1 that is p (0-1) of the mix
 * It returns the number that the second color has to lie outside of the possible color ranges
 * @param rm resulting color
 * @param r1 first color of the mix (the other color is unknown)
 * @param p the portion of the [rgb]1 in the mix (0-1)
 */
function canblend(rm, gm, bm, r1, g1, b1, p) {
    var m = Math.min(50, p / (1 - p));
    var r = rm + (rm - r1) * m;
    var g = gm + (gm - g1) * m;
    var b = bm + (bm - b1) * m;
    return Math.max(-r, -g, -b, r - 255, g - 255, b - 255);
}
/**
 * decomposes a color in 2 given component colors and returns the amount of each color present
 * also return a third (noise) component which is the the amount leftover orthagonal from the 2 given colors
 */
function decompose2col(rp, gp, bp, r1, g1, b1, r2, g2, b2) {
    //get the normal of the error (cross-product of both colors)
    var r3 = g1 * b2 - g2 * b1;
    var g3 = b1 * r2 - b2 * r1;
    var b3 = r1 * g2 - r2 * g1;
    //normalize to length 255
    var norm = 255 / Math.sqrt(r3 * r3 + g3 * g3 + b3 * b3);
    r3 *= norm;
    g3 *= norm;
    b3 *= norm;
    return decompose3col(rp, gp, bp, r1, g1, b1, r2, g2, b2, r3, g3, b3);
}
/**
 * decomposes a pixel in a given color component and black and returns what proportion of the second color it contains
 * this is not as formal as decompose 2/3 and only give a "good enough" number
 */
function decomposeblack(rp, gp, bp, r1, g1, b1) {
    var dr = Math.abs(rp - r1);
    var dg = Math.abs(gp - g1);
    var db = Math.abs(bp - b1);
    var maxdif = Math.max(dr, dg, db);
    return [1 - maxdif / 255];
}
/**
 * decomposes a color in 3 given component colors and returns the amount of each color present
 */
function decompose3col(rp, gp, bp, r1, g1, b1, r2, g2, b2, r3, g3, b3) {
    //P=x*C1+y*C2+z*C3
    //assemble as matrix 
    //M*w=p
    //get inverse of M
    //dirty written out version of cramer's rule
    var A = g2 * b3 - b2 * g3;
    var B = g3 * b1 - b3 * g1;
    var C = g1 * b2 - b1 * g2;
    var D = b2 * r3 - r2 * b3;
    var E = b3 * r1 - r3 * b1;
    var F = b1 * r2 - r1 * b2;
    var G = r2 * g3 - g2 * r3;
    var H = r3 * g1 - g3 * r1;
    var I = r1 * g2 - g1 * r2;
    var det = r1 * A + g1 * D + b1 * G;
    //M^-1*p=w
    var x = (A * rp + D * gp + G * bp) / det;
    var y = (B * rp + E * gp + H * bp) / det;
    var z = (C * rp + F * gp + I * bp) / det;
    return [x, y, z];
}
/**
 * brute force to the exact position of the text
 */
function findChar(buffer, font, col, x, y, w, h) {
    if (x < 0) {
        return null;
    }
    if (y - font.basey < 0) {
        return null;
    }
    if (x + w + font.width > buffer.width) {
        return null;
    }
    if (y + h - font.basey + font.height > buffer.height) {
        return null;
    }
    var best = 1000; //TODO finetune score constants
    var bestchar = null;
    for (var cx = x; cx < x + w; cx++) {
        for (var cy = y; cy < y + h; cy++) {
            var chr = readChar(buffer, font, col, cx, cy, false, false);
            if (chr != null && chr.sizescore < best) {
                best = chr.sizescore;
                bestchar = chr;
            }
        }
    }
    return bestchar;
}
/**
 * reads text with unknown exact coord or color. The given coord should be inside the text
 * color selection not implemented yet
 */
function findReadLine(buffer, font, cols, x, y, w = -1, h = -1) {
    if (w == -1) {
        w = font.width + font.spacewidth;
        x -= Math.ceil(w / 2);
    }
    if (h == -1) {
        h = 7;
        y -= 1;
    }
    var chr = null;
    if (cols.length > 1) {
        //TODO use getChatColor() instead for non-mono?
        var sorted = GetChatColorMono(buffer, new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.Rect(x, y - font.basey, w, h), cols);
        //loop until we have a match (max 2 cols)
        for (var a = 0; a < 2 && a < sorted.length && chr == null; a++) {
            chr = findChar(buffer, font, sorted[a].col, x, y, w, h);
        }
    }
    else {
        chr = findChar(buffer, font, cols[0], x, y, w, h);
    }
    if (chr == null) {
        return { debugArea: { x, y, w, h }, text: "", fragments: [] };
    }
    return readLine(buffer, font, cols, chr.x, chr.y, true, true);
}
function GetChatColorMono(buf, rect, colors) {
    var colormap = colors.map(c => ({ col: c, score: 0 }));
    if (rect.x < 0 || rect.y < 0 || rect.x + rect.width > buf.width || rect.y + rect.height > buf.height) {
        return colormap;
    }
    var data = buf.data;
    var maxd = 50;
    for (var colobj of colormap) {
        var score = 0;
        var col = colobj.col;
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            for (var x = rect.x; x < rect.x + rect.width; x++) {
                var i = x * 4 + y * 4 * buf.width;
                var d = Math.abs(data[i] - col[0]) + Math.abs(data[i + 1] - col[1]) + Math.abs(data[i + 2] - col[2]);
                if (d < maxd) {
                    score += maxd - d;
                }
            }
        }
        colobj.score = score;
    }
    return colormap.sort((a, b) => b.score - a.score);
}
function unblend(r, g, b, R, G, B) {
    var m = Math.sqrt(r * r + g * g + b * b);
    var n = Math.sqrt(R * R + G * G + B * B);
    var x = (r * R + g * G + b * B) / n;
    var y = Math.sqrt(Math.max(0, m * m - x * x));
    var r1 = Math.max(0, (63.75 - y) * 4);
    var r2 = x / n * 255;
    if (r2 > 255) //brighter than refcol
     {
        r1 = Math.max(0, r1 - r2 + 255);
        r2 = 255;
    }
    return [r1, r2];
}
function getChatColor(buf, rect, colors) {
    var bestscore = -1.0;
    var best = null;
    var b2 = 0.0;
    var data = buf.data;
    for (let col of colors) {
        var score = 0.0;
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            for (var x = rect.x; x < rect.x + rect.width; x++) {
                if (x < 0 || x + 1 >= buf.width) {
                    continue;
                }
                if (y < 0 || y + 1 >= buf.width) {
                    continue;
                }
                let i1 = buf.pixelOffset(x, y);
                let i2 = buf.pixelOffset(x + 1, y + 1);
                var pixel1 = unblend(data[i1 + 0], data[i1 + 1], data[i1 + 2], col[0], col[1], col[2]);
                var pixel2 = unblend(data[i2 + 0], data[i2 + 1], data[i2 + 2], col[0], col[1], col[2]);
                //TODO this is from c# can simplify a bit
                var s = (pixel1[0] / 255 * pixel1[1] / 255) * (pixel2[0] / 255 * (255.0 - pixel2[1]) / 255);
                score += s;
            }
        }
        if (score > bestscore) {
            b2 = bestscore;
            bestscore = score;
            best = col;
        }
        else if (score > b2) {
            b2 = score;
        }
    }
    //Console.WriteLine("color: " + bestcol + " - " + (bestscore - b2));
    //bestscore /= rect.width * rect.height;
    return best;
}
/**
 * reads a line of text with exactly known position and color. y should be the y coord of the text base line, x should be the first pixel of a new character
 */
function readLine(buffer, font, colors, x, y, forward, backward = false) {
    if (typeof colors[0] != "number" && colors.length == 1) {
        colors = colors[0];
    }
    var multicol = typeof colors[0] != "number";
    var allcolors = multicol ? colors : [colors];
    var detectcolor = function (sx, sy, backward) {
        var w = Math.floor(font.width * 1.5);
        if (backward) {
            sx -= w;
        }
        sy -= font.basey;
        return getChatColor(buffer, { x: sx, y: sy, width: w, height: font.height }, allcolors);
    };
    var fragments = [];
    var x1 = x;
    var x2 = x;
    var maxspaces = (typeof font.maxspaces == "number" ? font.maxspaces : 1);
    let fragtext = "";
    let fraghadprimary = false;
    var lastcol = null;
    let addfrag = (forward) => {
        if (!fragtext) {
            return;
        }
        let frag = {
            text: fragtext,
            color: lastcol,
            index: 0,
            xstart: x + (forward ? fragstartdx : fragenddx),
            xend: x + (forward ? fragenddx : fragstartdx)
        };
        if (forward) {
            fragments.push(frag);
        }
        else {
            fragments.unshift(frag);
        }
        fragtext = "";
        fragstartdx = dx;
        fraghadprimary = false;
    };
    for (var dirforward of [true, false]) {
        //init vars
        if (dirforward && !forward) {
            continue;
        }
        if (!dirforward && !backward) {
            continue;
        }
        var dx = 0;
        var fragstartdx = dx;
        var fragenddx = dx;
        var triedspaces = 0;
        var triedrecol = false;
        var col = multicol ? null : colors;
        while (true) {
            col = col || detectcolor(x + dx, y, !dirforward);
            var chr = (col ? readChar(buffer, font, col, x + dx, y, !dirforward, true) : null);
            if (col == null || chr == null) {
                if (triedspaces < maxspaces) {
                    dx += (dirforward ? 1 : -1) * font.spacewidth;
                    triedspaces++;
                    continue;
                }
                if (multicol && !triedrecol && fraghadprimary) {
                    dx -= (dirforward ? 1 : -1) * triedspaces * font.spacewidth;
                    triedspaces = 0;
                    col = null;
                    triedrecol = true;
                    continue;
                }
                if (dirforward) {
                    x2 = x + dx - font.spacewidth;
                }
                else {
                    x1 = x + dx + font.spacewidth;
                }
                break;
            }
            else {
                if (lastcol && (col[0] != lastcol[0] || col[1] != lastcol[1] || col[2] != lastcol[2])) {
                    addfrag(dirforward);
                }
                var spaces = "";
                for (var a = 0; a < triedspaces; a++) {
                    spaces += " ";
                }
                if (dirforward) {
                    fragtext += spaces + chr.chr;
                }
                else {
                    fragtext = chr.chr + spaces + fragtext;
                }
                if (!chr.basechar.secondary) {
                    fraghadprimary = true;
                }
                triedspaces = 0;
                triedrecol = false;
                dx += (dirforward ? 1 : -1) * chr.basechar.width;
                fragenddx = dx;
                lastcol = col;
            }
        }
        if (lastcol && fraghadprimary) {
            addfrag(dirforward);
        }
    }
    fragments.forEach((f, i) => f.index = i);
    return {
        debugArea: { x: x1, y: y - 9, w: x2 - x1, h: 10 },
        text: fragments.map(f => f.text).join(""),
        fragments
    };
}
/**
 * Reads a line of text that uses a smallcaps font, these fonts can have duplicate chars that only have a different amount of
 * empty space after the char before the next char starts.
 * The coordinates should be near the end of the string, or a rectangle with high 1 containing all points where the string can end.
 */
function readSmallCapsBackwards(buffer, font, cols, x, y, w = -1, h = -1) {
    if (w == -1) {
        w = font.width + font.spacewidth;
        x -= Math.ceil(w / 2);
    }
    if (h == -1) {
        h = 7;
        y -= 1;
    }
    var matchedchar = null;
    var sorted = (cols.length == 1 ? [{ col: cols[0], score: 1 }] : GetChatColorMono(buffer, new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.Rect(x, y - font.basey, w, h), cols));
    //loop until we have a match (max 2 cols)
    for (var a = 0; a < 2 && a < sorted.length && matchedchar == null; a++) {
        for (var cx = x + w - 1; cx >= x; cx--) {
            var best = 1000; //TODO finetune score constants
            var bestchar = null;
            for (var cy = y; cy < y + h; cy++) {
                var chr = readChar(buffer, font, sorted[a].col, cx, cy, true, false);
                if (chr != null && chr.sizescore < best) {
                    best = chr.sizescore;
                    bestchar = chr;
                }
            }
            if (bestchar) {
                matchedchar = bestchar;
                break;
            }
        }
    }
    if (matchedchar == null) {
        return { text: "", debugArea: { x, y, w, h } };
    }
    return readLine(buffer, font, cols, matchedchar.x, matchedchar.y, false, true);
}
/**
 * Reads a single character at the exact given location
 * @param x exact x location of the start of the character domain (includes part of the spacing between characters)
 * @param y exact y location of the baseline pixel of the character
 * @param backwards read in backwards direction, the x location should be the first pixel after the character domain in that case
 */
function readChar(buffer, font, col, x, y, backwards, allowSecondary) {
    y -= font.basey;
    var shiftx = 0;
    var shifty = font.basey;
    var shadow = font.shadow;
    var debugobj = null;
    var debugimg = null;
    if (debug.trackread) {
        var name = x + ";" + y + " " + JSON.stringify(col);
        if (!debugout[name]) {
            debugout[name] = [];
        }
        debugobj = debugout[name];
    }
    //===== make sure the full domain is inside the bitmap/buffer ======
    if (y < 0 || y + font.height >= buffer.height) {
        return null;
    }
    if (!backwards) {
        if (x < 0 || x + font.width > buffer.width) {
            return null;
        }
    }
    else {
        if (x - font.width < 0 || x > buffer.width) {
            return null;
        }
    }
    //====== start reading the char ======
    var scores = [];
    for (var chr = 0; chr < font.chars.length; chr++) {
        var chrobj = font.chars[chr];
        if (chrobj.secondary && !allowSecondary) {
            continue;
        }
        scores[chr] = { score: 0, sizescore: 0, chr: chrobj };
        var chrx = (backwards ? x - chrobj.width : x);
        if (debug.trackread) {
            debugimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(font.width, font.height);
        }
        for (var a = 0; a < chrobj.pixels.length;) {
            var i = (chrx + chrobj.pixels[a]) * 4 + (y + chrobj.pixels[a + 1]) * buffer.width * 4;
            var penalty = 0;
            if (!shadow) {
                penalty = canblend(buffer.data[i], buffer.data[i + 1], buffer.data[i + 2], col[0], col[1], col[2], chrobj.pixels[a + 2] / 255);
                a += 3;
            }
            else {
                var lum = chrobj.pixels[a + 3] / 255;
                penalty = canblend(buffer.data[i], buffer.data[i + 1], buffer.data[i + 2], col[0] * lum, col[1] * lum, col[2] * lum, chrobj.pixels[a + 2] / 255);
                a += 4;
            }
            scores[chr].score += Math.max(0, penalty);
            //TODO add compiler flag to this to remove it for performance
            if (debugimg) {
                debugimg.setPixel(chrobj.pixels[a], chrobj.pixels[a + 1], [penalty, penalty, penalty, 255]);
            }
        }
        scores[chr].sizescore = scores[chr].score - chrobj.bonus;
        if (debugobj) {
            debugobj.push({ chr: chrobj.chr, score: scores[chr].sizescore, rawscore: scores[chr].score, img: debugimg });
        }
    }
    scores.sort((a, b) => a.sizescore - b.sizescore);
    if (debug.printcharscores) {
        scores.slice(0, 5).forEach(q => console.log(q.chr.chr, q.score.toFixed(3), q.sizescore.toFixed(3)));
    }
    var winchr = scores[0];
    if (!winchr || winchr.score > 400) {
        return null;
    }
    return { chr: winchr.chr.chr, basechar: winchr.chr, x: x + shiftx, y: y + shifty, score: winchr.score, sizescore: winchr.sizescore };
}
/**
 * Generates a font json description to use in reader functions
 * @param unblended A source image with all characters lined up. The image should be unblended into components using the unblend functions
 * The lowest pixel line of this image is used to mark the location and size of the charecters if the red component is 255 it means there is a character on that pixel column
 * @param chars A string containing all the characters of the image in the same order
 * @param seconds A string with characters that are considered unlikely and should only be detected if no other character is possible.
 * For example the period (.) character matches positive inside many other characters and should be marked as secondary
 * @param bonusses An object that contains bonus scores for certain difficult characters to make the more likely to be red.
 * @param basey The y position of the baseline pixel of the font
 * @param spacewidth the number of pixels a space takes
 * @param treshold minimal color match proportion (0-1) before a pixel is used for the font
 * @param shadow whether this font also uses the black shadow some fonts have. The "unblended" image should be unblended correspondingly
 * @returns a javascript object describing the font which is used as input for the different read functions
 */
function generatefont(unblended, chars, seconds, bonusses, basey, spacewidth, treshold, shadow) {
    //settings vars
    treshold *= 255;
    //initial vars
    var miny = unblended.height - 1;
    var maxy = 0;
    var font = { chars: [], width: 0, spacewidth: spacewidth, shadow: shadow, height: 0, basey: 0 };
    var ds = false;
    var chardata = [];
    //index all chars
    for (var dx = 0; dx < unblended.width; dx++) {
        var i = 4 * dx + 4 * unblended.width * (unblended.height - 1);
        if (unblended.data[i] == 255 && unblended.data[i + 3] == 255) {
            if (ds === false) {
                ds = dx;
            }
        }
        else {
            if (ds !== false) {
                //char found, start detection
                var de = dx;
                var char = chars[chardata.length];
                var chr = {
                    ds: ds,
                    de: de,
                    width: de - ds,
                    chr: char,
                    bonus: (bonusses && bonusses[char]) || 0,
                    secondary: seconds.indexOf(chars[chardata.length]) != -1,
                    pixels: []
                };
                chardata.push(chr);
                font.width = Math.max(font.width, chr.width);
                for (x = 0; x < de - ds; x++) {
                    for (y = 0; y < unblended.height - 1; y++) {
                        var i = (x + ds) * 4 + y * unblended.width * 4;
                        if (unblended.data[i] >= treshold) {
                            miny = Math.min(miny, y);
                            maxy = Math.max(maxy, y);
                        }
                    }
                }
                ds = false;
            }
        }
    }
    font.height = maxy + 1 - miny;
    font.basey = basey - miny;
    //detect all pixels
    for (var a in chardata) {
        var chr = chardata[a];
        for (var x = 0; x < chr.width; x++) {
            for (var y = 0; y < maxy + 1 - miny; y++) {
                var i = (x + chr.ds) * 4 + (y + miny) * unblended.width * 4;
                if (unblended.data[i] >= treshold) {
                    chr.pixels.push(x, y);
                    chr.pixels.push(unblended.data[i]);
                    if (shadow) {
                        chr.pixels.push(unblended.data[i + 1]);
                    }
                    chr.bonus += 5;
                }
            }
        }
        //prevent js from doing the thing with unnecessary output precision
        chr.bonus = +chr.bonus.toFixed(3);
        font.chars.push({ width: chr.width, bonus: chr.bonus, chr: chr.chr, pixels: chr.pixels, secondary: chr.secondary });
    }
    return font;
}


/***/ }),

/***/ "../node_modules/@alt1/ocr/fonts/aa_9px_mono_allcaps.js":
/*!**************************************************************!*\
  !*** ../node_modules/@alt1/ocr/fonts/aa_9px_mono_allcaps.js ***!
  \**************************************************************/
/***/ (function(module) {

!function(s,e){ true?module.exports=e():0
}("undefined"!=typeof self?self:this,(function(){return s=[s=>{s.exports={chars:[{width:3,bonus:55,chr:"!",pixels:[0,4,221,0,5,170,0,6,153,0,12,153,1,3,221,1,4,255,1,5,221,1,6,204,1,7,170,1,8,153,1,12,204],secondary:!1},{width:6,bonus:30,chr:'"',
pixels:[1,2,221,1,3,255,1,4,170,3,2,221,3,3,255,3,4,170],secondary:!0},{width:9,bonus:160,chr:"#",
pixels:[1,5,221,1,8,255,2,5,255,2,7,153,2,8,255,2,9,204,2,10,238,2,11,238,3,2,187,3,3,238,3,4,255,3,5,255,3,6,170,3,7,170,3,8,255,4,5,255,4,8,255,5,4,153,5,5,255,5,6,170,5,7,204,5,8,255,5,9,238,5,10,204,5,11,170,6,2,238,6,3,204,6,4,204,6,5,255,6,8,255,7,5,255,7,8,153],
secondary:!1},{width:7,bonus:145,chr:"$",
pixels:[1,3,204,1,4,255,1,5,187,1,10,153,1,11,204,2,2,187,2,5,221,2,6,255,2,10,170,2,11,255,2,12,221,3,1,153,3,2,238,3,3,221,3,4,238,3,5,204,3,6,238,3,7,255,3,8,153,3,11,221,4,2,221,4,7,255,4,8,221,4,10,187,5,2,170,5,3,187,5,8,221,5,9,255,5,10,153],
secondary:!1},{width:12,bonus:175,chr:"%",
pixels:[1,4,255,1,5,255,1,6,255,2,3,153,2,7,204,3,3,170,3,7,204,3,12,187,4,3,187,4,4,255,4,5,255,4,6,255,4,10,238,4,11,204,5,7,170,5,8,238,5,9,153,6,5,204,6,6,221,6,9,187,6,10,255,6,11,204,7,3,238,7,4,170,7,8,187,7,11,153,7,12,204,8,8,187,8,12,187,9,8,204,9,9,153,9,12,187,10,9,187,10,10,255,10,11,187],
secondary:!1},{width:12,bonus:175,chr:"&",
pixels:[0,9,221,0,10,255,0,11,153,1,5,153,1,8,238,1,9,187,1,10,238,1,11,255,2,4,255,2,5,255,2,6,255,2,7,255,2,11,170,2,12,221,3,3,204,3,7,255,3,8,221,3,12,255,4,3,221,4,8,238,4,9,221,4,12,238,5,3,238,5,9,238,5,10,187,5,12,170,6,4,153,6,10,255,6,11,238,7,10,221,7,11,255,8,8,238,8,9,170,8,12,238,9,12,221],
secondary:!1},{width:3,bonus:15,chr:"'",pixels:[0,2,153,1,2,187,1,3,204],secondary:!0},{width:5,bonus:60,chr:"(",pixels:[0,6,204,0,7,255,0,8,238,0,9,187,1,4,238,1,5,204,1,6,153,1,9,170,1,10,238,1,11,204,2,3,153,2,12,187],secondary:!1},{width:5,
bonus:50,chr:")",pixels:[1,3,204,1,4,153,1,11,221,2,4,153,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,204],secondary:!1},{width:5,bonus:40,chr:"*",pixels:[0,3,170,0,5,153,1,2,187,1,3,187,1,4,221,2,4,170,2,5,221,3,3,153],secondary:!0},{width:8,
bonus:65,chr:"+",pixels:[0,8,153,1,8,255,2,8,255,3,5,153,3,6,255,3,7,255,3,8,255,3,9,255,3,10,255,3,11,153,4,8,255,5,8,255,6,8,187],secondary:!1},{width:3,bonus:10,chr:",",pixels:[1,10,187,1,11,221],secondary:!0},{width:6,bonus:20,chr:"-",
pixels:[0,9,204,1,9,255,2,9,255,3,9,204],secondary:!0},{width:3,bonus:10,chr:".",pixels:[1,11,170,1,12,204],secondary:!0},{width:8,bonus:50,chr:"/",pixels:[0,11,187,1,10,238,2,8,221,2,9,153,3,6,170,3,7,204,4,5,238,5,3,221,5,4,170,6,2,153],
secondary:!1},{width:8,bonus:145,chr:"0",
pixels:[0,7,153,0,8,187,0,9,170,1,5,221,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,238,2,4,187,2,11,170,2,12,204,3,4,187,3,12,204,4,4,221,4,12,187,5,5,255,5,6,255,5,7,204,5,8,187,5,9,187,5,10,238,5,11,238,6,6,187,6,7,238,6,8,255,6,9,221,6,10,170],
secondary:!1},{width:7,bonus:95,chr:"1",pixels:[1,5,153,2,5,255,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,238,3,4,204,3,5,255,3,6,255,3,7,255,3,8,255,3,9,255,3,10,255,3,11,255,3,12,255,4,12,153],secondary:!1},{width:9,bonus:115,chr:"2",
pixels:[1,4,170,1,5,204,1,12,255,2,4,204,2,11,221,2,12,255,3,4,204,3,10,204,3,12,255,4,4,221,4,9,238,4,12,255,5,4,153,5,5,255,5,6,255,5,7,255,5,8,255,5,12,255,6,5,153,6,6,221,6,7,170,6,11,187,6,12,204],secondary:!1},{width:7,bonus:105,chr:"3",
pixels:[0,11,187,0,12,187,1,4,204,1,12,238,2,4,221,2,12,221,3,4,238,3,7,187,3,8,221,3,12,204,4,4,170,4,5,255,4,6,255,4,7,153,4,8,238,4,9,255,4,10,221,4,11,255,5,5,170,5,9,221,5,10,238],secondary:!1},{width:9,bonus:120,chr:"4",
pixels:[1,9,204,1,10,255,2,8,204,2,10,255,3,7,187,3,10,255,4,5,170,4,6,238,4,7,153,4,8,153,4,9,170,4,10,255,4,11,153,4,12,221,5,4,204,5,5,255,5,6,255,5,7,255,5,8,255,5,9,255,5,10,255,5,11,255,5,12,255,6,10,255],secondary:!1},{width:7,bonus:110,
chr:"5",pixels:[0,11,170,0,12,221,1,4,255,1,5,204,1,6,221,1,7,187,1,12,238,2,4,255,2,7,255,2,12,204,3,4,255,3,7,255,3,8,204,3,12,170,4,4,255,4,8,255,4,9,255,4,10,255,4,11,238,5,4,153,5,9,187,5,10,153],secondary:!1},{width:7,bonus:105,chr:"6",
pixels:[0,8,187,0,9,255,0,10,238,1,6,170,1,7,255,1,8,221,1,9,187,1,10,204,1,11,255,2,5,187,2,6,153,2,12,221,3,8,221,3,12,204,4,8,204,4,9,238,4,10,187,4,11,221,5,9,221,5,10,255,5,11,153],secondary:!1},{width:7,bonus:90,chr:"7",
pixels:[0,4,204,0,5,187,1,4,255,1,12,170,2,4,255,2,10,221,2,11,255,2,12,187,3,4,255,3,8,221,3,9,238,3,10,153,4,4,255,4,5,153,4,6,204,4,7,187,5,4,255,5,5,187],secondary:!1},{width:8,bonus:170,chr:"8",
pixels:[0,10,153,1,5,204,1,6,238,1,9,238,1,10,255,1,11,255,2,4,170,2,5,153,2,6,170,2,7,255,2,8,204,2,12,221,3,4,187,3,7,204,3,8,187,3,12,204,4,4,204,4,7,153,4,8,255,4,12,204,5,4,204,5,5,187,5,6,187,5,7,187,5,8,187,5,9,255,5,10,170,5,11,204,5,12,153,6,5,238,6,6,204,6,9,187,6,10,255,6,11,170],
secondary:!1},{width:7,bonus:105,chr:"9",pixels:[0,6,238,0,7,238,0,8,153,1,5,204,1,6,153,1,7,187,1,8,255,2,4,204,2,9,187,3,4,221,3,11,187,4,5,255,4,6,238,4,7,187,4,8,187,4,9,238,4,10,255,5,6,221,5,7,255,5,8,238,5,9,170],secondary:!1},{width:3,
bonus:20,chr:":",pixels:[0,5,170,0,6,204,0,10,204,0,11,170],secondary:!0},{width:3,bonus:25,chr:";",pixels:[0,4,170,0,5,204,0,9,221,0,11,153,1,9,170],secondary:!0},{width:8,bonus:55,chr:"<",
pixels:[1,8,255,1,9,187,2,8,170,2,9,238,3,7,238,4,7,187,4,10,238,5,6,204,5,10,187,6,6,221,6,11,204],secondary:!1},{width:8,bonus:60,chr:"=",pixels:[1,7,255,1,9,255,2,7,255,2,9,255,3,7,255,3,9,255,4,7,255,4,9,255,5,7,255,5,9,255,6,7,255,6,9,255],
secondary:!1},{width:8,bonus:55,chr:">",pixels:[1,6,238,1,11,170,2,6,170,2,10,221,3,7,238,3,10,204,4,7,204,4,9,187,5,8,221,5,9,238,6,8,221],secondary:!1},{width:7,bonus:80,chr:"?",
pixels:[1,3,170,1,4,153,2,3,221,2,9,238,2,12,153,3,3,238,3,7,170,3,8,221,3,12,204,4,3,204,4,4,238,4,5,221,4,6,255,4,7,187,5,4,221,5,5,238],secondary:!1},{width:11,bonus:185,chr:"@",
pixels:[0,7,187,0,8,238,0,9,255,0,10,187,1,5,153,1,6,170,1,11,238,2,12,170,3,7,221,3,8,255,3,9,255,3,10,238,3,12,204,4,3,153,4,6,170,4,12,187,5,3,153,5,5,170,5,8,170,5,9,204,5,12,170,6,3,170,6,5,187,6,6,238,6,7,255,6,8,255,6,9,255,6,10,238,6,12,153,7,3,170,7,10,204,8,4,187,8,9,170,9,5,204,9,6,221,9,7,221,9,8,170],
secondary:!1},{width:10,bonus:125,chr:"A",
pixels:[1,12,238,2,9,187,2,10,238,2,11,170,2,12,187,3,7,221,3,8,204,3,9,238,4,5,238,4,6,238,4,9,221,5,5,187,5,6,255,5,7,255,5,8,187,5,9,238,6,7,153,6,8,255,6,9,255,6,10,238,6,11,153,7,10,221,7,11,255,7,12,255,8,12,221],secondary:!1},{width:8,
bonus:160,chr:"B",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,238,2,9,187,2,10,187,2,11,187,2,12,255,3,4,204,3,8,204,3,12,204,4,4,221,4,5,187,4,7,187,4,8,255,4,12,204,5,5,238,5,6,238,5,9,255,5,10,255,5,11,255,6,10,187],
secondary:!1},{width:9,bonus:120,chr:"C",
pixels:[0,7,221,0,8,255,0,9,221,1,5,221,1,6,255,1,7,238,1,8,221,1,9,255,1,10,255,1,11,204,2,5,187,2,11,255,3,4,204,3,12,204,4,4,221,4,12,238,5,4,221,5,12,221,6,4,221,6,12,238,7,4,187,7,5,204,7,11,187,7,12,170],secondary:!1},{width:11,bonus:200,
chr:"D",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,204,2,12,255,3,4,221,3,12,238,4,4,238,4,12,221,5,4,238,5,12,221,6,4,204,6,5,153,6,12,187,7,5,255,7,6,153,7,11,238,8,5,204,8,6,255,8,7,255,8,8,255,8,9,255,8,10,255,8,11,170,9,7,204,9,8,221,9,9,187],
secondary:!1},{width:7,bonus:135,chr:"E",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,204,2,12,255,3,4,221,3,8,221,3,12,238,4,4,238,4,8,221,4,12,221,5,4,187,5,8,153,5,12,238],secondary:!1},{
width:7,bonus:115,chr:"F",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,187,2,12,238,3,4,221,3,8,221,4,4,238,4,8,221,5,4,221],secondary:!1},{width:10,
bonus:150,chr:"G",
pixels:[0,7,204,0,8,255,0,9,255,0,10,187,1,5,187,1,6,255,1,7,238,1,8,221,1,9,238,1,10,255,1,11,221,2,5,204,2,11,238,3,4,204,3,12,204,4,4,221,4,12,238,5,4,238,5,12,221,6,4,221,6,9,238,6,10,187,6,11,187,6,12,221,7,4,170,7,5,221,7,9,255,7,10,255,7,11,255,7,12,153],
secondary:!1},{width:11,bonus:200,chr:"H",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,187,2,12,238,3,8,221,4,8,221,5,8,221,6,8,221,7,4,255,7,5,255,7,6,255,7,7,255,7,8,255,7,9,255,7,10,255,7,11,255,7,12,255,8,4,238,8,5,187,8,6,187,8,7,187,8,8,187,8,9,187,8,10,187,8,11,187,8,12,238],
secondary:!1},{width:5,bonus:90,chr:"I",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,238],secondary:!1},{width:6,bonus:100,chr:"J",
pixels:[2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,2,12,255,2,13,255,2,14,187,3,4,238,3,5,187,3,6,187,3,7,187,3,8,187,3,9,187,3,10,187,3,11,187,3,12,187],secondary:!1},{width:10,bonus:170,chr:"K",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,255,2,9,204,2,10,187,2,11,187,2,12,238,3,7,170,3,8,255,3,9,221,4,6,204,4,9,238,4,10,238,5,4,153,5,5,238,5,10,238,5,11,238,6,4,255,6,11,238,6,12,187,7,4,153,7,12,255,8,12,153],
secondary:!1},{width:8,bonus:105,chr:"L",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,204,2,12,255,3,12,238,4,12,221,5,12,255],secondary:!1},{
width:13,bonus:190,chr:"M",
pixels:[1,9,170,1,10,204,1,11,238,1,12,255,2,4,187,2,5,255,2,6,255,2,7,238,2,8,153,2,12,153,3,6,238,3,7,255,3,8,238,4,8,238,4,9,255,4,10,238,5,10,238,5,11,255,5,12,187,6,9,153,6,10,238,7,7,153,7,8,238,8,5,170,8,6,255,8,7,238,9,4,153,9,5,204,9,6,255,9,7,255,9,8,255,9,9,255,9,10,255,9,11,255,9,12,238,10,10,153,10,11,187,10,12,255],
secondary:!1},{width:11,bonus:170,chr:"N",
pixels:[0,12,170,1,4,187,1,5,255,1,6,255,1,7,238,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,5,204,2,6,255,2,12,153,3,6,221,3,7,255,4,7,238,4,8,255,5,8,238,5,9,255,6,9,238,6,10,238,7,4,153,7,10,255,7,11,238,8,4,255,8,5,255,8,6,255,8,7,255,8,8,255,8,9,255,8,10,255,8,11,255,8,12,204,9,4,153],
secondary:!1},{width:10,bonus:160,chr:"O",
pixels:[0,7,221,0,8,255,0,9,221,1,5,204,1,6,255,1,7,221,1,8,221,1,9,255,1,10,255,1,11,221,2,5,170,2,11,238,3,4,221,3,12,221,4,4,221,4,12,221,5,4,238,5,12,204,6,4,153,6,5,238,6,11,170,7,5,238,7,6,255,7,7,255,7,8,221,7,9,238,7,10,255,7,11,187,8,6,153,8,7,238,8,8,255,8,9,204],
secondary:!1},{width:8,bonus:130,chr:"P",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,238,3,4,204,4,4,238,5,4,170,5,5,255,5,6,255,5,7,255,5,8,204,6,6,187],secondary:!1},{width:10,
bonus:200,chr:"Q",
pixels:[0,7,221,0,8,255,0,9,221,1,5,187,1,6,255,1,7,238,1,8,221,1,9,255,1,10,255,1,11,221,2,5,170,2,11,238,2,12,153,3,4,221,3,12,221,4,4,221,4,12,238,5,4,238,5,12,204,6,4,153,6,5,238,6,11,153,6,12,238,7,5,221,7,6,255,7,7,255,7,8,221,7,9,238,7,10,255,7,11,170,7,12,204,7,13,221,8,6,153,8,7,238,8,8,255,8,9,221,8,13,255,8,14,170,9,13,170,9,14,255],
secondary:!1},{width:10,bonus:175,chr:"R",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,187,2,9,255,2,10,187,2,11,187,2,12,238,3,4,221,3,9,221,4,4,238,4,9,255,4,10,170,5,4,153,5,5,255,5,6,255,5,7,255,5,8,187,5,10,255,5,11,187,6,6,187,6,11,238,6,12,170,7,12,255,8,12,153],
secondary:!1},{width:7,bonus:95,chr:"S",pixels:[0,11,221,0,12,187,1,5,255,1,6,255,1,7,255,1,12,238,2,4,187,2,7,255,2,8,238,2,12,221,3,4,187,3,8,255,3,9,187,3,12,221,4,4,221,4,8,187,4,9,255,4,10,255,4,11,255],secondary:!1},{width:10,bonus:125,chr:"T",
pixels:[0,4,187,1,4,221,2,4,221,3,4,255,3,5,187,3,6,187,3,7,187,3,8,187,3,9,187,3,10,187,3,11,187,3,12,238,4,4,255,4,5,255,4,6,255,4,7,255,4,8,255,4,9,255,4,10,255,4,11,255,4,12,255,5,4,221,5,12,153,6,4,221,7,4,255],secondary:!1},{width:11,bonus:145,
chr:"U",
pixels:[1,4,238,1,5,187,1,6,187,1,7,187,1,8,187,1,9,187,1,10,153,2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,3,11,170,3,12,204,4,12,238,5,12,221,6,12,204,7,4,187,7,11,221,8,4,255,8,5,255,8,6,255,8,7,255,8,8,255,8,9,238,8,10,204],
secondary:!1},{width:11,bonus:120,chr:"V",pixels:[1,4,204,2,4,255,2,5,255,2,6,204,3,4,187,3,5,170,3,6,255,3,7,255,3,8,238,3,9,153,4,8,204,4,9,255,4,10,255,4,11,187,5,10,238,5,11,255,6,8,204,6,9,221,7,4,170,7,5,153,7,6,238,7,7,187,8,4,255,8,5,170],
secondary:!1},{width:14,bonus:200,chr:"W",
pixels:[1,4,255,1,5,221,2,4,238,2,5,255,2,6,255,2,7,255,2,8,221,3,7,153,3,8,221,3,9,255,3,10,255,3,11,221,4,9,153,4,10,255,4,11,204,5,7,170,5,8,238,5,9,153,6,5,238,6,6,255,6,7,153,7,5,187,7,6,255,7,7,255,7,8,204,8,8,238,8,9,255,8,10,238,8,11,153,9,9,153,9,10,255,9,11,255,9,12,170,10,7,170,10,8,238,10,9,187,11,4,238,11,5,255,11,6,187,12,4,170],
secondary:!1},{width:10,bonus:135,chr:"X",
pixels:[1,4,221,1,12,238,2,4,255,2,5,255,2,10,170,2,11,221,2,12,187,3,4,153,3,5,187,3,6,255,3,7,238,3,9,221,4,7,255,4,8,255,4,9,204,5,6,204,5,7,153,5,9,255,5,10,255,5,11,153,6,4,221,6,5,238,6,10,204,6,11,255,6,12,255,7,4,204,7,12,238],secondary:!1},{
width:9,bonus:115,chr:"Y",pixels:[0,5,187,1,5,255,1,6,221,2,5,170,2,6,238,2,7,255,2,8,170,3,8,255,3,9,255,3,10,187,3,11,187,3,12,187,3,13,238,4,9,255,4,10,255,4,11,255,4,12,255,4,13,255,5,7,187,5,8,204,6,5,238,6,6,238,7,5,204],secondary:!1},{width:9,
bonus:145,chr:"Z",
pixels:[1,5,187,1,6,153,1,13,255,2,5,238,2,11,221,2,12,255,2,13,255,3,5,221,3,9,153,3,10,255,3,11,238,3,13,255,4,5,221,4,8,238,4,9,255,4,10,187,4,13,255,5,5,238,5,6,187,5,7,255,5,8,238,5,13,255,6,5,255,6,6,255,6,7,153,6,13,255,7,5,204,7,12,187,7,13,187],
secondary:!1},{width:5,bonus:70,chr:"[",pixels:[1,3,187,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,1,13,255,1,14,187,2,3,153,2,14,153],secondary:!1},{width:8,bonus:50,chr:"\\",
pixels:[0,4,170,1,5,204,1,6,170,2,7,238,3,8,170,3,9,204,4,10,221,4,11,153,5,12,238,6,13,187],secondary:!1},{width:4,bonus:70,chr:"]",
pixels:[1,3,170,1,14,170,2,3,187,2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,2,12,255,2,13,255,2,14,187],secondary:!1},{width:7,bonus:55,chr:"^",
pixels:[0,9,238,1,6,170,1,7,238,1,8,153,2,4,204,2,5,221,3,4,187,3,5,238,4,7,238,4,8,187,5,9,204],secondary:!1},{width:8,bonus:35,chr:"_",pixels:[0,12,221,1,12,221,2,12,221,3,12,221,4,12,221,5,12,221,6,12,153],secondary:!1},{width:10,bonus:125,
chr:"a",pixels:[1,12,238,2,9,187,2,10,238,2,11,170,2,12,187,3,7,221,3,8,204,3,9,238,4,5,238,4,6,238,4,9,221,5,5,187,5,6,255,5,7,255,5,8,187,5,9,238,6,7,153,6,8,255,6,9,255,6,10,238,6,11,153,7,10,221,7,11,255,7,12,255,8,12,221],secondary:!1},{width:8,
bonus:160,chr:"b",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,238,2,9,187,2,10,187,2,11,187,2,12,255,3,4,204,3,8,204,3,12,204,4,4,221,4,5,187,4,7,187,4,8,255,4,12,204,5,5,238,5,6,238,5,9,255,5,10,255,5,11,255,6,10,187],
secondary:!1},{width:9,bonus:120,chr:"c",
pixels:[0,7,221,0,8,255,0,9,221,1,5,221,1,6,255,1,7,238,1,8,221,1,9,255,1,10,255,1,11,204,2,5,187,2,11,255,3,4,204,3,12,204,4,4,221,4,12,238,5,4,221,5,12,221,6,4,221,6,12,238,7,4,187,7,5,204,7,11,187,7,12,170],secondary:!1},{width:11,bonus:200,
chr:"d",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,204,2,12,255,3,4,221,3,12,238,4,4,238,4,12,221,5,4,238,5,12,221,6,4,204,6,5,153,6,12,187,7,5,255,7,6,153,7,11,238,8,5,204,8,6,255,8,7,255,8,8,255,8,9,255,8,10,255,8,11,170,9,7,204,9,8,221,9,9,187],
secondary:!1},{width:7,bonus:135,chr:"e",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,204,2,12,255,3,4,221,3,8,221,3,12,238,4,4,238,4,8,221,4,12,221,5,4,187,5,8,153,5,12,238],secondary:!1},{
width:7,bonus:115,chr:"f",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,187,2,12,238,3,4,221,3,8,221,4,4,238,4,8,221,5,4,221],secondary:!1},{width:10,
bonus:150,chr:"g",
pixels:[0,7,204,0,8,255,0,9,255,0,10,187,1,5,187,1,6,255,1,7,238,1,8,221,1,9,238,1,10,255,1,11,221,2,5,204,2,11,238,3,4,204,3,12,204,4,4,221,4,12,238,5,4,238,5,12,221,6,4,221,6,9,238,6,10,187,6,11,187,6,12,221,7,4,170,7,5,221,7,9,255,7,10,255,7,11,255,7,12,153],
secondary:!1},{width:11,bonus:200,chr:"h",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,187,2,12,238,3,8,221,4,8,221,5,8,221,6,8,221,7,4,255,7,5,255,7,6,255,7,7,255,7,8,255,7,9,255,7,10,255,7,11,255,7,12,255,8,4,238,8,5,187,8,6,187,8,7,187,8,8,187,8,9,187,8,10,187,8,11,187,8,12,238],
secondary:!1},{width:5,bonus:90,chr:"i",pixels:[1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,1,13,255,2,5,238,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,187,2,13,238],secondary:!1},{width:6,bonus:100,chr:"j",
pixels:[2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,2,12,255,2,13,255,2,14,187,3,4,238,3,5,187,3,6,187,3,7,187,3,8,187,3,9,187,3,10,187,3,11,187,3,12,187],secondary:!1},{width:10,bonus:170,chr:"k",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,255,2,9,204,2,10,187,2,11,187,2,12,238,3,7,170,3,8,255,3,9,221,4,6,204,4,9,238,4,10,238,5,4,153,5,5,238,5,10,238,5,11,238,6,4,255,6,11,238,6,12,187,7,4,153,7,12,255,8,12,153],
secondary:!1},{width:8,bonus:105,chr:"l",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,204,2,12,255,3,12,238,4,12,221,5,12,255],secondary:!1},{
width:13,bonus:190,chr:"m",
pixels:[1,9,170,1,10,204,1,11,238,1,12,255,2,4,187,2,5,255,2,6,255,2,7,238,2,8,153,2,12,153,3,6,238,3,7,255,3,8,238,4,8,238,4,9,255,4,10,238,5,10,238,5,11,255,5,12,187,6,9,153,6,10,238,7,7,153,7,8,238,8,5,170,8,6,255,8,7,238,9,4,153,9,5,204,9,6,255,9,7,255,9,8,255,9,9,255,9,10,255,9,11,255,9,12,238,10,10,153,10,11,187,10,12,255],
secondary:!1},{width:11,bonus:170,chr:"n",
pixels:[0,12,170,1,4,187,1,5,255,1,6,255,1,7,238,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,5,204,2,6,255,2,12,153,3,6,221,3,7,255,4,7,238,4,8,255,5,8,238,5,9,255,6,9,238,6,10,238,7,4,153,7,10,255,7,11,238,8,4,255,8,5,255,8,6,255,8,7,255,8,8,255,8,9,255,8,10,255,8,11,255,8,12,204,9,4,153],
secondary:!1},{width:10,bonus:160,chr:"o",
pixels:[0,7,221,0,8,255,0,9,221,1,5,204,1,6,255,1,7,221,1,8,221,1,9,255,1,10,255,1,11,221,2,5,170,2,11,238,3,4,221,3,12,221,4,4,221,4,12,221,5,4,238,5,12,204,6,4,153,6,5,238,6,11,170,7,5,238,7,6,255,7,7,255,7,8,221,7,9,238,7,10,255,7,11,187,8,6,153,8,7,238,8,8,255,8,9,204],
secondary:!1},{width:8,bonus:130,chr:"p",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,238,3,4,204,4,4,238,5,4,170,5,5,255,5,6,255,5,7,255,5,8,204,6,6,187],secondary:!1},{width:10,
bonus:200,chr:"q",
pixels:[0,7,221,0,8,255,0,9,221,1,5,187,1,6,255,1,7,238,1,8,221,1,9,255,1,10,255,1,11,221,2,5,170,2,11,238,2,12,153,3,4,221,3,12,221,4,4,221,4,12,238,5,4,238,5,12,204,6,4,153,6,5,238,6,11,153,6,12,238,7,5,221,7,6,255,7,7,255,7,8,221,7,9,238,7,10,255,7,11,170,7,12,204,7,13,221,8,6,153,8,7,238,8,8,255,8,9,221,8,13,255,8,14,170,9,13,170,9,14,255],
secondary:!1},{width:10,bonus:175,chr:"r",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,187,2,9,255,2,10,187,2,11,187,2,12,238,3,4,221,3,9,221,4,4,238,4,9,255,4,10,170,5,4,153,5,5,255,5,6,255,5,7,255,5,8,187,5,10,255,5,11,187,6,6,187,6,11,238,6,12,170,7,12,255,8,12,153],
secondary:!1},{width:7,bonus:95,chr:"s",pixels:[0,11,221,0,12,187,1,5,255,1,6,255,1,7,255,1,12,238,2,4,187,2,7,255,2,8,238,2,12,221,3,4,187,3,8,255,3,9,187,3,12,221,4,4,221,4,8,187,4,9,255,4,10,255,4,11,255],secondary:!1},{width:10,bonus:125,chr:"t",
pixels:[0,4,187,1,4,221,2,4,221,3,4,255,3,5,187,3,6,187,3,7,187,3,8,187,3,9,187,3,10,187,3,11,187,3,12,238,4,4,255,4,5,255,4,6,255,4,7,255,4,8,255,4,9,255,4,10,255,4,11,255,4,12,255,5,4,221,5,12,153,6,4,221,7,4,255],secondary:!1},{width:11,bonus:145,
chr:"u",
pixels:[1,4,238,1,5,187,1,6,187,1,7,187,1,8,187,1,9,187,1,10,153,2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,3,11,170,3,12,204,4,12,238,5,12,221,6,12,204,7,4,187,7,11,221,8,4,255,8,5,255,8,6,255,8,7,255,8,8,255,8,9,238,8,10,204],
secondary:!1},{width:11,bonus:120,chr:"v",pixels:[1,4,204,2,4,255,2,5,255,2,6,204,3,4,187,3,5,170,3,6,255,3,7,255,3,8,238,3,9,153,4,8,204,4,9,255,4,10,255,4,11,187,5,10,238,5,11,255,6,8,204,6,9,221,7,4,170,7,5,153,7,6,238,7,7,187,8,4,255,8,5,170],
secondary:!1},{width:14,bonus:200,chr:"w",
pixels:[1,4,255,1,5,221,2,4,238,2,5,255,2,6,255,2,7,255,2,8,221,3,7,153,3,8,221,3,9,255,3,10,255,3,11,221,4,9,153,4,10,255,4,11,204,5,7,170,5,8,238,5,9,153,6,5,238,6,6,255,6,7,153,7,5,187,7,6,255,7,7,255,7,8,204,8,8,238,8,9,255,8,10,238,8,11,153,9,9,153,9,10,255,9,11,255,9,12,170,10,7,170,10,8,238,10,9,187,11,4,238,11,5,255,11,6,187,12,4,170],
secondary:!1},{width:10,bonus:135,chr:"x",
pixels:[1,4,221,1,12,238,2,4,255,2,5,255,2,10,170,2,11,221,2,12,187,3,4,153,3,5,187,3,6,255,3,7,238,3,9,221,4,7,255,4,8,255,4,9,204,5,6,204,5,7,153,5,9,255,5,10,255,5,11,153,6,4,221,6,5,238,6,10,204,6,11,255,6,12,255,7,4,204,7,12,238],secondary:!1},{
width:9,bonus:115,chr:"y",pixels:[0,4,187,1,4,255,1,5,221,2,4,170,2,5,238,2,6,255,2,7,170,3,7,255,3,8,255,3,9,187,3,10,187,3,11,187,3,12,238,4,8,255,4,9,255,4,10,255,4,11,255,4,12,255,5,6,187,5,7,204,6,4,238,6,5,238,7,4,204],secondary:!1},{width:9,
bonus:145,chr:"z",
pixels:[1,4,187,1,5,153,1,12,255,2,4,238,2,10,221,2,11,255,2,12,255,3,4,221,3,8,153,3,9,255,3,10,238,3,12,255,4,4,221,4,7,238,4,8,255,4,9,187,4,12,255,5,4,238,5,5,187,5,6,255,5,7,238,5,12,255,6,4,255,6,5,255,6,6,153,6,12,255,7,4,204,7,11,187,7,12,187],
secondary:!1},{width:5,bonus:55,chr:"{",pixels:[1,8,204,2,4,255,2,5,255,2,6,255,2,7,187,2,9,238,2,10,255,2,11,255,2,12,255,2,13,187,3,3,170],secondary:!1},{width:3,bonus:65,chr:"|",
pixels:[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255],secondary:!0},{width:6,bonus:55,chr:"}",
pixels:[1,3,170,2,4,255,2,5,255,2,6,255,2,7,187,2,9,238,2,10,255,2,11,255,2,12,255,2,13,187,3,8,204],secondary:!1},{width:7,bonus:35,chr:"~",pixels:[0,9,255,1,8,255,2,8,187,3,9,238,4,10,255,5,8,255,5,9,221],secondary:!1}],width:14,spacewidth:5,
shadow:!1,height:15,basey:12}}],e={},function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return s[r](i,i.exports,o),i.exports}(0);var s,e}));

/***/ }),

/***/ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json":
/*!**********************************************************************************!*\
  !*** ../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "appconfig.json");

/***/ }),

/***/ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html":
/*!******************************************************************************!*\
  !*** ../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "index.html");

/***/ }),

/***/ "./JSONs/ItemsAndImagesReorganized.json":
/*!**********************************************!*\
  !*** ./JSONs/ItemsAndImagesReorganized.json ***!
  \**********************************************/
/***/ ((module) => {


/***/ }),

/***/ "./JSONs/LocalStorageInit.json":
/*!*************************************!*\
  !*** ./JSONs/LocalStorageInit.json ***!
  \*************************************/
/***/ ((module) => {

module.exports = {"Coins":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":1},"Holy biscuits":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":2},"Purple sweets":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":3},"Miscellania Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":4},"Lumber Yard Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":5},"Bandit Camp Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":6},"Pollnivneach Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":7},"Phoenix Lair Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":8},"Tai Bwo Wannai Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":9},"Lighthouse Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":10},"Clocktower Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":11},"Gu'Tanoth Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":12},"Grand Exchange Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":13},"Saradomin page":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":14},"Guthix page":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":15},"Zamorak page":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":16},"Armadyl page":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":17},"Bandos page":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":18},"Ancient page":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":19},"Red firelighter":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":20},"Green firelighter":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":21},"Blue firelighter":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":22},"Purple firelighter":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":23},"White firelighter":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":24},"Saradomin arrows":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":25},"Guthix arrows":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":26},"Zamorak arrows":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":27},"Meerkats pouch":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":28},"Meerkat scroll (Fetch Casket)":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":29},"Golden compass":{"tab":"broadcasts","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":30},"Fire rune":{"tab":"common","tier":["easy","medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":31},"Air rune":{"tab":"common","tier":["easy","medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":32},"Water rune":{"tab":"common","tier":["easy","medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":33},"Earth rune":{"tab":"common","tier":["easy","medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":34},"Law rune":{"tab":"common","tier":["easy","medium","hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":35},"Nature rune":{"tab":"common","tier":["easy","medium","hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":36},"Pure essence":{"tab":"common","tier":["easy","medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":37},"Black 2h crossbow":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":38},"Black crossbow":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":39},"Off-hand black crossbow":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":40},"Staff of air":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":41},"Staff of water":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":42},"Staff of earth":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":43},"Staff of fire":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":44},"Small bladed mithril salvage":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":45},"Medium bladed mithril salvage":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":46},"Oak plank":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":47},"Amulet of magic":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":48},"Mithril arrow":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":49},"Black bolts":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":50},"Air talisman":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":51},"Fire talisman":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":52},"Earth talisman":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":53},"Water talisman":{"tab":"common","tier":["easy","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":54},"Small plated mithril salvage":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":55},"Medium plated mithril salvage":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":56},"Huge plated mithril salvage":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":57},"Hard leather":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":58},"Willow composite bow":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":59},"Yew composite bow":{"tab":"rare","tier":["easy","medium","hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":60},"Magic composite bow":{"tab":"rare","tier":["easy","medium","hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":61},"Black full helm (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":62},"Black platebody (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":63},"Black platelegs (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":64},"Black plateskirt (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":65},"Black kiteshield (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":66},"Black full helm (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":67},"Black platebody (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":68},"Black platelegs (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":69},"Black plateskirt (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":70},"Black kiteshield (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":71},"Black beret":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":72},"Blue beret":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":73},"White beret":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":74},"Highwayman mask":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":75},"Wizard hat (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":76},"Wizard robe top (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":77},"Wizard robe skirt (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":78},"Wizard hat (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":79},"Wizard robe top (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":80},"Wizard robe skirt (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":81},"Studded body (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":82},"Studded chaps (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":83},"Studded body (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":84},"Studded chaps (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":85},"Bob shirt (black)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":86},"Bob shirt (blue)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":87},"Bob shirt (green)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":88},"Bob shirt (purple)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":89},"Bob shirt (red)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":90},"Flared trousers":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":91},"Sleeping cap":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":92},"Powdered wig":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":93},"Pantaloons":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":94},"Saradomin robe top":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":95},"Saradomin robe legs":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":96},"Guthix robe top":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":97},"Guthix robe legs":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":98},"Zamorak robe top":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":99},"Zamorak robe legs":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":100},"Amulet of magic (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":101},"Black cane":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":102},"Spiked helmet":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":103},"Suitcase":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":104},"Bonus XP star (small)":{"tab":"general","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":105},"Blue elegant shirt":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":106},"Blue elegant blouse":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":107},"Blue elegant legs":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":108},"Blue elegant skirt":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":109},"Green elegant shirt":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":110},"Green elegant blouse":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":111},"Green elegant legs":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":112},"Green elegant skirt":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":113},"Red elegant shirt":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":114},"Red elegant blouse":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":115},"Red elegant legs":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":116},"Red elegant skirt":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":117},"Black helm (h1)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":118},"Black platebody (h1)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":119},"Black platelegs (h1)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":120},"Black plateskirt (h1)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":121},"Black shield (h1)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":122},"Black helm (h2)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":123},"Black platebody (h2)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":124},"Black platelegs (h2)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":125},"Black plateskirt (h2)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":126},"Black shield (h2)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":127},"Black helm (h3)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":128},"Black platebody (h3)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":129},"Black platelegs (h3)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":130},"Black plateskirt (h3)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":131},"Black shield (h3)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":132},"Black helm (h4)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":133},"Black platebody (h4)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":134},"Black platelegs (h4)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":135},"Black plateskirt (h4)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":136},"Black shield (h4)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":137},"Black helm (h5)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":138},"Black platebody (h5)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":139},"Black platelegs (h5)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":140},"Black plateskirt (h5)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":141},"Black shield (h5)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":142},"Re-roll token (easy)":{"tab":"general","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":143},"Sealed clue scroll (master)":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":144},"Mind rune":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":145},"Death rune":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":146},"Air battlestaff":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":147},"Water battlestaff":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":148},"Earth battlestaff":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":149},"Fire battlestaff":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":150},"Green dragonhide":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":151},"Teak plank":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":152},"Green dragonhide body":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":153},"Green dragonhide chaps":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":154},"Adamant crossbow":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":155},"Amulet of power":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":156},"Adamant arrow":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":157},"Adamant bolts":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":158},"Small bladed adamant salvage":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":159},"Medium bladed adamant salvage":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":160},"Small plated adamant salvage":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":161},"Medium plated adamant salvage":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":162},"Huge plated adamant salvage":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":163},"Adamant full helm (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":164},"Adamant platebody (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":165},"Adamant platelegs (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":166},"Adamant plateskirt (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":167},"Adamant kiteshield (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":168},"Adamant full helm (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":169},"Adamant platebody (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":170},"Adamant platelegs (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":171},"Adamant plateskirt (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":172},"Adamant kiteshield (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":173},"Ranger boots":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":174},"Wizard boots (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":175},"Black headband":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":176},"Red headband":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":177},"Brown headband":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":178},"Red boater":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":179},"Orange boater":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":180},"Blue boater":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":181},"Green boater":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":182},"Black boater":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":183},"Green dragonhide body (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":184},"Green dragonhide chaps (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":185},"Green dragonhide body (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":186},"Green dragonhide chaps (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":187},"Adamant helm (h1)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":188},"Adamant platebody (h1)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":189},"Adamant platelegs (h1)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":190},"Adamant plateskirt (h1)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":191},"Adamant shield (h1)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":192},"Adamant helm (h2)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":193},"Adamant platebody (h2)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":194},"Adamant platelegs (h2)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":195},"Adamant plateskirt (h2)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":196},"Adamant shield (h2)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":197},"Adamant helm (h3)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":198},"Adamant platebody (h3)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":199},"Adamant platelegs (h3)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":200},"Adamant plateskirt (h3)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":201},"Adamant shield (h3)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":202},"Adamant helm (h4)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":203},"Adamant platebody (h4)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":204},"Adamant platelegs (h4)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":205},"Adamant plateskirt (h4)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":206},"Adamant shield (h4)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":207},"Adamant helm (h5)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":208},"Adamant platebody (h5)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":209},"Adamant platelegs (h5)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":210},"Adamant plateskirt (h5)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":211},"Adamant shield (h5)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":212},"White elegant blouse":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":213},"White elegant skirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":214},"Black elegant shirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":215},"Black elegant legs":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":216},"Purple elegant blouse":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":217},"Purple elegant skirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":218},"Purple elegant shirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":219},"Purple elegant legs":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":220},"Saradomin mitre":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":221},"Guthix mitre":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":222},"Zamorak mitre":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":223},"Saradomin cloak":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":224},"Guthix cloak":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":225},"Zamorak cloak":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":226},"Armadyl robe top":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":227},"Armadyl robe legs":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":228},"Bandos robe top":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":229},"Bandos robe legs":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":230},"Ancient robe top":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":231},"Ancient robe legs":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":232},"Sheep mask":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":233},"Bat mask":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":234},"Penguin mask":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":235},"Cat mask":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":236},"Wolf mask":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":237},"Strength amulet (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":238},"Adamant cane":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":239},"Pith helmet":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":240},"Briefcase":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":241},"Blue checkered shirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":242},"Green checkered shirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":243},"Purple checkered shirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":244},"Bonus XP star (medium)":{"tab":"general","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":245},"Re-roll token (medium)":{"tab":"general","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":246},"Reward casket (easy)":{"tab":"general","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":247},"Astral rune":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":248},"Blood rune":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":249},"Mystic air staff":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":250},"Mystic water staff":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":251},"Mystic earth staff":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":252},"Mystic fire staff":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":253},"Black dragonhide":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":254},"Medium spiky rune salvage":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":255},"Medium bladed rune salvage":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":256},"Large bladed rune salvage":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":257},"Medium plated rune salvage":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":258},"Large plated rune salvage":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":259},"Huge plated rune salvage":{"tab":"common","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":260},"Mahogany plank":{"tab":"common","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":261},"Rune arrow":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":262},"Court summons":{"tab":"general","tier":["hard","elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":263},"Rune full helm (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":264},"Rune platebody (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":265},"Rune platelegs (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":266},"Rune plateskirt (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":267},"Rune kiteshield (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":268},"Rune full helm (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":269},"Rune platebody (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":270},"Rune platelegs (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":271},"Rune plateskirt (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":272},"Rune kiteshield (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":273},"Rune full helm (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":274},"Rune platebody (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":275},"Rune platelegs (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":276},"Rune plateskirt (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":277},"Rune kiteshield (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":278},"Rune full helm (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":279},"Rune platebody (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":280},"Rune platelegs (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":281},"Rune plateskirt (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":282},"Rune kiteshield (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":283},"Rune full helm (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":284},"Rune platebody (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":285},"Rune platelegs (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":286},"Rune plateskirt (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":287},"Rune kiteshield (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":288},"Blue dragonhide body (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":289},"Blue dragonhide chaps (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":290},"Blue dragonhide body (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":291},"Blue dragonhide chaps (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":292},"Pirate's hat":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":293},"Robin Hood hat":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":294},"Enchanted hat":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":295},"Enchanted top":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":296},"Enchanted robe":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":297},"Tan cavalier":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":298},"Dark cavalier":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":299},"Black cavalier":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":300},"Rune helm (h1)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":301},"Rune platebody (h1)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":302},"Rune platelegs (h1)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":303},"Rune plateskirt (h1)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":304},"Rune shield (h1)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":305},"Rune helm (h2)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":306},"Rune platebody (h2)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":307},"Rune platelegs (h2)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":308},"Rune plateskirt (h2)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":309},"Rune shield (h2)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":310},"Rune helm (h3)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":311},"Rune platebody (h3)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":312},"Rune platelegs (h3)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":313},"Rune plateskirt (h3)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":314},"Rune shield (h3)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":315},"Rune helm (h4)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":316},"Rune platebody (h4)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":317},"Rune platelegs (h4)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":318},"Rune plateskirt (h4)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":319},"Rune shield (h4)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":320},"Rune helm (h5)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":321},"Rune platebody (h5)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":322},"Rune platelegs (h5)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":323},"Rune plateskirt (h5)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":324},"Rune shield (h5)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":325},"Amulet of glory (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":326},"Amulet of fury (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":327},"Saradomin stole":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":328},"Guthix stole":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":329},"Zamorak stole":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":330},"Saradomin crozier":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":331},"Guthix crozier":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":332},"Zamorak crozier":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":333},"Armadyl mitre":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":334},"Bandos mitre":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":335},"Ancient mitre":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":336},"Armadyl cloak":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":337},"Bandos cloak":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":338},"Ancient cloak":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":339},"Blessed dragonhide coif (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":340},"Blessed dragonhide body (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":341},"Blessed dragonhide chaps (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":342},"Blessed dragonhide vambraces (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":343},"Blessed dragonhide coif (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":344},"Blessed dragonhide body (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":345},"Blessed dragonhide chaps (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":346},"Blessed dragonhide vambraces (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":347},"Blessed dragonhide coif (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":348},"Blessed dragonhide body (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":349},"Blessed dragonhide chaps (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":350},"Blessed dragonhide vambraces (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":351},"Fox mask":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":352},"White unicorn mask":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":353},"Black unicorn mask":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":354},"Green dragon mask":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":355},"Blue dragon mask":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":356},"Red dragon mask":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":357},"Top hat":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":358},"Rune cane":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":359},"Guido's bonfire in a bottle":{"tab":"general","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":360},"Bonus XP star (large)":{"tab":"general","tier":["hard","elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":361},"Costume skipping ticket":{"tab":"general","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":362},"Puzzle box skipping ticket":{"tab":"general","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":363},"Knot skipping ticket":{"tab":"general","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":364},"Re-roll token (hard)":{"tab":"general","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":365},"Barrows dye":{"tab":"broadcasts","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":366},"Shadow dye":{"tab":"broadcasts","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":367},"Backstab cape":{"tab":"broadcasts","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":368},"Sack of effigies":{"tab":"broadcasts","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":369},"Explosive barrel":{"tab":"broadcasts","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":370},"Rune full helm (Gilded)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":371},"Rune platebody (Gilded)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":372},"Rune platelegs (Gilded)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":373},"Rune plateskirt (Gilded)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":374},"Rune kiteshield (Gilded)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":375},"Super attack (4)":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":376},"Super defence (4)":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":377},"Super strength (4)":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":378},"Super energy (4)":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":379},"Super restore (4)":{"tab":"common","tier":["hard","elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":380},"Antifire (4)":{"tab":"common","tier":["hard","elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":381},"Starved ancient effigy":{"tab":"common","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":382},"Third age full helmet":{"tab":"broadcasts","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":383},"Third age platebody":{"tab":"broadcasts","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":384},"Third age platelegs":{"tab":"broadcasts","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":385},"Third age kiteshield":{"tab":"broadcasts","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":386},"Third age mage hat":{"tab":"broadcasts","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":387},"Third age robe top":{"tab":"broadcasts","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":388},"Third age robe":{"tab":"broadcasts","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":389},"Third age amulet":{"tab":"broadcasts","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":390},"Third age ranger coif":{"tab":"broadcasts","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":391},"Third age ranger body":{"tab":"broadcasts","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":392},"Third age vambraces":{"tab":"broadcasts","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":393},"Third age ranger chaps":{"tab":"broadcasts","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":394},"Reward casket (medium)":{"tab":"general","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":395},"Royal dragonhide":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":396},"Uncut dragonstone":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":397},"Runite stone spirit":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":398},"Papaya tree seed":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":399},"Yew seed":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":400},"Dragonfruit seed":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":401},"Mango seed":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":402},"Lychee seed":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":403},"Guarana seed":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":404},"Prayer potion (4)":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":405},"Green salamander":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":406},"Unicorn horn":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":407},"Onyx bolt tips":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":408},"Battlestaff":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":409},"Dragon helm":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":410},"Rune full helm (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":411},"Rune platebody (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":412},"Rune platelegs (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":413},"Rune plateskirt (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":414},"Rune kiteshield (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":415},"Rune full helm (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":416},"Rune platebody (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":417},"Rune platelegs (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":418},"Rune plateskirt (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":419},"Rune kiteshield (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":420},"Rune full helm (Ancient)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":421},"Rune platebody (Ancient)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":422},"Rune platelegs (Ancient)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":423},"Rune plateskirt (Ancient)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":424},"Rune kiteshield (Ancient)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":425},"Blessed dragonhide coif (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":426},"Blessed dragonhide body (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":427},"Blessed dragonhide chaps (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":428},"Blessed dragonhide vambraces (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":429},"Blessed dragonhide coif (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":430},"Blessed dragonhide body (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":431},"Blessed dragonhide chaps (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":432},"Blessed dragonhide vambraces (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":433},"Blessed dragonhide coif (Zaros)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":434},"Blessed dragonhide body (Zaros)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":435},"Blessed dragonhide chaps (Zaros)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":436},"Blessed dragonhide vambraces (Zaros)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":437},"Robin Hood tunic":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":438},"Robin Hood tights":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":439},"Armadyl stole":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":440},"Bandos stole":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":441},"Ancient stole":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":442},"Armadyl crozier":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":443},"Bandos crozier":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":444},"Ancient crozier":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":445},"Dragon platelegs-skirt ornament kit (or)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":446},"Dragon sq shield ornament kit (or)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":447},"Dragon full helm ornament kit (sp)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":448},"Dragon platebody ornament kit (sp)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":449},"Dragon platelegs-skirt ornament kit (sp)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":450},"Dragon sq shield ornament kit (sp)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":451},"Fury ornament kit":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":452},"Dragon full helm ornament kit (or)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":453},"Dragon platebody ornament kit (or)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":454},"Bat staff":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":455},"Wolf staff":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":456},"Dragon staff":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":457},"Cat staff":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":458},"Penguin staff":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":459},"Dragon cane":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":460},"Tower skipping ticket":{"tab":"general","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":461},"Lockbox skipping ticket":{"tab":"general","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":462},"Black dragon mask":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":463},"Bronze dragon mask":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":464},"Iron dragon mask":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":465},"Steel dragon mask":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":466},"Mithril dragon mask":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":467},"Frost dragon mask":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":468},"Third Age dye":{"tab":"broadcasts","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":469},"Blood dye":{"tab":"broadcasts","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":470},"Ice dye":{"tab":"broadcasts","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":471},"Re-roll token (elite)":{"tab":"general","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":472},"Crystal triskelion fragment 1":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":473},"Crystal triskelion fragment 2":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":474},"Crystal triskelion fragment 3":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":475},"Third age druidic wreath":{"tab":"broadcasts","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":476},"Third age druidic robe top":{"tab":"broadcasts","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":477},"Third age druidic robe bottom":{"tab":"broadcasts","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":478},"Third age druidic cloak":{"tab":"broadcasts","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":479},"Third age druidic staff":{"tab":"broadcasts","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":480},"Guthix bow":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":481},"Saradomin bow":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":482},"Zamorak bow":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":483},"Reward casket (hard)":{"tab":"general","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":484},"Crystal key":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":485},"Dragon arrowheads":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":486},"Hydrix bolt tips":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":487},"Palm tree seed":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":488},"Golden dragonfruit seed":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":489},"Carambola seed":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":490},"Wine of Saradomin":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":491},"Wine of Zamorak":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":492},"Prayer renewal (4)":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":493},"Weapon poison++ (4)":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":494},"Uncut onyx":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":495},"Bonus XP star (huge)":{"tab":"general","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":496},"Box of clue scrolls":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":497},"Flaming sword enchantment":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":498},"Golden thread":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":499},"Elemental impetus":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":500},"Hobby unicorn (white)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":501},"Hobby unicorn (black)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":502},"Pyjama top":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":503},"Pyjama bottoms":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":504},"Pyjama slippers":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":505},"Heavy chest":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":506},"Bag of clues":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":507},"Ring of coins":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":508},"Ring of trees":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":509},"Round glasses (black)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":510},"Round glasses (blue)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":511},"Round glasses (green)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":512},"Stylish glasses (black)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":513},"Stylish glasses (blue)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":514},"Stylish glasses (green)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":515},"Half-moon spectacles (black)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":516},"Half-moon spectacles (blue)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":517},"Half-moon spectacles (green)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":518},"Adamant dragon mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":519},"Rune dragon mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":520},"Dragonstone dragon mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":521},"Onyx dragon mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":522},"Hydrix dragon mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":523},"Gilded boater":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":524},"Gilded cavalier":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":525},"Samurai kasa":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":526},"Reaper ornament kit":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":527},"Soul ornament kit":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":528},"Tuxedo jacket":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":529},"Tuxedo trousers":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":530},"Tuxedo shoes":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":531},"Tuxedo gloves":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":532},"Tuxedo cravat":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":533},"Evening bolero":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":534},"Evening dipped skirt":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":535},"Evening shoes":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":536},"Evening gloves":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":537},"Evening masquerade mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":538},"Heated tea flask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":539},"Pack yak mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":540},"Orlando Smith's hat":{"tab":"broadcasts","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":541},"Elemental battlestaff":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":542},"Re-roll token (master)":{"tab":"general","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":543},"Second-Age full helm":{"tab":"broadcasts","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":544},"Second-Age platebody":{"tab":"broadcasts","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":545},"Second-Age platelegs":{"tab":"broadcasts","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":546},"Second-Age sword":{"tab":"broadcasts","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":547},"Second-Age mage mask":{"tab":"broadcasts","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":548},"Second-Age robe top":{"tab":"broadcasts","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":549},"Second-Age robe bottom":{"tab":"broadcasts","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":550},"Second-Age staff":{"tab":"broadcasts","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":551},"Second-Age range coif":{"tab":"broadcasts","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":552},"Second-Age range top":{"tab":"broadcasts","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":553},"Second-Age range legs":{"tab":"broadcasts","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":554},"Second-Age bow":{"tab":"broadcasts","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":555},"Reward casket (elite)":{"tab":"general","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":556},"EValue":0,"ECount":0,"MValue":0,"MCount":0,"HValue":0,"HCount":0,"ElValue":0,"ElCount":0,"MaValue":0,"MaCount":0}

/***/ }),

/***/ "../node_modules/resemblejs/compareImages.js":
/*!***************************************************!*\
  !*** ../node_modules/resemblejs/compareImages.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const resemble = __webpack_require__(/*! ./resemble */ "../node_modules/resemblejs/resemble.js");

module.exports = function compareImages(image1, image2, options) {
    return new Promise((resolve, reject) => {
        resemble.compare(image1, image2, options, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};


/***/ }),

/***/ "../node_modules/resemblejs/node_modules/canvas/browser.js":
/*!*****************************************************************!*\
  !*** ../node_modules/resemblejs/node_modules/canvas/browser.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* globals document, ImageData */

const parseFont = __webpack_require__(/*! ./lib/parse-font */ "../node_modules/resemblejs/node_modules/canvas/lib/parse-font.js")

exports.parseFont = parseFont

exports.createCanvas = function (width, height) {
  return Object.assign(document.createElement('canvas'), { width: width, height: height })
}

exports.createImageData = function (array, width, height) {
  // Browser implementation of ImageData looks at the number of arguments passed
  switch (arguments.length) {
    case 0: return new ImageData()
    case 1: return new ImageData(array)
    case 2: return new ImageData(array, width)
    default: return new ImageData(array, width, height)
  }
}

exports.loadImage = function (src, options) {
  return new Promise(function (resolve, reject) {
    const image = Object.assign(document.createElement('img'), options)

    function cleanup () {
      image.onload = null
      image.onerror = null
    }

    image.onload = function () { cleanup(); resolve(image) }
    image.onerror = function () { cleanup(); reject(new Error('Failed to load the image "' + src + '"')) }

    image.src = src
  })
}


/***/ }),

/***/ "../node_modules/resemblejs/node_modules/canvas/lib/parse-font.js":
/*!************************************************************************!*\
  !*** ../node_modules/resemblejs/node_modules/canvas/lib/parse-font.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Font RegExp helpers.
 */

const weights = 'bold|bolder|lighter|[1-9]00'
const styles = 'italic|oblique'
const variants = 'small-caps'
const stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded'
const units = 'px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q'
const string = '\'([^\']+)\'|"([^"]+)"|[\\w\\s-]+'

// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
const weightRe = new RegExp(`(${weights}) +`, 'i')
const styleRe = new RegExp(`(${styles}) +`, 'i')
const variantRe = new RegExp(`(${variants}) +`, 'i')
const stretchRe = new RegExp(`(${stretches}) +`, 'i')
const sizeFamilyRe = new RegExp(
  `([\\d\\.]+)(${units}) *((?:${string})( *, *(?:${string}))*)`)

/**
 * Cache font parsing.
 */

const cache = {}

const defaultHeight = 16 // pt, common browser default

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

module.exports = str => {
  // Cached
  if (cache[str]) return cache[str]

  // Try for required properties first.
  const sizeFamily = sizeFamilyRe.exec(str)
  if (!sizeFamily) return // invalid

  // Default values and required properties
  const font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/["']/g, '').replace(/ *, */g, ',')
  }

  // Optional, unordered properties.
  let weight, style, variant, stretch
  // Stop search at `sizeFamily.index`
  const substr = str.substring(0, sizeFamily.index)
  if ((weight = weightRe.exec(substr))) font.weight = weight[1]
  if ((style = styleRe.exec(substr))) font.style = style[1]
  if ((variant = variantRe.exec(substr))) font.variant = variant[1]
  if ((stretch = stretchRe.exec(substr))) font.stretch = stretch[1]

  // Convert to device units. (`font.unit` is the original unit)
  // TODO: ch, ex
  switch (font.unit) {
    case 'pt':
      font.size /= 0.75
      break
    case 'pc':
      font.size *= 16
      break
    case 'in':
      font.size *= 96
      break
    case 'cm':
      font.size *= 96.0 / 2.54
      break
    case 'mm':
      font.size *= 96.0 / 25.4
      break
    case '%':
      // TODO disabled because existing unit tests assume 100
      // font.size *= defaultHeight / 100 / 0.75
      break
    case 'em':
    case 'rem':
      font.size *= defaultHeight / 0.75
      break
    case 'q':
      font.size *= 96 / 25.4 / 4
      break
  }

  return (cache[str] = font)
}


/***/ }),

/***/ "../node_modules/resemblejs/resemble.js":
/*!**********************************************!*\
  !*** ../node_modules/resemblejs/resemble.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
James Cryer / Huddle
URL: https://github.com/Huddle/Resemble.js
*/

var naiveFallback = function () {
    // ISC (c) 2011-2019 https://github.com/medikoo/es5-ext/blob/master/global.js
    if (typeof self === "object" && self) {
        return self;
    }
    if (typeof window === "object" && window) {
        return window;
    }
    throw new Error("Unable to resolve global `this`");
};

var getGlobalThis = function () {
    // ISC (c) 2011-2019 https://github.com/medikoo/es5-ext/blob/master/global.js
    // Fallback to standard globalThis if available
    if (typeof globalThis === "object" && globalThis) {
        return globalThis;
    }

    try {
        Object.defineProperty(Object.prototype, "__global__", {
            get: function () {
                return this;
            },
            configurable: true
        });
    } catch (error) {
        return naiveFallback();
    }
    try {
        // eslint-disable-next-line no-undef
        if (!__global__) {
            return naiveFallback();
        }
        return __global__; // eslint-disable-line no-undef
    } finally {
        delete Object.prototype.__global__;
    }
};

var isNode = function () {
    const globalPolyfill = getGlobalThis();
    return typeof globalPolyfill.process !== "undefined" && globalPolyfill.process.versions && globalPolyfill.process.versions.node;
};

(function (root, factory) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(this /* eslint-disable-line no-invalid-this*/, function () {
    "use strict";

    var Img;
    var Canvas;
    var loadNodeCanvasImage;

    if (isNode()) {
        Canvas = __webpack_require__(/*! canvas */ "../node_modules/resemblejs/node_modules/canvas/browser.js"); // eslint-disable-line global-require
        Img = Canvas.Image;
        loadNodeCanvasImage = Canvas.loadImage;
    } else {
        Img = Image;
    }

    function createCanvas(width, height) {
        if (isNode()) {
            return Canvas.createCanvas(width, height);
        }

        var cnvs = document.createElement("canvas");
        cnvs.width = width;
        cnvs.height = height;
        return cnvs;
    }

    var oldGlobalSettings = {};
    var globalOutputSettings = oldGlobalSettings;

    var resemble = function (fileData) {
        var pixelTransparency = 1;

        var errorPixelColor = {
            // Color for Error Pixels. Between 0 and 255.
            red: 255,
            green: 0,
            blue: 255,
            alpha: 255
        };

        var targetPix = { r: 0, g: 0, b: 0, a: 0 }; // isAntialiased

        var errorPixelTransform = {
            flat: function (px, offset) {
                px[offset] = errorPixelColor.red;
                px[offset + 1] = errorPixelColor.green;
                px[offset + 2] = errorPixelColor.blue;
                px[offset + 3] = errorPixelColor.alpha;
            },
            movement: function (px, offset, d1, d2) {
                px[offset] = (d2.r * (errorPixelColor.red / 255) + errorPixelColor.red) / 2;
                px[offset + 1] = (d2.g * (errorPixelColor.green / 255) + errorPixelColor.green) / 2;
                px[offset + 2] = (d2.b * (errorPixelColor.blue / 255) + errorPixelColor.blue) / 2;
                px[offset + 3] = d2.a;
            },
            flatDifferenceIntensity: function (px, offset, d1, d2) {
                px[offset] = errorPixelColor.red;
                px[offset + 1] = errorPixelColor.green;
                px[offset + 2] = errorPixelColor.blue;
                px[offset + 3] = colorsDistance(d1, d2);
            },
            movementDifferenceIntensity: function (px, offset, d1, d2) {
                var ratio = (colorsDistance(d1, d2) / 255) * 0.8;

                px[offset] = (1 - ratio) * (d2.r * (errorPixelColor.red / 255)) + ratio * errorPixelColor.red;
                px[offset + 1] = (1 - ratio) * (d2.g * (errorPixelColor.green / 255)) + ratio * errorPixelColor.green;
                px[offset + 2] = (1 - ratio) * (d2.b * (errorPixelColor.blue / 255)) + ratio * errorPixelColor.blue;
                px[offset + 3] = d2.a;
            },
            diffOnly: function (px, offset, d1, d2) {
                px[offset] = d2.r;
                px[offset + 1] = d2.g;
                px[offset + 2] = d2.b;
                px[offset + 3] = d2.a;
            }
        };

        var errorPixel = errorPixelTransform.flat;
        var errorType;
        var boundingBoxes;
        var ignoredBoxes;
        var ignoreAreasColoredWith;
        var largeImageThreshold = 1200;
        var useCrossOrigin = true;
        var data = {};
        var images = [];
        var updateCallbackArray = [];

        var tolerance = {
            // between 0 and 255
            red: 16,
            green: 16,
            blue: 16,
            alpha: 16,
            minBrightness: 16,
            maxBrightness: 240
        };

        var ignoreAntialiasing = false;
        var ignoreColors = false;
        var scaleToSameSize = false;
        var compareOnly = false;
        var returnEarlyThreshold;

        function colorsDistance(c1, c2) {
            return (Math.abs(c1.r - c2.r) + Math.abs(c1.g - c2.g) + Math.abs(c1.b - c2.b)) / 3;
        }

        function withinBoundingBox(x, y, width, height, box) {
            return x > (box.left || 0) && x < (box.right || width) && y > (box.top || 0) && y < (box.bottom || height);
        }

        function withinComparedArea(x, y, width, height, pixel2) {
            var isIncluded = true;
            var i;
            var boundingBox;
            var ignoredBox;
            var selected;
            var ignored;

            if (boundingBoxes instanceof Array) {
                selected = false;
                for (i = 0; i < boundingBoxes.length; i++) {
                    boundingBox = boundingBoxes[i];
                    if (withinBoundingBox(x, y, width, height, boundingBox)) {
                        selected = true;
                        break;
                    }
                }
            }
            if (ignoredBoxes instanceof Array) {
                ignored = true;
                for (i = 0; i < ignoredBoxes.length; i++) {
                    ignoredBox = ignoredBoxes[i];
                    if (withinBoundingBox(x, y, width, height, ignoredBox)) {
                        ignored = false;
                        break;
                    }
                }
            }

            if (ignoreAreasColoredWith) {
                return colorsDistance(pixel2, ignoreAreasColoredWith) !== 0;
            }

            if (selected === undefined && ignored === undefined) {
                return true;
            }
            if (selected === false && ignored === true) {
                return false;
            }
            if (selected === true || ignored === true) {
                isIncluded = true;
            }
            if (selected === false || ignored === false) {
                isIncluded = false;
            }
            return isIncluded;
        }

        function triggerDataUpdate() {
            var len = updateCallbackArray.length;
            var i;
            for (i = 0; i < len; i++) {
                if (typeof updateCallbackArray[i] === "function") {
                    updateCallbackArray[i](data);
                }
            }
        }

        function loop(w, h, callback) {
            var x;
            var y;

            for (x = 0; x < w; x++) {
                for (y = 0; y < h; y++) {
                    callback(x, y);
                }
            }
        }

        function parseImage(sourceImageData, width, height) {
            var pixelCount = 0;
            var redTotal = 0;
            var greenTotal = 0;
            var blueTotal = 0;
            var alphaTotal = 0;
            var brightnessTotal = 0;
            var whiteTotal = 0;
            var blackTotal = 0;

            loop(width, height, function (horizontalPos, verticalPos) {
                var offset = (verticalPos * width + horizontalPos) * 4;
                var red = sourceImageData[offset];
                var green = sourceImageData[offset + 1];
                var blue = sourceImageData[offset + 2];
                var alpha = sourceImageData[offset + 3];
                var brightness = getBrightness(red, green, blue);

                if (red === green && red === blue && alpha) {
                    if (red === 0) {
                        blackTotal++;
                    } else if (red === 255) {
                        whiteTotal++;
                    }
                }

                pixelCount++;

                redTotal += (red / 255) * 100;
                greenTotal += (green / 255) * 100;
                blueTotal += (blue / 255) * 100;
                alphaTotal += ((255 - alpha) / 255) * 100;
                brightnessTotal += (brightness / 255) * 100;
            });

            data.red = Math.floor(redTotal / pixelCount);
            data.green = Math.floor(greenTotal / pixelCount);
            data.blue = Math.floor(blueTotal / pixelCount);
            data.alpha = Math.floor(alphaTotal / pixelCount);
            data.brightness = Math.floor(brightnessTotal / pixelCount);
            data.white = Math.floor((whiteTotal / pixelCount) * 100);
            data.black = Math.floor((blackTotal / pixelCount) * 100);

            triggerDataUpdate();
        }

        function onLoadImage(hiddenImage, callback) {
            // don't assign to hiddenImage, see https://github.com/Huddle/Resemble.js/pull/87/commits/300d43352a2845aad289b254bfbdc7cd6a37e2d7
            var width = hiddenImage.width;
            var height = hiddenImage.height;

            if (scaleToSameSize && images.length === 1) {
                width = images[0].width;
                height = images[0].height;
            }

            var hiddenCanvas = createCanvas(width, height);
            var imageData;

            hiddenCanvas.getContext("2d").drawImage(hiddenImage, 0, 0, width, height);
            imageData = hiddenCanvas.getContext("2d").getImageData(0, 0, width, height);

            images.push(imageData);

            callback(imageData, width, height);
        }

        function loadImageData(fileDataForImage, callback) {
            var fileReader;
            var hiddenImage = new Img();

            if (!hiddenImage.setAttribute) {
                hiddenImage.setAttribute = function setAttribute() {};
            }

            if (useCrossOrigin) {
                hiddenImage.setAttribute("crossorigin", "anonymous");
            }

            hiddenImage.onerror = function (event) {
                hiddenImage.onload = null;
                hiddenImage.onerror = null; // fixes pollution between calls
                const error = event ? event + "" : "Unknown error";
                images.push({ error: `Failed to load image '${fileDataForImage}'. ${error}` });
                callback();
            };

            hiddenImage.onload = function () {
                hiddenImage.onload = null; // fixes pollution between calls
                hiddenImage.onerror = null;
                onLoadImage(hiddenImage, callback);
            };

            if (typeof fileDataForImage === "string") {
                hiddenImage.src = fileDataForImage;
                if (!isNode() && hiddenImage.complete && hiddenImage.naturalWidth > 0) {
                    hiddenImage.onload();
                }
            } else if (
                typeof fileDataForImage.data !== "undefined" &&
                typeof fileDataForImage.width === "number" &&
                typeof fileDataForImage.height === "number"
            ) {
                images.push(fileDataForImage);

                callback(fileDataForImage, fileDataForImage.width, fileDataForImage.height);
            } else if (typeof Buffer !== "undefined" && fileDataForImage instanceof Buffer) {
                // If we have Buffer, assume we're on Node+Canvas and its supported
                // hiddenImage.src = fileDataForImage;

                loadNodeCanvasImage(fileDataForImage)
                    .then(function (image) {
                        hiddenImage.onload = null; // fixes pollution between calls
                        hiddenImage.onerror = null;
                        onLoadImage(image, callback);
                    })
                    .catch(function (err) {
                        images.push({
                            error: err ? err + "" : "Image load error."
                        });
                        callback();
                    });
            } else {
                fileReader = new FileReader();
                fileReader.onload = function (event) {
                    hiddenImage.src = event.target.result;
                };
                fileReader.readAsDataURL(fileDataForImage);
            }
        }

        function isColorSimilar(a, b, color) {
            var absDiff = Math.abs(a - b);

            if (typeof a === "undefined") {
                return false;
            }
            if (typeof b === "undefined") {
                return false;
            }

            if (a === b) {
                return true;
            } else if (absDiff < tolerance[color]) {
                return true;
            }
            return false;
        }

        function isPixelBrightnessSimilar(d1, d2) {
            var alpha = isColorSimilar(d1.a, d2.a, "alpha");
            var brightness = isColorSimilar(d1.brightness, d2.brightness, "minBrightness");
            return brightness && alpha;
        }

        function getBrightness(r, g, b) {
            return 0.3 * r + 0.59 * g + 0.11 * b;
        }

        function isRGBSame(d1, d2) {
            var red = d1.r === d2.r;
            var green = d1.g === d2.g;
            var blue = d1.b === d2.b;
            return red && green && blue;
        }

        function isRGBSimilar(d1, d2) {
            var red = isColorSimilar(d1.r, d2.r, "red");
            var green = isColorSimilar(d1.g, d2.g, "green");
            var blue = isColorSimilar(d1.b, d2.b, "blue");
            var alpha = isColorSimilar(d1.a, d2.a, "alpha");

            return red && green && blue && alpha;
        }

        function isContrasting(d1, d2) {
            return Math.abs(d1.brightness - d2.brightness) > tolerance.maxBrightness;
        }

        function getHue(red, green, blue) {
            var r = red / 255;
            var g = green / 255;
            var b = blue / 255;
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var h;
            var d;

            if (max === min) {
                h = 0; // achromatic
            } else {
                d = max - min;
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                    default:
                        h /= 6;
                }
            }

            return h;
        }

        function isAntialiased(sourcePix, pix, cacheSet, verticalPos, horizontalPos, width) {
            var offset;
            var distance = 1;
            var i;
            var j;
            var hasHighContrastSibling = 0;
            var hasSiblingWithDifferentHue = 0;
            var hasEquivalentSibling = 0;

            addHueInfo(sourcePix);

            for (i = distance * -1; i <= distance; i++) {
                for (j = distance * -1; j <= distance; j++) {
                    if (i === 0 && j === 0) {
                        // ignore source pixel
                    } else {
                        offset = ((verticalPos + j) * width + (horizontalPos + i)) * 4;

                        if (!getPixelInfo(targetPix, pix, offset, cacheSet)) {
                            continue;
                        }

                        addBrightnessInfo(targetPix);
                        addHueInfo(targetPix);

                        if (isContrasting(sourcePix, targetPix)) {
                            hasHighContrastSibling++;
                        }

                        if (isRGBSame(sourcePix, targetPix)) {
                            hasEquivalentSibling++;
                        }

                        if (Math.abs(targetPix.h - sourcePix.h) > 0.3) {
                            hasSiblingWithDifferentHue++;
                        }

                        if (hasSiblingWithDifferentHue > 1 || hasHighContrastSibling > 1) {
                            return true;
                        }
                    }
                }
            }

            if (hasEquivalentSibling < 2) {
                return true;
            }

            return false;
        }

        function copyPixel(px, offset, pix) {
            if (errorType === "diffOnly") {
                return;
            }

            px[offset] = pix.r; // r
            px[offset + 1] = pix.g; // g
            px[offset + 2] = pix.b; // b
            px[offset + 3] = pix.a * pixelTransparency; // a
        }

        function copyGrayScalePixel(px, offset, pix) {
            if (errorType === "diffOnly") {
                return;
            }

            px[offset] = pix.brightness; // r
            px[offset + 1] = pix.brightness; // g
            px[offset + 2] = pix.brightness; // b
            px[offset + 3] = pix.a * pixelTransparency; // a
        }

        function getPixelInfo(dst, pix, offset) {
            if (pix.length > offset) {
                dst.r = pix[offset];
                dst.g = pix[offset + 1];
                dst.b = pix[offset + 2];
                dst.a = pix[offset + 3];

                return true;
            }

            return false;
        }

        function addBrightnessInfo(pix) {
            pix.brightness = getBrightness(pix.r, pix.g, pix.b); // 'corrected' lightness
        }

        function addHueInfo(pix) {
            pix.h = getHue(pix.r, pix.g, pix.b);
        }

        function analyseImages(img1, img2, width, height) {
            var data1 = img1.data;
            var data2 = img2.data;
            var hiddenCanvas;
            var context;
            var imgd;
            var pix;

            if (!compareOnly) {
                hiddenCanvas = createCanvas(width, height);

                context = hiddenCanvas.getContext("2d");
                imgd = context.createImageData(width, height);
                pix = imgd.data;
            }

            var mismatchCount = 0;
            var diffBounds = {
                top: height,
                left: width,
                bottom: 0,
                right: 0
            };
            var updateBounds = function (x, y) {
                diffBounds.left = Math.min(x, diffBounds.left);
                diffBounds.right = Math.max(x, diffBounds.right);
                diffBounds.top = Math.min(y, diffBounds.top);
                diffBounds.bottom = Math.max(y, diffBounds.bottom);
            };

            var time = Date.now();

            var skip;

            if (!!largeImageThreshold && ignoreAntialiasing && (width > largeImageThreshold || height > largeImageThreshold)) {
                skip = 6;
            }

            var pixel1 = { r: 0, g: 0, b: 0, a: 0 };
            var pixel2 = { r: 0, g: 0, b: 0, a: 0 };

            var skipTheRest = false;

            loop(width, height, function (horizontalPos, verticalPos) {
                if (skipTheRest) {
                    return;
                }

                if (skip) {
                    // only skip if the image isn't small
                    if (verticalPos % skip === 0 || horizontalPos % skip === 0) {
                        return;
                    }
                }

                var offset = (verticalPos * width + horizontalPos) * 4;
                if (!getPixelInfo(pixel1, data1, offset, 1) || !getPixelInfo(pixel2, data2, offset, 2)) {
                    return;
                }

                var isWithinComparedArea = withinComparedArea(horizontalPos, verticalPos, width, height, pixel2);

                if (ignoreColors) {
                    addBrightnessInfo(pixel1);
                    addBrightnessInfo(pixel2);

                    if (isPixelBrightnessSimilar(pixel1, pixel2) || !isWithinComparedArea) {
                        if (!compareOnly) {
                            copyGrayScalePixel(pix, offset, pixel2);
                        }
                    } else {
                        if (!compareOnly) {
                            errorPixel(pix, offset, pixel1, pixel2);
                        }

                        mismatchCount++;
                        updateBounds(horizontalPos, verticalPos);
                    }
                    return;
                }

                if (isRGBSimilar(pixel1, pixel2) || !isWithinComparedArea) {
                    if (!compareOnly) {
                        copyPixel(pix, offset, pixel1);
                    }
                } else if (
                    ignoreAntialiasing &&
                    (addBrightnessInfo(pixel1), // jit pixel info augmentation looks a little weird, sorry.
                    addBrightnessInfo(pixel2),
                    isAntialiased(pixel1, data1, 1, verticalPos, horizontalPos, width) || isAntialiased(pixel2, data2, 2, verticalPos, horizontalPos, width))
                ) {
                    if (isPixelBrightnessSimilar(pixel1, pixel2) || !isWithinComparedArea) {
                        if (!compareOnly) {
                            copyGrayScalePixel(pix, offset, pixel2);
                        }
                    } else {
                        if (!compareOnly) {
                            errorPixel(pix, offset, pixel1, pixel2);
                        }

                        mismatchCount++;
                        updateBounds(horizontalPos, verticalPos);
                    }
                } else {
                    if (!compareOnly) {
                        errorPixel(pix, offset, pixel1, pixel2);
                    }

                    mismatchCount++;
                    updateBounds(horizontalPos, verticalPos);
                }

                if (compareOnly) {
                    var currentMisMatchPercent = (mismatchCount / (height * width)) * 100;

                    if (currentMisMatchPercent > returnEarlyThreshold) {
                        skipTheRest = true;
                    }
                }
            });

            data.rawMisMatchPercentage = (mismatchCount / (height * width)) * 100;
            data.misMatchPercentage = data.rawMisMatchPercentage.toFixed(2);
            data.diffBounds = diffBounds;
            data.analysisTime = Date.now() - time;

            data.getImageDataUrl = function (text) {
                if (compareOnly) {
                    throw Error("No diff image available - ran in compareOnly mode");
                }

                var barHeight = 0;

                if (text) {
                    barHeight = addLabel(text, context, hiddenCanvas);
                }

                context.putImageData(imgd, 0, barHeight);

                return hiddenCanvas.toDataURL("image/png");
            };

            if (!compareOnly && hiddenCanvas.toBuffer) {
                data.getBuffer = function (includeOriginal) {
                    if (includeOriginal) {
                        var imageWidth = hiddenCanvas.width + 2;
                        hiddenCanvas.width = imageWidth * 3;
                        context.putImageData(img1, 0, 0);
                        context.putImageData(img2, imageWidth, 0);
                        context.putImageData(imgd, imageWidth * 2, 0);
                    } else {
                        context.putImageData(imgd, 0, 0);
                    }
                    return hiddenCanvas.toBuffer();
                };
            }
        }

        function addLabel(text, context, hiddenCanvas) {
            var textPadding = 2;

            context.font = "12px sans-serif";

            var textWidth = context.measureText(text).width + textPadding * 2;
            var barHeight = 22;

            if (textWidth > hiddenCanvas.width) {
                hiddenCanvas.width = textWidth;
            }

            hiddenCanvas.height += barHeight;

            context.fillStyle = "#666";
            context.fillRect(0, 0, hiddenCanvas.width, barHeight - 4);
            context.fillStyle = "#fff";
            context.fillRect(0, barHeight - 4, hiddenCanvas.width, 4);

            context.fillStyle = "#fff";
            context.textBaseline = "top";
            context.font = "12px sans-serif";
            context.fillText(text, textPadding, 1);

            return barHeight;
        }

        function normalise(img, w, h) {
            var c;
            var context;

            if (img.height < h || img.width < w) {
                c = createCanvas(w, h);
                context = c.getContext("2d");
                context.putImageData(img, 0, 0);
                return context.getImageData(0, 0, w, h);
            }

            return img;
        }

        function outputSettings(options) {
            var key;

            if (options.errorColor) {
                for (key in options.errorColor) {
                    if (options.errorColor.hasOwnProperty(key)) {
                        errorPixelColor[key] = options.errorColor[key] === void 0 ? errorPixelColor[key] : options.errorColor[key];
                    }
                }
            }

            if (options.errorType && errorPixelTransform[options.errorType]) {
                errorPixel = errorPixelTransform[options.errorType];
                errorType = options.errorType;
            }

            if (options.errorPixel && typeof options.errorPixel === "function") {
                errorPixel = options.errorPixel;
            }

            pixelTransparency = isNaN(Number(options.transparency)) ? pixelTransparency : options.transparency;

            if (options.largeImageThreshold !== undefined) {
                largeImageThreshold = options.largeImageThreshold;
            }

            if (options.useCrossOrigin !== undefined) {
                useCrossOrigin = options.useCrossOrigin;
            }

            if (options.boundingBox !== undefined) {
                boundingBoxes = [options.boundingBox];
            }

            if (options.ignoredBox !== undefined) {
                ignoredBoxes = [options.ignoredBox];
            }

            if (options.boundingBoxes !== undefined) {
                boundingBoxes = options.boundingBoxes;
            }

            if (options.ignoredBoxes !== undefined) {
                ignoredBoxes = options.ignoredBoxes;
            }

            if (options.ignoreAreasColoredWith !== undefined) {
                ignoreAreasColoredWith = options.ignoreAreasColoredWith;
            }
        }

        function compare(one, two) {
            if (globalOutputSettings !== oldGlobalSettings) {
                outputSettings(globalOutputSettings);
            }

            function onceWeHaveBoth() {
                var width;
                var height;
                if (images.length === 2) {
                    if (images[0].error || images[1].error) {
                        data = {};
                        data.error = images[0].error ? images[0].error : images[1].error;
                        triggerDataUpdate();
                        return;
                    }
                    width = images[0].width > images[1].width ? images[0].width : images[1].width;
                    height = images[0].height > images[1].height ? images[0].height : images[1].height;

                    if (images[0].width === images[1].width && images[0].height === images[1].height) {
                        data.isSameDimensions = true;
                    } else {
                        data.isSameDimensions = false;
                    }

                    data.dimensionDifference = {
                        width: images[0].width - images[1].width,
                        height: images[0].height - images[1].height
                    };

                    analyseImages(normalise(images[0], width, height), normalise(images[1], width, height), width, height);

                    triggerDataUpdate();
                }
            }

            images = [];
            loadImageData(one, onceWeHaveBoth);
            loadImageData(two, onceWeHaveBoth);
        }

        function getCompareApi(param) {
            var secondFileData;
            var hasMethod = typeof param === "function";

            if (!hasMethod) {
                // assume it's file data
                secondFileData = param;
            }

            var self = {
                setReturnEarlyThreshold: function (threshold) {
                    if (threshold) {
                        compareOnly = true;
                        returnEarlyThreshold = threshold;
                    }
                    return self;
                },
                scaleToSameSize: function () {
                    scaleToSameSize = true;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                useOriginalSize: function () {
                    scaleToSameSize = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreNothing: function () {
                    tolerance.red = 0;
                    tolerance.green = 0;
                    tolerance.blue = 0;
                    tolerance.alpha = 0;
                    tolerance.minBrightness = 0;
                    tolerance.maxBrightness = 255;

                    ignoreAntialiasing = false;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreLess: function () {
                    tolerance.red = 16;
                    tolerance.green = 16;
                    tolerance.blue = 16;
                    tolerance.alpha = 16;
                    tolerance.minBrightness = 16;
                    tolerance.maxBrightness = 240;

                    ignoreAntialiasing = false;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreAntialiasing: function () {
                    tolerance.red = 32;
                    tolerance.green = 32;
                    tolerance.blue = 32;
                    tolerance.alpha = 32;
                    tolerance.minBrightness = 64;
                    tolerance.maxBrightness = 96;

                    ignoreAntialiasing = true;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreColors: function () {
                    tolerance.alpha = 16;
                    tolerance.minBrightness = 16;
                    tolerance.maxBrightness = 240;

                    ignoreAntialiasing = false;
                    ignoreColors = true;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreAlpha: function () {
                    tolerance.red = 16;
                    tolerance.green = 16;
                    tolerance.blue = 16;
                    tolerance.alpha = 255;
                    tolerance.minBrightness = 16;
                    tolerance.maxBrightness = 240;

                    ignoreAntialiasing = false;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                repaint: function () {
                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                outputSettings: function (options) {
                    outputSettings(options);
                    return self;
                },
                onComplete: function (callback) {
                    updateCallbackArray.push(callback);

                    var wrapper = function () {
                        compare(fileData, secondFileData);
                    };

                    wrapper();

                    return getCompareApi(wrapper);
                },
                setupCustomTolerance: function (customSettings) {
                    for (var property in tolerance) {
                        if (!customSettings.hasOwnProperty(property)) {
                            continue;
                        }

                        tolerance[property] = customSettings[property];
                    }
                }
            };

            return self;
        }

        var rootSelf = {
            onComplete: function (callback) {
                updateCallbackArray.push(callback);
                loadImageData(fileData, function (imageData, width, height) {
                    parseImage(imageData.data, width, height);
                });
            },
            compareTo: function (secondFileData) {
                return getCompareApi(secondFileData);
            },
            outputSettings: function (options) {
                outputSettings(options);
                return rootSelf;
            }
        };

        return rootSelf;
    };

    function setGlobalOutputSettings(settings) {
        globalOutputSettings = settings;
        return resemble;
    }

    function applyIgnore(api, ignore, customTolerance) {
        switch (ignore) {
            case "nothing":
                api.ignoreNothing();
                break;
            case "less":
                api.ignoreLess();
                break;
            case "antialiasing":
                api.ignoreAntialiasing();
                break;
            case "colors":
                api.ignoreColors();
                break;
            case "alpha":
                api.ignoreAlpha();
                break;
            default:
                throw new Error("Invalid ignore: " + ignore);
        }

        api.setupCustomTolerance(customTolerance);
    }

    resemble.compare = function (image1, image2, options, cb) {
        var callback;
        var opt;

        if (typeof options === "function") {
            callback = options;
            opt = {};
        } else {
            callback = cb;
            opt = options || {};
        }

        var res = resemble(image1);
        var compare;

        if (opt.output) {
            res.outputSettings(opt.output);
        }

        compare = res.compareTo(image2);

        if (opt.returnEarlyThreshold) {
            compare.setReturnEarlyThreshold(opt.returnEarlyThreshold);
        }

        if (opt.scaleToSameSize) {
            compare.scaleToSameSize();
        }

        var toleranceSettings = opt.tolerance || {};
        if (typeof opt.ignore === "string") {
            applyIgnore(compare, opt.ignore, toleranceSettings);
        } else if (opt.ignore && opt.ignore.forEach) {
            opt.ignore.forEach(function (v) {
                applyIgnore(compare, v, toleranceSettings);
            });
        }

        compare.onComplete(function (data) {
            if (data.error) {
                callback(data.error);
            } else {
                callback(null, data);
            }
        });
    };

    resemble.outputSettings = setGlobalOutputSettings;
    return resemble;
});


/***/ }),

/***/ "./scripts/modeluireader.ts":
/*!**********************************!*\
  !*** ./scripts/modeluireader.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalUIReader": () => (/* binding */ ModalUIReader)
/* harmony export */ });
/* harmony import */ var _alt1_base_dist_imagedetect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base/dist/imagedetect */ "../node_modules/@alt1/base/dist/imagedetect.js");
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _alt1_ocr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @alt1/ocr */ "../node_modules/@alt1/ocr/dist/index.js");



var capsfont = __webpack_require__(/*! @alt1/ocr/fonts/aa_9px_mono_allcaps.js */ "../node_modules/@alt1/ocr/fonts/aa_9px_mono_allcaps.js");
let imgs = (0,_alt1_base_dist_imagedetect__WEBPACK_IMPORTED_MODULE_0__.webpackImages)({
    exitbutton: __webpack_require__(/*! ../images/eocx.data.png */ "./images/eocx.data.png"),
    exitbutton_leg: __webpack_require__(/*! ../images/legacyx.data.png */ "./images/legacyx.data.png"),
    topleft: __webpack_require__(/*! ../images/eoctopleft.data.png */ "./images/eoctopleft.data.png"),
    topleft_leg: __webpack_require__(/*! ../images/legacytopleft.data.png */ "./images/legacytopleft.data.png"),
    botleft: __webpack_require__(/*! ../images/eocbotleft.data.png */ "./images/eocbotleft.data.png"),
    botleft_leg: __webpack_require__(/*! ../images/legacybotleft.data.png */ "./images/legacybotleft.data.png"),
});
var ModalUIReader;
(function (ModalUIReader) {
    function find(img) {
        if (!img) {
            img = (0,_alt1_base__WEBPACK_IMPORTED_MODULE_1__.captureHoldFullRs)();
        }
        let treoc = img.findSubimage(imgs.exitbutton);
        let trleg = img.findSubimage(imgs.exitbutton_leg);
        let eocboxes = treoc.map(p => detectEoc(img, p));
        let legacyboxes = trleg.map(p => detectLegacy(img, p));
        return [...eocboxes, ...legacyboxes].filter(m => m);
    }
    ModalUIReader.find = find;
    function detectEoc(img, pos) {
        let left = img.findSubimage(imgs.topleft, img.x, pos.y - 5, pos.x, imgs.topleft.height).sort((a, b) => a.x - b.x)[0];
        if (!left) {
            return null;
        }
        let bot = img.findSubimage(imgs.botleft, left.x, pos.y, imgs.botleft.width, img.y + img.height - pos.y).sort((a, b) => a.y - b.y)[0];
        if (!bot) {
            return null;
        }
        let buf = img.toData(left.x, pos.y, 250, 20);
        let title = _alt1_ocr__WEBPACK_IMPORTED_MODULE_2__.readSmallCapsBackwards(buf, capsfont, [[255, 203, 5]], 0, 13, buf.width, 1);
        return {
            rect: new _alt1_base__WEBPACK_IMPORTED_MODULE_1__.Rect(left.x + 4, pos.y + 24, (pos.x + 21) - (left.x + 4), (bot.y + 8) - (pos.y + 24)),
            legacy: false,
            title: title ? title.text.toLowerCase() : "",
            img: img
        };
    }
    ModalUIReader.detectEoc = detectEoc;
    function detectLegacy(img, pos) {
        let left = img.findSubimage(imgs.topleft_leg, img.x, pos.y - 9, pos.x, imgs.topleft_leg.height).sort((a, b) => a.x - b.x)[0];
        if (!left) {
            return null;
        }
        let bot = img.findSubimage(imgs.botleft_leg, left.x - 2, pos.y, imgs.botleft_leg.width, img.y + img.height - pos.y).sort((a, b) => a.y - b.y)[0];
        if (!bot) {
            return null;
        }
        let buf = img.toData(Math.round(left.x + pos.x - 250) / 2, pos.y - 4, 250, 20);
        let title = _alt1_ocr__WEBPACK_IMPORTED_MODULE_2__.readSmallCapsBackwards(buf, capsfont, [[255, 152, 31]], 0, 13, buf.width, 1);
        return {
            rect: new _alt1_base__WEBPACK_IMPORTED_MODULE_1__.Rect(left.x + 4, pos.y + 20, (pos.x + 20) - (left.x + 4), (bot.y) - (pos.y + 20)),
            legacy: true,
            title: title ? title.text.toLowerCase() : "",
            img: img
        };
    }
    ModalUIReader.detectLegacy = detectLegacy;
})(ModalUIReader || (ModalUIReader = {}));


/***/ }),

/***/ "./scripts/rewardreader.ts":
/*!*********************************!*\
  !*** ./scripts/rewardreader.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClueRewardReader)
/* harmony export */ });
/* harmony import */ var _alt1_ocr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/ocr */ "../node_modules/@alt1/ocr/dist/index.js");

var font = __webpack_require__(/*! @alt1/ocr/fonts/aa_9px_mono_allcaps.js */ "../node_modules/@alt1/ocr/fonts/aa_9px_mono_allcaps.js");
class ClueRewardReader {
    constructor() {
        this.pos = null;
    }
    read(img) {
        if (!this.pos) {
            throw new Error("ui not found yet");
            ;
        }
        var buf = img.toData(this.pos.rect.x, this.pos.rect.y, this.pos.rect.width, this.pos.rect.height);
        var hash = 0;
        const xcomp = 20 - 28;
        const ycomp = -19 - 13;
        for (var y = 50 + ycomp; y < 85 + ycomp; y++) {
            for (var x = 25 + xcomp; x < 375 + xcomp; x++) {
                if (this.pos.legacy && buf.getColorDifference(x, y, 62, 53, 40) < 10) {
                    continue;
                }
                if (!this.pos.legacy && buf.getColorDifference(x, y, 10, 31, 41) < 10) {
                    continue;
                }
                hash = (((hash << 5) - hash) + buf.getPixelInt(x, y)) | 0;
            }
        }
        var str = _alt1_ocr__WEBPACK_IMPORTED_MODULE_0__.findReadLine(buf, font, [[255, 255, 255]], 134 + xcomp, 113 + ycomp);
        if (!str.text) {
            return null;
        }
        var text = str.text.toLowerCase();
        var m = text.match(/(value|atual)[: ]+([\d,\.]+)\b/);
        if (!m) {
            return null;
        }
        var value = +m[2].replace(/[,\.]/g, "");
        return { hash, value, text };
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "capture": () => (/* binding */ capture),
/* harmony export */   "changeClueTierSpan": () => (/* binding */ changeClueTierSpan),
/* harmony export */   "cleardb": () => (/* binding */ cleardb),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "refresh": () => (/* binding */ refresh)
/* harmony export */ });
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! resemblejs/compareImages */ "../node_modules/resemblejs/compareImages.js");
/* harmony import */ var resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _JSONs_LocalStorageInit_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JSONs/LocalStorageInit.json */ "./JSONs/LocalStorageInit.json");
/* harmony import */ var _JSONs_LocalStorageInit_json__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_JSONs_LocalStorageInit_json__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./JSONs/ItemsAndImagesReorganized.json */ "./JSONs/ItemsAndImagesReorganized.json");
/* harmony import */ var _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _scripts_rewardreader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/rewardreader */ "./scripts/rewardreader.ts");
/* harmony import */ var _scripts_modeluireader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scripts/modeluireader */ "./scripts/modeluireader.ts");
//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api






//tell webpack to add index.html and appconfig.json to output
__webpack_require__(/*! !file-loader?name=[name].[ext]!./index.html */ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html");
__webpack_require__(/*! !file-loader?name=[name].[ext]!./appconfig.json */ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json");
var rewardSlots = ["first_item", "second_item", "third_item", "fourth_item", "fifth_item", "sixth_item", "seventh_item", "eigth_item", "ninth_item"];
var tierlist = ["easy", "medium", "hard", "elite", "master"];
var ignorelist = ["EValue", "ECount", "MValue", "MCount", "HValue", "HCount", "ElValue", "ElCount", "MaValue", "MaCount", "Checked button"];
var listOfItems;
var listOfItemsArray = [];
var legacy = false;
var displaybox = true;
function refresh() {
    location.reload();
}
function init() {
    // Set the checked button
    let keys = Object.keys(_JSONs_LocalStorageInit_json__WEBPACK_IMPORTED_MODULE_2__);
    if (localStorage.getItem("Checked button") == null) { // If doesn't exist yet
        console.log("Defaulting button to easy...");
        const ele = document.getElementById("easy");
        ele.checked = true;
        document.getElementById('clue_tier').textContent = "Easy";
        localStorage.setItem("Checked button", "easy");
    }
    else { // If it does, set the button and span
        console.log("Setting previously set radio button: " + localStorage.getItem("Checked button") + "...");
        let temp = localStorage.getItem("Checked button");
        const ele = document.getElementById(temp);
        ele.checked = true;
        document.getElementById('clue_tier').textContent = temp[0].toUpperCase() + temp.slice(1).toLowerCase();
    }
    console.log("Radio buttons initialized.\n ");
    // Initializing the rest of the LocalStorage
    console.log("Initializing LocalStorage...");
    for (let i = 0; i < keys.length; i++)
        if (!(localStorage.getItem(keys[i]))) // If doesn't exist, add it
            localStorage.setItem(keys[i], JSON.stringify(_JSONs_LocalStorageInit_json__WEBPACK_IMPORTED_MODULE_2__[keys[i]]));
    console.log("LocalStorage initialized.\n ");
    // Initializing the image collection
    console.log("Initializing image list...");
    listOfItems = _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__.any;
    let otherItems;
    if (document.getElementById("easy").checked)
        otherItems = _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__.easy;
    else if (document.getElementById("medium").checked)
        otherItems = _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__.medium;
    else if (document.getElementById("hard").checked)
        otherItems = _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__.hard;
    else if (document.getElementById("elite").checked)
        otherItems = _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__.elite;
    else if (document.getElementById("master").checked)
        otherItems = _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__.master;
    listOfItems = listOfItems.concat(otherItems);
    console.log("Image list initialized.");
    // Turning image collection into array
    listOfItemsArray = [];
    for (let i = 0; i < listOfItems.length; i++) {
        let temp = [listOfItems[i].name, listOfItems[i].base64, 0.0];
        listOfItemsArray.push(temp);
    }
    //Set display
    lootDisplay();
}
function changeClueTierSpan(id) {
    // Set the clue_tier span for the checked box
    let tier = (id[0].toUpperCase() + id.slice(1).toLowerCase());
    console.log("Setting button to " + tier + "...");
    document.getElementById('clue_tier').textContent = tier;
    const ele = document.getElementById(id);
    ele.checked = true;
    localStorage.setItem("Checked button", id);
    // Set the new image list
    listOfItems = _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__.any;
    let otherItems;
    if (tier == "Easy")
        otherItems = _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__.easy;
    else if (tier == "Medium")
        otherItems = _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__.medium;
    else if (tier == "Hard")
        otherItems = _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__.hard;
    else if (tier == "Elite")
        otherItems = _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__.elite;
    else if (tier == "Master")
        otherItems = _JSONs_ItemsAndImagesReorganized_json__WEBPACK_IMPORTED_MODULE_3__.master;
    listOfItems = listOfItems.concat(otherItems);
    // Set new array
    listOfItemsArray = [];
    for (let i = 0; i < listOfItems.length; i++) {
        let temp = [listOfItems[i].name, listOfItems[i].base64, 0.0];
        listOfItemsArray.push(temp);
    }
    console.log(listOfItemsArray);
    //Set display
    lootDisplay();
}
function cleardb() {
    // Consider prompting the user for this...
    // Confirm doesn't work :(
    let keys = Object.keys(localStorage);
    document.getElementById("rewards_value").textContent = "0";
    let currButton = "";
    for (let i = 0; i < tierlist.length; i++)
        if (document.getElementById(tierlist[i]).checked)
            currButton = tierlist[i];
    for (let i = 0; i < 9; i++)
        document.getElementById(rewardSlots[i]).textContent = "";
    if (!confirm("Are you sure you want to clear the clue database?")) {
        if (confirm("Deleting the entire database or just current selected tier?")) {
            localStorage.clear();
            init();
        }
        else {
            document.getElementById("number_of_clues").textContent = "0";
            document.getElementById("value_of_clues").textContent = "0";
            document.getElementById("average_of_clues").textContent = "0";
            let divs = document.getElementsByClassName("loot_display");
            for (let i = 0; i < divs.length; i++)
                divs[i].textContent = "";
            if (currButton == 'easy') {
                localStorage.setItem("EValue", "0");
                localStorage.setItem("ECount", "0");
                for (let i = 0; i < keys.length; i++) {
                    if (ignorelist.includes(keys[i]))
                        continue;
                    let temp = JSON.parse(localStorage.getItem(keys[i]));
                    temp.quantity.easy = (0).toString();
                    localStorage.setItem(keys[i], JSON.stringify(temp));
                }
            }
            else if (currButton == 'medium') {
                localStorage.setItem("MValue", "0");
                localStorage.setItem("MCount", "0");
                for (let i = 0; i < keys.length; i++) {
                    if (ignorelist.includes(keys[i]))
                        continue;
                    let temp = JSON.parse(localStorage.getItem(keys[i]));
                    temp.quantity.medium = (0).toString();
                    localStorage.setItem(keys[i], JSON.stringify(temp));
                }
            }
            else if (currButton == 'hard') {
                localStorage.setItem("HValue", "0");
                localStorage.setItem("HCount", "0");
                for (let i = 0; i < keys.length; i++) {
                    if (ignorelist.includes(keys[i]))
                        continue;
                    let temp = JSON.parse(localStorage.getItem(keys[i]));
                    temp.quantity.hard = (0).toString();
                    localStorage.setItem(keys[i], JSON.stringify(temp));
                }
            }
            else if (currButton == 'elite') {
                localStorage.setItem("ElValue", "0");
                localStorage.setItem("ElCount", "0");
                for (let i = 0; i < keys.length; i++) {
                    if (ignorelist.includes(keys[i]))
                        continue;
                    let temp = JSON.parse(localStorage.getItem(keys[i]));
                    temp.quantity.elite = (0).toString();
                    localStorage.setItem(keys[i], JSON.stringify(temp));
                }
            }
            else if (currButton == 'master') {
                localStorage.setItem("MaValue", "0");
                localStorage.setItem("MaCount", "0");
                for (let i = 0; i < keys.length; i++) {
                    if (ignorelist.includes(keys[i]))
                        continue;
                    let temp = JSON.parse(localStorage.getItem(keys[i]));
                    temp.quantity.master = (0).toString();
                    localStorage.setItem(keys[i], JSON.stringify(temp));
                }
            }
        }
    }
    else
        console.log("Nah");
}
//loads all images as raw pixel data async, images have to be saved as *.data.png
//this also takes care of metadata headers in the image that make browser load the image
//with slightly wrong colors
//this function is async, so you cant acccess the images instantly but generally takes <20ms
//use `await imgs.promise` if you want to use the images as soon as they are loaded
var imgs = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.webpackImages({
    trailComplete: __webpack_require__(/*! ./images/TrailComplete.data.png */ "./images/TrailComplete.data.png"),
    trailCompleteLegacy: __webpack_require__(/*! ./images/TrailCompleteLegacy.data.png */ "./images/TrailCompleteLegacy.data.png"),
    rewardValue: __webpack_require__(/*! ./images/RewardValue.data.png */ "./images/RewardValue.data.png"),
    rewardValueLegacy: __webpack_require__(/*! ./images/RewardValueLegacy.data.png */ "./images/RewardValueLegacy.data.png")
});
//listen for pasted (ctrl-v) images, usually used in the browser version of an app
_alt1_base__WEBPACK_IMPORTED_MODULE_0__.PasteInput.listen(img => {
    findtrailComplete(img);
}, (err, errid) => {
});
_alt1_base__WEBPACK_IMPORTED_MODULE_0__.on("alt1pressed", capture);
//You can reach exports on window.TEST because of
//config.makeUmd("testpackage", "TEST"); in webpack.config.ts
function capture() {
    if (!window.alt1) {
        return;
    }
    if (!alt1.permissionPixel) {
        return;
    }
    var img = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
    findtrailComplete(img);
}
async function findtrailComplete(img) {
    try {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Capturing rewards...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
        try {
            var loc = img.findSubimage(await imgs.trailCompleteLegacy);
            console.log(loc[0].x);
            console.log("Legacy window");
            legacy = true;
        }
        catch (e) {
            var loc = img.findSubimage(await imgs.trailComplete);
            console.log("Non-legacy window");
            legacy = false;
        }
        //alt1.overLayRect(a1lib.mixColor(255,0,0), loc[0].x - 27, loc[0].y - 13, await imgs.trailComplete.width + 278, await imgs.trailComplete.height + 213, 2000, 3);
        //alt1.overLayRect(a1lib.mixColor(0,255,0), loc[0].x - 138, loc[0].y - 13, await imgs.trailCompleteLegacy.width + 278, await imgs.trailCompleteLegacy.height + 213, 2000, 3);
        //get raw pixels of image and show on screen (used mostly for debug)  
        //var buf = img.toData(loc[0].x - 27, loc[0].y - 13, await imgs.trailComplete.width + 278, await imgs.trailComplete.height + 213);
        let crops = new Array(9);
        let topCrops = new Array(9);
        // Tweak these two values below if jagex adjusts the pixel placement of the items
        if (!legacy) {
            var x1 = loc[0].x - 1;
            var y1 = loc[0].y + 39;
        }
        else {
            var x1 = loc[0].x - 112;
            var y1 = loc[0].y + 39;
        }
        for (let i = 0; i < crops.length; i++) {
            crops[i] = img.toData(x1, y1, 32, 32);
            topCrops[i] = img.toData(x1, loc[0].y + 41, 32, 8);
            x1 += 40;
        }
        // Give me the total value!
        let rewardreader = new _scripts_rewardreader__WEBPACK_IMPORTED_MODULE_4__["default"]();
        rewardreader.pos = _scripts_modeluireader__WEBPACK_IMPORTED_MODULE_5__.ModalUIReader.find()[0];
        let value = rewardreader.read(img).value;
        let strValue = value.toLocaleString("en-US");
        // Give me the items!
        var itemResults = [];
        let promises = [];
        if (!legacy) {
            var x1 = loc[0].x - 1;
            var y1 = loc[0].y + 39;
        }
        else {
            var x1 = loc[0].x - 112;
            var y1 = loc[0].y + 39;
        }
        for (let i = 0; i < 9; i++) {
            alt1.overLayClearGroup("icon");
            alt1.overLaySetGroup("icon");
            if (displaybox) {
                // Keep an eye on this in case it incorrectly gives numbers...
                alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), x1, loc[0].y + 39, 32, 32, 2000, 1);
                alt1.overLayText((i + 1).toString(), _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0, 255), 18, x1 + 5, loc[0].y + 40, 2000);
            }
            x1 += 40;
            promises.push(itemResults.push(await compareItems(crops[i])));
        }
        await Promise.all(promises);
        alt1.overLayClearGroup("icon");
        console.log(itemResults);
        // Give me the quantity of the items!
        var quantResults = [];
        promises = [];
        for (let i = 0; i < 9; i++) {
            if (itemResults[i] == "Blank")
                break;
            promises.push(quantResults.push(await readQuantites(topCrops[i])));
        }
        await Promise.all(promises);
        console.log(quantResults);
        // Send it to the LS!
        promises = [];
        let success = true;
        promises.push(success = await submitToLS(itemResults, quantResults, value));
        await Promise.all(promises);
        if (!success)
            var notSuccess = 1 / 0;
        // Put the items and quantites on the display!
        document.getElementById("rewards_value").textContent = strValue;
        for (let i = 0; i < 9; i++)
            document.getElementById(rewardSlots[i]).textContent = "";
        for (let i = 0; i < quantResults.length; i++) {
            // Displaying in Rewards Capture
            let nodevar = document.createElement("itembox");
            let imgvar = document.createElement("img");
            let quantvar = document.createElement("span");
            nodevar.setAttribute('style', 'position:relative; margin:auto; margin-top: 3px; width:35px; height:35px; display:flex; align-items:center; text-align:center;');
            nodevar.setAttribute('title', quantResults[i] + " x " + itemResults[i]);
            imgvar.src = encodeURI("./images/items/" + itemResults[i] + ".png");
            imgvar.setAttribute('style', 'margin:0 auto;');
            quantvar.textContent = quantResults[i];
            if (!quantResults[i].includes("k"))
                quantvar.setAttribute('style', 'position:absolute; left:0; top:0; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,0); text-shadow:1px 1px #000000;');
            else
                quantvar.setAttribute('style', 'position:absolute; left:0; top:0; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,255); text-shadow:1px 1px #000000;');
            nodevar.append(quantvar);
            nodevar.append(imgvar);
            document.getElementById(rewardSlots[i]).appendChild(nodevar);
        }
        //Show it on the screen!
        lootDisplay();
        //Display the victory screen!!!
        if (document.getElementById("easy").checked)
            var tier = "Easy";
        else if (document.getElementById("medium").checked)
            var tier = "Medium";
        else if (document.getElementById("hard").checked)
            var tier = "Hard";
        else if (document.getElementById("elite").checked)
            var tier = "Elite";
        else if (document.getElementById("master").checked)
            var tier = "Master";
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx(tier + " rewards captured successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
    }
    catch (e) {
        alt1.overLayClearGroup("overlays");
        alt1.overLayTextEx("      Failed to capture rewards.\nRemove any obstructions, check\n    tier, or open a reward casket.", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        throw e;
    }
}
async function compareItems(item) {
    //TODO: Try to get Legacy to work properly
    //Legacy is a bit janky right now, it can't identify blank
    //spaces and it can't identify some items...
    // Take copy of the original array
    let matches = listOfItemsArray.slice();
    // Can't use all at once. Can only do one color at a time.
    // const yellow = { r: 255, g: 0, b: 0, a: 255};
    // const black1 = { r: 0, g: 0, b: 0, a: 255};
    // const black2 = { r: 0, g: 0, b: 1, a: 255};
    // const black3 = { r: 0, g: 0, b: 2, a: 255};
    // const legacytan = { r: 62, g: 53, b: 40, a: 255};
    // const rs3blue = { r: 10, g: 31, b: 41, a: 255};
    // let colors = [yellow, black1, black2, black3]
    // Just hold this for now just in case...
    if (!legacy) { //Legacy interface?
        var imgdata = await resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1___default()(item, matches[0][1], { output: {}, ignore: "less" });
        matches[0][2] = imgdata.rawMisMatchPercentage;
        if (matches[0][2] == 0.00)
            return "Blank";
    }
    else { //Legacy interface.
        var imgdata = await resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1___default()(item, matches[1][1], { output: {}, ignore: ["less", "colors"] });
        matches[1][2] = imgdata.rawMisMatchPercentage;
        if (matches[1][2] == 0.00) // If it is blank
            return "Blank";
    }
    matches.shift(); // Remove blank if not blank
    matches.shift(); // Remove blank if not blank
    //	{output: {ignoreAreasColoredWith: colors}}
    // 	Choices are: yellow, black1, black2, black3, legacytan, rs3blue	
    if (!legacy) {
        var found = matches[0];
        const promises = [];
        for (let i = 0; i < matches.length; i++)
            promises.push(await resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1___default()(item, matches[i][1], { output: {}, ignore: "less" }).then(data => {
                matches[i][2] = data.rawMisMatchPercentage;
                if (found[2] > matches[i][2])
                    found = matches[i];
            }));
        await Promise.all(promises);
    }
    else {
        var found = matches[0];
        const promises = [];
        for (let i = 0; i < matches.length; i++)
            promises.push(await resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1___default()(item, matches[i][1], { output: {}, ignore: "less" }).then(data => {
                matches[i][2] = data.rawMisMatchPercentage;
                if (found[2] > matches[i][2])
                    found = matches[i];
            }));
        await Promise.all(promises);
    }
    console.log(found[0]);
    return found[0];
}
async function readQuantites(item) {
    // Instead oif reading top to bottom individulally, 
    // Read from left to right Read left to right with all columns together
    // And since the height is always the same I dont have ot worry about changing
    // the value of the width of the number.
    // Maybe consider this for optimizations :^?
    let itemCan = document.createElement("canvas");
    let itemCon = itemCan.getContext('2d');
    itemCan.width = item.width;
    itemCan.height = item.height;
    itemCon.putImageData(item, 0, 0);
    var itemImg = new Image();
    itemImg.src = itemCan.toDataURL("image/png");
    itemCon.drawImage(itemImg, 0, 0);
    let pixels = itemCon.getImageData(0, 0, item.width, item.height);
    //console.log(pixels)
    let pixarr = [];
    let pixeldata = 0;
    for (let i = 0; i < 8; i++) {
        let arr2 = [];
        for (let j = 0; j < 32; j++) {
            let vals = { r: pixels.data[pixeldata], g: pixels.data[pixeldata + 1], b: pixels.data[pixeldata + 2], a: pixels.data[pixeldata + 3] };
            pixeldata += 4;
            arr2.push(vals);
        }
        pixarr.push(arr2);
    }
    let pixelCount = 0;
    let streak = 0;
    let longestStreak = 0;
    let yellowInCol = false;
    let noYellowStreak = 0;
    let numbers = "";
    //console.log(pixarr.length, pixarr[0].length)
    for (let i = 0; i < pixarr[0].length; i++) {
        if (noYellowStreak == 3)
            break;
        for (let j = 0; j < pixarr.length; j++) {
            if (pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 0 // Yellow, Every screen has this
                || pixarr[j][i].r == 254 && pixarr[j][i].g == 254 && pixarr[j][i].b == 0 // Very slightly darker yellow, a screenie had this...
                || pixarr[j][i].r == 253 && pixarr[j][i].g == 253 && pixarr[j][i].b == 0 // Slightly darker yellow, for safety
                || pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 255) { // White, elites and masters only
                pixelCount++;
                streak++;
                noYellowStreak = 0;
                yellowInCol = true;
                if (streak > longestStreak)
                    longestStreak = streak;
            }
            else
                streak = 0;
        }
        if (pixelCount == 0)
            noYellowStreak++;
        else if (yellowInCol == false) {
            if (pixelCount == 11) {
                if (longestStreak == 3)
                    numbers += "7";
                else // 9
                    numbers += "1";
            }
            else if (pixelCount == 13) {
                if (longestStreak == 3)
                    numbers += "3";
                else //if 6
                    numbers += "4";
            }
            else if (pixelCount == 14)
                numbers += "0";
            else if (pixelCount == 15)
                if (longestStreak == 3)
                    numbers += "2";
                else if (longestStreak == 4)
                    numbers += "5";
                else if (longestStreak == 7)
                    numbers += "9";
                else { //if 8
                    numbers += "k";
                    pixelCount = 0;
                    break;
                }
            else if (pixelCount == 18)
                numbers += "6";
            else // if pixelCount == 19
                numbers += "8";
            longestStreak = 0;
            pixelCount = 0;
            noYellowStreak++;
        }
        yellowInCol = false;
    }
    if (pixelCount > 5)
        numbers += "0";
    if (numbers != "")
        return numbers;
    else
        return "1";
}
async function submitToLS(item, quant, value) {
    let currButton = "";
    let val = "";
    let count = "";
    // Add items
    for (let i = 0; i < tierlist.length; i++)
        if (document.getElementById(tierlist[i]).checked) {
            currButton = tierlist[i];
            if (currButton == 'easy') {
                val = "EValue";
                count = "ECount";
            }
            else if (currButton == 'medium') {
                val = "MValue";
                count = "MCount";
            }
            else if (currButton == 'hard') {
                val = "HValue";
                count = "HCount";
            }
            else if (currButton == 'elite') {
                val = "ElValue";
                count = "ElCount";
            }
            else if (currButton == 'master') {
                val = "MaValue";
                count = "MaCount";
            }
        }
    //Add items to database
    console.log("Adding to database...");
    for (let i = 0; i < quant.length; i++) {
        // To access a value
        //localStorage.getItem(item[i]).quantity.master
        // If you get null or undefined here, check if one of your rewards doesn't exist in LocalStorage or LocalStorageInit
        console.log("checking if in array");
        console.log(JSON.parse(localStorage.getItem(item[i])).tier);
        if (JSON.parse(localStorage.getItem(item[i])).tier.includes(currButton))
            if (currButton == 'easy') {
                let temp = JSON.parse(localStorage.getItem(item[i]));
                temp.quantity[currButton] = (parseInt(temp.quantity[currButton]) + parseInt(quant[i])).toString();
                localStorage.setItem(item[i], JSON.stringify(temp));
            }
            else if (currButton == 'medium') {
                let temp = JSON.parse(localStorage.getItem(item[i]));
                temp.quantity.medium = (parseInt(temp.quantity.medium) + parseInt(quant[i])).toString();
                localStorage.setItem(item[i], JSON.stringify(temp));
            }
            else if (currButton == 'hard') {
                let temp = JSON.parse(localStorage.getItem(item[i]));
                temp.quantity.hard = (parseInt(temp.quantity.hard) + parseInt(quant[i])).toString();
                localStorage.setItem(item[i], JSON.stringify(temp));
            }
            else if (currButton == 'elite') {
                let temp = JSON.parse(localStorage.getItem(item[i]));
                temp.quantity.elite = (parseInt(temp.quantity.elite) + parseInt(quant[i])).toString();
                localStorage.setItem(item[i], JSON.stringify(temp));
            }
            else if (currButton == 'master') {
                let temp = JSON.parse(localStorage.getItem(item[i]));
                temp.quantity.master = (parseInt(temp.quantity.master) + parseInt(quant[i])).toString();
                localStorage.setItem(item[i], JSON.stringify(temp));
            }
            else
                return false;
    }
    // Increase value and count
    console.log("VALUE AND COUNT", val, count);
    let curr = JSON.parse(localStorage.getItem(val));
    console.log(val, JSON.stringify((curr + value)));
    localStorage.setItem(val, JSON.stringify((curr + value)));
    curr = JSON.parse(localStorage.getItem(count));
    console.log(count, JSON.stringify(curr + 1));
    localStorage.setItem(count, JSON.stringify(curr + 1));
    return true;
}
function lootDisplay() {
    let currButton = "";
    let val = "";
    let count = "";
    for (let i = 0; i < tierlist.length; i++)
        if (document.getElementById(tierlist[i]).checked) {
            currButton = tierlist[i];
            if (currButton == 'easy') {
                val = "EValue";
                count = "ECount";
            }
            else if (currButton == 'medium') {
                val = "MValue";
                count = "MCount";
            }
            else if (currButton == 'hard') {
                val = "HValue";
                count = "HCount";
            }
            else if (currButton == 'elite') {
                val = "ElValue";
                count = "ElCount";
            }
            else if (currButton == 'master') {
                val = "MaValue";
                count = "MaCount";
            }
        }
    //Set Number of clues and Current and Average values
    document.getElementById("number_of_clues").textContent = JSON.parse(localStorage.getItem(count)).toLocaleString("en-US");
    document.getElementById("value_of_clues").textContent = JSON.parse(localStorage.getItem(val)).toLocaleString("en-US");
    if (parseInt(JSON.parse(localStorage.getItem(count))) != 0)
        document.getElementById("average_of_clues").textContent = Math.round(parseInt(JSON.parse(localStorage.getItem(val))) / parseInt(JSON.parse(localStorage.getItem(count)))).toLocaleString("en-US");
    else
        document.getElementById("average_of_clues").textContent = "0";
    //Set the icons in the tabs
    tabDisplay(currButton);
}
function tabDisplay(current) {
    let keys = Object.keys(localStorage);
    let divs = document.getElementsByClassName("loot_display");
    for (let i = 0; i < divs.length; i++)
        divs[i].textContent = "";
    for (let i = 0; i < keys.length; i++) {
        if (ignorelist.includes(keys[i]) || JSON.parse(localStorage.getItem(keys[i])).quantity[current] == 0)
            continue;
        console.log(JSON.parse(localStorage.getItem(keys[i])).tab + "_loot");
        let ele = document.getElementById(JSON.parse(localStorage.getItem(keys[i])).tab + "_loot");
        let nodevar = document.createElement("itembox");
        let imgvar = document.createElement("img");
        let quantvar = document.createElement("span");
        nodevar.setAttribute('style', 'position:relative; margin: 3 5 0 1; padding:0 5px 0 2px; width:35px; height:35px; display:flex; align-items:center; text-align:center; order: ' + parseInt(JSON.parse(localStorage.getItem(keys[i])).order) + ';');
        nodevar.setAttribute('title', JSON.parse(localStorage.getItem(keys[i])).quantity[current] + " x " + keys[i]);
        imgvar.src = encodeURI("./images/items/" + keys[i] + ".png");
        imgvar.setAttribute('style', 'margin:0 auto;');
        if (parseInt(JSON.parse(localStorage.getItem(keys[i])).quantity[current]) > 99999) {
            quantvar.setAttribute('style', 'position:absolute; left:0; top:0; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,255); text-shadow:1px 1px #000000;');
            quantvar.textContent = (parseInt(JSON.parse(localStorage.getItem(keys[i])).quantity[current]) / 1000).toString() + "k";
        }
        else {
            quantvar.setAttribute('style', 'position:absolute; left:0; top:0; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,0); text-shadow:1px 1px #000000;');
            quantvar.textContent = JSON.parse(localStorage.getItem(keys[i])).quantity[current];
        }
        nodevar.append(quantvar);
        nodevar.append(imgvar);
        ele.append(nodevar);
    }
}
//print text world
//also the worst possible example of how to use global exposed exports as described in webpack.config.json
//output.insertAdjacentHTML("beforeend", `
//	<div>paste an image of rs with homeport button (or not)</div>
//	<div onclick='TEST.capture()'>Click to capture if on alt1</div>`
//);
//check if we are running inside alt1 by checking if the alt1 global exists
if (window.alt1) {
    //tell alt1 about the app
    //this makes alt1 show the add app button when running inside the embedded browser
    //also updates app settings if they are changed
    alt1.identifyAppUrl("./appconfig.json");
}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});