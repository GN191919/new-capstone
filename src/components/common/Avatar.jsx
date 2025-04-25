import React from 'react';
import './Avatar.css';

const Avatar = ({ name, size = 'medium' }) => {
    // Get the first letter of the name
    const firstLetter = name ? name.charAt(0).toUpperCase() : '?';
    
    // Generate a consistent color based on the name
    const getColorFromName = (name) => {
        if (!name) return '#888';
        
        // Simple hash function to generate a color
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        // Convert to hex color
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }
        
        return color;
    };
    
    const backgroundColor = getColorFromName(name);
    
    return (
        <div className={`avatar ${size}`} style={{ backgroundColor }}>
            {firstLetter}
        </div>
    );
};

export default Avatar;