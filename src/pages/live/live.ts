import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Contest } from '../../shared/models/contest';

@Component({
    selector: 'page-live',
    templateUrl: 'live.html'
})
export class LivePage {

    isLoading: boolean;
    liveContests: Array<Contest> = [];
    constructor(private http: HTTP, public navCtrl: NavController, private platform: Platform) {
        this.platform.ready().then((readySource) => {
            this.isLoading = true;
            this.mGetContests();
        });
    }

    mGetContests() {
        this.http.get('https://currentcontests.herokuapp.com/', {}, {})
            .then(data => {
                this.isLoading = false;
                data = JSON.parse(data['data']);
                if (data && data['result']) {
                    this.liveContests = data['result']['ongoing'];
                    console.log('live', this.liveContests);
                }
            }).catch(err => {
                this.isLoading = false;
                console.log('error', err);
            })
    }

}
