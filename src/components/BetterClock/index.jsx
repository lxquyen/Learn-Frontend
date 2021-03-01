import React, { useEffect, useState } from 'react';
import useClock from '../../hook/useClock';
import './BetterClock.scss'

BetterClock.propTypes = {};


function BetterClock() {
    const { timeString } = useClock();

    return (
        <div className="better-clock">
            <p className="better-clock_time">
                {timeString}
            </p>
        </div>
    );
}

export default BetterClock;