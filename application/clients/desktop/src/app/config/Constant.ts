import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

    public static DESKTOP_ROUTER = '/desktop';
    public static MOBILE_ROUTER = '/mobile';

    public static get saveUrl(): string { return this.DESKTOP_ROUTER + '/save'; }
    public static get updateUrl(): string {  return this.DESKTOP_ROUTER + '/update/'; }
    public static get getAllUrl(): string {  return this.DESKTOP_ROUTER + '/getall'; }

    public static get getByIdUrl(): string {  return this.DESKTOP_ROUTER + '/getbyid/'; }
    public static get deleteUrl(): string {  return this.DESKTOP_ROUTER + '/delete/'; }
    public static get detailsUrl(): string {  return this.DESKTOP_ROUTER + '/details'; }
    public static get addFilesUrl(): string {  return this.DESKTOP_ROUTER + '/addfile'; }
    // public static get getFeatureByProjectId(): string {  return this.DESKTOP_ROUTER + '/getbyprojectid/'; }

    public static get flowUrl(): string {  return this.DESKTOP_ROUTER + '/flow'; }

    public static get featureflowUrl(): string {  return this.DESKTOP_ROUTER + '/feature-flow'; }
    public static get flowCompUrl(): string {  return this.DESKTOP_ROUTER + '/flow/flow_comp'; }
    public static get flowCompentUrl(): string {  return this.DESKTOP_ROUTER + '/flow_comp'; }
    public static get addDConnectorUrl(): string {  return this.DESKTOP_ROUTER + '/add/dconnector'; }
    public static get updateDConnectorUrl(): string {  return this.DESKTOP_ROUTER + '/update/dconnector'; }

    // project apis
    public static get addProjectUrl(): string {  return this.DESKTOP_ROUTER + '/projects/my/add'; }
    public static get deleteMyProjectUrl(): string {  return this.DESKTOP_ROUTER + '/projects/my/delete/'; }
    public static get getAllMyProjecturl(): string {  return this.DESKTOP_ROUTER + '/projects/my/getall'; }
    public static get addProjectDefaults(): String {  return this.DESKTOP_ROUTER + '/projects/default/create'; }
    public static get updateProjectById(): String {  return this.DESKTOP_ROUTER + '/projects/my/update'; }
    public static get getProjectById(): String {  return this.DESKTOP_ROUTER + '/projects/my/getbyid'; }
    public static get addProjectScreenDefault(): String {  return this.DESKTOP_ROUTER + '/projects/default/screen'; }

    // menu apis
    public static get defaultMenu(): String {  return this.DESKTOP_ROUTER + '/menu/default'; }


    // Flow apis
    public static get addFlowCompToFlowUrl(): string {  return this.DESKTOP_ROUTER + '/add/flow_comp'; }
    public static get addDConnectorToFlowUrl(): string {  return this.DESKTOP_ROUTER + '/add/lconnector'; }
    public static get updateDConnectorToFlowUrl(): string {  return this.DESKTOP_ROUTER + '/update/lconnector'; }
    public static get updateFlowCompToFlowUrl(): string {  return this.DESKTOP_ROUTER + '/update/flow_comp'; }
    // public static get deleteFlowUrl(): string {  return this.DESKTOP_ROUTER + this.flow + '/delete/'; }

    // Flow Componets apis
    public static get addFlowCompUrl(): string {  return this.DESKTOP_ROUTER + '/flow_component/save'; }
    public static get updateFlowCompUrl(): string {  return this.DESKTOP_ROUTER + '/flow_component/update/'; }
    public static get getAllFlowComponentUrl(): string {  return this.DESKTOP_ROUTER + '/flow_component/getall'; }


    // Generation Flow apis
    public static get getAllGenFlowsUrl(): string {  return this.DESKTOP_ROUTER + '/generation_flow/getall'; }
    public static get addGenFlowsUrl(): string {  return this.DESKTOP_ROUTER + '/generation_flow/add'; }
    public static get updateGenFlowsUrl(): string {  return this.DESKTOP_ROUTER + '/generation_flow/update/'; }
    public static get deleteGenFlowsUrl(): string {  return this.DESKTOP_ROUTER + '/generation_flow/delete/'; }
    public static get getGenFlowsByCompNameUrl(): string {  return this.DESKTOP_ROUTER + '/generation_flow/getbyname/'; }
    public static get getTechProperties(): string {  return this.DESKTOP_ROUTER + '/generation_flow/getproperties'; }

    // Micro Flow apis
    public static get addMicroFlowUrl(): string {  return this.DESKTOP_ROUTER + '/microflow/save'; }
    public static get getMicroFlow(): string {  return this.DESKTOP_ROUTER + '/microflow/component/get'; }
    public static get updateMicroFlowUrl(): string {  return this.DESKTOP_ROUTER + '/microflow/update'; }
    public static get deleteMicroFlowUrl(): string {  return this.DESKTOP_ROUTER + '/microflow/delete/'; }
    public static get getMicroFlowsByCompNameUrl(): string {  return this.DESKTOP_ROUTER + '/microflow/getbycomp/'; }

    // Connector
    public static get getAllConnector(): string {  return this.DESKTOP_ROUTER + '/connector/getall'; }
    public static get addConnector(): string {  return this.DESKTOP_ROUTER + '/connector/add'; }
    public static get upadateConnector(): string {  return this.DESKTOP_ROUTER + '/connector/update/'; }
    public static get deleteConnector(): string { return '/connector/delete/'; }


    // LinkedConnector
    public static get getLinkedConnectorByName(): string {  return this.DESKTOP_ROUTER + '/linked_connector/getbyname/'; }
    // public static get addConnector(): string {  return this.DESKTOP_ROUTER + '/connector/add' ;}
    // public static get upadateConnector(): string {  return this.DESKTOP_ROUTER + '/connector/update' ;}
    // public static get deleteConnector(): string {  return this.DESKTOP_ROUTER + '/connector/delete/' ;}




    // Feature
    public static get feature(): string {  return this.DESKTOP_ROUTER + '/feature'; }

    // new Feature
    public static get saveFeature(): String {  return this.DESKTOP_ROUTER + '/feature/save'; }
    public static get updateFeature(): String {  return this.DESKTOP_ROUTER + '/feature/update'; }
    public static get getAllFeature(): String {  return this.DESKTOP_ROUTER + '/feature/getall'; }
    public static get getFeatureById(): String {  return this.DESKTOP_ROUTER + '/feature/get'; }
    public static get getFeatureByProjectId(): String {  return this.DESKTOP_ROUTER + '/feature/project/get'; }
    public static get deleteFeature(): String {  return this.DESKTOP_ROUTER + '/feature/delete'; }

    // new flows
    public static get getAllFlow(): String {  return this.DESKTOP_ROUTER + '/flow/getall'; }


    // old  Feature Details
    public static get getAllFeatureDetails(): string {  return this.DESKTOP_ROUTER + '/feature/details/getall'; }
    public static get getAllFeatureDetailsByFeatureId(): string {  return this.DESKTOP_ROUTER + '/feature/details/getbyfeatureid/'; }
    public static get addFeatureDetails(): string {  return this.DESKTOP_ROUTER + '/feature/details/addfile'; }
    public static get getFeatureDetailsById(): string {  return this.DESKTOP_ROUTER + '/feature/details/getbyid/'; }

    // Feature Flow
    // public static get getAllFeatureFlow(): string {  return this.DESKTOP_ROUTER + '/feature-flow/getall'; }
    public static get getAllFeatureFlowByFeatureId(): string {  return this.DESKTOP_ROUTER + '/feature-flow/getbyfeatureid/'; }
    public static get getFeatureFlowById(): string {  return this.DESKTOP_ROUTER + '/feature-flow/getbyid/'; }
    public static get getFeatureFlowCompByFlowId(): string {  return this.DESKTOP_ROUTER + '/feature-comp/getbyflowid/'; }
    public static get getFeatureEntityByFeatureId(): string {  return this.DESKTOP_ROUTER + '/feature/details/getentitybyfeatureid/'; }
    // public static get deleteFeatureFlowById(): string {  return this.DESKTOP_ROUTER + '/feature-flow/delete/'; }
    // public static get updateFeatureFlow(): string {  return this.DESKTOP_ROUTER + '/feature-flow/update/:id'; }

    // Feature Screen
    public static get addScreen(): string {  return this.DESKTOP_ROUTER + '/screen/save'; }
    public static get getAllScreen(): string {  return this.DESKTOP_ROUTER + '/screen/getall'; }
    public static get getScreenByID(): string {  return this.DESKTOP_ROUTER + '/screen/get/'; }
    public static get deleteScreen(): string {  return this.DESKTOP_ROUTER + '/screen/delete/'; }
    public static get getScreenByFeatureName(): string {  return this.DESKTOP_ROUTER + '/screen/getbyfeature/'; }
    public static get updateScreen(): string {  return this.DESKTOP_ROUTER + '/screen/update/'; }
    public static get getScreenByProjectAndFeatureId(): string {  return this.DESKTOP_ROUTER + '/screen/getbyprojectandfeatureid/'; }
    public static get getScreenByProjectId(): string {  return this.DESKTOP_ROUTER + '/screen/getbyprojectid/'; }
    public static get getScreenByFeatureId(): string {  return this.DESKTOP_ROUTER + '/screen/getbyfeatureid/'; }
    public static get getScreenTemplateByProjectId(): string {  return this.DESKTOP_ROUTER + '/screen/template'; }

    // Feature Flow
    public static get addFeatureFlow(): string {  return this.DESKTOP_ROUTER + '/feature-flow/save'; }
    public static get deleteFeatureFlowById(): string {  return this.DESKTOP_ROUTER + '/feature-flow/delete/'; }

    // public static get getFeatureFlowByFeatureId(): string {  return this.DESKTOP_ROUTER + '/feature-flow/getbyid/'; }

    // Entity
    public static get getEntityByFeatureId(): string {  return this.DESKTOP_ROUTER + '/entity/feature/get'; }
    // Feature Entity

    public static get getAllEntity(): string {  return this.DESKTOP_ROUTER + '/feature-entity/getall'; }
    public static get saveFeatureEntity(): string {  return this.DESKTOP_ROUTER + '/feature-entity/save'; }

    // Default Entity
    public static get addDefaultEntity(): string {  return this.DESKTOP_ROUTER + '/default_entity/save'; }
    public static get getDefaultEntityByProjectId(): string {  return this.DESKTOP_ROUTER + '/default_entity/getbyproject/'; }


    // Templates

    public static get getAllTemplates(): string {  return this.DESKTOP_ROUTER + '/template/getall'; }


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
