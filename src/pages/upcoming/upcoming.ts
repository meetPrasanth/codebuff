import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Contest } from '../../shared/models/contest';
import { HTTP } from '@ionic-native/http';

@Component({
    selector: 'page-upcoming',
    templateUrl: 'upcoming.html'
})
export class UpcomingPage {

    upComingContests: Array<Contest> = [];
    constructor(private http: HTTP, public navCtrl: NavController, private platform: Platform, private calendar: Calendar) {
        this.platform.ready().then((readySource) => {
            console.log('Platform ready from', readySource);
            // Platform now ready, execute any required native code
            this.mGetContests();
            this.calendar.listCalendars().then(
                data => {
                    console.log("cals", data);
                }, err => { }
            );
        });
    }

    mCreateEvent(challenge) {
        this.calendar.hasReadWritePermission().then(
            data => {
                if (data) {
                    this.calendar.createEventInteractively(challenge.Name, challenge.url, challenge.Name, new Date(challenge.StartTime), new Date(challenge.EndTime)).then(
                        event => {
                            console.log("event", event);
                        }, eventErr => {
                            console.log("Event", eventErr);
                        }
                    );
                } else {
                    this.calendar.requestReadWritePermission().then(
                        perdata => {
                            console.log("req", perdata);
                        }, err => { console.log("req", err); }
                    );
                }
            }, err => { }
        );
    }

    mGetContests() {
        this.http.get('https://currentcontests.herokuapp.com/', {}, {})
            .then(data => {
                console.log('sdjf');
                data = JSON.parse(data['data']);
                if (data && data['result']) {
                    this.upComingContests = data['result']['upcoming'];
                    console.log(this.upComingContests);
                }
            }).catch(err => {
                console.log('error', err);
            })
    }

    // mGetHackerearth() {
    //     this.http.get('https://www.hackerearth.com/chrome-extension/events', {}, {})
    //         .then(data => {
    //             this.lists = JSON.parse(data['data'])['response'];
    //             this.lists.forEach(element => {
    //                 element.color = '#2C3454';
    //                 element.style = '3px solid ' + element.color;
    //                 element.portal = 'HACKEREARTH';
    //             });
    //         }).catch(err => {
    //             console.log("error", err);
    //         });
    // }
}
