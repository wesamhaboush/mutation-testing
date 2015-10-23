module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        mutationTest: {
            options: {
                code: ['src/*.js'],
                specs: 'test/*.js',
                mutate: 'src/*.js',
                testFramework: 'mocha',
                maxReportedMutationLength: 0,
                mutateProductionCode: true,
                test: 'mocha',
                mocha: {},
                basePath: '.',
                logLevel: 'ALL',
                reporters: {
                    console: true,
                    html: {
                        dir: 'reports/grunt-mutation-testing',
                        successThreshold: 100
                    },
                    text: {
                        dir: 'reports/grunt-mutation-testing',
                        file: 'grunt-mutation-testing.txt'
                    }
                }
            },
            all: {
                code: ['src/*.js'],
                specs: 'test/*.js',
                mutate: 'src/*.js'
            }
        }

    });
    // Load the plugin that provides the "mutation testing task" task.
    grunt.loadNpmTasks('grunt-mutation-testing');
    // Default task(s).
    grunt.registerTask('default', ['mutationTest']);
};
