import { webpackImages, PointLike, RectLike, ImgRef, captureHoldFullRs, Rect } from "alt1/base";
import * as OCR from "alt1/ocr";

var capsfont = require("alt1/fonts/aa_9px_mono_allcaps.js");

let imgs = webpackImages({
	exitbutton: require("../images/eocx.data.png"),
	topleft: require("../images/eoctopleft.data.png"),
	botleft: require("../images/eocbotleft.data.png"),
});

export type ModalUI = {
	rect: RectLike,
	legacy: boolean,
	title: string,
	img: ImgRef
}

export namespace ModalUIReader {
	export function find(img?: ImgRef) {
		if (!img) { img = captureHoldFullRs(); }
		let treoc = img.findSubimage(imgs.exitbutton);
		let eocboxes = treoc.map(p => detect(img!, p));
		return eocboxes.filter(m => m) as ModalUI[];
	}

	export function detect(img: ImgRef, pos: PointLike): ModalUI | null {
		let left = img.findSubimage(imgs.topleft, img.x, pos.y - 7, pos.x, imgs.topleft.height).sort((a, b) => a.x - b.x)[0];
		if (!left) { return null; }
		let bot = img.findSubimage(imgs.botleft, left.x, pos.y, imgs.botleft.width, img.y + img.height - pos.y).sort((a, b) => a.y - b.y)[0];
		if (!bot) { return null; }
		let buf = img.toData(Math.round((left.x + pos.x) / 2) - 125, pos.y, 250, 20);
		let title = OCR.readSmallCapsBackwards(buf, capsfont, [[240, 190, 121]], 0, 13, buf.width, 1);
		return {
			rect: new Rect(left.x + 4, pos.y + 24, (pos.x + 21) - (left.x + 4), (bot.y + 8) - (pos.y + 24)),
			legacy: false,
			title: title ? title.text.toLowerCase() : "",
			img: img
		}
	}
}