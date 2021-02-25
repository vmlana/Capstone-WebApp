import React, { useState, useEffect } from 'react';
import { getLessonsByInstructorId } from '../../Api/api'

// Reusable Components
import ViewContainer from '../../../ReusableComponents/ViewContainer';

const Lessons = () => {
    let viewData = {
        userType: 'Instructor',
        instructorId: '2',
        pageName: 'Lesson',
        header: 'Lessons',
        subHeader: 'Click to see details or edit',
        redirectRoute: 'add-lesson',
    }

    const [lessons, setLessons] = useState([]);
    useEffect(() => {
        getLessonsByInstructorId(2).then(
            lessonList => {
                setLessons(lessonList)
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