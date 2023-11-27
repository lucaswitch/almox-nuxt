import { useSSRContext, defineComponent, withCtx, createTextVNode, unref, createVNode, ref, withAsyncContext, openBlock, createBlock, Fragment, renderList, toDisplayString } from 'vue';
import { u as useRoute } from '../server.mjs';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { a as getLocalDateString } from './formatter-0cf2655f.mjs';
import { u as useAuth } from './auth-541611ee.mjs';
import { V as VBtn } from './VBtn-3a93cc12.mjs';
import { V as VTable } from './VTable-ddfcaa96.mjs';
import { V as VCard, a as VCardTitle, b as VCardSubtitle } from './VCard-d5f13c14.mjs';
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
import 'moment/moment.js';
import './tag-a1f3d414.mjs';
import './VImg-b87ba832.mjs';
import './VAvatar-eebf826c.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "stock-form",
  __ssrInlineRender: true,
  props: {
    material_id: String
  },
  async setup(__props) {
    let __temp, __restore;
    const { material_id } = __props;
    const auth = useAuth();
    const entries = ref([]);
    async function getEntries() {
      let data = await $fetch(`/api/materials-entries`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
        params: {
          id: material_id
        }
      });
      data = data.map(function({ created_at, updated_at, ...others }) {
        created_at = getLocalDateString(created_at, "LLLL");
        updated_at = getLocalDateString(updated_at, "LLLL");
        return {
          ...others,
          created_at,
          updated_at
        };
      });
      return data;
    }
    entries.value = ([__temp, __restore] = withAsyncContext(() => getEntries()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="d-flex flex-row mb-6 ga-1 pa-4">`);
      _push(ssrRenderComponent(VBtn, {
        color: "primary",
        href: "/dashboard/materials/" + __props.material_id + "/entry/new"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Adicionar registro `);
          } else {
            return [
              createTextVNode(" Adicionar registro ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VBtn, {
        color: "primary",
        class: "ml-2",
        variant: "outlined",
        href: "/dashboard/materials"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Voltar `);
          } else {
            return [
              createTextVNode(" Voltar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="pa-4"><p class="text-subtitle-1"> Hist\xF3rico de registros </p>`);
      _push(ssrRenderComponent(VTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<thead${_scopeId}><tr${_scopeId}><th class="text-left"${_scopeId}> Data </th><th class="text-right"${_scopeId}> Quantidade </th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(unref(entries), (entry) => {
              _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(entry.created_at)}</td><td class="text-right"${_scopeId}>`);
              if (entry.amount > 0) {
                _push2(`<div${_scopeId}> +${ssrInterpolate(entry.amount)}</div>`);
              } else {
                _push2(`<div${_scopeId}>${ssrInterpolate(entry.amount)}</div>`);
              }
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody>`);
          } else {
            return [
              createVNode("thead", null, [
                createVNode("tr", null, [
                  createVNode("th", { class: "text-left" }, " Data "),
                  createVNode("th", { class: "text-right" }, " Quantidade ")
                ])
              ]),
              createVNode("tbody", null, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(entries), (entry) => {
                  return openBlock(), createBlock("tr", {
                    key: entry.id
                  }, [
                    createVNode("td", null, toDisplayString(entry.created_at), 1),
                    createVNode("td", { class: "text-right" }, [
                      entry.amount > 0 ? (openBlock(), createBlock("div", { key: 0 }, " +" + toDisplayString(entry.amount), 1)) : (openBlock(), createBlock("div", { key: 1 }, toDisplayString(entry.amount), 1))
                    ])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/stock-form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const material_id = route.params.id;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h6 class="text-h6"> Adicionar entradas e saidas </h6>`);
      _push(ssrRenderComponent(VCard, {
        class: "mt-2 pb-3",
        "max-width": "644"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardTitle, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Entradas `);
                } else {
                  return [
                    createTextVNode(" Entradas ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardSubtitle, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Adicione uma nova entrada `);
                } else {
                  return [
                    createTextVNode(" Adicione uma nova entrada ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, { material_id: unref(material_id) }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(VCardTitle, null, {
                default: withCtx(() => [
                  createTextVNode(" Entradas ")
                ]),
                _: 1
              }),
              createVNode(VCardSubtitle, null, {
                default: withCtx(() => [
                  createTextVNode(" Adicione uma nova entrada ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "mt-4" }, [
                createVNode(_sfc_main$1, { material_id: unref(material_id) }, null, 8, ["material_id"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/materials/[id]/entry/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-8abb0c50.mjs.map
