import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Profile from './Profile/Profile';
import Playlists from './Playlists/Playlists';
import AddPlaylist from './Playlists/AddPlaylist'
import EditPlaylist from './Playlists/EditPlaylist'
import Lessons from './Lessons/Lessons';
import AddLessons from "./Lessons/AddLessons"
import EditLesson from './Lessons/EditLesson'
import Blogs from './Blogs/Blogs';

const InstructorNavRouter = () => {

    let { url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={url} component={Profile} />
            <Route exact path={url + "/playlists"} component={Playlists} />
            <Route exact path={url + "/add-playlist"} component={AddPlaylist} />
            <Route exact path={url + "/edit-playlist/:instructorId/:playlistId"} component={EditPlaylist} />
            <Route exact path={url + "/lessons"} component={Lessons} />
            <Route exact path={url + "/add-lesson"} component={AddLessons} />
            <Route exact path={url + "/edit-lesson/:instructorId/:lessonId"} component={EditLesson} />
            <Route path={url + "/blogs"} component={Blogs} />
        </Switch>
    );
};

export default InstructorNavRouter;
