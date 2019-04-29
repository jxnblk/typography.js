// @flow
import verticalRhythm from "compass-vertical-rhythm"
import ms from "modularscale"

import createStyles from "./utils/createStyles"
import compileStyles from "./utils/compileStyles"
import Client from './client'
import defaults from './defaults'
import type { OptionsType } from "Types"


const server = function (opts: OptionsType) {
  const options = { ...defaults, ...opts }
  const result = Client(options)

  result.toJSON = () => {
    return createStyles(result, options)
  }
  result.createStyles = () => {
    return result.toString()
  }

  // TODO remove in next breaking release.
  result.toString = () => {
    return compileStyles(result, options, result.toJSON())
  }

  result.injectStyles = () => {
    if (typeof document !== "undefined") {
      // Replace existing
      if (document.getElementById("typography.js")) {
        const styleNode = document.getElementById("typography.js")
        styleNode.innerHTML = result.toString()
      } else {
        const node = document.createElement("style")
        node.id = "typography.js"
        node.innerHTML = result.toString()
        const head = document.head
        if (head.firstChild) {
          head.insertBefore(node, head.firstChild)
        } else {
          head.appendChild(node)
        }
      }
    }
  }

  return result
}

export default server
