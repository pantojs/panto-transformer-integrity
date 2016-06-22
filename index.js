/**
 * Copyright (C) 2016 pantojs.xyz
 * index.js
 *
 * changelog
 * 2016-06-22[13:12:07]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
'use strict';
const Transformer = require('panto-transformer');
const crypto = require('crypto');

class IntegrityTransformer extends Transformer {
    _transform(file) {
        const {
            filename,
            content
        } = file;
        const algorithms = ['sha256', 'sha384', 'sha512'];
        const {
            algorithm
        } = this.options;

        const tryOne = algorithm => {
            try {
                let sum = algorithm + '-' + crypto.createHash(algorithm).update(content).digest().toString(
                    'base64');
                return sum;
            } catch (e) {
                panto.log.warn(`IntegrityTransform error in ${filename}: ${e.message}`);
            }
        };

        const tryN = () => {
            for (let i = 0; i < algorithms.length; ++i) {
                let sum = tryOne(algorithms[i]);
                if (sum) {
                    return sum;
                }
            }
        };

        let sum;

        if (panto.util.isUndefined(algorithm)) {
            sum = tryN();
        } else if (algorithms.indexOf(algorithm) > -1) {
            sum = tryOne(algorithm);
        } else {
            panto.log.error(`algorithm must be one of ${algorithms.join()}`);
        }

        if (!sum) {
            return Promise.resolve(file);
        }

        return Promise.resolve(panto.util.extend(file, {
            integrity: sum
        }));
    }
}

module.exports = IntegrityTransformer;
