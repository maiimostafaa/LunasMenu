// One entry per theme. Each theme is a folder under client/public/themes/<id>/
// holding a doodles/ directory plus the mockup it was measured from
// (mockup.png — not shown on the TV, kept for future re-measurement).
// The chalkboard background image is shared by every theme on purpose (see
// client/public/background.png) rather than duplicated per theme.
//
// Doodle positions are measured off each theme's Figma mockup, the same way
// the original board was: a pixel scan finds where the artwork's visible
// ink sits on the 2560x1440 mockup (which is exactly 16:9, so percentages
// there map 1:1 to vw/vh), then a second scan finds how much transparent
// padding sits inside the source file itself, so the two combine into a
// CSS box whose rendered ink — not just its bounding box — lands exactly
// where the design has it. Don't hand-tune these numbers without
// re-running that measurement; see client/public/themes/README.md.
//
// titleSpark: the two small flourishes flanking the title text, rendered
// inside the same flex row as the title itself (not absolutely positioned)
// so they stay attached to the text if the board title is ever edited to
// something longer or shorter than the mockup's default title.
// doodles: everything else, each absolutely positioned on the board.
export const THEMES = {
  og: {
    label: 'Original',
    titleSpark: {
      left: { src: 'spark-left.svg', width: '5.4vw' },
      right: { src: 'spark-right.svg', width: '5.4vw' },
    },
    doodles: [
      { src: 'coffee.svg', top: '4.4vh', left: '2.7vw', width: '12vw' },
      { src: 'egg.svg', top: '4.4vh', right: '2.4vw', width: '11.8vw' },
      { src: 'pancakes.svg', bottom: '8vh', left: '2.7vw', width: '19vw' },
      { src: 'olive-branch.svg', bottom: '7.2vh', right: '2.3vw', width: '20vw' },
      { src: 'sparkles-left.svg', top: '44.1vh', left: '5.9vw', width: '7.5vw' },
      { src: 'sparkles-right.svg', top: '44.1vh', right: '5.9vw', width: '7.5vw' },
      { src: 'bottom-heart.svg', bottom: '7.55vh', left: '13.25vw', width: '23.5vw' },
    ],
  },

  halloween: {
    label: 'Halloween',
    titleSpark: {
      left: { src: 'spark_left.svg', width: '6.27vw' },
      right: { src: 'spark_right.svg', width: '6.27vw' },
    },
    doodles: [
      { src: 'jack_o_lantern.svg', top: '6.01vh', left: '2.05vw', width: '16.6vw' },
      { src: 'bat.svg', top: '2.81vh', right: '0.56vw', width: '30.42vw' },
      { src: 'halloween_sparkles_left.svg', top: '40.35vh', left: '5.98vw', width: '7.06vw' },
      { src: 'halloween_sparkles_right.svg', top: '39.43vh', right: '2.36vw', width: '14.94vw' },
      { src: 'witches_hat.svg', bottom: '2.86vh', left: '2.27vw', width: '22.53vw' },
      { src: 'cauldron.svg', bottom: '3vh', right: '1.3vw', width: '19.85vw' },
      { src: 'bottom_star.svg', bottom: '2.8vh', left: '38.6vw', width: '22.81vw' },
    ],
  },
  thanksgiving: {
    label: 'Thanksgiving',
    titleSpark: {
      left: { src: 'spark_left.svg', width: '6.27vw' },
      right: { src: 'spark_right.svg', width: '6.27vw' },
    },
    doodles: [
      { src: 'turkey.svg', top: '3.9vh', left: '1.95vw', width: '15.66vw' },
      { src: 'leaves.svg', top: '4.34vh', right: '2.91vw', width: '17.29vw' },
      { src: 'sparkles_left.svg', top: '43.97vh', left: '3.97vw', width: '9.09vw' },
      { src: 'sparkles_right.svg', top: '43.97vh', right: '4.75vw', width: '9.09vw' },
      { src: 'pumpkin.svg', bottom: '2.1vh', left: '1.95vw', width: '22.25vw' },
      { src: 'cornucopia.svg', bottom: '1.98vh', right: '1.3vw', width: '20.37vw' },
      { src: 'bottom_heart.svg', bottom: '4.87vh', left: '37.86vw', width: '24.17vw' },
    ],
  },
  christmas: {
    label: 'Christmas',
    titleSpark: {
      left: { src: 'spark_left.svg', width: '6.6vw' },
      right: { src: 'spark_right.svg', width: '6.6vw' },
    },
    doodles: [
      { src: 'mistletoe.svg', top: '5.99vh', left: '3.09vw', width: '14.72vw' },
      { src: 'jingle_bells.svg', top: '5.35vh', right: '1.76vw', width: '24.73vw' },
      { src: 'sparkles_left.svg', top: '37.99vh', left: '7.4vw', width: '8.44vw' },
      { src: 'sparkles_right.svg', top: '37.99vh', right: '7.11vw', width: '3.79vw' },
      { src: 'christmas_tree.svg', bottom: '4.11vh', left: '2.94vw', width: '16.55vw' },
      { src: 'champagne.svg', bottom: '4.72vh', right: '1.68vw', width: '17.55vw' },
      { src: 'bottom_tree.svg', bottom: '3.96vh', left: '39.37vw', width: '21.21vw' },
    ],
  },
  valentines: {
    label: "Valentine's",
    titleSpark: {
      left: { src: 'spark_left.svg', width: '6.6vw' },
      right: { src: 'spark_right.svg', width: '6.6vw' },
    },
    doodles: [
      { src: 'top_heart.svg', top: '6.74vh', left: '2.86vw', width: '14.22vw' },
      { src: 'gift.svg', top: '5.15vh', right: '3.2vw', width: '21.26vw' },
      { src: 'sparkles_left.svg', top: '45.14vh', left: '7.97vw', width: '2.66vw' },
      { src: 'sparkles_right.svg', top: '45.14vh', right: '8.44vw', width: '2.66vw' },
      { src: 'roses.svg', bottom: '6.17vh', left: '2.2vw', width: '16.98vw' },
      { src: 'cupcake.svg', bottom: '4.51vh', right: '2.27vw', width: '17.85vw' },
      { src: 'bottom_heart.svg', bottom: '6.11vh', left: '40.12vw', width: '19.73vw' },
    ],
  },
  'st-pattys': {
    label: "St. Patty's",
    titleSpark: {
      left: { src: 'spark_left.svg', width: '6.6vw' },
      right: { src: 'spark_right.svg', width: '6.6vw' },
    },
    doodles: [
      { src: 'hat.svg', top: '3.75vh', left: '2.42vw', width: '17.03vw' },
      { src: 'clover.svg', top: '5.97vh', right: '2.5vw', width: '13.36vw' },
      { src: 'sparkles_left.svg', top: '44.03vh', left: '9.3vw', width: '3.48vw' },
      { src: 'sparkles_right.svg', top: '44.73vh', right: '7.5vw', width: '3.36vw' },
      { src: 'gold.svg', bottom: '7.93vh', left: '1.22vw', width: '18.89vw' },
      { src: 'clovers.svg', bottom: '5.56vh', right: '2.46vw', width: '13.32vw' },
      { src: 'bottom_clover.svg', bottom: '5.28vh', left: '40.19vw', width: '19.58vw' },
    ],
  },
  usa: {
    label: 'USA',
    titleSpark: {
      left: { src: 'spark_left.svg', width: '6.6vw' },
      right: { src: 'spark_right.svg', width: '6.6vw' },
    },
    doodles: [
      { src: 'flag.svg', top: '2.64vh', left: '0.1vw', width: '20.05vw' },
      { src: 'firework.svg', top: '3.96vh', right: '1.72vw', width: '22.28vw' },
      { src: 'sparkles_left.svg', top: '34.63vh', left: '4.89vw', width: '8.21vw' },
      { src: 'sparkles_right.svg', top: '43.48vh', right: '7.58vw', width: '2.96vw' },
      { src: 'grill.svg', bottom: '7.01vh', left: '2.7vw', width: '14.88vw' },
      { src: 'poppies.svg', bottom: '4.86vh', right: '3.75vw', width: '12.34vw' },
      { src: 'bottom_star.svg', bottom: '5.28vh', left: '40.19vw', width: '19.57vw' },
    ],
  },
  'mothers-day': {
    label: "Mother's Day",
    titleSpark: {
      left: { src: 'spark_left.svg', width: '6.6vw' },
      right: { src: 'spark_right.svg', width: '6.6vw' },
    },
    doodles: [
      { src: 'top_heart.svg', top: '6.67vh', left: '2.82vw', width: '14.29vw' },
      { src: 'heart_coffee.svg', top: '3.78vh', right: '0.89vw', width: '24.72vw' },
      { src: 'sparkles_left.svg', top: '34.74vh', left: '6.96vw', width: '3.66vw' },
      { src: 'sparkles_right.svg', top: '34.52vh', right: '6.61vw', width: '7.89vw' },
      { src: 'roses.svg', bottom: '7.91vh', left: '2.16vw', width: '17.02vw' },
      { src: 'tulips.svg', bottom: '3.05vh', right: '1.36vw', width: '18.25vw' },
      { src: 'bottom_heart.svg', bottom: '6.11vh', left: '40.12vw', width: '19.73vw' },
    ],
  },
  'fathers-day': {
    label: "Father's Day",
    titleSpark: {
      left: { src: 'spark_left.svg', width: '6.6vw' },
      right: { src: 'spark_right.svg', width: '6.6vw' },
    },
    doodles: [
      { src: 'hat.svg', top: '7.36vh', left: '1.95vw', width: '17.7vw' },
      { src: 'mustache.svg', top: '2.72vh', right: '0.59vw', width: '24.56vw' },
      { src: 'sparkles_left.svg', top: '40.97vh', left: '9.3vw', width: '2.89vw' },
      { src: 'sparkles_right.svg', top: '40.97vh', right: '9.02vw', width: '2.93vw' },
      { src: 'utensils.svg', bottom: '7.29vh', left: '2.38vw', width: '18.99vw' },
      { src: 'beer.svg', bottom: '7.22vh', right: '3.36vw', width: '16.06vw' },
      { src: 'bottom_star.svg', bottom: '6.04vh', left: '40.08vw', width: '19.57vw' },
    ],
  },
}

export const DEFAULT_THEME = 'og'

export function themeDoodleSrc(themeId, filename) {
  return `/themes/${themeId}/doodles/${filename}`
}
