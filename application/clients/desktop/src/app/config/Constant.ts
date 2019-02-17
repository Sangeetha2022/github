import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

    public static get details(): string { return '/details' };
    public static get flow(): string { return '/flow/' };

    // project apis 
    public static get addProjectUrl(): string { return '/projects/my/add'; }
    public static get deleteMyProjectUrl(): string { return '/projects/my/delete/'; }
    public static get getAllMyProjecturl(): string { return '/projects/my/getall'; }

    // Flow apis
    public static get addFlowUrl(): string { return this.flow + '/save'; }
    public static get addFlowCompToFlowUrl(): string { return '/add/flow_comp'; }
    public static get addDConnectorToFlowUrl(): string { return '/add/lconnector'; }
    public static get updateDConnectorToFlowUrl(): string { return '/update/lconnector'; }
    public static get updateFlowCompToFlowUrl(): string { return '/update/flow_comp'; }
    public static get deleteFlowUrl(): string { return this.flow + '/delete/'; }
    public static get updateFlowUrl(): string { return this.flow + '/update/'; }
    public static get getAllFlowsUrl(): string { return this.flow + 'getall'; }
    public static get getFlowByIDUrl(): string { return this.flow + 'getbyid/'; }

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