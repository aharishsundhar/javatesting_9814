import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Constants {

    public pageTitles: string = 'http://' + window.location.hostname + ':3008/dmngenerate';

    public savescreen: string = 'http://' + window.location.hostname + ':3008/savescreen';

    public getallscreen: string = 'http://' + window.location.hostname + ':3008/getallscreens';

}