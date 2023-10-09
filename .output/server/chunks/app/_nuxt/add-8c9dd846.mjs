import { resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { U as UserForm } from './user-form-3ae53eba.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
import { e as VCard, g as VCardTitle, h as VCardSubtitle } from './VCard-0d94bc60.mjs';
import './auth-541611ee.mjs';
import './VSnackbar-8fcfd23b.mjs';
import 'yup';
import 'yup-locale-pt';
import './tag-9d57e468.mjs';
import './scopeId-350eef79.mjs';
import './VImg-eabd2ccf.mjs';
import './VBtn-9e8625fe.mjs';
import './ssrBoot-49241434.mjs';
import './VAvatar-04bf28f4.mjs';
import './VDivider-514e9157.mjs';
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

const _sfc_main = {
  components: {
    UserForm
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_user_form = resolveComponent("user-form");
  _push(`<!--[--><h6 class="text-h6"> Usu\xE1rios </h6>`);
  _push(ssrRenderComponent(VCard, {
    class: "mt-2 pb-3",
    "max-width": "644"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCardTitle, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Adicionar novo usu\xE1rio `);
            } else {
              return [
                createTextVNode(" Adicionar novo usu\xE1rio ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VCardSubtitle, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Para adicionar novos usu\xE1rios preencha o formul\xE1rio abaixo. `);
            } else {
              return [
                createTextVNode(" Para adicionar novos usu\xE1rios preencha o formul\xE1rio abaixo. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<div class="mt-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_user_form, null, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode(VCardTitle, null, {
            default: withCtx(() => [
              createTextVNode(" Adicionar novo usu\xE1rio ")
            ]),
            _: 1
          }),
          createVNode(VCardSubtitle, null, {
            default: withCtx(() => [
              createTextVNode(" Para adicionar novos usu\xE1rios preencha o formul\xE1rio abaixo. ")
            ]),
            _: 1
          }),
          createVNode("div", { class: "mt-4" }, [
            createVNode(_component_user_form)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/users/add.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { add as default };
//# sourceMappingURL=add-8c9dd846.mjs.map
