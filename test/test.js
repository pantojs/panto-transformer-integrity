/**
 * Copyright (C) 2016 pantojs.xyz
 * test.js
 *
 * changelog
 * 2016-06-24[16:37:33]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
'use strict';
const assert = require('assert');
const panto = require('panto');
const IntegrityTransformer = require('../');

describe('panto-transformer-integrity', () => {
    describe('#transform', () => {
        it('should get sha512', done => {
            const file = {
                filename: 'mark.js',
                content: 'This content'
            };

            new IntegrityTransformer({
                algorithm: 'sha512'
            }).transform(file).then(file => {
                assert.ok(/^sha512\-/.test(file.integrity));
            }).then(() => {
                done();
            });
        });
        it('should get sha256 when no algorithm defined', done => {
            const file = {
                filename: 'mark.js',
                content: 'This content'
            };

            new IntegrityTransformer().transform(file).then(file => {
                assert.ok(/^sha256\-/.test(file.integrity));
            }).then(() => {
                done();
            });
        });
        it('should fail if algorithm illegal', done => {
            const file = {
                filename: 'mark.js',
                content: 'This content'
            };

            new IntegrityTransformer({
                algorithm: 'md5'
            }).transform(file).catch(() => {
                done();
            });
        });
    });
});