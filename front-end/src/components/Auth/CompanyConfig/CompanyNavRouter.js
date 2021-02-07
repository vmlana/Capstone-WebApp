import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Account from './Account/Account';
import Programs from './Programs/Programs';
import Surveys from './Surveys/Surveys';

const CompanyNavRouter = () => {

    let { url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={url} component={Account} />
            <Route exact path={ url + "/programs"} component={Programs} />
            <Route exact path={ url + "/surveys"} component={Surveys} />
        </Switch>
    );
};

export default CompanyNavRouter;
