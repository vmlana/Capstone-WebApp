import React from 'react'

const EditProgram = (props) => {
    console.log(props)
    // To access parameters paased: companyId and programId
    const companyId = props.match.params.companyId
    const programId = props.match.params.programId

    // Program Data passed with history.push
    const programData = props.location.state.DataContent

    return (
        <div>
            Edit Program: {programData.programName}
        </div>
    )
}

export default EditProgram
