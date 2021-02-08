import React from 'react';

const PivotFeatures = () => {
    return (
        <div className="pivot-feature-section">
            <div className="feature-list">
                <div className="feature">
                    <h2>FIND A PLAN THAT FIT WITH YOUR COMPANY</h2>
                    <p>
                        Find plans with instructors and playlists specially designed according to your
                        company's job positions, main activities and environments prioritizing wellness and
                        healthy habits and making the difference in their daily work environment.
                    </p>
                    <img className="feature-image" src="1.jpg" alt="feature-1" />
                </div>

                <div className="feature">
                    <img className="feature-image" src="1.jpg" alt="feature-2" />
                    <h2>OFFER REMOTE GUIDENCE AND SUPPORT</h2>
                    <p>
                        Instructors from different healthy and wellness
                        areas can upload content, videos and create
                        customized playlist in the platform to keep
                        providing your training classes and services
                        remotely from anywhere with PIVOT CARE and
                        measure users satisfaction trough surveys.
                    </p>
                </div>

                <div className="feature">
                    <h2>EXPERIENCE NEW WAYS TO KEEP MOVING</h2>
                    <p>
                        Offer varied and interesting content about the
                        importance of health care, posture and
                        ergonomics in the work environment, especially
                        in remote work and encourage your team to
                        think and do more about occupational health
                        issues prevention.
                    </p>
                    <img className="feature-image" src="1.jpg" alt="feature-3" />
                </div>
            </div>
        </div>
    );
};

export default PivotFeatures;
