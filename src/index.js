const regExp = /\.(\w+)((-|\w)+)?/g

/**
 * Convert nested rules to separate, remove them from original styles.
 *
 * @param {Rule} rule
 * @api public
 */
export default function jssLocalRefs() {
  return rule => {
    if (!rule.name) {
      const sheet = rule.options && rule.options.sheet

      rule.selector = rule.selectorText.replace(regExp, (match, local) => {
          const smatch    = match.toString()
          const ruleName  = smatch.substr(1, smatch.length)

          if (ruleName === local) {
            const refRule   = sheet.getRule(ruleName)

            if (!refRule) {
              throw new Error(`No rule named ${ruleName}. Make sure to define it first.`)
            }

            return refRule.selector
          }

          return smatch
      })
    }

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
