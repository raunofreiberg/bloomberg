import React, { PropTypes } from 'react';


export default function PersonAvatar({ firstName, lastName, size }) {
    const avatarStyles = {
        height: `${size}px`,
        width: `${size}px`,
        lineHeight: `${size}px`,
    };

    const initialStyles = {
        fontSize: `${size / 3.125}px`,  // Works out to be a good ratio visually, 16px font @ 50px size, 25.6px @ 80px
    };

    return (
        <div className="person-avatar" style={avatarStyles}>
            <div className="person-avatar-initials" style={initialStyles}>
                {firstName[0]}{lastName[0]}
            </div>
        </div>
    );
}

PersonAvatar.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
};
