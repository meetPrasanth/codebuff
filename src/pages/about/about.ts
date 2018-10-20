import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppRate } from '@ionic-native/app-rate';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    constructor(private appRate: AppRate, public navCtrl: NavController, private socialSharing: SocialSharing) { }

    mRateUs() {
        this.appRate.preferences = {
            displayAppName: 'Code Buff',
            usesUntilPrompt: 2,
            promptAgainForEachNewVersion: true,
            storeAppURL: {
                android: 'market://details?id=com.codebuff'
            },
            customLocale: {
                title: 'Do you enjoy %@?',
                message: 'If you enjoy using %@, would you mind taking a moment to rate it? Thanks so much!',
                cancelButtonLabel: 'No, Thanks',
                laterButtonLabel: 'Remind Me Later',
                rateButtonLabel: 'Rate It Now'
            },
            callbacks: {
                onRateDialogShow: function (callback) {
                    console.log('rate dialog shown!', callback);
                },
                onButtonClicked: function (buttonIndex) {
                    console.log('Selected index: -> ' + buttonIndex);
                }
            }
        };
        this.appRate.promptForRating(true);
    }

    mShareApp() {
        this.socialSharing.share("sdfhjg", "dsjfg", "http://google.com").then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

}
