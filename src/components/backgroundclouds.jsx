// BackgroundClouds.jsx
import React from 'react';
import Cloud from './cloud';

const BackgroundClouds = ({ numClouds }) => {
    const clouds = Array.from({ length: numClouds }, () => ({
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        width: `${Math.random() * 150 + 100}px`, // Random size
        height: `${Math.random() * 80 + 60}px`  // Random size
    }));

    return (
        <div className="background-clouds">
            {clouds.map((cloud, index) => (
                <Cloud
                    key={index}
                    style={{ left: cloud.left, top: cloud.top, width: cloud.width, height: cloud.height }}
                />
            ))}
        </div>
    );
};

export default BackgroundClouds;
