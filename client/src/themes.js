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
//
// Order here is what the edit page's theme picker shows, left to right:
// Original first, then the rest in calendar order through the year
// (usa stands in for both Memorial Day and the Fourth of July, placed by
// the earlier of the two).
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
      /* left is set so the ink (accounting for this file's asymmetric
         padding) is centered horizontally at 50% screen width. */
      { src: 'bottom-heart.svg', bottom: '7.55vh', left: '37.91vw', width: '23.5vw' },
    ],
  },

  valentines: {
    label: "Valentine's",
    titleSpark: {
      left: { src: 'spark_left.svg', width: '6.6vw' },
      right: { src: 'spark_right.svg', width: '6.6vw' },
    },
    doodles: [
      { src: 'top_heart.svg', top: '6.74vh', left: '2.86vw', width: '9.67vw' },
      /* gift.svg is a bit wider/shorter (aspect-wise) than top_heart.svg, so
         matching width alone left it oversized. Sized here so its visible
         artwork spans the same vertical range as top_heart's, mirrored. */
      { src: 'gift.svg', top: '6.56vh', right: '3.09vw', width: '11.31vw' },
      { src: 'sparkles_left.svg', top: '45.14vh', left: '7.97vw', width: '2.66vw' },
      { src: 'sparkles_right.svg', top: '45.14vh', right: '8.44vw', width: '2.66vw' },
      { src: 'roses.svg', bottom: '6.17vh', left: '2.2vw', width: '13.58vw' },
      { src: 'cupcake.svg', bottom: '4.51vh', right: '2.27vw', width: '14.28vw' },
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
      { src: 'hat.svg', top: '3.75vh', left: '2.42vw', width: '11.58vw' },
      { src: 'clover.svg', top: '5.97vh', right: '2.5vw', width: '9.09vw' },
      { src: 'sparkles_left.svg', top: '44.03vh', left: '9.3vw', width: '3.48vw' },
      { src: 'sparkles_right.svg', top: '44.73vh', right: '7.5vw', width: '3.36vw' },
      { src: 'gold.svg', bottom: '7.93vh', left: '1.22vw', width: '15.11vw' },
      { src: 'clovers.svg', bottom: '5.56vh', right: '2.46vw', width: '10.66vw' },
      { src: 'bottom_clover.svg', bottom: '5.28vh', left: '40.19vw', width: '19.58vw' },
    ],
  },

  'mothers-day': {
    label: "Mother's Day",
    titleSpark: {
      left: { src: 'spark_left.svg', width: '6.6vw' },
      right: { src: 'spark_right.svg', width: '6.6vw' },
    },
    doodles: [
      { src: 'top_heart.svg', top: '6.67vh', left: '2.82vw', width: '9.72vw' },
      /* heart_coffee.svg is wider/shorter (aspect-wise) than top_heart.svg,
         so matching width alone left it oversized. Sized here so its
         visible artwork spans the same vertical range as top_heart's,
         mirrored. */
      { src: 'heart_coffee.svg', top: '6.68vh', right: '2.39vw', width: '12.39vw' },
      /* sparkles_left/right are near-identical mirror-image files; both
         sized/positioned to match sparkles_left, and centered at 50%
         screen height. */
      { src: 'sparkles_left.svg', top: '44.16vh', left: '6.96vw', width: '3.66vw' },
      { src: 'sparkles_right.svg', top: '44.16vh', right: '6.96vw', width: '3.66vw' },
      { src: 'roses.svg', bottom: '7.91vh', left: '2.16vw', width: '13.62vw' },
      { src: 'tulips.svg', bottom: '3.05vh', right: '1.36vw', width: '14.6vw' },
      { src: 'bottom_heart.svg', bottom: '6.11vh', left: '40.12vw', width: '19.73vw' },
    ],
  },

  usa: {
    label: 'USA',
    titleSpark: {
      left: { src: 'spark_left.svg', width: '6.6vw' },
      right: { src: 'spark_right.svg', width: '6.6vw' },
    },
    doodles: [
      { src: 'flag.svg', top: '2.64vh', left: '0.1vw', width: '12.83vw' },
      /* Sized so its visible artwork spans the same vertical range as
         flag's, mirrored (their aspect ratios differ enough that matching
         width alone left it oversized). */
      { src: 'firework.svg', top: '3.19vh', right: '2.19vw', width: '12.86vw' },
      /* sparkles_left/right are near-identical mirror-image files; both
         sized/positioned to match, and centered at 50% screen height. */
      { src: 'sparkles_left.svg', top: '45.35vh', left: '7.58vw', width: '2.96vw' },
      { src: 'sparkles_right.svg', top: '45.35vh', right: '7.58vw', width: '2.96vw' },
      { src: 'grill.svg', bottom: '7.01vh', left: '2.7vw', width: '11.9vw' },
      { src: 'poppies.svg', bottom: '4.86vh', right: '3.75vw', width: '9.87vw' },
      { src: 'bottom_star.svg', bottom: '5.28vh', left: '40.19vw', width: '19.57vw' },
    ],
  },

  'fathers-day': {
    label: "Father's Day",
    titleSpark: {
      left: { src: 'spark_left.svg', width: '6.6vw' },
      right: { src: 'spark_right.svg', width: '6.6vw' },
    },
    doodles: [
      { src: 'hat.svg', top: '7.36vh', left: '1.95vw', width: '12.04vw' },
      /* mustache.svg is taller/narrower (aspect-wise) than hat.svg and has
         more internal padding, so matching width alone left it oversized.
         Sized here so its visible artwork spans the same vertical range as
         hat's, mirrored. */
      { src: 'mustache.svg', top: '2vh', right: '3.36vw', width: '12.31vw' },
      { src: 'sparkles_left.svg', top: '40.97vh', left: '9.3vw', width: '2.89vw' },
      { src: 'sparkles_right.svg', top: '40.97vh', right: '9.02vw', width: '2.93vw' },
      { src: 'utensils.svg', bottom: '7.29vh', left: '2.38vw', width: '15.19vw' },
      { src: 'beer.svg', bottom: '7.22vh', right: '3.36vw', width: '12.85vw' },
      { src: 'bottom_star.svg', bottom: '6.04vh', left: '40.08vw', width: '19.57vw' },
    ],
  },

  halloween: {
    label: 'Halloween',
    titleSpark: {
      left: { src: 'spark_left.svg', width: '6.27vw' },
      right: { src: 'spark_right.svg', width: '6.27vw' },
    },
    doodles: [
      { src: 'jack_o_lantern.svg', top: '6.01vh', left: '2.05vw', width: '13.28vw' },
      /* Mirrors jack_o_lantern's size/offset onto the right side. */
      { src: 'bat.svg', top: '6.01vh', right: '2.05vw', width: '13.28vw' },
      { src: 'halloween_sparkles_left.svg', top: '40.35vh', left: '5.98vw', width: '7.06vw' },
      /* Mirrors halloween_sparkles_left's size/offset onto the right side. */
      { src: 'halloween_sparkles_right.svg', top: '40.35vh', right: '5.98vw', width: '7.06vw' },
      { src: 'witches_hat.svg', bottom: '2.86vh', left: '2.27vw', width: '18.02vw' },
      { src: 'cauldron.svg', bottom: '2.86vh', right: '1.3vw', width: '15.88vw' },
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
      /* leaves.svg has a taller/narrower aspect ratio than turkey.svg, so
         matching width alone (like the other mirrored pairs) left its box
         taller than turkey's and crowded the sparkles below it. Sized here
         so its visible artwork spans the same vertical range as turkey's,
         mirrored, instead of just matching the box width. */
      { src: 'leaves.svg', top: '4.54vh', right: '1.85vw', width: '13.22vw' },
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
      /* Mirrors mistletoe's size/offset onto the right side. */
      { src: 'jingle_bells.svg', top: '5.99vh', right: '3.09vw', width: '14.72vw' },
      /* Mirrors sparkles_right's size/offset onto the left side (the two
         files are pixel-identical, so a straight mirror lines up exactly).
         top is set so the ink (this file has no internal padding) is
         centered at 50% screen height. */
      { src: 'sparkles_left.svg', top: '45.09vh', left: '7.11vw', width: '3.79vw' },
      { src: 'sparkles_right.svg', top: '45.09vh', right: '7.11vw', width: '3.79vw' },
      { src: 'christmas_tree.svg', bottom: '4.11vh', left: '2.94vw', width: '16.55vw' },
      { src: 'champagne.svg', bottom: '4.72vh', right: '1.68vw', width: '17.55vw' },
      { src: 'bottom_tree.svg', bottom: '3.96vh', left: '39.37vw', width: '21.21vw' },
    ],
  },
}

export const DEFAULT_THEME = 'og'

export function themeDoodleSrc(themeId, filename) {
  return `/themes/${themeId}/doodles/${filename}`
}
