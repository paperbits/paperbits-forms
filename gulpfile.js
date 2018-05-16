const gulp = require("gulp");
const typescript = require("typescript");
const typescriptCompiler = require("gulp-typescript");
const del = require("del");
const merge = require("merge2");
const fs = require("fs");
const linkPackage = require("link-package");

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

gulp.task("build-clean", (done) => {
    return del(["dist/lib/**"], done);
});

const paperbitsNode = "node_modules/@paperbits";

gulp.task("link-dep", (done) => {
    if (!fs.existsSync(paperbitsNode)) {
        fs.mkdirSync(paperbitsNode);
    } else {
        del.sync([`${paperbitsNode}/**`, `!${paperbitsNode}`]);
    }

    linkPackage("paperbits-common/src", "@paperbits/common");
    linkPackage("paperbits-slate/src", "@paperbits/slate");
    linkPackage("paperbits-firebase/src", "@paperbits/firebase");
    linkPackage("paperbits-knockout/src", "@paperbits/knockout");
    linkPackage("paperbits-publishing/src", "@paperbits/publishing");
    done();
});

gulp.task("build", ["build-npm-ts"]);

gulp.task("default", ["build"]);

