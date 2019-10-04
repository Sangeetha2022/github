import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

    public static DESKTOP_ROUTER = '/desktop';
    public static MOBILE_ROUTER = '/mobile';
    //customeConnectors 
    public static get quickTestcustomConnectors(): string { return this.DESKTOP_ROUTER + '/quick/test'; }


    public static get quickConnectors(): String { return this.DESKTOP_ROUTER + '/save/quickConnectors'; }

    // login apis
    public static get signup(): string { return this.DESKTOP_ROUTER + '/signup'; }
    public static get googlelogin(): string { return this.DESKTOP_ROUTER + '/googlesignin'; }
    public static get Login(): string { return this.DESKTOP_ROUTER + '/login'; }
    public static get Logout(): string { return this.DESKTOP_ROUTER + '/logout'; }
    public static get Consent(): string { return this.DESKTOP_ROUTER + '/consent'; }

    // Admin
    public static get getUsers(): string { return this.DESKTOP_ROUTER + '/admin/getusers'; }
    public static get getuserById(): string { return this.DESKTOP_ROUTER + '/admin/getuser/:id'; }
    public static get getAllRoles(): string { return this.DESKTOP_ROUTER + '/admin/getallroles'; }
    public static get updateUsers(): string { return this.DESKTOP_ROUTER + '/admin/updateuser'; }

    // flow apis
    public static get saveFlow(): string { return this.DESKTOP_ROUTER + '/flow/save'; }
    public static get updateFlow(): string { return this.DESKTOP_ROUTER + '/flow/update'; }
    public static get getAllFlow(): String { return this.DESKTOP_ROUTER + '/flow/getall'; }
    public static get deleteFlow(): string { return this.DESKTOP_ROUTER + '/flow/delete'; }
    public static get addFilesUrl(): string { return this.DESKTOP_ROUTER + '/addfile'; }

    // project apis
    public static get saveProject(): string { return this.DESKTOP_ROUTER + '/projects/add'; }
    public static get deleteProject(): string { return this.DESKTOP_ROUTER + '/projects/delete/'; }
    public static get getProjectByUserId(): string { return this.DESKTOP_ROUTER + '/projects/getbyuserid'; }
    public static get createDefaultEntity(): String { return this.DESKTOP_ROUTER + '/projects/default/create'; }
    public static get updateProjectById(): String { return this.DESKTOP_ROUTER + '/projects/update'; }
    public static get getProjectById(): String { return this.DESKTOP_ROUTER + '/projects/getbyid'; }
    public static get createDefaultScreens(): String { return this.DESKTOP_ROUTER + '/projects/default/screen'; }

    // menu apis
    public static get saveMenu(): String { return this.DESKTOP_ROUTER + '/menu/save'; }
    public static get getMenuByProjectId(): String { return this.DESKTOP_ROUTER + '/menu/getbyprojectid'; }
    public static get updateMenuById(): String { return this.DESKTOP_ROUTER + '/menu/update'; }
    public static get updateMenuByProjectId(): String { return this.DESKTOP_ROUTER + '/menu/updatemenubyproject'; }
    public static get createDefaultMenu(): String { return this.DESKTOP_ROUTER + '/menu/default'; }


    // Flow apis
    public static get addDConnectorToFlowUrl(): string { return this.DESKTOP_ROUTER + '/add/lconnector'; }
    public static get updateDConnectorToFlowUrl(): string { return this.DESKTOP_ROUTER + '/update/lconnector'; }

    // Flow Componets apis
    public static get updateFlowCompUrl(): string { return this.DESKTOP_ROUTER + '/flow_component/update/'; }
    public static get getAllFlowComponentUrl(): string { return this.DESKTOP_ROUTER + '/flow_component/getall'; }
    public static get updateFlowCompConnectorById(): string { return this.DESKTOP_ROUTER + '/flowcomponent/project/updateconnector'; }
    public static get getConnectorById(): string { return this.DESKTOP_ROUTER + '/get/quickConnectorbyid'; }



    // Flow apis
    public static get getAllConfig(): string { return this.DESKTOP_ROUTER + '/generation_flow/getall'; }
    public static get saveConfig(): string { return this.DESKTOP_ROUTER + '/generation_flow/add'; }
    public static get updateConfig(): string { return this.DESKTOP_ROUTER + '/generation_flow/update'; }
    public static get deleteConfig(): string { return this.DESKTOP_ROUTER + '/generation_flow/delete'; }
    public static get getProjectVersion(): string { return this.DESKTOP_ROUTER + '/generation_flow/getbyname'; }
    public static get getConfigTechProperties(): string { return this.DESKTOP_ROUTER + '/generation_flow/getproperties'; }

    // Micro Flow apis
    public static get addMicroFlow(): string { return this.DESKTOP_ROUTER + '/microflow/save'; }
    public static get getMicroFlow(): string { return this.DESKTOP_ROUTER + '/microflow/component/get'; }
    public static get updateMicroFlow(): string { return this.DESKTOP_ROUTER + '/microflow/update'; }


    // LinkedConnector
    public static get getLinkedConnectorByName(): string { return this.DESKTOP_ROUTER + '/linked_connector/getbyname/'; }


    // Feature
    public static get feature(): string { return this.DESKTOP_ROUTER + '/feature'; }

    // new Feature
    public static get saveFeature(): String { return this.DESKTOP_ROUTER + '/feature/save'; }
    public static get updateFeature(): String { return this.DESKTOP_ROUTER + '/feature/update'; }
    public static get getAllFeature(): String { return this.DESKTOP_ROUTER + '/feature/getall'; }
    public static get getFeatureById(): String { return this.DESKTOP_ROUTER + '/feature/get'; }
    public static get updateFeatureEntity(): String { return this.DESKTOP_ROUTER + '/feature/update/entity'; }
    public static get getFeatureByProjectId(): String { return this.DESKTOP_ROUTER + '/feature/project/get'; }
    public static get getAllFeatureByFeatureid(): String { return this.DESKTOP_ROUTER + '/feature/details/getallbyfeatureid'; }
    public static get deleteFeature(): String { return this.DESKTOP_ROUTER + '/feature/delete'; }

    // old  Feature Details
    public static get getAllFeatureDetailsByFeatureId(): string { return this.DESKTOP_ROUTER + '/feature/details/getbyfeatureid/'; }

    // Feature Flow
    public static get getFeatureFlowById(): string { return this.DESKTOP_ROUTER + '/feature-flow/getbyid/'; }
    public static get getFeatureEntityByFeatureId(): string { return this.DESKTOP_ROUTER + '/feature/details/getentitybyfeatureid/'; }

    // project Flow
    public static get saveManyProjectFlow(): String { return this.DESKTOP_ROUTER + '/flow/project/bulksave'; }
    public static get getProjectFeatureFlows(): String { return this.DESKTOP_ROUTER + '/flow/projectfeature/get'; }
    public static get deleteProjectFlow(): String { return this.DESKTOP_ROUTER + '/flow/project/delete'; }
    public static get updateProjectFlowComponent(): String { return this.DESKTOP_ROUTER + '/flow/project/updatecomponent'; }

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
    public static get getEntity(): string { return this.DESKTOP_ROUTER + '/entity/get'; }
    public static get deleteEntity(): string { return this.DESKTOP_ROUTER + '/entity/delete'; }
    public static get allEntity(): string { return this.DESKTOP_ROUTER + '/entity/getall'; }
    public static get featureUpdateEntity(): string { return this.DESKTOP_ROUTER + '/feature/updateEntity/'; }
    public static get featuredeleteEntity(): string { return this.DESKTOP_ROUTER + '/feature/deleteentity'; }
    public static get getGlobalEntityByProjectId(): string { return this.DESKTOP_ROUTER + '/entity/global'; }
    public static get updateEntityFields(): string { return this.DESKTOP_ROUTER + '/entity/field/update'; }
    public static get getAllEntityTypes(): string { return this.DESKTOP_ROUTER + '/entity_type/get'; }
    public static get getEntityByFeatureId(): string { return this.DESKTOP_ROUTER + '/entity/feature/get'; }

    // Delete  microservice

    // delete project

    public static get deleteProjectFlowByProjectId(): string { return this.DESKTOP_ROUTER + '/delete/project'; }
    public static get deleteFlowById(): string { return this.DESKTOP_ROUTER + '/delete/flow'; }
    public static get deleteEntityById(): string { return this.DESKTOP_ROUTER + '/delete/entity'; }
    public static get deleteScreenById(): string { return this.DESKTOP_ROUTER + '/delete/screen'; }


    // Default Entity
    public static get addDefaultEntity(): string { return this.DESKTOP_ROUTER + '/default_entity/save'; }
    public static get getDefaultEntityByProjectId(): string { return this.DESKTOP_ROUTER + '/default_entity/getbyproject/'; }


    // Templates
    public static get getAllTemplates(): string { return this.DESKTOP_ROUTER + '/template/getall'; }


    // generation
    public static get projectSocket(): string { return this.DESKTOP_ROUTER + '/generate'; }
    public static get getAllNotifyProject(): string { return this.DESKTOP_ROUTER + '/projectgen/project'; }
    public static get getAllUserNotify(): string { return this.DESKTOP_ROUTER + '/projectgen/user'; }
    public static get projectGeneration(): string { return this.DESKTOP_ROUTER + '/projectgen/project'; }
    public static GET = '/get';

    // regex Constant Expressions

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
