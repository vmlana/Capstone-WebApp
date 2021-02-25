import React, { useState, useEffect } from 'react';
import { getProgramsByCompanyId } from '../../Api/api'

// Reusable Components
import ViewContainer from '../../../ReusableComponents/ViewContainer';

const Programs = () => {
    let viewData = {
        userType: 'Company',
        companyId: '1',
        pageName: 'Program',
        header: 'Programs',
        subHeader: 'Click to see details or edit',
        redirectRoute: 'add-program',
    }

    const [programs, setPrograms] = useState([]);
    useEffect(() => {
        getProgramsByCompanyId(1).then(
            programList => {
                setPrograms(programList)
            }
        )
    }, [])

    return (
        <div>
            <ViewContainer viewData={viewData} data={programs} />
        </div>
    );
};

export default Programs;