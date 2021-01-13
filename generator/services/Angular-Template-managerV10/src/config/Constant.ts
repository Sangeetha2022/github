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
  public static COMPONENT_SPEC_TEMPLATE_NAME: String = 'component_spec';
  public static COMPONENT_SCSS_TEMPLATE_NAME: String = 'component_scss';
  public static COMPONENT_MODULE_TEMPLATE_NAME: String = 'component_module';
  public static MAIN_MODULE_TEMPLATE_NAME: String = 'app_module';
  public static APP_HTML_TEMPLATE_NAME: String = 'app_html';
  public static APP_COMPONENT_TEMPLATE_NAME: String = 'app_component';
  public static NGINX_CONF_TEMPLATE_NAME: String = 'nginx_default_conf';
  public static ENV_FOLDERNAME: String = 'src/environments';


  // file name
  public static STYLE_FILENAME: String = 'styles.scss';
  public static APP_ROUTING_FILENAME: String = 'app-routing.module.ts';
  public static SHARED_FILENAME: String = 'shared.service.ts';
  public static PROXY_CONFIG_FILENAME: String = 'proxy.conf.ts';
  public static NGINX_FILENAME: String = 'default.conf';
  public static DOCKERFILE_FILENAME: String = 'Dockerfile';
  public static DEFAULT_CONF_FILENAME: String = 'default.conf';
  public static ANGULAR_JSON_FILENAME: String = 'angular.json';
  public static TRANSLATOR_MODULE_FILENAME: String = 'translator.module.ts';
  public static ENV_FILENAME: String = 'environment.ts';
  public static ENV_PROD_FILENAME: String = 'environment.prod.ts';

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
  public static FOOTER_TS_FILENAME: String = 'footer.component.ts';
  public static FOOTER_SPEC_FILENAME: String = 'footer.component.spec.ts';
  public static FOOTER_MODULE_FILENAME: String = 'footer.module.ts';
  public static COMPONENT_TS_HANDELBARS: string = "ComponentTs.handlebars"
  public static COMPONENT_SPEC_HANDELBARS: string = "ComponentSpec.handlebars"
  public static COMPONENT_MODULE_HANDELBARS: string = "ComponentModule.handlebars"
  public static APP_COMPONENT_TS_HANDLEBARS: string = "AppComponentTs.handlebars"
  public static APP_COMPONENT_HTML_HANDLEBARS: string = "AppComponentHtml.handlebars"
  public static APP_COMPONENT_TS: string = 'app.component.ts';
  public static APP_COMPONENT_HTML: string = 'app.component.html';

  // nginx conf data
  public static proxyDesktop = {
    locationUrl: '/api/desktop',
    projectName: '',
    portNumber: '3000',
    additionalUrl: '/desktop'
  }
  public static proxyMobile = {
    locationUrl: '/api/mobile',
    projectName: '',
    portNumber: '3000',
    additionalUrl: '/mobile'
  }

  public static HeaderModule = {
    GpHeaders: [
      {
        importName: "I18NextModule",
        importPath: "angular-i18next"
      },
      {
        importName: "HeaderComponent",
        importPath: "./header.component"
      }
    ],
    GpOptions: {
      components: [
        { name: "HeaderComponent" }
      ],
      modules: [{ name: "I18NextModule.forRoot()" }],
      screenName: "header",
      className: "HeaderModule"
    }
  }

  public static FooterModule = {
    GpHeaders: [
      {
        importName: "I18NextModule",
        importPath: "angular-i18next"
      },
      {
        importName: "FooterComponent",
        importPath: "./footer.component"
      }
    ],
    GpOptions: {
      components: [
        { name: "FooterComponent" }
      ],
      modules: [{ name: "I18NextModule.forRoot()" }],
      screenName: "footer",
      className: "FooterModule"
    }
  }

  public static TemplateModule = {
    GpHeaders: [
      {
        importName: "I18NextModule",
        importPath: "angular-i18next"
      },
      {
        importName: "TemplateComponent",
        importPath: "./template.component"
      }
    ],
    GpOptions: {
      components: [
        { name: "TemplateComponent" }
      ],
      modules: [{ name: "I18NextModule.forRoot()" }],
      screenName: "Template",
      className: "TemplateModule"
    }
  }

  public static APP_MODULE_IMPORTS = [
    { importData: "import { BrowserAnimationsModule } from '@angular/platform-browser/animations';", className: 'BrowserAnimationsModule' },
    { importData: "import { AppRoutingModule } from './app-routing.module';", className: 'AppRoutingModule' },
    { importData: "import { TranslatorModule } from './translator/translator.module';", className: 'TranslatorModule' },
    { importData: "import { HeaderModule } from './header/header.module';", className: 'HeaderModule' },
    { importData: "import { FooterModule } from './footer/footer.module';", className: 'FooterModule' },
    { importData: "import { TemplateModule } from './template/template.module';", className: 'TemplateModule' }
  ];
}
