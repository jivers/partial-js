const mult = (...numbers) => numbers.reduce((res, val) => res * val);

const Partial = (hz, harm = 1, fund = null) => {
    const frequency = hz;
    const harmonic = harm;

    const fundamental = (!fund)
        ? hz / harm
        : fund;
    
    return {
        frequency() {
            return frequency;
        },

        harmonic() {
            return harmonic;
        },

        fundamental: function () {
            return Partial(
                fundamental,
                1,
                Partial(fundamental)
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
        }
    };
};

exports.Partial = Partial;
