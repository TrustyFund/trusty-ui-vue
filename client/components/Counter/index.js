import style from './style.css'
import * as types from 'root/store/mutations'
import * as user from 'root/services/text'

export default {
  methods: {
    increment() {
      this.$store.dispatch('getUser','anlopan364test2')
      this.$store.commit(types.INCREMENT_COUNTER)
    },
    decrement() {
      this.$store.commit(types.DECREMENT_COUNTER)
    },
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
    }
  },
  mounted(){
    
  },
  render(h) {
    return (
      <div class="counter-wrapper">
        <div class={style.counter}>
          {this.$store.state.counter.count}
        </div>
        <button on-click={this.increment}>Increment</button>
        <button on-click={this.decrement}>Decrement</button>
        <button on-click={this.incrementAsync}>Increment Async</button>
      </div>
    )
  }
}
