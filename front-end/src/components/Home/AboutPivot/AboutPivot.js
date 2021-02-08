import React from 'react';
import { useHistory } from 'react-router-dom';

const AboutPivot = () => {
    const history = useHistory();

    return (
        <div className="about-section">
            <h2>What is Pivot Care</h2>
            <img src="./media/images/about-pivot-care.jpg" alt="about-pivot-care" />
            <div>
                <p>
                    Pivot Care is a mobile application that helps companies to continue providing fitness and mental health care for their
                    employees while they working from home, as a way to prevent occupational related injuries such as Repetitive Strain
                    Injury (RSI) and Work-Related Musculoskeletal Disorders (WRMD).
                </p>
                <p>
                    Based on the needs of each group of employees or individuals, companies can setup customized exercises programs with
                    the supervision and monitoring of specialized instructors. The main purpose of the application is to provide focused activities
                    related to the specific work environment of the company, such as yoga, meditation, and company-wide stretch breaks.
                </p>
                <button onClick={() => history.push("/about")}>Read More</button>
            </div>
        </div>
    );
};

export default AboutPivot;
