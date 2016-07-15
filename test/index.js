QUnit.module('Local refs plugin', {
  setup: function () {
    jss.use(jssNested.default())
    jss.use(jssLocalRefs.default())
  },
  teardown: function () {
    jss.plugins.registry = []
  }
})

test('resolve local class names', function () {
  jss.uid.reset()
  var sheet = jss.createStyleSheet({
    a: {
      color: 'black',
    },
    b: {
      padding: 0,
      '&:hover > .a': {
        color: 'red'
      }
    }
  })
  ok(sheet.rules['.a--jss-0-0'])
  ok(sheet.rules['.b--jss-0-1'])
  deepEqual(Object.keys(sheet.classes), ['a', 'b'])
  equal(sheet.toString(), '.a--jss-0-0 {\n  color: black;\n}\n.b--jss-0-1 {\n  padding: 0;\n}\n.b--jss-0-1:hover > .a--jss-0-0 {\n  color: red;\n}')
})
