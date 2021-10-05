import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
        public static DESKTOP_ROUTER = '/desktop';
        public static MOBILE_ROUTER = '/mobile';

        public static get Login(): string { return this.DESKTOP_ROUTER + '/login'; }
        public static get signup(): string { return this.DESKTOP_ROUTER + '/signup'; }
        public static get Consent(): string { return this.DESKTOP_ROUTER + '/consent'; }
        public static get Logout(): string { return this.DESKTOP_ROUTER + '/logout'; }

        // project apis
        public static get saveProject(): string { return this.DESKTOP_ROUTER + '/projects/add'; }
        public static get getProjectByUserId(): string { return this.DESKTOP_ROUTER + '/projects/getbyuserid'; }
        public static get getProjectById(): String { return this.DESKTOP_ROUTER + '/projects/getbyid'; }
        public static get getProjectByAll(): string { return this.DESKTOP_ROUTER + '/projects/getall'; }
        public static get updateProjectById(): String { return this.DESKTOP_ROUTER + '/projects/update'; }
        public static get deleteProject(): string { return this.DESKTOP_ROUTER + '/projects/delete/'; }
        public static get deleteProjectFlowByProjectId(): string { return this.DESKTOP_ROUTER + '/delete/project'; }
        public static get createDefaultEntity(): String { return this.DESKTOP_ROUTER + '/projects/default/create'; }
        public static get createDefaultScreens(): String { return this.DESKTOP_ROUTER + '/projects/default/screen'; }
        public static get createSefScreens(): String { return this.DESKTOP_ROUTER + '/projects/default/sefscreen'; }

        // project Flow
        public static get saveManyProjectFlow(): String { return this.DESKTOP_ROUTER + '/flow/project/bulksave'; }
        public static get getallProjectFlow(): String { return this.DESKTOP_ROUTER + '/flow/project/getall'; }
        public static get getProjectFeatureFlows(): String { return this.DESKTOP_ROUTER + '/flow/projectfeature/get'; }
        public static get deleteProjectFlow(): String { return this.DESKTOP_ROUTER + '/flow/project/delete'; }
        public static get updateProjectFlowComponent(): String { return this.DESKTOP_ROUTER + '/flow/project/updatecomponent'; }

        // default feature
        public static get defaultFeature(): String{ return this.DESKTOP_ROUTER + '/feature/default/save'; }

        // new Feature
        public static get saveFeature(): String { return this.DESKTOP_ROUTER + '/feature/save'; }
        public static get updateFeature(): String { return this.DESKTOP_ROUTER + '/feature/update'; }
        public static get getFeatureByProjectId(): String { return this.DESKTOP_ROUTER + '/feature/project/get'; }
        public static get getFeatureById(): String { return this.DESKTOP_ROUTER + '/feature/get'; }

        // Feature Screen
        public static get addScreen(): string { return this.DESKTOP_ROUTER + '/screen/save'; }
        public static get getScreenByID(): string { return this.DESKTOP_ROUTER + '/screen/get'; }
        public static get deleteScreen(): string { return this.DESKTOP_ROUTER + '/screen/delete'; }
        public static get getScreenByFeatureName(): string { return this.DESKTOP_ROUTER + '/screen/getbyfeature/'; }
        public static get updateScreen(): string { return this.DESKTOP_ROUTER + '/screen/update/'; }
        public static get getScreenByProjectAndFeatureId(): string { return this.DESKTOP_ROUTER + '/screen/getbyprojectandfeatureid/'; }
        public static get getScreenByProjectId(): string { return this.DESKTOP_ROUTER + '/screen/getbyprojectid'; }
        public static get getScreenByFeatureId(): string { return this.DESKTOP_ROUTER + '/screen/getbyfeatureid'; }
        public static get getScreenTemplateByProjectId(): string { return this.DESKTOP_ROUTER + '/screen/template'; }

        // Entity
        public static get saveEntity(): string { return this.DESKTOP_ROUTER + '/entity/save'; }
        public static get updateEntity(): string { return this.DESKTOP_ROUTER + '/entity/update'; }
        public static get featuredeleteEntity(): string { return this.DESKTOP_ROUTER + '/feature/deleteentity'; }
        public static get getEntity(): string { return this.DESKTOP_ROUTER + '/entity/get'; }
        public static get updateEntityFields(): string { return this.DESKTOP_ROUTER + '/entity/field/update'; }
        public static get deleteEntity(): string { return this.DESKTOP_ROUTER + '/entity/delete'; }
        public static get allEntity(): string { return this.DESKTOP_ROUTER + '/entity/getall'; }
        public static get featureUpdateEntity(): string { return this.DESKTOP_ROUTER + '/feature/updateEntity/'; }
        public static get getAllEntityTypes(): string { return this.DESKTOP_ROUTER + '/entity_type/get'; }

        //get the feature entities 
        public static get getAllEntityByFeatureId(): string { return this.DESKTOP_ROUTER + '/feature'; }

            // shared application
        public static get sharedApplication(): string { return this.DESKTOP_ROUTER + '/shared/getbyproject/'; }
        public static get sharedAppImport(): string { return  '/shared/upload'; }

        // generation
        public static get projectSocket(): string { return this.DESKTOP_ROUTER + '/generate'; }
        public static get getAllNotifyProject(): string { return this.DESKTOP_ROUTER + '/projectgen/project'; }
        public static get getAllUserNotify(): string { return this.DESKTOP_ROUTER + '/projectgen/user'; }
        public static get projectGeneration(): string { return this.DESKTOP_ROUTER + '/projectgen/project'; }
        public static GET = '/get';

        // Templates
        public static get getAllTemplates(): string { return this.DESKTOP_ROUTER + '/template/getall'; }
        public static get getTemplateParser(): string { return this.DESKTOP_ROUTER + '/templateparser/get'; }
        public static get getTemplateByName(): string {return this.DESKTOP_ROUTER + '/template/gettemplatename' ;}
        public static get getProjectTemplateById(): string {return this.DESKTOP_ROUTER + '/project/template/get';}
        public static get addProjectTemplate(): string {return this.DESKTOP_ROUTER + '/project/template/save';}
        public static get updateProjectTemplate(): string {return this.DESKTOP_ROUTER + '/project/template/update';}

        //Flow api's
        public static get getAllFlow(): String { return this.DESKTOP_ROUTER + '/flow/getall'; }
        public static get getProjectVersion(): string { return this.DESKTOP_ROUTER + '/generation_flow/getbyname'; }
        public static get getConfigTechProperties(): string { return this.DESKTOP_ROUTER + '/generation_flow/getproperties'; }

        // delete project
        public static get deleteFlowById(): string { return this.DESKTOP_ROUTER + '/delete/flow'; }
        public static get deleteEntityById(): string { return this.DESKTOP_ROUTER + '/delete/entity'; }
        public static get deleteScreenById(): string { return this.DESKTOP_ROUTER + '/delete/screen'; }

        // menu apis
        public static get createDefaultMenu(): String { return this.DESKTOP_ROUTER + '/menu/default'; }
        // cloned application

        public static get clonedApplication(): string { return this.DESKTOP_ROUTER + '/clone/getbyproject' }

        public static get getConstantReservedWords(): String {
        return `break,case,comment,continue,default,delete,do,else,export,for,function,if,import,in,label,new,return,
        switch,this,typeof,var,void,while,with,abstract,boolean,decimal,integer,mixed,
        byte,char,double,false,final,float,goto,implements,instanceOf,int,interface,long,native,null,package,private,protected,
        protected,public,short,static,synchronized,throws,transient,true,catch,class,const,debugger,enum,extends,finally,super,throw,try,
        alert,Anchor,Area,arguments,Array,assign,blur,Boolean,Button,callee,caller,captureEvents,Checkbox,clearInterval,clearTimeout,close,
        closed,confirm,constructor,Date,defaultStatus,document,Element,escape,eval,FileUpload,find,
        focus,Form,Frame,Frames,Function,getClass,Hidden,history,home,Image,Infinity,InnerHeight,InnerWidth,
        isFinite,isNan,java,JavaArray,JavaClass,JavaObject,JavaPackage,length,Link,Location,locationbar,Math,menubar,
        MimeType,moveBy,moveTo,NaN,navigate,navigator,netscape,Number,Object,onBlur,
        onError,onFocus,onLoad,onUnload,opener,Option,outerHeight,
        OuterWidth,Packages,pageXoffset,pageYoffset,parent,parseFloat,parseInt,Password,
        personalbar,Plugin,print,prompt,prototype,Radio,ref,RegExpreleaseEvents,Reset,resizeBy,resizeTo,routeEvent,scroll,
        scrollbars,scrollBy,scrollTo,Select,self,setInterval,setTimeout,status,statusbar,stop,String,
        Submit,sun,taint,Text,Textarea,toolbar,top,toString,unescape,untaint,unwatch,valueOf,watch,window,id`;
        }

        public static get getConstantSpecialCharacters(): String {
                return `\`|\\~|\\!|\\@|\\#|\\$|\\%|\\^|\\&|\\*|\\(|\\)|
                \\+|\\=|\\[|\\{|\\]|\\}|\\||\\\\|\\'|\\<|\\,|\\.|\\>|\\?|\\/|\\""|\\"|\\;|\\:|\\s`;
            }
  
}