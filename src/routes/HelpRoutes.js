import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Faqs from '../components/HelpPage/Faqs'
import Support from '../components/HelpPage/Support'

export default class HelpRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/help/faq" component={Faqs} />
                <Route path="/help/support" component={Support} />
            </Switch>
        )
    }
}
