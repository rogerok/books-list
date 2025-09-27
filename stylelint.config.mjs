/** @type {import("stylelint").Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
    'stylelint-config-prettier-scss',
  ],
  rules: {
    'custom-property-empty-line-before': null,
    'selector-class-pattern': [''],
  },
};
