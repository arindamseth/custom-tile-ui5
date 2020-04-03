const { series, watch, src, dest } = require("gulp");
const gulpif = require("gulp-if");
const babel = require("gulp-babel");
const changed = require("gulp-changed");
const log = require("fancy-log");
const del = require("del");
const path = {
  src: "webapp/**/*",
  tmp: "tmp/"
};

const condition = function(file) {
  return file.extname === ".js" && file.stem !== "moment";
};

function watchChanges() {
  watch(path.src).on("change", transpile);
}

function transpile() {
  return src(path.src)
    .pipe(changed(path.tmp))
    .pipe(
      gulpif(
        condition,
        babel({
          presets: ["@babel/env"],
          plugins: ["@babel/transform-runtime"]
        })
      )
    )
    .on("error", function(error) {
      log.error(error);
    })
    .pipe(dest(path.tmp));
}

function transpileTask(cb) {
  transpile().once("end", function() {
    // eslint-disable-next-line no-undef
    process.exit();
  });
  cb();
}

function clean() {
  return del([path.tmp]);
}

exports.watch = series(watchChanges);
exports.transpile = series(transpileTask);
exports.clean = series(clean);
