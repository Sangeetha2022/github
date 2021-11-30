

export class Constant {
    public static APPLICATION_PATH = process.env.APPLICATION_PATH;
    public static TEMPLATE_PATH = '../../template';
    public static GENERATION_PATH = './'; 
    public static IMAGE_PATH = process.env.IMAGE_PATH; 


    public static SRC_FOLDERNAME = 'src';
    public static APP_FOLDERNAME = 'app';

    // component foldername
    public static HEADER_FOLDERNAME = 'header';

    // access modifier
    public static PUBLIC_ACCESS_MODIFIER = `public`;
    public static PRIVATE_ACCESS_MODIFIER = `private`;

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
    public static COMPONENT_LOADER_TEMPLATENAME = 'component_loader';
    public static COMPONENT_FACTORY_TEMPLATENAME = 'component_factory';

    // fileName
    public static APP_ROUTING_FILENAME = 'app-routing.module.ts';
    public static APP_MODULE_FILENAME = 'app.module.ts';
    public static APP_COMPONENT_TS_FILENAME = 'app.component.ts';
    public static PACKAGE_JSON_FILENAME = 'package.json';
    public static STYLE_SCSS_FILENAME = 'styles.scss';
    public static SHARED_FILENAME = `shared`;
    public static PROXY_CONFIG_FILENAME = 'proxy.conf.ts';
    public static NGINX_FILENAME = 'default.conf';

    // html tag
    public static HTML_LIST_TAG = 'li';
    public static HTML_ANCHOR_TAG = 'a';
    public static HTML_UNORDERED_LIST_TAG = 'ul';
    public static HTML_DIV_TAG = 'div';

}