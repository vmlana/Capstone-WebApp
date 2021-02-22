import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Profile from './Profile/Profile';
import Lessons from './Lessons/Lessons';
import Playlists from './Playlists/Playlists';
import Blogs from './Blogs/Blogs';
import AddLessons from "./Lessons/AddLessons";

const InstructorNavRouter = () => {

    let { url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={url} component={Profile} />
            <Route exact path={url + "/lessons"} component={Lessons} />
            <Route exact path={url + "/playlists"} component={Playlists} />
            <Route exact path={url + "/add-lesson"} component={AddLessons} />
            <Route path={url + "/blogs"} component={Blogs} />
        </Switch>
    );
};

export default InstructorNavRouter;
