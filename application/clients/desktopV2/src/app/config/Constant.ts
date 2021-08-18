import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    public static DESKTOP_ROUTER = '/desktop';
    public static MOBILE_ROUTER = '/mobile';

    public static get Login(): string { return this.DESKTOP_ROUTER + '/login'; }
    public static get signup(): string { return this.DESKTOP_ROUTER + '/signup'; }
    public static get Consent(): string { return this.DESKTOP_ROUTER + '/consent'; }
}