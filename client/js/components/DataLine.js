import React, { PropTypes } from 'react';

export default function DataLine({ heading, value }) {
    if (value) {
        return (
            <tr className="data-line">
                <td className="heading">{heading}</td>
                <td className="data">{value}</td>
            </tr>
        );
    }
    return null;
}

DataLine.propTypes = {
    heading: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};
