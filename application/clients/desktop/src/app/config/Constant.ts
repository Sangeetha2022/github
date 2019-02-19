import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

    public static get saveUrl(): string { return '/save'; }
    public static get updateUrl(): string { return '/update/'; }
    public static get getAllUrl(): string { return 'getall'; }
    public static get getByIdUrl(): string { return 'getbyid/'; }
    public static get deleteUrl(): string { return '/delete/' };
    public static get detailsUrl(): string { return '/details' };

    public static get flowUrl(): string { return '/flow/' };
    public static get flowCompUrl(): string { return '/flow/flow_comp/' };
    public static get flowCompentUrl(): string { return '/flow_comp/' };
    public static get addDConnectorUrl(): string { return '/add/dconnector' };

    // project apis 
    public static get addProjectUrl(): string { return '/projects/my/add'; }
    public static get deleteMyProjectUrl(): string { return '/projects/my/delete/'; }
    public static get getAllMyProjecturl(): string { return '/projects/my/getall'; }

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
    public static get updateGenFlowsUrl(): string { return '/generation_flow/update'; }
    public static get getGenFlowsByCompNameUrl(): string { return '/generation_flow/getbyname/'; }

    // Micro Flow apis
    public static get addMicroFlowUrl(): string { return '/microflow/save'; }
    public static get updateMicroFlowUrl(): string { return '/microflow/update'; }
    public static get deleteMicroFlowUrl(): string { return '/microflow/delete/'; }
    public static get getMicroFlowsByCompNameUrl(): string { return '/microflow/getbycomp/'; }

    //Connector
    public static get getAllConnector(): string { return '/connector/getall'; }
    public static get addConnector(): string { return '/connector/add'; }
    public static get upadateConnector(): string { return '/connector/update'; }
    public static get deleteConnector(): string { return '/connector/delete/'; }


    //LinkedConnector
    public static get getLinkedConnectorByName(): string { return '/linked_connector/getbyname/'; }
    // public static get addConnector(): string { return '/connector/add' ;}
    // public static get upadateConnector(): string { return '/connector/update' ;}
    // public static get deleteConnector(): string { return '/connector/delete/' ;}








}