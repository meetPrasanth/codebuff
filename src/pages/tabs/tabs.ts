import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { LivePage } from '../live/live';
import { UpcomingPage } from '../upcoming/upcoming';

@Component({
    selector: 'tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = UpcomingPage;
    tab2Root = LivePage;
    tab3Root = AboutPage;

    constructor() {

    }
}
