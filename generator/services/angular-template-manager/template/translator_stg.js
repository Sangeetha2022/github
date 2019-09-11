/*
 * Template group translator
 * Compiled on Wed Sep 11 2019 20:07:27 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "translator"; 

group.name = "translator";





//
// Template /translator
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { NgModule } from '@angular/core';");
    w.write("\n");
    w.write("import { CommonModule } from '@angular/common';");
    w.write("\n");
    w.write("import {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("I18NEXT_SERVICE, I18NextLoadResult, I18NextModule, ITranslationService, defaultInterpolationFormat,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("I18NEXT_NAMESPACE");
    w.popIndentation();
    w.write("\n");
    w.write("} from 'angular-i18next';");
    w.write("\n");
    w.write("import i18nextXHRBackend from 'i18next-xhr-backend';");
    w.write("\n");
    w.write("import i18nextLanguageDetector from 'i18next-browser-languagedetector';");
    w.write("\n");
    w.write("import { I18NextValidationMessageModule } from 'angular-validation-message-i18next';");
    w.write("\n");
    w.write("import sprintf from 'i18next-sprintf-postprocessor';");
    w.write("\n");
    w.write("import { APP_INITIALIZER, ApplicationRef, LOCALE_ID } from '@angular/core';");
    w.write("\n");
    w.write("\n");
    w.write("const i18nextOptions = {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("whitelist: ['en', 'ta', 'es'],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("fallbackLng: ['en', 'ta', 'es'],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("debug: true, // set debug?");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("returnEmptyString: false,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("ns: [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("'translation',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("'validation',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("'error'");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("interpolation: {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("format: I18NextModule.interpolationFormat(defaultInterpolationFormat)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("// backend plugin options");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("backend: {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("allowMultiLoading: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("loadPath: function () {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("return 'assets/locales/{{lng}}/{{ns}}.json';");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.write("};");
    w.write("\n");
    w.write("\n");
    w.write("export function appInit(i18next: ITranslationService) {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("return () => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("const promise: Promise<I18NextLoadResult> = i18next");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write(".use(i18nextXHRBackend)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write(".use(i18nextLanguageDetector)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write(".use(sprintf)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write(".init(i18nextOptions);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return promise;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("};");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("export function localeIdFactory(i18next: ITranslationService) {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("return i18next.language;");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("export const I18N_PROVIDERS = [");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("{");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("provide: APP_INITIALIZER,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("useFactory: appInit,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("deps: [I18NEXT_SERVICE],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("multi: true");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("{");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("provide: LOCALE_ID,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("deps: [I18NEXT_SERVICE],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("useFactory: localeIdFactory");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.write("];");
    w.write("\n");
    w.write("\n");
    w.write("@NgModule({");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("declarations: [],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("imports: [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("CommonModule,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("I18NextValidationMessageModule,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("I18NextModule.forRoot(),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("providers: [I18N_PROVIDERS],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("exports: [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("I18NextValidationMessageModule,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("I18NextModule");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("]");
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class TranslatorModule { }");
};
r.args = [
        
];
group.addTemplate("/translator", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;