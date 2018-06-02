const gulp = require("gulp");
const typescript = require("typescript");
const typescriptCompiler = require("gulp-typescript");
const del = require("del");
const merge = require("merge2");

gulp.task("build-clean", (done) => {
    return del(["dist/lib/**"], done);
});

gulp.task("build-npm-ts", ["build-clean"], (callback) => {
    const typescriptProject = typescriptCompiler.createProject("./tsconfig.json", {
        typescript: typescript
    });

    const tsResult = typescriptProject
        .src()
        .pipe(typescriptProject())

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done. 
        tsResult.dts.pipe(gulp.dest("./dist/lib")),
        tsResult.js.pipe(gulp.dest("./dist/lib"))
    ]);
});

gulp.task("build", ["build-npm-ts"]);

gulp.task("default", ["build"]);

