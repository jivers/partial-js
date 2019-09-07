const mult = (...numbers) => numbers.reduce((res, val) => res * val);

const targetOctaveAbove = (freq, targetFreq, offset=1) => {
    return (freq > (targetFreq * offset)) ? freq : targetOctaveAbove(freq * 2, targetFreq, offset);
};

const targetOctaveBelow = (freq, targetFreq, offset=1) => {
    return (freq < (targetFreq * offset)) ? freq : targetOctaveBelow(freq / 2, targetFreq, offset);
};

const Partial = (hz, harm = 1, fund = null) => {
    const frequency = hz;
    const harmonic = harm;

    const fundamental = (fund)
        ? fund
        : hz / harm;
    
    return {
        frequency() {
            return frequency;
        },

        harmonic() {
            return harmonic;
        },

        fundamental: function () {
            return Partial(
                fundamental
            )
        },

        partial: function (h1, h2 = 1) {
            return Partial(
                mult(frequency, h1, h2),
                mult(harmonic, h1, h2)
            );
        },

        octaveUp: function () {
            return Partial(
                mult(frequency, 2.0),
                harmonic,
                fundamental
            )
        },

        octaveDown: function () {
            return Partial(
                mult(frequency, 0.5),
                harmonic,
                fundamental
            )
        },

        closestAbove: function (targetPartial) {
            let targetFreq = targetPartial.frequency();
            return (targetFreq >= frequency) 
                ? Partial(
                    targetOctaveAbove(frequency, targetFreq),
                    harmonic,
                    fundamental )
                : Partial(
                    targetOctaveBelow(frequency, targetFreq, 2),
                    harmonic,
                    fundamental);
        },

        closestBelow: function (targetPartial) {
            let targetFreq = targetPartial.frequency();
            return (targetFreq >= frequency) 
                ? Partial(
                    targetOctaveAbove(frequency, targetFreq, 0.5),
                    harmonic,
                    fundamental )
                : Partial(
                    targetOctaveBelow(frequency, targetFreq),
                    harmonic,
                    fundamental);
        }
    };
};

exports.Partial = Partial;
