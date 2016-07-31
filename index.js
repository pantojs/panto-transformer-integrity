/**
 * Copyright (C) 2016 pantojs.xyz
 * index.js
 *
 * changelog
 * 2016-06-22[13:12:07]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.2.4
 * @since 0.1.0
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
            algorithm,
            ignoreError
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

        if (panto._.isUndefined(algorithm)) {
            sum = tryN();
        } else if (algorithms.indexOf(algorithm) > -1) {
            sum = tryOne(algorithm);
        } else {
            panto.log.error(`IntegrityTransform error: algorithm must be one of ${algorithms.join()}`);
        }

        if (!sum) {
            if (ignoreError) {
                return Promise.resolve(file);
            } else {
                return Promise.reject(file);
            }
        }

        return Promise.resolve(panto._.extend(file, {
            integrity: sum
        }));
    }
}

module.exports = IntegrityTransformer;
