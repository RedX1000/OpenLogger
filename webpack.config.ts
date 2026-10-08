import alt1chainClass from "@alt1/webpack";
import * as path from "path";
import { fileURLToPath } from "url";
import CopyPlugin from "copy-webpack-plugin";


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

var srcdir = path.resolve(__dirname, "./src/");
var outdir = path.resolve(__dirname, "./dist/");

const Alt1Builder = (alt1chainClass as any).default || alt1chainClass

//wrapper around webpack-chain, most stuff you'll need are direct properties,
//more finetuning can be done at config.chain
//the wrapper gives decent webpack defaults for everything alt1/typescript/react related
var config = new Alt1Builder(srcdir, { ugly: false });

config.chain.module
  .rule("typescript")
  .use("ts-loader")
  .tap((options = {}) => ({
    ...options,
    transpileOnly: true,
  }));

//exposes all root level exports as UMD (as named package "testpackage" or "TEST" in global scope)
config.makeUmd("testpackage", "TEST");

//the name and location of our entry file (the name is used for output and can contain a relative path)
config.entry("index", "./index.ts");

//where to put all the stuff
config.output(outdir);

//Asset import
config.chain.plugin("copy-assets").use(CopyPlugin, [{
    patterns: [
        { 
            from: path.resolve(__dirname, "src/index.html"), 
            to: path.resolve(__dirname, "dist/index.html") 
        },
        { 
            from: path.resolve(__dirname, "src"), 
            to: path.resolve(__dirname, "dist"),
            noErrorOnMissing: true,
            globOptions: {
                ignore: ["**/index.ts"]
            }
        }    
    ]
}]);

config.chain.performance.hints(false);

config.chain.externals({
  sharp: "commonjs sharp",
  canvas: "commonjs canvas",
  electron: "commonjs electron",
  "electron/common": "commonjs electron/common",
});

export default config.toConfig();