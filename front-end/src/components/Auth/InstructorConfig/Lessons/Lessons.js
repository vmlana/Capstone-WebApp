import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLessonsByInstructorId } from '../../Api/api'

// Reusable Components
import ViewContainer from '../../../ReusableComponents/ViewContainer';

const Lessons = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);
    const { userType, authId, token } = userInfo;

    let viewData = {
        userType: 'Instructor',
        instructorId: authId,
        pageName: 'Lesson',
        header: 'Lessons',
        subHeader: 'Click to see details or edit',
        redirectRoute: 'add-lesson',
    }

    const [lessons, setLessons] = useState([]);
    useEffect(() => {
        getLessonsByInstructorId(authId).then(
            lessonList => {
                if (lessonList !== undefined) {
                    setLessons(lessonList)
                } else {
                    setLessons([])
                }
            }
        )
    }, [])

    return (
        <div>
            <ViewContainer viewData={viewData} data={lessons} />
        </div>
    );
};

export default Lessons;