import { createVNode } from 'vue';
import { m as makeComponentProps, u as useRender } from './tag-a1f3d414.mjs';
import { a as makeLayoutProps, c as createLayout } from './VMain-dd97db66.mjs';
import { p as propsFactory, m as makeThemeProps, g as genericComponent, h as provideTheme, H as useRtl } from '../server.mjs';

const makeVAppProps = propsFactory({
  ...makeComponentProps(),
  ...makeLayoutProps({
    fullHeight: true
  }),
  ...makeThemeProps()
}, "VApp");
const VApp = genericComponent()({
  name: "VApp",
  props: makeVAppProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme = provideTheme(props);
    const {
      layoutClasses,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    const {
      rtlClasses
    } = useRtl();
    useRender(() => {
      var _a;
      return createVNode("div", {
        "ref": layoutRef,
        "class": ["v-application", theme.themeClasses.value, layoutClasses.value, rtlClasses.value, props.class],
        "style": [props.style]
      }, [createVNode("div", {
        "class": "v-application__wrap"
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    });
    return {
      getLayoutItem,
      items,
      theme
    };
  }
});

export { VApp as V };
//# sourceMappingURL=VApp-b6d866d8.mjs.map
