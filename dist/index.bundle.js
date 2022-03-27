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

/***/ "../images/TrailComplete.data.png":
/*!****************************************!*\
  !*** ../images/TrailComplete.data.png ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAHsAAAALCAIAAADQh2XpAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAifSURBVFhHVZf/b1V3Gcfb3nPOvef7ufeec9vTlrajhfJtm+AYtKWwSsG1QGjLNjEojC9Oxr44DaKA8m0YYZmMRIStkMW4DcyICoNkPywDJ/7iQDDGRM3iFo1z/jSd/gH6eu5ze3qXPLn5fJ7vn/fzfJ7PuQ2jSTzR0bosTda2tw63VlhDyhzv6eZ3TWvC9nNxWflslVSHBSJs+R0ol/iFYMJRUk39RaRr+Niir+aQKiPNFOpJzXWt+tPJVJL1M9LlaWVNe7q6mv/4jBTmRGfbePfM8Y50TZqMJPFwEsMfrUzln4oh0tE0WYmftnQoLi+r5r8yIf/KVGgxF6uqk5XkLx4q69pbCToYlzCvmlRza0sl/6rClPm0k32rix9dLWxfVGm4c8796Eqezf9umhDrf1zJs3h5l4+vn+8La/yrhf9ct9486j5ylxwYIm9+KRLE+uLecP9IEY6GITYcDP973frOWAAQF/Z4un1ha5h5AHT1oIbK3DgnvbjHe++ntibD728nbRyi9oXZMX7g/PNqAVfks3FOi54Q1ADrzjl77K4yh1eUibv7geTNZ12VcvLXq2lwlvcuyIneOemOz6YGlYt7A+Wf2lYS7CoJsI51pBe+LfoQmRAR/8NphXw0sUykoJ3d5WWuIBRwiAmlUmUnl2v44dYwMmX19mkDVkNDA+s0yj023tTrumQM860fGfCf2CAK39+eX90inVLf0QBBNr9+0VpUjjBRPqS2ZmPjwsAHr9q2qWmO57JVD1oe1We9vqtE9rcmC/dU7NAwSGZ+R+72K2ZsmUT58/nC9RN2t+/ZudzA/NzH18x/XzM3zA9HKlKPlWlCiMPbzBVxSbt4bEb6yxPOH8/nO1xHEacHNQ2jsfHph+REp56x9ET16Uk+SRlwAUv5IEDQfVtycT5/YrNfyluFXFMGGiIFrdt1soMrmGpy4wXn/UuiKVNlbuRzeOqmxhiwXdGSwL+vKH2KMTaZo57Ak4SmiFwnH/coJtKheyxlcv4M4pJpav/WtnnRQaq2qg8RFDW9GfM6cqgtr5YE/v71XmgaREF0d6dRmfJwYCKCc3Z/7r4ogrOzT7Yfv212uY74T5OJebU7GpqmRAHEuqzg6LrTthFN86tqq7i7bWmmA1/r2uN7KMwNfb1SSAGNoTQYlz/f2nJ3JDc4M9Fh1eM6XMffvWpSmAYwlVTicoY4TmEqRpkxiMNh/a0tTXHeQgfK8KIrNy8X85f25RZHYosIhSnbGkC6JQ/WcNQcQFVZdXBF25LGZ6NImUqLigGiv122EA0015jqE4hbCwXO9t2xQAu/d0tOwbpyxFXOzLbG0baUwwNTLY289cgs6fdjT+YU5Rrfoj/SUVKiwWVAp5k+OmOzEqmHiMoM8VsZaGlF6ySLT/cWtxbll58Mrjxn+YbRwIGV3n1JRrmcp9pZYly9+JkxA46qoMDFga9wsPjacMjM5Yq9Ww0/K7bUAzjWbE1T65q5UoWMcEWR9Bcdbh9XPgsB6VpFtEm94YdvyHwU/TCc3OVdPGwzaqgBF/FLC8vA/b0dojB8f+NQc0U7Lkvj/B6PgVMMGhhTdKjyA9PQwijoRIEPfXBZHjNadUVzrG8slLUp7zZ3gvypK9lmJnQJVV9aLp54NDx/IM/tbAAXPf/NyWnEtfv6o6A+Hr8HNznSDtWBq3CgefOc/ck164NL8iqiwyVY2iy3T205A+8Ea82DLddFpYojcx9v/YGUhAUposZMzHSUWKuoJWpiDakCQW+/IhMTnWsn7GM7Cke319r88iH79E5346ocWybsZ8KgvgEPb7OOTAQzPcczjcFyiQ8P5VOJwVSwHkrKy1oEHOUTIi3mnnrI5EkQKcWLS7fPOUglehjKN097Wh8CPtk+sSHXUsjvXhU+/1ihzSnUpjaUIc7h9ZorPzP+2TF5JZgeelrUkG5aUPzkutVZlAeH7qO//nLJ4BKogtoq4lke1IyPUeVo5VSZAsPXTxrKtqRUhK9qDy+QMa0isGO+a25EhwO4nmGw/dP5wo4Rq6tAB0ibM516k/y6hbVxx3tY3+M8y12OM9/3FhfDZVHEFFK+jIKkzCM8EEbyO6VfNM2BUmlJEPT67mCL5A/Ed6YQl/yLofKJMu2K+S5z3CXVrw553Y4jiHPloQxx3cLnwFk8YBqbnbxzRk6y4wH50iAGaq9+033rBzaXWgG6elRAWbPUUPP6wLq99RMpAOA+PlhmTOEhQx8F6MHO4u9fkyZ97isFZaLM5e0rRoj+elkSGFtc/ZaIyzdOOgxDcm63C/3lEjNkXZ/U+9ROAWLvozkSW9td+zhpc2ywyE4E4mDNlhpow2bp4ZlHmDkAM0ubU9Dyx7/sP9gZDRRDZshIW/qbKdB0iFMhMUmnTCwTzvFNLqP80Hjw493O/MCvTRU+mfWFoRe2LRW4JZU0OfuUfFpyyEPb5LVc2xNfOi7j5fWDBQpwuvqJ8qszVk9ZRjPEtzZS2vwbYx5StT241SCKbqF/XZPpxmJzX9gTymcSnvm31dfcwkK2HdGBrQYZ06T6Scu4AAhEazqLzz9tvH/J+PsbFl+K+KSLEYGa3oCz+3ILAh8Eb7xoMaB7fBeRHu3kMyZY6AcPWTFVNGel+vQ+rKb3xcXenNA/vfNTaeOq23ZWNMv7eeThKAPt68Pt/c0teifO1LnS/Ltd9xeHnT+8ZnXYtow/Go3fXt+jIyhXkrfuDQM4IM5vl+/CRNTpOHAWRkGznYfDbOILEqbZ1Ei/6OyG8I6Uh7TXtTvz0oDY0oOI5oYBW+U4Ro4FgRgsRMnSgNDkxuCZWYEmw4rf2Kq9t4jwlm9qIgQKqJGSGsLHJ/nLNi5FlrWkXNRZjAdE7a59fyniUdUcpB5xCZj6w4jZrXwV4ZzFvZ6PlBDKZ3LCR8ozO9qe4nmu78NE1FzIzws8AqnDzARlzR8RiPmG8X8To9dMDL5/qgAAAABJRU5ErkJggg==")

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

/***/ "../JSONs/LocalStorageInit.json":
/*!**************************************!*\
  !*** ../JSONs/LocalStorageInit.json ***!
  \**************************************/
/***/ ((module) => {

module.exports = {"Coins":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":1},"Holy biscuits":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":2},"Purple sweets":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":3},"Miscellania Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":4},"Lumber Yard Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":5},"Bandit Camp Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":6},"Pollnivneach Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":7},"Phoenix Lair Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":8},"Tai Bwo Wannai Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":9},"Lighthouse Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":10},"Clocktower Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":11},"Gu'Tanoth Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":12},"Grand Exchange Teleport":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":13},"Saradomin page":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":14},"Guthix page":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":15},"Zamorak page":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":16},"Armadyl page":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":17},"Bandos page":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":18},"Ancient page":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":19},"Red firelighter":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":20},"Green firelighter":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":21},"Blue firelighter":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":22},"Purple firelighter":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":23},"White firelighter":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":24},"Saradomin arrows":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":25},"Guthix arrows":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":26},"Zamorak arrows":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":27},"Meerkats pouch":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":28},"Meerkat scroll (Fetch Casket)":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":29},"Golden compass":{"tab":"broadcast","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":30},"Fire rune":{"tab":"common","tier":["easy","medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":31},"Air rune":{"tab":"common","tier":["easy","medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":32},"Water rune":{"tab":"common","tier":["easy","medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":33},"Earth rune":{"tab":"common","tier":["easy","medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":34},"Law rune":{"tab":"common","tier":["easy","medium","hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":35},"Nature rune":{"tab":"common","tier":["easy","medium","hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":36},"Pure essence":{"tab":"common","tier":["easy","medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":37},"Black 2h crossbow":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":38},"Black crossbow":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":39},"Off-hand black crossbow":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":40},"Staff of air":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":41},"Staff of water":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":42},"Staff of earth":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":43},"Staff of fire":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":44},"Small bladed mithril salvage":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":45},"Medium bladed mithril salvage":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":46},"Oak plank":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":47},"Amulet of magic":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":48},"Mithril arrow":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":49},"Black bolts":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":50},"Air talisman":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":51},"Fire talisman":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":52},"Earth talisman":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":53},"Water talisman":{"tab":"common","tier":["easy","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":54},"Small plated mithril salvage":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":55},"Medium plated mithril salvage":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":56},"Huge plated mithril salvage":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":57},"Hard leather":{"tab":"common","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":58},"Willow composite bow":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":59},"Yew composite bow":{"tab":"rare","tier":["easy","medium","hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":60},"Magic composite bow":{"tab":"rare","tier":["easy","medium","hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":61},"Black full helm (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":62},"Black platebody (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":63},"Black platelegs (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":64},"Black plateskirt (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":65},"Black kiteshield (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":66},"Black full helm (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":67},"Black platebody (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":68},"Black platelegs (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":69},"Black plateskirt (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":70},"Black kiteshield (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":71},"Black beret":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":72},"Blue beret":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":73},"White beret":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":74},"Highwayman mask":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":75},"Wizard hat (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":76},"Wizard robe top (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":77},"Wizard robe skirt (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":78},"Wizard hat (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":79},"Wizard robe top (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":80},"Wizard robe skirt (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":81},"Studded body (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":82},"Studded chaps (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":83},"Studded body (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":84},"Studded chaps (g)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":85},"Bob shirt (black)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":86},"Bob shirt (blue)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":87},"Bob shirt (green)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":88},"Bob shirt (purple)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":89},"Bob shirt (red)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":90},"Flared trousers":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":91},"Sleeping cap":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":92},"Powdered wig":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":93},"Pantaloons":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":94},"Saradomin robe top":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":95},"Saradomin robe legs":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":96},"Guthix robe top":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":97},"Guthix robe legs":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":98},"Zamorak robe top":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":99},"Zamorak robe legs":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":100},"Amulet of magic (t)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":101},"Black cane":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":102},"Spiked helmet":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":103},"Suitcase":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":104},"Bonus XP star (small)":{"tab":"general","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":105},"Blue elegant shirt":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":106},"Blue elegant blouse":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":107},"Blue elegant legs":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":108},"Blue elegant skirt":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":109},"Green elegant shirt":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":110},"Green elegant blouse":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":111},"Green elegant legs":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":112},"Green elegant skirt":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":113},"Red elegant shirt":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":114},"Red elegant blouse":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":115},"Red elegant legs":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":116},"Red elegant skirt":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":117},"Black helm (h1)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":118},"Black platebody (h1)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":119},"Black platelegs (h1)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":120},"Black plateskirt (h1)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":121},"Black shield (h1)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":122},"Black helm (h2)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":123},"Black platebody (h2)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":124},"Black platelegs (h2)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":125},"Black plateskirt (h2)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":126},"Black shield (h2)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":127},"Black helm (h3)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":128},"Black platebody (h3)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":129},"Black platelegs (h3)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":130},"Black plateskirt (h3)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":131},"Black shield (h3)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":132},"Black helm (h4)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":133},"Black platebody (h4)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":134},"Black platelegs (h4)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":135},"Black plateskirt (h4)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":136},"Black shield (h4)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":137},"Black helm (h5)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":138},"Black platebody (h5)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":139},"Black platelegs (h5)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":140},"Black plateskirt (h5)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":141},"Black shield (h5)":{"tab":"rare","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":142},"Re-roll token (easy)":{"tab":"general","tier":["easy"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":143},"Sealed clue scroll (master)":{"tab":"general","tier":["easy","medium","hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":144},"Mind rune":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":145},"Death rune":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":146},"Air battlestaff":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":147},"Water battlestaff":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":148},"Earth battlestaff":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":149},"Fire battlestaff":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":150},"Green dragonhide":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":151},"Teak plank":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":152},"Green dragonhide body":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":153},"Green dragonhide chaps":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":154},"Adamant arrow":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":155},"Adamant bolts":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":156},"Small bladed adamant salvage":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":157},"Medium bladed adamant salvage":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":158},"Small plated adamant salvage":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":159},"Medium plated adamant salvage":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":160},"Huge plated adamant salvage":{"tab":"common","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":161},"Adamant full helm (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":162},"Adamant platebody (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":163},"Adamant platelegs (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":164},"Adamant plateskirt (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":165},"Adamant kiteshield (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":166},"Adamant full helm (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":167},"Adamant platebody (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":168},"Adamant platelegs (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":169},"Adamant plateskirt (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":170},"Adamant kiteshield (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":171},"Ranger boots":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":172},"Wizard boots (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":173},"Black headband":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":174},"Red headband":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":175},"Brown headband":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":176},"Red boater":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":177},"Orange boater":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":178},"Blue boater":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":179},"Green boater":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":180},"Black boater":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":181},"Green dragonhide body (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":182},"Green dragonhide chaps (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":183},"Green dragonhide body (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":184},"Green dragonhide chaps (g)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":185},"Adamant helm (h1)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":186},"Adamant platebody (h1)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":187},"Adamant platelegs (h1)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":188},"Adamant plateskirt (h1)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":189},"Adamant shield (h1)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":190},"Adamant helm (h2)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":191},"Adamant platebody (h2)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":192},"Adamant platelegs (h2)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":193},"Adamant plateskirt (h2)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":194},"Adamant shield (h2)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":195},"Adamant helm (h3)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":196},"Adamant platebody (h3)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":197},"Adamant platelegs (h3)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":198},"Adamant plateskirt (h3)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":199},"Adamant shield (h3)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":200},"Adamant helm (h4)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":201},"Adamant platebody (h4)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":202},"Adamant platelegs (h4)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":203},"Adamant plateskirt (h4)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":204},"Adamant shield (h4)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":205},"Adamant helm (h5)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":206},"Adamant platebody (h5)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":207},"Adamant platelegs (h5)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":208},"Adamant plateskirt (h5)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":209},"Adamant shield (h5)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":210},"White elegant blouse":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":211},"White elegant skirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":212},"Black elegant shirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":213},"Black elegant legs":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":214},"Purple elegant blouse":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":215},"Purple elegant skirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":216},"Purple elegant shirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":217},"Purple elegant legs":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":218},"Saradomin mitre":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":219},"Guthix mitre":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":220},"Zamorak mitre":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":221},"Saradomin cloak":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":222},"Guthix cloak":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":223},"Zamorak cloak":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":224},"Armadyl robe top":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":225},"Armadyl robe legs":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":226},"Bandos robe top":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":227},"Bandos robe legs":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":228},"Ancient robe top":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":229},"Ancient robe legs":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":230},"Sheep mask":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":231},"Bat mask":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":232},"Penguin mask":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":233},"Cat mask":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":234},"Wolf mask":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":235},"Strength amulet (t)":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":236},"Adamant cane":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":237},"Pith helmet":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":238},"Briefcase":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":239},"Blue checkered shirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":240},"Green checkered shirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":241},"Purple checkered shirt":{"tab":"rare","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":242},"Bonus XP star (medium)":{"tab":"general","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":243},"Re-roll token (medium)":{"tab":"general","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":244},"Reward casket (easy)":{"tab":"general","tier":["medium"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":245},"Astral rune":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":246},"Blood rune":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":247},"Mystic air staff":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":248},"Mystic water staff":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":249},"Mystic earth staff":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":250},"Mystic fire staff":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":251},"Black dragonhide":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":252},"Medium spiky rune salvage":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":253},"Medium bladed rune salvage":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":254},"Large bladed rune salvage":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":255},"Medium plated rune salvage":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":256},"Large plated rune salvage":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":257},"Huge plated rune salvage":{"tab":"common","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":258},"Mahogany plank":{"tab":"common","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":259},"Rune arrow":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":260},"Court summons":{"tab":"general","tier":["hard","elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":261},"Rune full helm (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":262},"Rune platebody (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":263},"Rune platelegs (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":264},"Rune plateskirt (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":265},"Rune kiteshield (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":266},"Rune full helm (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":267},"Rune platebody (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":268},"Rune platelegs (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":269},"Rune plateskirt (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":270},"Rune kiteshield (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":271},"Rune full helm (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":272},"Rune platebody (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":273},"Rune platelegs (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":274},"Rune plateskirt (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":275},"Rune kiteshield (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":276},"Rune full helm (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":277},"Rune platebody (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":278},"Rune platelegs (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":279},"Rune plateskirt (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":280},"Rune kiteshield (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":281},"Rune full helm (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":282},"Rune platebody (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":283},"Rune platelegs (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":284},"Rune plateskirt (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":285},"Rune kiteshield (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":286},"Blue dragonhide body (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":287},"Blue dragonhide chaps (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":288},"Blue dragonhide body (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":289},"Blue dragonhide chaps (g)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":290},"Pirate's hat":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":291},"Robin Hood hat":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":292},"Enchanted hat":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":293},"Enchanted top":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":294},"Enchanted robe":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":295},"Tan cavalier":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":296},"Dark cavalier":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":297},"Black cavalier":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":298},"Rune helm (h1)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":299},"Rune platebody (h1)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":300},"Rune platelegs (h1)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":301},"Rune plateskirt (h1)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":302},"Rune shield (h1)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":303},"Rune helm (h2)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":304},"Rune platebody (h2)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":305},"Rune platelegs (h2)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":306},"Rune plateskirt (h2)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":307},"Rune shield (h2)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":308},"Rune helm (h3)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":309},"Rune platebody (h3)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":310},"Rune platelegs (h3)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":311},"Rune plateskirt (h3)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":312},"Rune shield (h3)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":313},"Rune helm (h4)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":314},"Rune platebody (h4)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":315},"Rune platelegs (h4)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":316},"Rune plateskirt (h4)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":317},"Rune shield (h4)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":318},"Rune helm (h5)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":319},"Rune platebody (h5)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":320},"Rune platelegs (h5)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":321},"Rune plateskirt (h5)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":322},"Rune shield (h5)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":323},"Amulet of glory (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":324},"Amulet of fury (t)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":325},"Saradomin stole":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":326},"Guthix stole":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":327},"Zamorak stole":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":328},"Saradomin crozier":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":329},"Guthix crozier":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":330},"Zamorak crozier":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":331},"Armadyl mitre":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":332},"Bandos mitre":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":333},"Ancient mitre":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":334},"Armadyl cloak":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":335},"Bandos cloak":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":336},"Ancient cloak":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":337},"Blessed dragonhide coif (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":338},"Blessed dragonhide body (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":339},"Blessed dragonhide chaps (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":340},"Blessed dragonhide vambraces (Saradomin)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":341},"Blessed dragonhide coif (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":342},"Blessed dragonhide body (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":343},"Blessed dragonhide chaps (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":344},"Blessed dragonhide vambraces (Guthix)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":345},"Blessed dragonhide coif (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":346},"Blessed dragonhide body (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":347},"Blessed dragonhide chaps (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":348},"Blessed dragonhide vambraces (Zamorak)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":349},"Fox mask":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":350},"White unicorn mask":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":351},"Black unicorn mask":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":352},"Green dragon mask":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":353},"Blue dragon mask":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":354},"Red dragon mask":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":355},"Top hat":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":356},"Rune cane":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":357},"Guido's bonfire in a bottle":{"tab":"general","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":358},"Bonus XP star (large)":{"tab":"general","tier":["hard","elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":359},"Costume skipping ticket":{"tab":"general","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":360},"Puzzle box skipping ticket":{"tab":"general","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":361},"Knot skipping ticket":{"tab":"general","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":362},"Re-roll token (hard)":{"tab":"general","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":363},"Barrows dye":{"tab":"broadcast","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":364},"Shadow dye":{"tab":"broadcast","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":365},"Backstab cape":{"tab":"broadcast","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":366},"Sack of effigies":{"tab":"broadcast","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":367},"Explosive barrel":{"tab":"broadcast","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":368},"Rune full helm (Gilded)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":369},"Rune platebody (Gilded)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":370},"Rune platelegs (Gilded)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":371},"Rune plateskirt (Gilded)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":372},"Rune kiteshield (Gilded)":{"tab":"rare","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":373},"Super attack (4)":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":374},"Super defence (4)":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":375},"Super strength (4)":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":376},"Super energy (4)":{"tab":"common","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":377},"Super restore (4)":{"tab":"common","tier":["hard","elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":378},"Antifire (4)":{"tab":"common","tier":["hard","elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":379},"Starved ancient effigy":{"tab":"common","tier":["hard","elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":380},"Third age full helmet":{"tab":"broadcast","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":381},"Third age platebody":{"tab":"broadcast","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":382},"Third age platelegs":{"tab":"broadcast","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":383},"Third age kiteshield":{"tab":"broadcast","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":384},"Third age mage hat":{"tab":"broadcast","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":385},"Third age robe top":{"tab":"broadcast","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":386},"Third age robe":{"tab":"broadcast","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":387},"Third age amulet":{"tab":"broadcast","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":388},"Third age ranger coif":{"tab":"broadcast","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":389},"Third age ranger body":{"tab":"broadcast","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":390},"Third age vambraces":{"tab":"broadcast","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":391},"Third age ranger chaps":{"tab":"broadcast","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":392},"Reward casket (medium)":{"tab":"general","tier":["hard"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":393},"Royal dragonhide":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":394},"Uncut dragonstone":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":395},"Runite stone spirit":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":396},"Papaya tree seed":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":397},"Yew seed":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":398},"Dragonfruit seed":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":399},"Mango seed":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":400},"Lychee seed":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":401},"Guarana seed":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":402},"Prayer potion (4)":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":403},"Green salamander":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":404},"Unicorn horn":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":405},"Onyx bolt tips":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":406},"Battlestaff":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":407},"Dragon helm":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":408},"Rune full helm (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":409},"Rune platebody (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":410},"Rune platelegs (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":411},"Rune plateskirt (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":412},"Rune kiteshield (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":413},"Rune full helm (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":414},"Rune platebody (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":415},"Rune platelegs (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":416},"Rune plateskirt (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":417},"Rune kiteshield (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":418},"Rune full helm (Ancient)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":419},"Rune platebody (Ancient)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":420},"Rune platelegs (Ancient)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":421},"Rune plateskirt (Ancient)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":422},"Rune kiteshield (Ancient)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":423},"Blessed dragonhide coif (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":424},"Blessed dragonhide body (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":425},"Blessed dragonhide chaps (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":426},"Blessed dragonhide vambraces (Armadyl)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":427},"Blessed dragonhide coif (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":428},"Blessed dragonhide body (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":429},"Blessed dragonhide chaps (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":430},"Blessed dragonhide vambraces (Bandos)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":431},"Blessed dragonhide coif (Zaros)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":432},"Blessed dragonhide body (Zaros)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":433},"Blessed dragonhide chaps (Zaros)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":434},"Blessed dragonhide vambraces (Zaros)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":435},"Robin Hood tunic":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":436},"Robin Hood tights":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":437},"Armadyl stole":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":438},"Bandos stole":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":439},"Ancient stole":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":440},"Armadyl crozier":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":441},"Bandos crozier":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":442},"Ancient crozier":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":443},"Dragon platelegs-skirt ornament kit (or)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":444},"Dragon sq shield ornament kit (or)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":445},"Dragon full helm ornament kit (sp)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":446},"Dragon platebody ornament kit (sp)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":447},"Dragon platelegs-skirt ornament kit (sp)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":448},"Dragon sq shield ornament kit (sp)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":449},"Fury ornament kit":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":450},"Dragon full helm ornament kit (or)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":451},"Dragon platebody ornament kit (or)":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":452},"Bat staff":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":453},"Wolf staff":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":454},"Dragon staff":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":455},"Cat staff":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":456},"Penguin staff":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":457},"Dragon cane":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":458},"Tower skipping ticket":{"tab":"general","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":459},"Lockbox skipping ticket":{"tab":"general","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":460},"Black dragon mask":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":461},"Bronze dragon mask":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":462},"Iron dragon mask":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":463},"Steel dragon mask":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":464},"Mithril dragon mask":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":465},"Frost dragon mask":{"tab":"rare","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":466},"Third Age dye":{"tab":"broadcast","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":467},"Blood dye":{"tab":"broadcast","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":468},"Ice dye":{"tab":"broadcast","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":469},"Re-roll token (elite)":{"tab":"general","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":470},"Crystal triskelion fragment 1":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":471},"Crystal triskelion fragment 2":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":472},"Crystal triskelion fragment 3":{"tab":"common","tier":["elite","master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":473},"Third age druidic wreath":{"tab":"broadcast","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":474},"Third age druidic robe top":{"tab":"broadcast","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":475},"Third age druidic robe bottom":{"tab":"broadcast","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":476},"Third age druidic cloak":{"tab":"broadcast","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":477},"Third age druidic staff":{"tab":"broadcast","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":478},"Guthix bow":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":479},"Saradomin bow":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":480},"Zamorak bow":{"tab":"common","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":481},"Reward casket (hard)":{"tab":"general","tier":["elite"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":482},"Crystal key":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":483},"Dragon arrowheads":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":484},"Hydrix bolt tips":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":485},"Palm tree seed":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":486},"Golden dragonfruit seed":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":487},"Carambola seed":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":488},"Wine of Saradomin":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":489},"Wine of Zamorak":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":490},"Prayer renewal (4)":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":491},"Weapon poison++ (4)":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":492},"Uncut onyx":{"tab":"common","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":493},"Bonus XP star (huge)":{"tab":"general","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":494},"Box of clue scrolls":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":495},"Flaming sword enchantment":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":496},"Golden thread":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":497},"Elemental impetus":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":498},"Hobby unicorn (white)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":499},"Hobby unicorn (black)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":500},"Pyjama top":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":501},"Pyjama bottoms":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":502},"Pyjama slippers":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":503},"Heavy chest":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":504},"Bag of clues":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":505},"Ring of coins":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":506},"Ring of trees":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":507},"Round glasses (black)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":508},"Round glasses (blue)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":509},"Round glasses (green)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":510},"Stylish glasses (black)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":511},"Stylish glasses (blue)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":512},"Stylish glasses (green)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":513},"Half-moon spectacles (black)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":514},"Half-moon spectacles (blue)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":515},"Half-moon spectacles (green)":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":516},"Adamant dragon mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":517},"Rune dragon mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":518},"Dragonstone dragon mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":519},"Onyx dragon mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":520},"Hydrix dragon mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":521},"Gilded boater":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":522},"Gilded cavalier":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":523},"Samurai kasa":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":524},"Reaper ornament kit":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":525},"Soul ornament kit":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":526},"Tuxedo jacket":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":527},"Tuxedo trousers":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":528},"Tuxedo shoes":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":529},"Tuxedo gloves":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":530},"Tuxedo cravat":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":531},"Evening bolero":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":532},"Evening dipped skirt":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":533},"Evening shoes":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":534},"Evening gloves":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":535},"Evening masquerade mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":536},"Heated tea flask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":537},"Pack yak mask":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":538},"Orlando Smith's hat":{"tab":"broadcast","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":539},"Elemental battlestaff":{"tab":"rare","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":540},"Re-roll token (master)":{"tab":"general","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":541},"Second-Age full helm":{"tab":"broadcast","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":542},"Second-Age platebody":{"tab":"broadcast","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":543},"Second-Age platelegs":{"tab":"broadcast","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":544},"Second-Age sword":{"tab":"broadcast","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":545},"Second-Age mage mask":{"tab":"broadcast","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":546},"Second-Age robe top":{"tab":"broadcast","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":547},"Second-Age robe bottom":{"tab":"broadcast","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":548},"Second-Age staff":{"tab":"broadcast","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":549},"Second-Age range coif":{"tab":"broadcast","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":550},"Second-Age range top":{"tab":"broadcast","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":551},"Second-Age range legs":{"tab":"broadcast","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":552},"Second-Age bow":{"tab":"broadcast","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":553},"Reward casket (elite)":{"tab":"general","tier":["master"],"quantity":{"easy":0,"medium":0,"hard":0,"elite":0,"master":0},"order":554}}

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "refresh": () => (/* binding */ refresh)
/* harmony export */ });
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _JSONs_LocalStorageInit_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../JSONs/LocalStorageInit.json */ "../JSONs/LocalStorageInit.json");
/* harmony import */ var _JSONs_LocalStorageInit_json__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_JSONs_LocalStorageInit_json__WEBPACK_IMPORTED_MODULE_1__);
//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api


//tell webpack to add index.html and appconfig.json to output
__webpack_require__(/*! !file-loader?name=[name].[ext]!./index.html */ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html");
__webpack_require__(/*! !file-loader?name=[name].[ext]!./appconfig.json */ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json");
function refresh() {
    location.reload();
}
function init() {
    var keys = Object.keys(_JSONs_LocalStorageInit_json__WEBPACK_IMPORTED_MODULE_1__);
    if (localStorage.getItem("Checked button") == null) { // If doesn't exist yet
        console.log("Defaulting button to easy...");
        const ele = document.getElementById("easy");
        ele.checked = true;
        document.getElementById('clue_tier').textContent = "Easy";
        localStorage.setItem("Checked button", "easy");
    }
    else { // If it does, set the button and span
        console.log("Setting previously set radio button: " + localStorage.getItem("Checked button") + "...");
        var temp = localStorage.getItem("Checked button");
        const ele = document.getElementById(temp);
        ele.checked = true;
        document.getElementById('clue_tier').textContent = temp[0].toUpperCase() + temp.slice(1).toLowerCase();
    }
    console.log("Radio buttons initialized.\n ");
    //  Initializing the rest of the LocalStorage
    console.log("Initializing LocalStorage...");
    for (let i = 0; i < keys.length; i++)
        if (!(localStorage.getItem(keys[i]))) // If doesn't exist, add it
            localStorage.setItem(keys[i], JSON.stringify(_JSONs_LocalStorageInit_json__WEBPACK_IMPORTED_MODULE_1__[keys[i]]));
    console.log("LocalStorage initialized.\n ");
}
function changeClueTierSpan(id) {
    // Set the clue_tier span for the checked box
    console.log("Setting button to " + (id[0].toUpperCase() + id.slice(1).toLowerCase()) + "...");
    document.getElementById('clue_tier').textContent = id[0].toUpperCase() + id.slice(1).toLowerCase();
    localStorage.setItem("Checked button", id);
}
var rewardSlots = ["first_item", "second_item", "third_item", "fourth_item", "fifth_item", "sixth_item", "seventh_item", "eigth_item", "ninth_item"];
//loads all images as raw pixel data async, images have to be saved as *.data.png
//this also takes care of metadata headers in the image that make browser load the image
//with slightly wrong colors
//this function is async, so you cant acccess the images instantly but generally takes <20ms
//use `await imgs.promise` if you want to use the images as soon as they are loaded
var imgs = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.webpackImages({
    trailComplete: __webpack_require__(/*! ../images/TrailComplete.data.png */ "../images/TrailComplete.data.png")
});
//listen for pasted (ctrl-v) images, usually used in the browser version of an app
_alt1_base__WEBPACK_IMPORTED_MODULE_0__.PasteInput.listen(img => {
    findtrailComplete(img);
}, (err, errid) => {
    //output.insertAdjacentHTML("beforeend", `<div><b>${errid}</b>  ${err}</div>`);
});
//You can reach exports on window.TEST because of
//config.makeUmd("testpackage", "TEST"); in webpack.config.ts
function capture() {
    if (!window.alt1) {
        //output.insertAdjacentHTML("beforeend", `<div>You need to run this page in alt1 to capture the screen</div>`);
        return;
    }
    if (!alt1.permissionPixel) {
        //output.insertAdjacentHTML("beforeend", `<div>Page is not installed as app or capture permission is not enabled</div>`);
        return;
    }
    var img = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
    findtrailComplete(img);
}
function findtrailComplete(img) {
    var loc = img.findSubimage(imgs.trailComplete);
    //overlay the result on screen if running in alt1
    if (window.alt1) {
        if (loc.length != 0) {
            alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 0, 0), loc[0].x - 27, loc[0].y - 13, imgs.trailComplete.width + 278, imgs.trailComplete.height + 213, 2000, 3);
        }
        else {
            alt1.overLayTextEx("Couldn't find Rewards window. Remove\n    any obstructions or open a casket.", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 255, 255), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
        }
    }
    //get raw pixels of image and show on screen (used mostly for debug)  
    var buf = img.toData(loc[0].x - 27, loc[0].y - 13, imgs.trailComplete.width + 278, imgs.trailComplete.height + 213);
    //buf.show();
    console.log("About to run array...");
    let crops = new Array(9);
    var x1 = loc[0].x - 1;
    for (let i = 0; i < crops.length; i++) {
        console.log("In array check...");
        crops[i] = img.toData(x1, loc[0].y + 39, 32, 32);
        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), x1, loc[0].y + 39, 32, 32, 2000, 1);
        x1 += 40;
        // Displaying in Rewards Capture
        // document.getElementById(rewardSlots[i]).textContent = ""
        // var canvas = document.createElement("canvas");
        // var ctx = canvas.getContext("2d");
        // var imgvar = document.createElement("img");
        // canvas.width = crops[i].width;
        // canvas.height = crops[i].height;
        // ctx.putImageData(crops[i], 0, 0)
        // imgvar.src = canvas.toDataURL();
        // document.getElementById(rewardSlots[i]).appendChild(imgvar);
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