import { _ as __nuxt_component_0 } from './nuxt-link-cad94625.mjs';
import { createVNode, withCtx, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { m as makeDensityProps, g as useDensity, r as useAuth, y as VBtn, z as VBtnToggle } from './VBtn-cb544257.mjs';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { p as propsFactory, m as makeThemeProps, g as genericComponent, l as provideTheme, _ as _export_sfc, v as convertToUnit } from '../server.mjs';
import { m as makeComponentProps, a as makeTagProps, u as useRender } from './dimensions-b61cbf9f.mjs';
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

const makeVTableProps = propsFactory({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VTable");
const VTable = genericComponent()({
  name: "VTable",
  props: makeVTableProps(),
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
    useRender(() => createVNode(props.tag, {
      "class": ["v-table", {
        "v-table--fixed-height": !!props.height,
        "v-table--fixed-header": props.fixedHeader,
        "v-table--fixed-footer": props.fixedFooter,
        "v-table--has-top": !!slots.top,
        "v-table--has-bottom": !!slots.bottom,
        "v-table--hover": props.hover
      }, themeClasses.value, densityClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a, _b, _c;
        return [(_a = slots.top) == null ? void 0 : _a.call(slots), slots.default ? createVNode("div", {
          "class": "v-table__wrapper",
          "style": {
            height: convertToUnit(props.height)
          }
        }, [createVNode("table", null, [slots.default()])]) : (_b = slots.wrapper) == null ? void 0 : _b.call(slots), (_c = slots.bottom) == null ? void 0 : _c.call(slots)];
      }
    }));
    return {};
  }
});
const _sfc_main = {
  setup() {
    return {
      auth: useAuth()
    };
  },
  data() {
    return {
      items: [],
      total_count: 0,
      page: 1
    };
  },
  methods: {
    async refresh() {
      this.items = await $fetch("/api/materials", {
        method: "get",
        headers: {
          Authorization: `Bearer ${this.auth.token}`
        }
      });
    }
  },
  async mounted() {
    await this.refresh();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<!--[--><h6 class="text-h6"> Indice de materiais </h6>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/materials/add" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VBtn, { color: "primary" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Adicionar entrada `);
            } else {
              return [
                createTextVNode(" Adicionar entrada ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VBtn, { color: "primary" }, {
            default: withCtx(() => [
              createTextVNode(" Adicionar entrada ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(VTable, { class: "mt-2" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<thead${_scopeId}><tr${_scopeId}><th class="text-left"${_scopeId}> Nome </th><th class="text-left"${_scopeId}> Quantidade </th><th class="text-left"${_scopeId}> Concentra\xE7\xE3o </th><th class="text-left"${_scopeId}> Peso </th><th class="text-left"${_scopeId}> Marca </th></tr></thead><tbody${_scopeId}><!--[-->`);
        ssrRenderList($data.items, (item) => {
          _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(item.name)}</td><td${_scopeId}>${ssrInterpolate("--")}</td><td${_scopeId}>${ssrInterpolate(item.weight)}</td><td${_scopeId}>${ssrInterpolate(item.concentration)}</td><td${_scopeId}>${ssrInterpolate(item.brand)}</td><td${_scopeId}>`);
          _push2(ssrRenderComponent(VBtnToggle, {
            color: "primary",
            mandatory: ""
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(VBtn, {
                  variant: "text",
                  compact: ""
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(` Remover `);
                    } else {
                      return [
                        createTextVNode(" Remover ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(VBtn, {
                    variant: "text",
                    compact: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Remover ")
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</td></tr>`);
        });
        _push2(`<!--]--></tbody>`);
      } else {
        return [
          createVNode("thead", null, [
            createVNode("tr", null, [
              createVNode("th", { class: "text-left" }, " Nome "),
              createVNode("th", { class: "text-left" }, " Quantidade "),
              createVNode("th", { class: "text-left" }, " Concentra\xE7\xE3o "),
              createVNode("th", { class: "text-left" }, " Peso "),
              createVNode("th", { class: "text-left" }, " Marca ")
            ])
          ]),
          createVNode("tbody", null, [
            (openBlock(true), createBlock(Fragment, null, renderList($data.items, (item) => {
              return openBlock(), createBlock("tr", {
                key: item.name
              }, [
                createVNode("td", null, toDisplayString(item.name), 1),
                createVNode("td", null, toDisplayString("--")),
                createVNode("td", null, toDisplayString(item.weight), 1),
                createVNode("td", null, toDisplayString(item.concentration), 1),
                createVNode("td", null, toDisplayString(item.brand), 1),
                createVNode("td", null, [
                  createVNode(VBtnToggle, {
                    color: "primary",
                    mandatory: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        variant: "text",
                        compact: ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Remover ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ])
              ]);
            }), 128))
          ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/materials/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-bf49fc97.mjs.map
