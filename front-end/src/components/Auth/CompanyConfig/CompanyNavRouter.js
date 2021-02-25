import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Account from './Account/Account';
import Programs from './Programs/Programs';
import Surveys from './Surveys/Surveys';
import AddProgram from './Programs/AddProgram'
import EditProgram from './Programs/EditProgram'

const CompanyNavRouter = () => {

    let { url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={url} component={Account} />
            <Route exact path={url + "/programs"} component={Programs} />
            <Route exact path={url + "/surveys"} component={Surveys} />
            <Route exact path={url + "/add-program"} component={AddProgram} />
            <Route exact path={url + "/edit-program/:companyId/:programId"} component={EditProgram} />
        </Switch>
    );
};

export default CompanyNavRouter;
