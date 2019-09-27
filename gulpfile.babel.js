const { src, dest, series, watch } = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();


const vendorFiles = [
    './node_modules/phaser/dist/phaser.min.js'
]

const sourceFiles = [
    './src/index.ts'
]

function sync() {
    return browserSync.init({
        server: './dist'
    })
}


function vendor() {
    return src(vendorFiles)
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

function typescript(){
    return src('./src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env'],
        }).on('error', (error) => console.log(error.toString())))
        .pipe(sourcemaps.write())
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

function html() {
    return src('./src/**/*.html')
        .pipe(dest('dist'));
}

function monitor() {
    watch('./src/**/*.ts').on('change', typescript);
    watch('./src/**/*.html').on('change', html);
}

module.exports = {
    typescript: typescript,
    html: html,
    vendor: vendor,
    default: sync() && series(vendor, typescript, html, monitor)
} 
    
