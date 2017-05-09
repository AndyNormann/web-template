const path = require('path');

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        pug: {
            compile: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: sourcePath,
                    src: '*.pug',
                    dest: buildPath,
                    ext: '.html'
                }]
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: sourcePath,
                    src: '*.scss',
                    dest: buildPath,
                    ext: '.css'
                }]
            }
        },
        ts: {
            options: {
                target: 'es5',
                sourceMap: false,
                declarations: false,
                fast: 'never',
                additionalFlags: '--strict'
            },
            dev: {
                src: ["src/*.ts"],
                out: 'dist/out.js'
            }
        },
        watch: {
            html: {
                files: 'src/*.pug',
                tasks: ['pug']
            },
            css: {
                files: 'src/*.scss',
                tasks: ['sass']
            },
            js: {
                files: 'src/*.ts',
                tasks: ['ts']
            }
        },
        livereloadx: {
            static: true,
            dir: 'dist'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('livereloadx');

    grunt.registerTask('default', ['livereloadx', 'watch']);
    grunt.registerTask('build', ['pug', 'sass', 'ts']);
};
