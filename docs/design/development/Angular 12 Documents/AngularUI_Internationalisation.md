Angular Internationalization Implementation:

Internationalization (also known as i18n) is the process of creating or transforming products and services so that they can easily be adapted to specific local languages and cultures.

STEP 1.
To implement Internationalization npm should be installed and commands are given below.

1. npm install @ngx-translate/core --save
2. npm install @ngx-translate/http-loader --save

STEP 2.
Next step is to add translation json files needs to be translated and file path location is given below.
assets/i18n/{'Json files are added'}

for example, please refer  assets/i18n/en.json
By refering to en.json file and add spanish and tamil json files in same folder.


STEP 3.
After addition of translation files add the following code in app.module.ts file.

//Import statements
import {TranslateLoader,TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MissingTranslationHandler,MissingTranslationHandlerParams} from '@ngx-translate/core';

In ngModule imports add below code
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:httpLoaderfactory,
        deps:[HttpClient]
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
    })

Add two class as given below.
export class MyMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
      return JSON.stringify(params);
    }
  }
  export function httpLoaderfactory(http:HttpClient){
    return new TranslateHttpLoader(http);
  }

 This code is added because if any missing translation is occured in json file then it will set to default language English.


 STEP 4:
 Next step is move to header.component.ts file and add then import the translate service in constructor
 Using navigator.language  we can able to get default browser language of browser , refer below code to get default browser language
  
  this.BrowserLang=translate.getBrowserLang(); 

STEP 5:
Next step is to display the native language name in dropdown used in header, To achive this first we need Json file with suitable language code pointing to native names and refer languages.json file in /assets/i18n/languages.json this location.


By using navigator.langusges we can able to get the languages code of we selected languages in browser and refer header.component.ts file

After that getting of browser languages , by looping with languages.json file , we can able to display the native language name in dropdown instead of showing the laonguage code.


