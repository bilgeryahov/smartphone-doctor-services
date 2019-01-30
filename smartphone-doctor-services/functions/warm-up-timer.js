"use strict"

// In seconds
const WARM_UP_TIME = 30;

/**
 * Warm-up for the Firebase Functions Emulator
 * during the CI process.
 */
setTimeout(() => {
    process.exit(0);
}, WARM_UP_TIME * 1000);