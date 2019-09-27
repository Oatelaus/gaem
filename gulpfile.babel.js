const { src, dest, series, watch } = require('gulp');
const babel = require('gulp-babel');

function typescript(){
    return src('./src/**/*.ts')
        .pipe(babel({
            presets: ['@babel/env']
        }).on('error', (error) => console.log(error.toString())))
        .pipe(dest('dist'));
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
    default: series(typescript, html, monitor)
} 
    
