/**
 * Calculate Simple Interest
 * Formula: Interest = (P * R * T) / 100
 * @param {Number} principal 
 * @param {Number} rate (annual percentage)
 * @param {Number} timeInYears 
 */
exports.calculateSimpleInterest = (principal, rate, timeInYears) => {
    return (principal * rate * timeInYears) / 100;
};

/**
 * Calculate Compound Interest
 * Formula: A = P(1 + r/n)^(nt)
 * @param {Number} principal 
 * @param {Number} rate (annual percentage => rate/100)
 * @param {Number} frequency (compounding frequency per year: 12 for monthly, 1 for yearly)
 * @param {Number} timeInYears 
 */
exports.calculateCompoundInterest = (principal, rate, frequency, timeInYears) => {
    const r = rate / 100;
    const n = frequency;
    const t = timeInYears;
    const amount = principal * Math.pow((1 + r / n), n * t);
    return amount - principal;
};

/**
 * Dynamic recalculation after partial payment
 * Given an existing principal, accumulated interest, and amount paid.
 * Applies payment to interest first, then principal.
 */
exports.applyPartialPayment = (principal, accumulatedInterest, amountPaid) => {
    let remainingInterest = accumulatedInterest;
    let remainingPrincipal = principal;

    if (amountPaid >= remainingInterest) {
        const excess = amountPaid - remainingInterest;
        remainingInterest = 0;
        remainingPrincipal -= excess;
    } else {
        remainingInterest -= amountPaid;
    }

    // Prevent negative principal
    if (remainingPrincipal < 0) remainingPrincipal = 0;

    return { remainingPrincipal, remainingInterest };
};
