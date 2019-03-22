
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';



export class ScreenSupportWorker {


    generateConstant(path, callback) {

        // generate editorconfig files
        var editorConfigStg = st.loadGroup(require(path.source + '/editorconfig_stg'));
        var editorConfigConf = editorConfigStg.render("editorconfig");
        fs.writeFile(path.destination + '/.editorconfig', editorConfigConf, function (err) {
            if (err) throw err;
            console.log('editorconfig file saved!!')
        })
        // generate gitignore files
        var gitignoreStg = st.loadGroup(require(path.source + '/gitignore_stg'));
        var gitignoreConf = gitignoreStg.render("gitignore");
        fs.writeFile(path.destination + '/.gitignore', gitignoreConf, function (err) {
            if (err) throw err;
            console.log('gitignore file saved!!')
        })
        // generate README.md files
        var READMEStg = st.loadGroup(require(path.source + '/readme_md_stg'));
        var READMEConf = READMEStg.render("readme_md");
        fs.writeFile(path.destination + '/README.md', READMEConf, function (err) {
            if (err) throw err;
            console.log('README file saved!!')
            callback('folder constant files are generated')
        })
    }

    // create angular.json files
    generateAngularJson(path, projectName,
         cssArray, scriptArray, callback) {
         // generate angular.json files
         var angularJsonStg = st.loadGroup(require(path.source + '/angular_json_stg'));
         var angularJsonConf = angularJsonStg.render('angular_json', [projectName, cssArray, scriptArray]);
         fs.writeFile(path.destination + '/angular.json', angularJsonConf, function (err) {
             if (err) throw err;
             console.log('angular.json file saved!!');
             callback('angular json file generated');
         })
    }


    generateTsConfig(path, callback) {
        // generate tsconfig.json files
        var tsConfigStg = st.loadGroup(require(path.source + '/tsconfig_json_stg'));
        var tsConfigConf = tsConfigStg.render('tsconfig_json');
        fs.writeFile(path.destination + '/tsconfig.json', tsConfigConf, function (err) {
            if (err) throw err;
            console.log('tsconfig.json file saved!!')
        })

          // generate tslint.json files
          var tsLintStg = st.loadGroup(require(path.source + '/tslint_json_stg'));
          var tsLintConf = tsLintStg.render('tslint_json');
          fs.writeFile(path.destination + '/tslint.json', tsLintConf, function (err) {
              if (err) throw err;
              console.log('tslint.json file saved!!')
              callback('folder ts files are generated')
          })
   }

   // create package json files
   generatePackageJson(path, projectName, packageDependency, callback) {
           // generate package.json files
           console.log('package json with name --- ', projectName);
           var packageJsonStg = st.loadGroup(require(path.source + '/package_json_stg'));
           var packageJsonConf = packageJsonStg.render('package_json', [projectName.charAt(0).toUpperCase()+projectName.slice(1),
             packageDependency]);
           fs.writeFile(path.destination + '/package.json', packageJsonConf, function (err) {
               if (err) throw err;
               console.log('package.json file saved!!')
               callback('package.json file saved!!');
           })
   }
}