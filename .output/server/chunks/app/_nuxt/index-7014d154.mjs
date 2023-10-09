import { _ as __nuxt_component_0 } from './nuxt-link-7a4ab041.mjs';
import { withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { u as useAuth } from './auth-541611ee.mjs';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
import { V as VBtn } from './VBtn-9e8625fe.mjs';
import { V as VTable } from './VTable-17da4fff.mjs';
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
import './tag-9d57e468.mjs';

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
      this.items = await $fetch("/api/users", {
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
  _push(`<!--[--><h6 class="text-h6"> Usu\xE1rios </h6>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/users/add" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VBtn, { color: "primary" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Adicionar usu\xE1rio `);
            } else {
              return [
                createTextVNode(" Adicionar usu\xE1rio ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VBtn, { color: "primary" }, {
            default: withCtx(() => [
              createTextVNode(" Adicionar usu\xE1rio ")
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
        _push2(`<thead${_scopeId}><tr${_scopeId}><th class="text-left"${_scopeId}> Nome </th><th class="text-left"${_scopeId}> Usu\xE1rio </th><th class="text-left"${_scopeId}> Permiss\xF5es </th><th${_scopeId}> A\xE7\xF5es </th></tr></thead><tbody${_scopeId}><!--[-->`);
        ssrRenderList($data.items, (item) => {
          _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(item.full_name)}</td><td${_scopeId}>${ssrInterpolate(item.username)}</td><td${_scopeId}>${ssrInterpolate(item.role === 0 ? "Administrador" : "Professor")}</td><td${_scopeId}>`);
          _push2(ssrRenderComponent(VBtn, {
            variant: "flat",
            compact: "",
            to: "/dashboard/users/" + item.id
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(` Editar `);
              } else {
                return [
                  createTextVNode(" Editar ")
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
              createVNode("th", { class: "text-left" }, " Usu\xE1rio "),
              createVNode("th", { class: "text-left" }, " Permiss\xF5es "),
              createVNode("th", null, " A\xE7\xF5es ")
            ])
          ]),
          createVNode("tbody", null, [
            (openBlock(true), createBlock(Fragment, null, renderList($data.items, (item) => {
              return openBlock(), createBlock("tr", {
                key: item.name
              }, [
                createVNode("td", null, toDisplayString(item.full_name), 1),
                createVNode("td", null, toDisplayString(item.username), 1),
                createVNode("td", null, toDisplayString(item.role === 0 ? "Administrador" : "Professor"), 1),
                createVNode("td", null, [
                  createVNode(VBtn, {
                    variant: "flat",
                    compact: "",
                    to: "/dashboard/users/" + item.id
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Editar ")
                    ]),
                    _: 2
                  }, 1032, ["to"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-7014d154.mjs.map
