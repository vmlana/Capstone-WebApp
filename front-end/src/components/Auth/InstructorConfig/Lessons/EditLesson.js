import React from 'react'

const EditLesson = (props) => {
    // To access parameters paased: instructorId and lessonId
    const instructorId = props.match.params.instructorId
    const lessonId = props.match.params.lessonId

    // Lesson Data passed with history.push
    const lessonData = props.location.state.DataContent

    return (
        <div>
            Edit Lesson: {lessonData.lessonName}
        </div>
    )
}

export default EditLesson
