import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBlogsByInstructorId } from '../../Api/api'

// Reusable Components
import ViewContainer from '../../../ReusableComponents/ViewContainer'

const Blogs = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);
    const { userType, authId, token } = userInfo;

    let viewData = {
        userType: 'Instructor',
        instructorId: authId,
        pageName: 'Blog',
        header: 'Blogs',
        subHeader: 'Click to see details or edit',
        redirectRoute: 'add-blog',
    }

    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        getBlogsByInstructorId(authId).then(
            blogList => {
                if (blogList !== undefined) {
                    setBlogs(blogList)
                } else {
                    setBlogs([])
                }

            }
        )
    }, [])

    return (
        <div>
            <ViewContainer viewData={viewData} data={blogs} />
        </div>
    );
};

export default Blogs;

