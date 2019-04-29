// @flow
import verticalRhythm from "compass-vertical-rhythm"
import ms from "modularscale"

import defaults from './defaults'
import type { OptionsType } from "Types"

const typography = function(opts: OptionsType) {
  const options = { ...defaults, ...opts }

  const vr = verticalRhythm(options)

  // Add this function to the vertical rhythm object so it'll be passed around
  // as well and be available. Not related really but this is the easiest
  // way to pass around extra utility functions atm... :-\
  vr.scale = (value: number) => {
    // This doesn't pick the right scale ratio if a theme has more than one ratio.
    // Perhaps add optional parameter for a width and it'll get the ratio
    // for this width. Tricky part is maxWidth could be set in non-pixels.
    const baseFont = options.baseFontSize.slice(0, -2)
    const newFontSize = `${ms(value, options.scaleRatio) * baseFont}px`
    return vr.adjustFontSizeTo(newFontSize)
  }

  return {
    options,
    ...vr,
  }
}

export default typography
