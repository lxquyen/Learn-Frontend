import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useClock from '../../hook/useClock';

Clock.propTypes = {};


function Clock() {
    const { timeString } = useClock();

    return (
        <p style={{ fontSize: '42px' }}>{timeString}</p>
    );
}

export default Clock;