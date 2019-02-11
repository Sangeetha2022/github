import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

    // project apis 
    public static get addProjectUrl(): string { return '/add'; }
    public static get deleteMyProjectUrl(): string { return '/delete/'; }
    public static get getAllMyProjecturl(): string { return '/getall'; }

    // Flow apis
    public static get addFlowUrl(): string { return '/flow/save'; }
    public static get deleteFlowUrl(): string { return '/flow/delete/'; }
    public static get updateFlowUrl(): string { return '/flow/update'; }
    public static get getAllFlowsUrl(): string { return '/flow/getall'; }

    // Flow Componets apis
    public static get addFlowCompUrl(): string { return '/flow_component/save'; }
    public static get updateFlowCompUrl(): string { return '/flow_component/update'; }
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
    public static get getAllConnector(): string { return '/connector/getall' ;}
    public static get addConnector(): string { return '/connector/add' ;}
    public static get upadateConnector(): string { return '/connector/update' ;}
    public static get deleteConnector(): string { return '/connector/delete/' ;}
    
    
    


    

    
}