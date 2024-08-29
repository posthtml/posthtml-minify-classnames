type MinifyOptions = {
  /**
  * Regular expression used to exclude names from processing.
  * 
  * @default /^.js-/
  */
  filter?: RegExp;

  /**
   * The name generator to use for classes and IDs.
   * 
   * Possible values:
   * - `'genName'` - generates the smallest possible names
   * - `'genNameEmoji'` - generates small emoji based names
   * - `'genNameEmojiString'` - generates random emoji with 3 emojis in each
   * - `false` - preserves names, use this to ignore ids or classes
   * 
   * @default 'genName'
   */
  genNameClass?: string | boolean;

  /**
   * The name generator to use for classes and IDs.
   * 
   * Possible values:
   * - `'genName'` - generates the smallest possible names
   * - `'genNameEmoji'` - generates small emoji based names
   * - `'genNameEmojiString'` - generates random emoji with 3 emojis in each
   * - `false` - preserves names, use this to ignore ids or classes
   * 
   * @default 'genName'
   */
  genNameId?: string | boolean;

  /**
   * Array of strings containing custom attribute names that will have their values minified.
   * 
   * @default []
   */
  customAttributes?: string[];

  /**
   * Whether to remove classes, attributes and other identifiers from the HTML 
   * that are not defined in the CSS.
   * 
   * @default true
   */
  removeUnused?: boolean;
};

export type { MinifyOptions };
