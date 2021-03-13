const { pivotDb, pivotPoolDb } = require("../connection.js");


// ----------------------------------------------------------
// Returns a list of all Blogs
// ----------------------------------------------------------
exports.getBlogs = (req, res) => {

    let sBlogId       = pivotDb.escape(req.query.blogId).replace(/['']+/g, '');
    let sInstructorId = pivotDb.escape(req.query.instructorId).replace(/['']+/g, '');
    let sUserId       = pivotDb.escape(req.query.userId).replace(/['']+/g, '');    

    // sets the number of days to consider when searching the blogs for a user
    const numDays = 30;

    // Set filters
    let sWhere = " WHERE 1 = 1 ";
    if (sBlogId != "" && sBlogId.toLowerCase() != "null") {
        sWhere = sWhere + ` AND b.blogId = ${sBlogId} `;
    }
    if (sInstructorId != "" && sInstructorId.toLowerCase() != "null") {
        sWhere = sWhere + ` AND b.instructorId = ${sInstructorId} `;
    }
    if (sUserId != "" && sUserId.toLowerCase() != "null") {
        sWhere = sWhere + ` AND b.categoryId IN (SELECT p.categoryId
                                                   FROM activityLog l
                                                        LEFT JOIN playlists p ON (l.playlistId = p.playlistId)
                                                  WHERE l.userId = ${sUserId} 
                                                    AND DATEDIFF(CURDATE(), logDate) < ${numDays} 
                                                  GROUP BY p.categoryId )   `;
    }


    let qry = `SELECT b.blogId AS blogId, b.title AS blogTitle, content AS blogContent, b.postDate AS orderedDate,
                      DATE_FORMAT(b.postDate, "%b %d %Y") as blogPostDate, b.imageFileBlog as blogImageFile, b.imageFileThumb as blogThumbImageFile,   
                      b.instructorId, l.name as instructorName, l.imageFile as instructorImage,
                      t.tagId, t.name as tagName,
                      rb.blogId as relatedBlogId, rb.blogTitle as relatedBlogTitle
                 FROM blogs b
                      INNER JOIN instructors i  ON (b.instructorId = i.instructorId)
                      INNER JOIN login l ON (i.instructorId = l.loginId)
                      LEFT JOIN blogTags bt ON (b.blogId = bt.blogId)
                      LEFT JOIN tags t ON (bt.tagId = t.tagId)
                      LEFT JOIN ( SELECT b2.blogId, bt2.tagId, b2.title as blogTitle
                                    FROM blogs b2
                                         INNER JOIN blogTags bt2 ON (b2.blogId = bt2.blogId)              
                                 ) rb ON (bt.tagId = rb.tagId AND b.blogId <> rb.blogId)                      
             ${sWhere}        
             ORDER BY  orderedDate desc, blogTitle, blogId, tagName, tagId, relatedBlogTitle, relatedBlogId   `;

    pivotPoolDb.then(pool => {
        pool.query(qry)
            .then(results => {
                if (results.length == 0) {
                    res.status(404).send("No Record Found");
                } else {

                    let vBlogs = [];
                    let iBlogId = -1;
                    let i = 0;

                    while (i < results.length) {
                        let vBlog = {};
                        let vTags = [];
                        let vRelatedBlogs = [];
                        let iBlogBase = i;
                        iBlogId = results[iBlogBase].blogId;

                        // Creates array of all the tags for the blog
                        while (i < results.length && iBlogId == results[i].blogId) {

                            vRelatedBlogs = [];
                            let iTagBase = i;
                            let iTagId = results[iTagBase].tagId;

                            // Creates array of all the other blogs related to the same tag
                            while (i < results.length && iBlogId == results[i].blogId && iTagId == results[i].tagId) {
                                vRelatedBlogs.push({
                                    blogId: results[i].relatedBlogId,
                                    blogTitle: results[i].relatedBlogTitle
                                });
                                i++;
                            }

                            vTags.push({
                                tagId: results[iTagBase].tagId,
                                tagName: results[iTagBase].tagName
                            });
                        }

                        vBlog = {
                            blogId: results[iBlogBase].blogId,
                            blogTitle: results[iBlogBase].blogTitle,
                            blogContent: results[iBlogBase].blogContent,
                            blogPostDate: results[iBlogBase].blogPostDate,
                            blogImageFile: results[iBlogBase].blogImageFile,
                            blogThumbImageFile: results[iBlogBase].blogThumbImageFile,
                            instructorId: results[iBlogBase].instructorId,
                            instructorName: results[iBlogBase].instructorName,
                            instructorImage: results[iBlogBase].instructorImage,
                            tags: vTags,
                            relatedBlogs: vRelatedBlogs
                        };

                        vBlogs.push(vBlog);
                    };

                    res.status(200).send(vBlogs);
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);
            })
    })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });

};



