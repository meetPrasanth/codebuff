import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppRate } from '@ionic-native/app-rate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { LivePage } from '../pages/live/live';
import { UpcomingPage } from '../pages/upcoming/upcoming';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from '@ionic-native/http';

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        LivePage,
        UpcomingPage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        LivePage,
        UpcomingPage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Calendar,
        InAppBrowser,
        AppRate,
        SocialSharing,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        HTTP
    ]
})
export class AppModule { }
