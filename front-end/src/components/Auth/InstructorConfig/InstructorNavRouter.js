import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Profile from './Profile/Profile';
import Lessons from './Lessons/Lessons';
import Playlists from './Playlists/Playlists';
import Blogs from './Blogs/Blogs';
import AddLessons from "./Lessons/AddLessons"
import AddPlaylist from './Playlists/AddPlaylist'

const InstructorNavRouter = () => {

    let { url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={url} component={Profile} />
            <Route exact path={url + "/lessons"} component={Lessons} />
            <Route exact path={url + "/playlists"} component={Playlists} />
            <Route exact path={url + "/add-lesson"} component={AddLessons} />
            <Route exact path={url + "/add-playlist"} component={AddPlaylist} />
            <Route path={url + "/blogs"} component={Blogs} />
        </Switch>
    );
};

export default InstructorNavRouter;
