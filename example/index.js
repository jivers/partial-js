import fs from 'fs';
import wavEncoder from 'wav-encoder';

import { Partial } from '../Partial';

// Create a 10 second .wav file of partials
const SAMPLE_RATE = 44100;
const FUNDAMENTAL_FREQUENCY = 110;

const lenInSeconds = 10;
const lenInSamples = lenInSeconds * SAMPLE_RATE;

const fundamental = Partial(FUNDAMENTAL_FREQUENCY);
const limit = 25;

// Generate an array of odd partial frequencies quantized
// to the closes octave above the fundamental's third partial
const frequencies = [...Array(limit)]
    .map((x, i) => fundamental.partial(i + 1))
    .filter(x => x.harmonic() % 2)
    .map(x => x.closestAbove(fundamental.partial(3)));

const numTones = frequencies.length;

const delta = 1 / SAMPLE_RATE;
const AUDIO_DATA = new Float32Array(lenInSamples).map(x => 0);

// For each frequency, generate and sum a sine tone into audio data array
frequencies.map((f) => {
    const frequency = f.frequency();
    const amplitude = 1.0 / numTones;

    for (let i = 0; i < lenInSamples; i++) {
        AUDIO_DATA[i] += amplitude * Math.sin(2 * Math.PI * frequency * delta * i);
    };
});

const sample = {
    sampleRate: SAMPLE_RATE,
    channelData: [
        AUDIO_DATA
    ]
};

wavEncoder.encode(sample).then((buffer) => {
    fs.writeFileSync("testTone.wav", new Buffer(buffer));
});
