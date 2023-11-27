import { toRef, shallowRef, computed, createVNode, useSSRContext, resolveComponent, mergeProps, withCtx, createTextVNode, renderSlot, openBlock, createBlock, Fragment, renderList, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { p as propsFactory, m as makeThemeProps, g as genericComponent, h as provideTheme, d as convertToUnit, _ as _export_sfc } from '../server.mjs';
import { t as makeBorderProps, b as makeElevationProps, e as makeRoundedProps, C as useBackgroundColor, y as useBorder, i as useElevation, l as useRounded, V as VBtn } from './VBtn-3a93cc12.mjs';
import { m as makeComponentProps, a as makeTagProps, b as useResizeObserver, u as useRender } from './tag-a1f3d414.mjs';
import { m as makeLayoutItemProps, u as useLayoutItem, a as makeLayoutProps, c as createLayout, V as VMain } from './VMain-dd97db66.mjs';
import { c as createSimpleFunctional } from './VImg-b87ba832.mjs';
import { V as VAppBar, a as VAppBarTitle, b as VContainer } from './VAppBarTitle-1de5ae51.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'sequelize';
import 'jsonwebtoken';
import 'dotenv';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'pinia-plugin-persistedstate';
import './ssrBoot-49241434.mjs';
import './index-da71ab58.mjs';

const VSpacer = createSimpleFunctional("v-spacer", "div", "VSpacer");
const makeVFooterProps = propsFactory({
  app: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: "auto"
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "footer"
  }),
  ...makeThemeProps()
}, "VFooter");
const VFooter = genericComponent()({
  name: "VFooter",
  props: makeVFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const autoHeight = shallowRef(32);
    const {
      resizeRef
    } = useResizeObserver();
    const height = computed(() => props.height === "auto" ? autoHeight.value : parseInt(props.height, 10));
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: computed(() => "bottom"),
      layoutSize: height,
      elementSize: computed(() => props.height === "auto" ? void 0 : height.value),
      active: computed(() => props.app),
      absolute: toRef(props, "absolute")
    });
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": ["v-footer", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, props.class],
      "style": [backgroundColorStyles.value, props.app ? layoutItemStyles.value : {
        height: convertToUnit(props.height)
      }, props.style]
    }, slots));
    return {};
  }
});
const _sfc_main$1 = {
  data: () => ({
    icons: [
      "mdi-facebook",
      "mdi-twitter",
      "mdi-linkedin",
      "mdi-instagram"
    ]
  })
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent(VFooter, mergeProps({ class: "d-flex flex-column" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="d-flex w-100 align-center px-4"${_scopeId}><strong${_scopeId}>Ainda em constru\xE7\xE3o!</strong>`);
        _push2(ssrRenderComponent(VSpacer, null, null, _parent2, _scopeId));
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.icons, (icon) => {
          _push2(ssrRenderComponent(VBtn, {
            key: icon,
            class: "mx-4",
            icon,
            variant: "plain",
            size: "small"
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]--></div><div class="px-4 py-2 text-center w-100"${_scopeId}>${ssrInterpolate(( new Date()).getFullYear())} \u2014 <strong${_scopeId}>Almox\xAE</strong></div>`);
      } else {
        return [
          createVNode("div", { class: "d-flex w-100 align-center px-4" }, [
            createVNode("strong", null, "Ainda em constru\xE7\xE3o!"),
            createVNode(VSpacer),
            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.icons, (icon) => {
              return openBlock(), createBlock(VBtn, {
                key: icon,
                class: "mx-4",
                icon,
                variant: "plain",
                size: "small"
              }, null, 8, ["icon"]);
            }), 128))
          ]),
          createVNode("div", { class: "px-4 py-2 text-center w-100" }, [
            createTextVNode(toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " \u2014 ", 1),
            createVNode("strong", null, "Almox\xAE")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer/default.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  components: {
    Footer
  }
};
const makeVLayoutProps = propsFactory({
  ...makeComponentProps(),
  ...makeLayoutProps()
}, "VLayout");
const VLayout = genericComponent()({
  name: "VLayout",
  props: makeVLayoutProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      layoutClasses,
      layoutStyles,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    useRender(() => {
      var _a;
      return createVNode("div", {
        "ref": layoutRef,
        "class": [layoutClasses.value, props.class],
        "style": [layoutStyles.value, props.style]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    });
    return {
      getLayoutItem,
      items
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Footer = resolveComponent("Footer");
  _push(ssrRenderComponent(VLayout, mergeProps({ style: { "background-color": "#f5f5f7" } }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VAppBar, {
          color: "primary",
          density: "compact"
        }, {
          prepend: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3)
              ;
            else {
              return [];
            }
          }),
          append: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VBtn, {
                router: "",
                to: "/",
                variant: "flat"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Home `);
                  } else {
                    return [
                      createTextVNode(" Home ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VBtn, {
                router: "",
                to: "/sign-in",
                variant: "flat",
                class: "ml-2"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Entrar `);
                  } else {
                    return [
                      createTextVNode(" Entrar ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VBtn, {
                  router: "",
                  to: "/",
                  variant: "flat"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Home ")
                  ]),
                  _: 1
                }),
                createVNode(VBtn, {
                  router: "",
                  to: "/sign-in",
                  variant: "flat",
                  class: "ml-2"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Entrar ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VAppBarTitle, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Almox UniCeub\xAE`);
                  } else {
                    return [
                      createTextVNode("Almox UniCeub\xAE")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VAppBarTitle, null, {
                  default: withCtx(() => [
                    createTextVNode("Almox UniCeub\xAE")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VMain, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VContainer, { fluid: "" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default")
                    ];
                  }
                }),
                _: 3
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_Footer, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VContainer, { fluid: "" }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                }),
                createVNode(_component_Footer)
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VAppBar, {
            color: "primary",
            density: "compact"
          }, {
            prepend: withCtx(() => []),
            append: withCtx(() => [
              createVNode(VBtn, {
                router: "",
                to: "/",
                variant: "flat"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Home ")
                ]),
                _: 1
              }),
              createVNode(VBtn, {
                router: "",
                to: "/sign-in",
                variant: "flat",
                class: "ml-2"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Entrar ")
                ]),
                _: 1
              })
            ]),
            default: withCtx(() => [
              createVNode(VAppBarTitle, null, {
                default: withCtx(() => [
                  createTextVNode("Almox UniCeub\xAE")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VMain, null, {
            default: withCtx(() => [
              createVNode(VContainer, { fluid: "" }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }),
              createVNode(_component_Footer)
            ]),
            _: 3
          })
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-f3c82b62.mjs.map
