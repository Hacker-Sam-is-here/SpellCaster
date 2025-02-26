// BackgroundStars.jsx
import React from 'react';
import Star from './star';

const BackgroundStars = ({ numStars }) => {
    const stars = Array.from({ length: numStars }, () => ({
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`
    }));

    return (
        <div className="background-stars">
            {stars.map((star, index) => (
                <Star key={index} style={{ left: star.left, top: star.top }} />
            ))}
        </div>
    );
};

export default BackgroundStars;
