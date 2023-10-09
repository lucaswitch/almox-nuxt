import { p as propsFactory, B as getCurrentInstance } from '../server.mjs';
import { ref, readonly } from 'vue';

const makeComponentProps = propsFactory({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component");
function useRender(render) {
  const vm = getCurrentInstance("useRender");
  vm.render = render;
}
function useResizeObserver(callback) {
  const resizeRef = ref();
  const contentRect = ref();
  return {
    resizeRef,
    contentRect: readonly(contentRect)
  };
}
const makeTagProps = propsFactory({
  tag: {
    type: String,
    default: "div"
  }
}, "tag");

export { makeTagProps as a, useResizeObserver as b, makeComponentProps as m, useRender as u };
//# sourceMappingURL=tag-9d57e468.mjs.map
