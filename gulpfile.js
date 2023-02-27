const rename = require("gulp-rename");
const concat = require("gulp-concat");
const gulpif = require("gulp-if");
const sass = require("gulp-dart-scss");
const processhtml = require("gulp-processhtml");
const sassdoc = require("gulp-sassdoc");
const {series, parallel, src, dest, watch} = require("gulp");

function holamundo(cb){
    console.log("Hola mundo");
    cb();
}

function adiosmundo(cb){
    console.log("Adios mundo");
    cb();
}

function pipeline(){
    return src("css/*.css").pipe(dest("up/css"));
}

function vigila(cb){
    watch("css/*.css", holamundo);
    cb();
}

function minimiza_y_renombra(cb){
    return src("./up/css/style.css")
    // .pipe(pleeease())
    .pipe(rename({suffix: ".min",extname: ".css"}))
    .pipe(dest("./up/css/"));
}

function compilar(){
    return src("scss/style.scss")
    .pipe(sass())
    .pipe(dest("./up/css/"));
}

var doc_options = {
    dest: "docs"
}

function generar_docs(){
    return src("scss/style.scss")
    .pipe(sassdoc(doc_options));
}

function html(){
    return src("*.html")
    .pipe(processhtml())
    .pipe(dest("up/"));
}

function todo(){
    return src("scss/style.scss")
    .pipe(sass())
    // .pipe(pleeease())
    .pipe(rename({suffix: ".min",extname: ".css"}))
    .pipe(dest("./up/css/"));
}

exports.holamundo = holamundo;
exports.adiosmundo = adiosmundo;
exports.default = holamundo;
exports.minimiza_y_renombra = minimiza_y_renombra;
exports.compilar = compilar;
exports.generar_docs = generar_docs;
exports.html = html;
exports.todo = todo;
exports.serie = series(adiosmundo, holamundo);
exports.paralelo = parallel(todo, generar_docs);
exports.pipeline = pipeline;
exports.vigila = vigila;
