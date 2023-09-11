import test from 'tape';

import isJson from './isJson';

test('[validation.isJson] should return true if object', t => {
  t.true(isJson(null), 'null');
  t.true(isJson(1), 'number');
  t.true(isJson('string'), 'string');
  t.true(isJson(true), 'boolean');
  t.true(isJson([]), 'empty array');
  t.true(isJson({}), 'empty object');
  t.true(isJson([null, 1, 'string', true, [], {}]), 'filled array');
  t.true(isJson({ 1: null, 2: 2, 3: '3', 4: true, 5: [], 6: {} }), 'filled object');
  t.true(isJson({ 1: [{ 2: { 3: [4] } }] }), 'nested object');

  t.end();
});

test('[validation.isJson] should return false if not object', t => {
  t.false(isJson(undefined), 'undefined');
  t.false(isJson([undefined]), 'array with undefined');
  t.false(isJson({ 1: undefined }), 'object with undefined');
  t.false(isJson([{ 1: [{ 2: [{ 3: undefined }] }] }]), 'nested undefined');

  t.end();
});
