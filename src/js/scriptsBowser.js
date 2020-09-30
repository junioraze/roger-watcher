/* global jQuery: false, window: false, document: false, chrome: false */
const RW = {
  panel: jQuery('#panel'),
  busca: jQuery('#busca'),
  info: {
    name: 'Dev',
    version: 'X.X.X'
  },
  util: {
    sub: () => {}
  },
  clear() {
    jQuery('.track').remove();
    this.busca.val('');
  }
};