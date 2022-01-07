export class Constant {

    // template name
    public static INDEX_HTML_TEMPLATE_NAME: String = 'index_html';
    public static STYLE_TEMPLATE_NAME: String = 'styles_scss';
    public static APP_ROUTING_TEMPLATE_NAME: String = 'app_routing';
    public static SHARED_SERVICE_TEMPLATE_NAME: String = 'shared_service';
    public static PROXY_CONFIG_TEMPLATE_NAME: String = 'proxy_config';
    public static DOCKERFILE_TEMPLATE_NAME: String = 'docker_file';
    public static TRANSLATOR_TEMPLATE_NAME: String = 'translator';
    public static COMPONENT_HTML_TEMPLATE_NAME: String = 'component_html';
    public static COMPONENT_TS_TEMPLATE_NAME: String = 'component_ts';
    public static ENV_FILENAME: String = 'environment.ts';
    public static ENV_PROD_FILENAME: String = 'environment.prod.ts';
    public static COMPONENT_SPEC_TEMPLATE_NAME: String = 'component_spec';
    public static COMPONENT_SCSS_TEMPLATE_NAME: String = 'component_scss';
    public static COMPONENT_MODULE_TEMPLATE_NAME: String = 'component_module';
    public static MAIN_MODULE_TEMPLATE_NAME: String = 'app_module';
    public static APP_HTML_TEMPLATE_NAME: String = 'app_html';
    public static APP_COMPONENT_TEMPLATE_NAME: String = 'app_component';
    public static NGINX_CONF_TEMPLATE_NAME: String = 'nginx_default_conf';

    // file name
    public static STYLE_FILENAME: String = 'styles.scss';
    public static APP_ROUTING_FILENAME: String = 'app-routing.module.ts';
    public static SHARED_FILENAME: String = 'shared.service.ts';
    public static PROXY_CONFIG_FILENAME: String = 'proxy.conf.ts';
    public static NGINX_FILENAME: String = 'default.conf';
    public static ENV_FOLDERNAME: String = 'src/environments';
    public static DOCKERFILE_FILENAME: String = 'Dockerfile';
    public static DEFAULT_CONF_FILENAME: String = 'default.conf';
    public static ANGULAR_JSON_FILENAME: String = 'angular.json';
    public static TRANSLATOR_MODULE_FILENAME: String = 'translator.module.ts';

    // folder name
    public static SHARED_FOLDERNAME: String = 'shared';
    public static SRC_FOLDERNAME: String = 'src';
    public static APP_FOLDERNAME: String = 'app';
    public static ASSETS_FOLDERNAME: String = 'assets';
    public static NGINX_FOLDERNAME: String = 'nginx';
    public static STATIC_TEMPLATE_FOLDERNAME: String = 'static';
    public static TRANSLATOR_FOLDERNAME: String = 'translator';
    public static LOCALES_FOLDERNAME: String = 'locales';
    public static HEADER_FOLDERNAME = 'header';
    public static TEMPLATE_FOLDERNAME = 'template';
    public static FOOTER_FOLDERNAME = 'footer';

    // nginx conf data
   public static proxyWeb = {
        locationUrl: '/api/web',
        projectName: '',
        portNumber: '3000',
        additionalUrl: '/web'
    }
   public static proxyMobile = {
        locationUrl: '/api/mobile',
        projectName: '',
        portNumber: '3000',
        additionalUrl: '/mobile'
    }

}