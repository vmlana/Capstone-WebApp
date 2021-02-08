import React from 'react';

const Features = () => {
    return (
        <div className="feature-section">
            <div className="feature-list">
                <div className="feature">
                    <img className="feature-image" src="1.jpg" alt="feature-1" />
                    <h3>For Companies</h3>
                </div>

                <div className="feature">
                    <img className="feature-image" src="1.jpg" alt="feature-2" />
                    <h3>For Instructors</h3>
                </div>

                <div className="feature">
                    <img className="feature-image" src="1.jpg" alt="feature-3" />
                    <h3>For Employees</h3>
                </div>
            </div>
        </div>
    );
};

export default Features;
