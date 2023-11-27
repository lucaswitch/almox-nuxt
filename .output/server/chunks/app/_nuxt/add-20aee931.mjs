import { defineComponent, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './lab-form-d6d7ab4e.mjs';
import { V as VCard, a as VCardTitle, b as VCardSubtitle } from './VCard-d5f13c14.mjs';
import '../server.mjs';
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
import './auth-541611ee.mjs';
import './validation-64a05837.mjs';
import 'yup';
import 'yup-locale-pt';
import 'moment';
import './VForm-e1cdeb50.mjs';
import './tag-a1f3d414.mjs';
import './VTextField-75698ea0.mjs';
import './index-da71ab58.mjs';
import './VImg-b87ba832.mjs';
import './VBtn-3a93cc12.mjs';
import './forwardRefs-80fc40bb.mjs';
import './VRow-6b2a6e40.mjs';
import './VAvatar-eebf826c.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "add",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h6 class="text-h6"> Laborat\xF3rios </h6>`);
      _push(ssrRenderComponent(VCard, {
        class: "mt-2 pb-3",
        "max-width": "644"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardTitle, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cria laborat\xF3rio `);
                } else {
                  return [
                    createTextVNode(" Cria laborat\xF3rio ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardSubtitle, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Um laborat\xF3rio representa um espa\xE7o para alugar materiais. `);
                } else {
                  return [
                    createTextVNode(" Um laborat\xF3rio representa um espa\xE7o para alugar materiais. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(VCardTitle, null, {
                default: withCtx(() => [
                  createTextVNode(" Cria laborat\xF3rio ")
                ]),
                _: 1
              }),
              createVNode(VCardSubtitle, null, {
                default: withCtx(() => [
                  createTextVNode(" Um laborat\xF3rio representa um espa\xE7o para alugar materiais. ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "mt-4" }, [
                createVNode(_sfc_main$1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/labs/add.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=add-20aee931.mjs.map
