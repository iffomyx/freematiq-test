const gulp = require('gulp');
const del = require('del');

const autoprefixer      = require('gulp-autoprefixer');
const argv              = require('yargs').argv;
const babel             = require('gulp-babel');
const webpack           = require('webpack-stream');
const browsersync       = require('browser-sync').create();
const cleanCSS          = require('gulp-clean-css');
const changed           = require('gulp-changed');
const fileInclude       = require('gulp-file-include');
const imagemin          = require('gulp-imagemin');
const imageminPngquant  = require('imagemin-pngquant');
const imageminWebp      = require('imagemin-webp');
const rename            = require('gulp-rename');
const svgo              = require('gulp-svgo');
const sass              = require('gulp-sass');
const sprite            = require('gulp-svg-sprite');

const srcPath = 'src';
const buildPath = 'web';
const imagesOptimizationPath = 'image-optimization';

const config = {
  src: {
    root: srcPath,
    html: `${srcPath}/templates`,
    scss: `${srcPath}/scss`,
    svgImages: `${srcPath}/images`,
    js: `${srcPath}/js`
  },
  build: {
    root: buildPath,
    css: `${buildPath}/css`,
    svgImages: `${buildPath}/images`,
    js: `${buildPath}/js`
  }
};

const imagesConfig = {
  src: `${imagesOptimizationPath}/src`,
  dest: `${imagesOptimizationPath}/dest`
}

const svgConfig = {
  src: `${srcPath}/images/icons`,
  build: `${buildPath}/images/sprite`
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: config.build.root,
    },
    online: true,
    notify: false,
  });
}

function html() {
  return gulp.src(`${config.src.html}/*.html`)
    .pipe(changed(config.build.root))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(config.build.root))
    .pipe(browsersync.stream());
}

function styles() {
  return gulp.src(`${config.src.scss}/entry/**/*.scss`)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(rename({
      suffixes: '.min',
    }))
    .pipe(gulp.dest(config.build.css))
    .pipe(browsersync.stream());
}

function svgImages() {
  return gulp.src([`${config.src.svgImages}/**/*.svg`, `!${config.src.svgImages}/icons/**/*.svg`])
    .pipe(svgo({
      plugins: [
        { cleanupIDs: false }
      ]
    }))
    .pipe(gulp.dest(config.build.svgImages))
    .pipe(browsersync.stream());
}

function scripts() {
  return gulp.src(`${config.src.js}/**/*.js`)
    .pipe(webpack({
      entry: {
        main: `/${config.src.js}/target.indexPage`,
        err: `/${config.src.js}/target.errorPage`
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
      output: {
        filename: '[name].bundle.js'
      }
    }))
    .pipe(gulp.dest(config.build.js))
    .pipe(browsersync.stream());
}

function optimizeImages(callback) {
  const directory = argv.dir;
  const dest = imagesConfig.dest + '/' + directory;

  if (!directory) {
    console.log(`${directory} is not exists`);
    callback();
    return;
  }

  return gulp.src(`${imagesConfig.src}/${directory}/**/*.{jpg,png}`)
    .pipe(changed(dest))
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 90 }),
      imageminPngquant({ quality: [0.85, 0.9] })
    ], { verbose: true }))
    .pipe(gulp.dest(dest))
    .pipe(browsersync.stream());
}

function generateWebp(callback) {
  const directory = argv.dir;
  const dest = imagesConfig.dest + '/' + directory;

  if (!argv.webp) {
    callback();
    return;
  }

  return gulp.src(`${imagesConfig.src}/${directory}/**/*.{jpg,png}`)
    .pipe(imagemin([
      imageminWebp({
        quality: 95,
        preset: 'default', // default, photo, picture, drawing, icon and text
        method: 6 // max: 6
      })
    ]))
    .pipe(rename({ extname: '.webp' }))
    .pipe(gulp.dest(dest))
    .pipe(browsersync.stream());
}

function svgSprite() {
  return gulp.src(`${svgConfig.src}/*.svg`)
    .pipe(sprite({
      mode: {
        symbol: {
          sprite: `../icons-sprite.svg`,
        }
      }
    }))
    .pipe(svgo({
      plugins: [
        { cleanupIDs: false }
      ]
    }))
    .pipe(gulp.dest(svgConfig.build));
}

function clean() {
  return del(config.build.root);
}

function startWatch() {
  gulp.watch(`${config.src.html}/**/*.html`, html);
  gulp.watch(`${config.src.scss}/**/*.scss`, styles);
  gulp.watch(`${config.src.svgImages}/**/*.svg`, svgImages);
  gulp.watch(`${config.src.js}/**/*.js`, scripts);
}

exports.sprite = svgSprite;
exports.svgImages = svgImages;

// gulp images --dir dir_name --webp - if need generate webp images
exports.optimizeImages = gulp.series(optimizeImages, generateWebp);

exports.default = gulp.series(
  html,
  styles,
  scripts,
  svgImages,
  gulp.parallel(startWatch, browserSync)
);
