var schema = require('../mappings/partial/admin_ngram');

module.exports.tests = {};

module.exports.tests.compile = function (test, common) {
  test('valid schema file', function (t) {
    t.equal(typeof schema, 'object', 'schema generated');
    t.equal(Object.keys(schema).length > 0, true, 'schema has body');
    t.end();
  });
};

// this should never need to change
module.exports.tests.type = function (test, common) {
  test('correct type', function (t) {
    t.equal(schema.type, 'string', 'correct value');
    t.end();
  });
};

module.exports.tests.store = function (test, common) {
  test('store unset (will not be stored)', function (t) {
    t.equal(schema.store, undefined, 'unset');
    t.end();
  });
};

module.exports.tests.doc_values = function (test, common) {
  test('doc_values are not required', function (t) {
    t.false(schema.doc_values);
    t.end();
  });
};

module.exports.tests.fielddata = function (test, common) {
  test('fielddata is not required', function (t) {
    t.deepEqual(schema.fielddata, {
      format: 'disabled'
    });
    t.end();
  });
};

// this should be enabled to allow 'exists' filters to work
module.exports.tests.index = function (test, common) {
  test('index enabled', function (t) {
    t.notEqual(schema.index, 'no', 'should not be disabled');
    t.end();
  });
};

// this should be a ngram-style analysis
module.exports.tests.analysis = function (test, common) {
  test('index analysis', function (t) {
    t.equal(schema.analyzer, 'peliasIndexOneEdgeGram', 'should be peliasIndexOneEdgeGram');
    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('admin_ngram: ' + name, testFunction);
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common);
  }
};
