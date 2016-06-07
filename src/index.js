const regExp = /\.(\w+)/g

/**
 * Convert nested rules to separate, remove them from original styles.
 *
 * @param {Rule} rule
 * @api public
 */
export default function jssLocalRefs() {
  return rule => {
    if (regExp.test(rule.name)) {
      const sheet = rule.options && rule.options.sheet
      rule.selector = rule.name.replace(regExp, (match, local) => {
        const refRule = sheet.getRule(local)
        if (!refRule) {
          throw new Error(`No rule named ${local}. Make sure to define it first.`)
        }
        return refRule.selector
      })
      delete sheet.classes[rule.name]
    }
  }
}
