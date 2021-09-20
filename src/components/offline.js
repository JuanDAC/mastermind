/**
 * application off line mode.
 */

/** Data imports . */
import { COLORS } from '../data/statics.js';

let code = [], numberGeems = 4;

/**
 * Class representing a Offline.
 */
export class Offline {

  /** set number gems of local */
  static setNumberGems(number) {
    numberGeems = number;
  }

  /** get indexes of select colors */
  static indexes() {
    return Array(COLORS.length).fill().map((_, index) => index);
  }

  /** get indexes of select colors */
  static use_colors(indexes) {
    const use_colors = [];
    Array(numberGeems).fill().forEach(() => {
      const index = Math.floor(Math.random() * indexes.length);
      use_colors.push(indexes.splice(index, 1).pop());
    });
    return use_colors;
  }

  /**
   * Set array of code private
   * @param { [ number ] } use_colors - The colors to used
   */
  static setCode(use_colors) {
    code = [];
    Array(numberGeems).fill().forEach(() => {
      const index = Math.floor(Math.random() * use_colors.length);
      code.push(use_colors.slice(index, index + 1).pop());
    });
  }

  /**
   * Get array of code private
   */
  static getCode() {
    return code;
  }
}
