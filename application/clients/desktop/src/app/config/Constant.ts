import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

    public static get saveUrl(): string { return '/save'; }
    public static get updateUrl(): string { return '/update/'; }
    public static get getAllUrl(): string { return '/getall'; }

    public static get getByIdUrl(): string { return '/getbyid/'; }
    public static get deleteUrl(): string { return '/delete/'; }
    public static get detailsUrl(): string { return '/details'; }
    public static get addFilesUrl(): string { return '/addfile'; }
    public static get getFeatureByProjectId(): string { return '/getbyprojectid/'; }

    public static get flowUrl(): string { return '/flow'; }

    public static get featureflowUrl(): string { return '/feature-flow'; }
    public static get flowCompUrl(): string { return '/flow/flow_comp'; }
    public static get flowCompentUrl(): string { return '/flow_comp'; }
    public static get addDConnectorUrl(): string { return '/add/dconnector'; }
    public static get updateDConnectorUrl(): string { return '/update/dconnector'; }

    // project apis
    public static get addProjectUrl(): string { return '/projects/my/add'; }
    public static get deleteMyProjectUrl(): string { return '/projects/my/delete/'; }
    public static get getAllMyProjecturl(): string { return '/projects/my/getall'; }
    public static get addProjectDefaults(): String { return '/projects/default/create'; }
    public static get updateProjectById(): String { return '/projects/my/update'; }

    // Flow apis
    public static get addFlowCompToFlowUrl(): string { return '/add/flow_comp'; }
    public static get addDConnectorToFlowUrl(): string { return '/add/lconnector'; }
    public static get updateDConnectorToFlowUrl(): string { return '/update/lconnector'; }
    public static get updateFlowCompToFlowUrl(): string { return '/update/flow_comp'; }
    // public static get deleteFlowUrl(): string { return this.flow + '/delete/'; }

    // Flow Componets apis
    public static get addFlowCompUrl(): string { return '/flow_component/save'; }
    public static get updateFlowCompUrl(): string { return '/flow_component/update/'; }
    public static get getAllFlowComponentUrl(): string { return '/flow_component/getall'; }


    // Generation Flow apis
    public static get getAllGenFlowsUrl(): string { return '/generation_flow/getall'; }
    public static get addGenFlowsUrl(): string { return '/generation_flow/add'; }
    public static get updateGenFlowsUrl(): string { return '/generation_flow/update/'; }
    public static get deleteGenFlowsUrl(): string { return '/generation_flow/delete/'; }
    public static get getGenFlowsByCompNameUrl(): string { return '/generation_flow/getbyname/'; }
    public static get getTechProperties(): string { return '/generation_flow/getproperties'; }

    // Micro Flow apis
    public static get addMicroFlowUrl(): string { return '/microflow/save'; }
    public static get updateMicroFlowUrl(): string { return '/microflow/update'; }
    public static get deleteMicroFlowUrl(): string { return '/microflow/delete/'; }
    public static get getMicroFlowsByCompNameUrl(): string { return '/microflow/getbycomp/'; }

    // Connector
    public static get getAllConnector(): string { return '/connector/getall'; }
    public static get addConnector(): string { return '/connector/add'; }
    public static get upadateConnector(): string { return '/connector/update/'; }
    public static get deleteConnector(): string { return '/connector/delete/'; }


    // LinkedConnector
    public static get getLinkedConnectorByName(): string { return '/linked_connector/getbyname/'; }
    // public static get addConnector(): string { return '/connector/add' ;}
    // public static get upadateConnector(): string { return '/connector/update' ;}
    // public static get deleteConnector(): string { return '/connector/delete/' ;}

    // Feature
    public static get feature(): string { return '/feature'; }

    // Feature Details
    public static get getAllFeatureDetails(): string { return '/feature/details/getall'; }
    public static get getAllFeatureDetailsByFeatureId(): string { return '/feature/details/getbyfeatureid/'; }
    public static get addFeatureDetails(): string { return '/feature/details/addfile'; }

    // Feature Flow
    // public static get addFeatureFlow(): string { return '/feature-flow/save'; }
    // public static get getAllFeatureFlow(): string { return '/feature-flow/getall'; }
    public static get getAllFeatureFlowByFeatureId(): string { return '/feature-flow/getbyfeatureid/'; }
    public static get getFeatureFlowById(): string { return '/feature-flow/getbyid/'; }
    public static get getFeatureFlowCompByFlowId(): string { return '/feature-comp/getbyflowid/'; }
    public static get getFeatureEntityByFeatureId(): string { return '/feature/details/getentitybyfeatureid/'; }
    // public static get deleteFeatureFlowById(): string { return '/feature-flow/delete/'; }
    // public static get updateFeatureFlow(): string { return '/feature-flow/update/:id'; }

    // Feature Screen

    public static get addScreen(): string { return '/screen/save'; }
    public static get getAllScreen(): string { return '/screen/getall'; }
    public static get getScreenByID(): string { return '/screen/getbyid/:id'; }
    public static get deleteScreen(): string { return '/screen/delete/:id'; }
    public static get getScreenByFeatureName(): string { return '/screen/getbyfeature/'; }
    public static get updateScreen(): string { return '/screen/update/:id'; }

    // Feature Flow
    public static get addFeatureFlow(): string { return '/feature-flow/save'; }
    // public static get getFeatureFlowByFeatureId(): string { return '/feature-flow/getbyid/'; }
    

    // Entity
    public static get getEntityByFeatureAndprojectId(): string { return '/entity/getbyfeatureandprojectid/'; }
    // Feature Entity

    public static get getAllEntity(): string { return '/feature-entity/getall'; }
    public static get saveFeatureEntity(): string { return '/feature-entity/save'; }

    // Feature Flows
    public static get addFeatureFlow(): string { return '/feature-flow/save'; }

    // Default Entity
    public static get addDefaultEntity(): string { return '/default_entity/save'; }
    public static get getDefaultEntityByProjectId(): string { return '/default_entity/getbyproject/'; }


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
        Submit,sun,taint,Text,Textarea,toolbar,top,toString,unescape,untaint,unwatch,valueOf,watch,window`;
    }

    public static get getConstantSpecialCharacters(): String {
        return `\`|\\~|\\!|\\@|\\#|\\$|\\%|\\^|\\&|\\*|\\(|\\)|
        \\+|\\=|\\[|\\{|\\]|\\}|\\||\\\\|\\'|\\<|\\,|\\.|\\>|\\?|\\/|\\""|\\"|\\;|\\:|\\s`;
    }

}
