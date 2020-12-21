export class Constant {


    // generate Html worker
    public static STATE_SUCCESS_CLASSNAME: String = 'state-success';
    public static STATE_ERROR_CLASSNAME: String = 'state-error';
    public static HREF_BASE = '/';

    public static SRC_FOLDERNAME = 'src';
    public static APP_FOLDERNAME = 'app';
    public static NGINX_FOLDERNAME = 'nginx';

    // flow 
    public static GP_ANGULAR_COMPONENT = `gpangularcomponent`;
    public static GP_ANGULAR_SERVICE = `gpangularservice`;
    public static GP_ANGULAR_COMPONENT_MICROFLOW = `GpAngularComponent`;
    public static GP_ANGULAR_SERVICE_MICROFLOW = `GpAngularService`;

    // microflow stepName
    public static COMPONENT_HEADER_MICROFLOW = `gpheaders`;
    public static COMPONENT_OPTIONS_MICROFLOW = `gpoptions`;
    public static COMPONENT_CODETOADD_MICROFLOW = `gpcodetoadd`;
    public static COMPONENT_CHECKCONNECTOR_MICROFLOW = `gpcheck_connector`;
    public static COMPONENT_REQUEST_MICROFLOW = `gprequest`;

    // access modifier
    public static PUBLIC_ACCESS_MODIFIER = `public`;
    public static PRIVATE_ACCESS_MODIFIER = `private`;

    // entities
    public static PRIMARY_NAME = `primary`;
    public static STRING_DATATYPE = `string`;
    public static BOOLEAN_DATATYPE = `boolean`;
    public static ANY_DATATYPE = `any`;

    // connector
    public static DEFAULT_CONNECTOR_NAME = `default`;
    public static AVAILABLE_CONNECTOR_NAME = `available`;

    // routes
    public static DESKTOP_ROUTE = `desktop`;

    // screen special events
    public static MODAL_SPECIALEVENT_NAME = `modal`;


    // file extension
    public static HTML_EXTENSION = `html`;
    public static TS_EXTENSION = `ts`;
    public static SCSS_EXTENSION = `scss`;
    public static COMPONENT_EXTENSION = `component`;
    public static SERVICE_EXTENSION = `service`;
    public static MODULE_EXTENSION = `module`;
    public static SPEC_EXTENSION = `spec`;

    // templateName
    public static HTML_TEMPLATENAME = 'component_html';
    public static TS_TEMPLATENAME = 'component_ts';
    public static SERIVCE_TEMPLATENAME = `component_service`;
    public static CSS_TEMPLATENAME = 'component_css';
    public static MODULE_TEMPLATENAME = 'component_module';
    public static SPEC_TEMPLATENAME = 'component_spec';
    public static MODIFY_PROXY_CONFIG_TEMPLATENAME = 'modify_proxy_config';
    public static MODIFY_NGINX_CONF_TEMPLATENAME = 'modify_nginx_conf';

    // fileName
    public static APP_ROUTING_FILENAME = 'app-routing.module.ts';
    public static APP_MODULE_FILENAME = 'app.module.ts';
    public static PACKAGE_JSON_FILENAME = 'package.json';
    public static STYLE_SCSS_FILENAME = 'styles.scss';
    public static SHARED_FILENAME = `shared`;
    public static PROXY_CONFIG_FILENAME = 'proxy.conf.ts';
    public static NGINX_FILENAME = 'default.conf';
    public static ANGULAR_JSON_FILE = 'angular.json';
    public static TS_CONFIG_APP_JSON_FILE = 'tsconfig.app.json';

    // ckeditor element details
    public static DIV_TAGNAME = 'div';
    public static SPAN_TAGNAME = 'span';
    public static CKEDITOR_HTMLID_NAME = 'ckeditortextarea';
    public static TEXTAREA_TAGNAME = 'textarea';
    public static CKEDITOR_TAGNAME = 'ckeditor';
    public static CKEDITOR_SPAN_IDNAME = 'ckeditorspan';
    public static NGCONTAINER_TAGNAME = 'ng-container';

    // grid element details
    public static AGGRID_HTMLID_NAME = 'myGrid';
    public static AGGRID_TAGNAME = 'ag-grid-angular';
    public static GRID_READY_METHODNAME = 'gridReady';

    // component router and its navigate details
    public static ROUTER_DEPENDENCY_NAME = 'router';
    public static ACTIVATEDROUTER_DEPENDENCY_NAME = 'activatedRoute';
    public static QUERY_VARIABLE_NAME = 'query';
    public static LIST_VARIABLE = 'List';
    public static IDVARIABLE = 'Id';

    // modal 
    public static GP_MODAL_POPUP = `modal`;
    public static POPUP_DATA_VARIABLENAME = 'data';

    // object name
    public static DESKTOP_APINAME = 'DESKTOP_API';
    public static PROXY_CONFIG_VARIABLENAME = 'PROXY_CONFIG';
    public static NGINX_

    // html component tag
    public static SELECT_TS_OPTION_VARIABLENAME = 'option';
    public static SELECT_KEY_VARIABLENAME = 'key';
    public static SELECT_VALUE_VARIABLENAME = 'value';

    // list of flow action
    public static GP_CREATE_FLOW = `GpCreate`;
    public static GP_SEARCH_FLOW = `GpSearch`;
    public static GP_UPDATE_FLOW = `GpUpdate`;
    public static GP_DELETE_FLOW = `GpDelete`;
    public static GP_GETALLVALUES_FLOW = `GpGetAllValues`;
    public static GP_SEARCHDETAIL_FLOW = `GpSearchDetail`;
    public static GP_SEARCHFORUPDATE_FLOW = `GpSearchForUpdate`;
    public static GP_DELETENOUNRELATIONSHIP_FLOW = `GpDeleteNounRelationship`;
    public static GP_FILEUPLOAD_FLOW = `GpFileUpload`;
    public static GP_DELETENOUNBYRELATION_FLOW = `GpDeleteNounByRelation`;
    public static GP_CANCEL_FLOW = `GpCancel`;
    public static GP_GETNOUNFROMRELATION_FLOW = `GpGetNounFromRelation`;
    public static GP_APPSTARTUP_FLOW = `GpAppStartup`;
    public static GP_GRIDEXPORTCSV_FLOW = `GpGridExportCSV`;
    public static GP_CREATERELATIONSHIP_FLOW = `GpCreateRelationship`;
    public static GP_RECORDVIDEO_FLOW = `GpRecordVideo`;
    public static GP_GETNOUNBYRELATIONSHIP_FLOW = `GpGetNounByRelationship`;
    public static GP_TAKEPHOTO_FLOW = `GpTakePhoto`;
    public static GP_CUSTOM_FLOW = `GpCustom`;
    public static GP_GETNOUNBYID_FLOW = `GpGetNounById`;
    public static GP_DELETEBYPARENTID_FLOW = `GpDeleteByParentId`;
    public static GP_GETNOUNBYPARENTID_FLOW = `GpGetNounByParentId`;

    // Shared Service Variable Name

    public static SHARED_SERVICE = 'this.sharedService.DESKTOP_API';
}