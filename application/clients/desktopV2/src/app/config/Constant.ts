import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    public static DESKTOP_ROUTER = '/desktop';
    public static MOBILE_ROUTER = '/mobile';

    public static get Login(): string { return this.DESKTOP_ROUTER + '/login'; }
    public static get signup(): string { return this.DESKTOP_ROUTER + '/signup'; }
    public static get Consent(): string { return this.DESKTOP_ROUTER + '/consent'; }

      // project apis
      public static get getProjectByUserId(): string { return this.DESKTOP_ROUTER + '/projects/getbyuserid'; }
      public static get getProjectByAll(): string { return this.DESKTOP_ROUTER + '/projects/getall'; }
      public static get deleteProject(): string { return this.DESKTOP_ROUTER + '/projects/delete/'; }
      public static get deleteProjectFlowByProjectId(): string { return this.DESKTOP_ROUTER + '/delete/project'; }

      // cloned application
      public static get clonedApplication(): string { return this.DESKTOP_ROUTER + '/clone/getbyproject' }
  
}