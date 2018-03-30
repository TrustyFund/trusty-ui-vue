import { alert } from 'notie';
import 'notie/dist/notie.min.css';

export default {
  error(text) {
    this.alert('error', text);
  },
  warning(text) {
    this.alert('warning', text);
  },
  success(text) {
    this.alert('success', text);
  },
  alert(type, text) {
    alert({ type, text, position: 'bottom' });
  }
};
