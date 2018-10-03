import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Calendar } from '@ionic-native/calendar';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    lists: any;
    constructor(private http: HTTP, public navCtrl: NavController, private platform: Platform, private calendar: Calendar) {
        this.platform.ready().then((readySource) => {
            console.log('Platform ready from', readySource);
            // Platform now ready, execute any required native code
            this.mGetHackerearth();

            this.calendar.listCalendars().then(
                data => {
                    console.log("cals", data);
                }, err => {}
            );
            
        });
    }

    mCreateEvent(challenge) {
        this.calendar.hasReadWritePermission().then(
            data => {
                console.log("per", data);
                if(data) {
                    console.log("per-if", data);
                    this.calendar.createEventInteractively(challenge.title, challenge.url, challenge.title, new Date(challenge.start_utc_tz), new Date(challenge.end_utc_tz)).then(
                        event => {
                            console.log("event", event);
                        }, eventErr => {
                            console.log("Event", eventErr);
                        }
                    );
                }else {
                    this.calendar.requestReadWritePermission().then(
                        perdata => {
                            console.log("req", perdata);
                        }, err => {  console.log("req", err); }
                    );
                }
            }, err => {}
        );
    }

    mGetHackerearth() {
        this.http.get('https://www.hackerearth.com/chrome-extension/events', {}, {})
            .then(data => {
                this.lists = JSON.parse(data['data'])['response'];
                this.lists.forEach(element => {
                    element.color = '#2C3454';
                    element.style = '3px solid ' + element.color;
                    element.portal = 'HACKEREARTH';
                });
            }).catch(err => {
                console.log("error", err);
            });
    }
}
