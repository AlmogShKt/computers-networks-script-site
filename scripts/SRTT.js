// פונקציה לחישוב SRTT ו-RTTVAR עם סטיית תקן
function calculateSRTTAndRTTVAR(times, a, b) {
    let SRTT = times[0]; // נתחיל עם הזמן הראשון שנמדד
    let RTTVAR = 0;
    let RTO;
    
    console.log(`Initial SRTT: ${SRTT} ms`);

    for (let i = 1; i < times.length; i++) {
        let R = times[i];
        let prevSRTT = SRTT;
        
        SRTT = a * prevSRTT + (1 - a) * R;
        RTTVAR = b * RTTVAR + (1 - b) * Math.abs(SRTT - R);
        RTO = SRTT + 4 * RTTVAR;

        console.log(`Iteration ${i}:`);
        console.log(`Measured R: ${R} ms`);
        console.log(`New SRTT: ${SRTT} ms`);
        console.log(`New RTTVAR: ${RTTVAR} ms`);
        console.log(`New RTO: ${RTO} ms`);
    }

    return { SRTT, RTTVAR, RTO };
}

// הנתונים שנמדדו
let times = [30, 26, 32, 24];
let a = 0.9;
let b = 0.9; // ערך b לפי נתון השאלה

// חישוב SRTT ו-RTTVAR עם סטיית תקן
let { SRTT, RTTVAR, RTO } = calculateSRTTAndRTTVAR(times, a, b);
console.log('SRTT החדש:', SRTT, 'ms');
console.log('RTTVAR החדש:', RTTVAR, 'ms');
console.log('RTO החדש:', RTO, 'ms');
