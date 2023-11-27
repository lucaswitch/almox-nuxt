import { useSSRContext, defineComponent, resolveComponent, withCtx, createTextVNode, createVNode } from 'vue';
import { _ as _export_sfc, u as useRoute } from '../server.mjs';
import { U as UserForm } from './user-form-0de39b44.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import { V as VCard, a as VCardTitle } from './VCard-d5f13c14.mjs';
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
import './VSnackbar-045c24c8.mjs';
import './VList-f255b9a7.mjs';
import './ssrBoot-49241434.mjs';
import './VAvatar-eebf826c.mjs';
import './VDivider-1f7ddb31.mjs';
import './VMenu-9a09071e.mjs';
import './scopeId-e7d4fba3.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  components: { UserForm },
  setup() {
    return {
      route: useRoute()
    };
  },
  mounted() {
  }
});
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
              _push3(` Atualizar usu\xE1rio `);
            } else {
              return [
                createTextVNode(" Atualizar usu\xE1rio ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<div class="mt-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_user_form, {
          id: _ctx.route.params.id
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode(VCardTitle, null, {
            default: withCtx(() => [
              createTextVNode(" Atualizar usu\xE1rio ")
            ]),
            _: 1
          }),
          createVNode("div", { class: "mt-4" }, [
            createVNode(_component_user_form, {
              id: _ctx.route.params.id
            }, null, 8, ["id"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/users/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _id_ as default };
//# sourceMappingURL=_id_-57763c9f.mjs.map
