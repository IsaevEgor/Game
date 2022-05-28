const { src, dest, parallel, watch, series } = require("gulp");
const concat = require("gulp-concat");
const less = require("gulp-less");
const base64 = require("gulp-base64-inline");
const cleanCSS = require("gulp-clean-css");
var LessAutoprefix = require("less-plugin-autoprefix");
var autoprefix = new LessAutoprefix({ browsers: ["last 2 versions"] });

const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

function serve() {
  browserSync.init({
    server: "./dev"
  });
}

function js() {
  return src("dev/js/*.js", { sourcemaps: true });
}

// function css() {
//   return src("dev/less/push-page.less")
//     .pipe(concat("push-page.less"))
//     .pipe(
//       less({
//         outputStyle: "compact",
//         plugins: [autoprefix]
//       })
//     )
//     .pipe(base64("../**/"))
//     .pipe(cleanCSS({ format: "compact" }))
//     .pipe(concat("push-page.css"))
//     .pipe(dest("dev/css"));
// }
function css() {
  return src("dev/less/*.less")
    .pipe(concat("main.less"))
    .pipe(
      less({
        outputStyle: "compact",
        plugins: [autoprefix]
      })
    )
    .pipe(base64("../**/"))
    .pipe(cleanCSS({ format: "beautify" }))
    .pipe(concat("main.css"))
    .pipe(dest("dev/css"));
}

function watcher() {
  watch("dev/*.html", series("js")).on("change", reload);
  watch("dev/js/*.js", series("js")).on("change", reload);
  watch("dev/less/*.less", series("css")).on("change", reload);
}

exports.js = js;
exports.css = css;
exports.default = parallel(serve, js, css, watcher);
