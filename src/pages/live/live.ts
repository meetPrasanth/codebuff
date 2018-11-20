import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Contest } from '../../shared/models/contest';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
    selector: 'page-live',
    templateUrl: 'live.html'
})
export class LivePage {

    isLoading: boolean;
    liveContests: Array<Contest> = [];
    constructor(private http: HTTP, public navCtrl: NavController, private platform: Platform, private iab: InAppBrowser) {
        this.platform.ready().then((readySource) => {
            this.isLoading = true;
            this.mGetContests();
        });
    }

    mGetContests() {
        // https://currentcontests.herokuapp.com/
        // http://contesttrackerapi.herokuapp.com/
        this.http.get('http://contesttrackerapi.herokuapp.com', {}, {})
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

    mOpenUrl(contest: Contest) {
        this.iab.create(contest.url);
    }

}
