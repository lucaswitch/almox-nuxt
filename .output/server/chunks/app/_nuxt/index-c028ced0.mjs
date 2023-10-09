import { toRef, computed, shallowRef, ref, watch, createVNode, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { p as propsFactory, m as makeThemeProps, g as genericComponent, v as provideTheme, F as useRtl, q as provideDefaults, I as IconValue, _ as _export_sfc, b as convertToUnit } from '../server.mjs';
import { e as makeBorderProps, w as makeDimensionProps, f as makeElevationProps, A as makeLocationProps, B as makePositionProps, h as makeRoundedProps, x as useBackgroundColor, k as useBorder, y as useDimension, o as useElevation, C as useLocation, D as usePosition, p as useRounded, m as makeDensityProps, n as useDensity, j as makeSizeProps, q as useSize, b as VIcon, v as VDefaultsProvider, V as VBtn } from './VBtn-9e8625fe.mjs';
import { m as makeComponentProps, a as makeTagProps, u as useRender } from './tag-9d57e468.mjs';
import { V as VDivider } from './VDivider-514e9157.mjs';
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

const makeVSheetProps = propsFactory({
  color: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VSheet");
const VSheet = genericComponent()({
  name: "VSheet",
  props: makeVSheetProps(),
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
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-sheet", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, props.class],
      "style": [backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, props.style]
    }, slots));
    return {};
  }
});
const makeVTimelineProps = propsFactory({
  align: {
    type: String,
    default: "center",
    validator: (v) => ["center", "start"].includes(v)
  },
  direction: {
    type: String,
    default: "vertical",
    validator: (v) => ["vertical", "horizontal"].includes(v)
  },
  justify: {
    type: String,
    default: "auto",
    validator: (v) => ["auto", "center"].includes(v)
  },
  side: {
    type: String,
    validator: (v) => v == null || ["start", "end"].includes(v)
  },
  lineInset: {
    type: [String, Number],
    default: 0
  },
  lineThickness: {
    type: [String, Number],
    default: 2
  },
  lineColor: String,
  truncateLine: {
    type: String,
    validator: (v) => ["start", "end", "both"].includes(v)
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VTimeline");
const VTimeline = genericComponent()({
  name: "VTimeline",
  props: makeVTimelineProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      rtlClasses
    } = useRtl();
    provideDefaults({
      VTimelineDivider: {
        lineColor: toRef(props, "lineColor")
      },
      VTimelineItem: {
        density: toRef(props, "density"),
        lineInset: toRef(props, "lineInset")
      }
    });
    const sideClasses = computed(() => {
      const side = props.side ? props.side : props.density !== "default" ? "end" : null;
      return side && `v-timeline--side-${side}`;
    });
    const truncateClasses = computed(() => {
      const classes = ["v-timeline--truncate-line-start", "v-timeline--truncate-line-end"];
      switch (props.truncateLine) {
        case "both":
          return classes;
        case "start":
          return classes[0];
        case "end":
          return classes[1];
        default:
          return null;
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-timeline", `v-timeline--${props.direction}`, `v-timeline--align-${props.align}`, `v-timeline--justify-${props.justify}`, truncateClasses.value, {
        "v-timeline--inset-line": !!props.lineInset
      }, themeClasses.value, densityClasses.value, sideClasses.value, rtlClasses.value, props.class],
      "style": [{
        "--v-timeline-line-thickness": convertToUnit(props.lineThickness)
      }, props.style]
    }, slots));
    return {};
  }
});
const makeVTimelineDividerProps = propsFactory({
  dotColor: String,
  fillDot: Boolean,
  hideDot: Boolean,
  icon: IconValue,
  iconColor: String,
  lineColor: String,
  ...makeComponentProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeElevationProps()
}, "VTimelineDivider");
const VTimelineDivider = genericComponent()({
  name: "VTimelineDivider",
  props: makeVTimelineDividerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props, "v-timeline-divider__dot");
    const {
      backgroundColorStyles,
      backgroundColorClasses
    } = useBackgroundColor(toRef(props, "dotColor"));
    const {
      roundedClasses
    } = useRounded(props, "v-timeline-divider__dot");
    const {
      elevationClasses
    } = useElevation(props);
    const {
      backgroundColorClasses: lineColorClasses,
      backgroundColorStyles: lineColorStyles
    } = useBackgroundColor(toRef(props, "lineColor"));
    useRender(() => createVNode("div", {
      "class": ["v-timeline-divider", {
        "v-timeline-divider--fill-dot": props.fillDot
      }, props.class],
      "style": props.style
    }, [createVNode("div", {
      "class": ["v-timeline-divider__before", lineColorClasses.value],
      "style": lineColorStyles.value
    }, null), !props.hideDot && createVNode("div", {
      "key": "dot",
      "class": ["v-timeline-divider__dot", elevationClasses.value, roundedClasses.value, sizeClasses.value],
      "style": sizeStyles.value
    }, [createVNode("div", {
      "class": ["v-timeline-divider__inner-dot", backgroundColorClasses.value, roundedClasses.value],
      "style": backgroundColorStyles.value
    }, [!slots.default ? createVNode(VIcon, {
      "key": "icon",
      "color": props.iconColor,
      "icon": props.icon,
      "size": props.size
    }, null) : createVNode(VDefaultsProvider, {
      "key": "icon-defaults",
      "disabled": !props.icon,
      "defaults": {
        VIcon: {
          color: props.iconColor,
          icon: props.icon,
          size: props.size
        }
      }
    }, slots.default)])]), createVNode("div", {
      "class": ["v-timeline-divider__after", lineColorClasses.value],
      "style": lineColorStyles.value
    }, null)]));
    return {};
  }
});
const makeVTimelineItemProps = propsFactory({
  density: String,
  dotColor: String,
  fillDot: Boolean,
  hideDot: Boolean,
  hideOpposite: {
    type: Boolean,
    default: void 0
  },
  icon: IconValue,
  iconColor: String,
  lineInset: [Number, String],
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps()
}, "VTimelineItem");
const VTimelineItem = genericComponent()({
  name: "VTimelineItem",
  props: makeVTimelineItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const dotSize = shallowRef(0);
    const dotRef = ref();
    watch(dotRef, (newValue) => {
      var _a2;
      var _a;
      if (!newValue)
        return;
      dotSize.value = (_a2 = (_a = newValue.$el.querySelector(".v-timeline-divider__dot")) == null ? void 0 : _a.getBoundingClientRect().width) != null ? _a2 : 0;
    }, {
      flush: "post"
    });
    useRender(() => {
      var _a, _b;
      return createVNode("div", {
        "class": ["v-timeline-item", {
          "v-timeline-item--fill-dot": props.fillDot
        }, props.class],
        "style": [{
          "--v-timeline-dot-size": convertToUnit(dotSize.value),
          "--v-timeline-line-inset": props.lineInset ? `calc(var(--v-timeline-dot-size) / 2 + ${convertToUnit(props.lineInset)})` : convertToUnit(0)
        }, props.style]
      }, [createVNode("div", {
        "class": "v-timeline-item__body",
        "style": dimensionStyles.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), createVNode(VTimelineDivider, {
        "ref": dotRef,
        "hideDot": props.hideDot,
        "icon": props.icon,
        "iconColor": props.iconColor,
        "size": props.size,
        "elevation": props.elevation,
        "dotColor": props.dotColor,
        "fillDot": props.fillDot,
        "rounded": props.rounded
      }, {
        default: slots.icon
      }), props.density !== "compact" && createVNode("div", {
        "class": "v-timeline-item__opposite"
      }, [!props.hideOpposite && ((_b = slots.opposite) == null ? void 0 : _b.call(slots))])]);
    });
    return {};
  }
});
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[-->`);
  _push(ssrRenderComponent(VSheet, {
    elevation: "1",
    "max-width": "600",
    rounded: "lg",
    width: "100%",
    class: "pa-4 text-center mx-auto"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VIcon, {
          class: "mb-5",
          icon: "mdi-handshake-outline",
          size: "112"
        }, null, _parent2, _scopeId));
        _push2(`<h2 class="text-h5 mb-6"${_scopeId}>Bem vindo ao Almox\xAE</h2><p class="mb-4 text-medium-emphasis text-body-2"${_scopeId}> Busca tornar a gest\xE3o de laborat\xF3rios acad\xEAmicos um pouco mais eficiente, com foco especial no controle rigoroso das entradas e sa\xEDdas de materiais. Essa abordagem visa aprimorar a organiza\xE7\xE3o e a efic\xE1cia no gerenciamento de recursos, assegurando que os insumos necess\xE1rios estejam sempre dispon\xEDveis quando necess\xE1rio, ao mesmo tempo em que se evita o desperd\xEDcio e o extravio de materiais valiosos. </p>`);
        _push2(ssrRenderComponent(VDivider, { class: "mb-4" }, null, _parent2, _scopeId));
        _push2(`<div class="text-end"${_scopeId}>`);
        _push2(ssrRenderComponent(VBtn, {
          class: "text-none",
          rounded: "",
          variant: "flat",
          width: "90",
          to: "/sign-in"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Entrar `);
            } else {
              return [
                createTextVNode(" Entrar ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode(VIcon, {
            class: "mb-5",
            icon: "mdi-handshake-outline",
            size: "112"
          }),
          createVNode("h2", { class: "text-h5 mb-6" }, "Bem vindo ao Almox\xAE"),
          createVNode("p", { class: "mb-4 text-medium-emphasis text-body-2" }, " Busca tornar a gest\xE3o de laborat\xF3rios acad\xEAmicos um pouco mais eficiente, com foco especial no controle rigoroso das entradas e sa\xEDdas de materiais. Essa abordagem visa aprimorar a organiza\xE7\xE3o e a efic\xE1cia no gerenciamento de recursos, assegurando que os insumos necess\xE1rios estejam sempre dispon\xEDveis quando necess\xE1rio, ao mesmo tempo em que se evita o desperd\xEDcio e o extravio de materiais valiosos. "),
          createVNode(VDivider, { class: "mb-4" }),
          createVNode("div", { class: "text-end" }, [
            createVNode(VBtn, {
              class: "text-none",
              rounded: "",
              variant: "flat",
              width: "90",
              to: "/sign-in"
            }, {
              default: withCtx(() => [
                createTextVNode(" Entrar ")
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(VTimeline, { align: "start" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VTimelineItem, { "dot-color": "teal-lighten-3" }, {
          opposite: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Roadmap de constru\xE7\xE3o `);
            } else {
              return [
                createTextVNode(" Roadmap de constru\xE7\xE3o ")
              ];
            }
          }),
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div${_scopeId2}><div class="text-h6"${_scopeId2}>Login</div><p${_scopeId2}> Implementar login de usu\xE1rios &quot;Admin&quot; e Professor. </p></div>`);
            } else {
              return [
                createVNode("div", null, [
                  createVNode("div", { class: "text-h6" }, "Login"),
                  createVNode("p", null, ' Implementar login de usu\xE1rios "Admin" e Professor. ')
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VTimelineItem, { "dot-color": "teal-lighten-3" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="text-h6"${_scopeId2}>Materiais</div><p${_scopeId2}> Ainda n\xE3o totalmente suportado. </p>`);
            } else {
              return [
                createVNode("div", { class: "text-h6" }, "Materiais"),
                createVNode("p", null, " Ainda n\xE3o totalmente suportado. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VTimelineItem, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="text-h6"${_scopeId2}>Cadastro de laborat\xF3rios</div><p${_scopeId2}> Ainda n\xE3o totalmente suportado. </p>`);
            } else {
              return [
                createVNode("div", { class: "text-h6" }, "Cadastro de laborat\xF3rios"),
                createVNode("p", null, " Ainda n\xE3o totalmente suportado. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VTimelineItem, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="text-h6"${_scopeId2}>Reserva de laborat\xF3rios</div><p${_scopeId2}> Ainda n\xE3o totalmente suportado. </p>`);
            } else {
              return [
                createVNode("div", { class: "text-h6" }, "Reserva de laborat\xF3rios"),
                createVNode("p", null, " Ainda n\xE3o totalmente suportado. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VTimelineItem, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="text-h6"${_scopeId2}>Devolu\xE7\xE3o de materiais de reserva</div><p${_scopeId2}> Ainda n\xE3o totalmente suportado. </p>`);
            } else {
              return [
                createVNode("div", { class: "text-h6" }, "Devolu\xE7\xE3o de materiais de reserva"),
                createVNode("p", null, " Ainda n\xE3o totalmente suportado. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VTimelineItem, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="text-h6"${_scopeId2}>Relat\xF3rio mensal</div><p${_scopeId2}> Ainda n\xE3o totalmente suportado. </p>`);
            } else {
              return [
                createVNode("div", { class: "text-h6" }, "Relat\xF3rio mensal"),
                createVNode("p", null, " Ainda n\xE3o totalmente suportado. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VTimelineItem, { "dot-color": "teal-lighten-3" }, {
            opposite: withCtx(() => [
              createTextVNode(" Roadmap de constru\xE7\xE3o ")
            ]),
            default: withCtx(() => [
              createVNode("div", null, [
                createVNode("div", { class: "text-h6" }, "Login"),
                createVNode("p", null, ' Implementar login de usu\xE1rios "Admin" e Professor. ')
              ])
            ]),
            _: 1
          }),
          createVNode(VTimelineItem, { "dot-color": "teal-lighten-3" }, {
            default: withCtx(() => [
              createVNode("div", { class: "text-h6" }, "Materiais"),
              createVNode("p", null, " Ainda n\xE3o totalmente suportado. ")
            ]),
            _: 1
          }),
          createVNode(VTimelineItem, null, {
            default: withCtx(() => [
              createVNode("div", { class: "text-h6" }, "Cadastro de laborat\xF3rios"),
              createVNode("p", null, " Ainda n\xE3o totalmente suportado. ")
            ]),
            _: 1
          }),
          createVNode(VTimelineItem, null, {
            default: withCtx(() => [
              createVNode("div", { class: "text-h6" }, "Reserva de laborat\xF3rios"),
              createVNode("p", null, " Ainda n\xE3o totalmente suportado. ")
            ]),
            _: 1
          }),
          createVNode(VTimelineItem, null, {
            default: withCtx(() => [
              createVNode("div", { class: "text-h6" }, "Devolu\xE7\xE3o de materiais de reserva"),
              createVNode("p", null, " Ainda n\xE3o totalmente suportado. ")
            ]),
            _: 1
          }),
          createVNode(VTimelineItem, null, {
            default: withCtx(() => [
              createVNode("div", { class: "text-h6" }, "Relat\xF3rio mensal"),
              createVNode("p", null, " Ainda n\xE3o totalmente suportado. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-c028ced0.mjs.map
