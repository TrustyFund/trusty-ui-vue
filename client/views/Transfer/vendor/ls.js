// Localstorage
/*eslint-disable */
/*Work in process*/
import ls, { ls_key_exists } from './impl';

if (ls === null) throw "localStorage is required but isn't available on this platform";

const localStorage = (key) => {

  const STORAGE_KEY = key;
  return {
    get(key, dv = {}) {
      let rv;
      try {
        if (ls_key_exists(STORAGE_KEY + key, ls)) {
          rv = JSON.parse(ls.getItem(STORAGE_KEY + key));
        }
        return rv || dv;
      } catch (err) {
        return dv;
      }
    },
    set(key, object) {
      if (object && object.toJS) {
        object = object.toJS();
      }
      ls.setItem(STORAGE_KEY + key, JSON.stringify(object));
    },
    remove(key) {
      ls.removeItem(STORAGE_KEY + key);
    },

    has(key) {
      return ls_key_exists(STORAGE_KEY + key, ls);
    }
  };
};
export default localStorage;
/*eslint-disable */

