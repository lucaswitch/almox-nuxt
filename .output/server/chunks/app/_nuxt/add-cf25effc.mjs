import { resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { U as UserForm } from './user-form-0de39b44.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
import { V as VCard, a as VCardTitle, b as VCardSubtitle } from './VCard-d5f13c14.mjs';
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
import './VSnackbar-045c24c8.mjs';
import './VList-f255b9a7.mjs';
import './ssrBoot-49241434.mjs';
import './VAvatar-eebf826c.mjs';
import './VDivider-1f7ddb31.mjs';
import './VMenu-9a09071e.mjs';
import './scopeId-e7d4fba3.mjs';
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
//# sourceMappingURL=add-cf25effc.mjs.map
