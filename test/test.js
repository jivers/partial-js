import test from 'ava';
import { Partial } from '../Partial';

let frequency = 110.0;
let partial = Partial(frequency);

test('.frequency()', t => {
    t.is(partial.frequency(), frequency, "Partial frequency incorrect")
    t.is(partial.partial(3).frequency(), frequency * 3, "Derived partial frequency incorrect");
});

test('.harmonic()', t => {
    t.is(partial.harmonic(), 1.0, "Partial harmonic incorrect");
    t.is(partial.partial(3).harmonic(), 3.0, "Derived partial harmonic incorrect");
});

test('.octaveUp()', t => {
    t.is(partial.octaveUp().frequency(), frequency * 2, "octaveUp frequency is incorrect");
    t.is(partial.octaveUp().harmonic(), partial.harmonic(), "harmonic has been mutated after octaveUp");
});

test('.octaveDown()', t => {
    t.is(partial.octaveDown().frequency(), frequency / 2, "octaveDown frequency is incorrect");
    t.is(partial.octaveDown().harmonic(), partial.harmonic(), "harmonic has been mutated after octaveDown");
});

test('.fundamental()', t => {
    t.is(partial.fundamental().frequency(), frequency, "Fundamental frequency incorrect");
    t.is(partial.fundamental().harmonic(), 1.0, "Fundamental harmonic is not 1.0");

    t.is(partial.partial(9).fundamental().frequency(), frequency, "Derived fundamental frequency is incorrect");
    t.is(partial.partial(9).fundamental().harmonic(), 1.0, "Derived fundamental harmonic is incorrect");

    t.is(partial.partial(9, 9).fundamental().frequency(), frequency, "Derived fundamental frequency is incorrect");
    t.is(partial.partial(9, 9).fundamental().harmonic(), 1.0, "Derived fundamental harmonic is incorrect");
});

test('.partial()', t => {
    t.is(partial.partial(1).frequency(), partial.frequency(), "Derived partial 1 frequency is not equal to original frequency");
    t.is(partial.partial(2).frequency(), partial.frequency() * 2, "Derived partial 2 frequency should be double the original frequency");
    t.is(partial.partial(3).fundamental().frequency(), partial.frequency(), "Derived partial 3 fundamental frequency is not equal to original frequency");

    t.is(partial.partial(1).harmonic(), partial.harmonic(), "Derived partial 1 harmonic is not 1");
    t.is(partial.partial(2).harmonic(), partial.harmonic() * 2, "Derived partial 2 harmonic is not 2");

    t.is(partial.partial(1, 1).frequency(), partial.frequency(), "Derived partial (1, 1) frequency is not equal to original frequency");
    t.is(partial.partial(2, 2).frequency(), partial.frequency() * 4, "Derived partial (2, 2) frequency is not equal to original frequency * 4");
    t.is(partial.partial(3, 3).fundamental().frequency(), partial.frequency(), "Derived partial (3, 3) fundamental frequency is note original frequency * 9");

    t.is(partial.partial(1, 1).harmonic(), partial.harmonic(), "Derived partial (1, 1) harmonic is not original * 1");
    t.is(partial.partial(3, 3).harmonic(), partial.harmonic() * 9, "Derived partial (3, 3) harmonic is not origianl * 9");
});