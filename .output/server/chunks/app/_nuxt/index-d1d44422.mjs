import { useSSRContext, resolveComponent, withCtx, createVNode, mergeProps, createTextVNode, openBlock, createBlock, createCommentVNode } from 'vue';
import { _ as _export_sfc, n as navigateTo } from '../server.mjs';
import { u as useAuth } from './auth-541611ee.mjs';
import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
import { ssrRenderComponent } from 'vue/server-renderer';
import { V as VForm } from './VForm-e1cdeb50.mjs';
import { V as VTextField } from './VTextField-75698ea0.mjs';
import { V as VBtn } from './VBtn-3a93cc12.mjs';
import { V as VCard } from './VCard-d5f13c14.mjs';
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
import './tag-a1f3d414.mjs';
import './forwardRefs-80fc40bb.mjs';
import './index-da71ab58.mjs';
import './VImg-b87ba832.mjs';
import './VAvatar-eebf826c.mjs';

Yup.setLocale(pt);
const { object, string, number } = Yup;
let signInForm = object({
  username: string().min(1).max(250).required().label("Usu\xE1rio"),
  password: string().required().min(1).max(60).label("Senha")
});
const _sfc_main$1 = {
  setup() {
    return {
      auth: useAuth()
    };
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      errors: {},
      loading: false,
      show_password: false
    };
  },
  methods: {
    handleOnClickPasswordIcon() {
      this.show_password = !this.show_password;
    },
    async handleOnLogin() {
      this.loading = true;
      const body = this.form;
      body.username = body.username.trim();
      body.password = body.password.trim();
      let valid = true;
      try {
        await signInForm.validate(body);
      } catch (err) {
        valid = false;
        const errors = {};
        errors[err.path] = err.message;
        this.errors = errors;
      }
      this.loading = false;
      if (valid) {
        try {
          const { user, token } = await $fetch("/api/sign", {
            method: "post",
            body
          });
          this.auth.setCredentials({ user, token });
          navigateTo("/dashboard/schedules");
        } catch (err) {
          this.errors["username"] = "Usu\xE1rio ou senha inv\xE1lidos.";
        }
      }
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent(VForm, mergeProps({ onSubmit: $options.handleOnLogin }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      var _a, _b, _c, _d;
      if (_push2) {
        _push2(ssrRenderComponent(VTextField, {
          modelValue: $data.form.username,
          "onUpdate:modelValue": ($event) => $data.form.username = $event,
          readonly: $data.loading,
          variant: "outlined",
          class: "mb-2",
          label: "Usu\xE1rio",
          placeholder: "lucaswitch",
          "error-messages": (_a = $data.errors) == null ? void 0 : _a.username,
          clearable: ""
        }, null, _parent2, _scopeId));
        if ($data.form.username && $data.form.username.length > 0) {
          _push2(ssrRenderComponent(VTextField, {
            modelValue: $data.form.password,
            "onUpdate:modelValue": ($event) => $data.form.password = $event,
            "append-inner-icon": $data.show_password ? "mdi-eye" : "mdi-eye-off",
            type: $data.show_password ? "text" : "password",
            "error-messages": (_b = $data.errors) == null ? void 0 : _b.password,
            name: "input-10-1",
            variant: "outlined",
            label: "Senha",
            clearable: "",
            "onClick:appendInner": $options.handleOnClickPasswordIcon
          }, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        if ($data.form.username && $data.form.username.length > 0 && $data.form.password && $data.form.password.length > 0) {
          _push2(`<div${_scopeId}><br${_scopeId}>`);
          _push2(ssrRenderComponent(VBtn, {
            loading: $data.loading,
            color: "primary",
            type: "submit",
            onClick: $options.handleOnLogin,
            block: ""
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
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode(VTextField, {
            modelValue: $data.form.username,
            "onUpdate:modelValue": ($event) => $data.form.username = $event,
            readonly: $data.loading,
            variant: "outlined",
            class: "mb-2",
            label: "Usu\xE1rio",
            placeholder: "lucaswitch",
            "error-messages": (_c = $data.errors) == null ? void 0 : _c.username,
            clearable: ""
          }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "error-messages"]),
          $data.form.username && $data.form.username.length > 0 ? (openBlock(), createBlock(VTextField, {
            key: 0,
            modelValue: $data.form.password,
            "onUpdate:modelValue": ($event) => $data.form.password = $event,
            "append-inner-icon": $data.show_password ? "mdi-eye" : "mdi-eye-off",
            type: $data.show_password ? "text" : "password",
            "error-messages": (_d = $data.errors) == null ? void 0 : _d.password,
            name: "input-10-1",
            variant: "outlined",
            label: "Senha",
            clearable: "",
            "onClick:appendInner": $options.handleOnClickPasswordIcon
          }, null, 8, ["modelValue", "onUpdate:modelValue", "append-inner-icon", "type", "error-messages", "onClick:appendInner"])) : createCommentVNode("", true),
          $data.form.username && $data.form.username.length > 0 && $data.form.password && $data.form.password.length > 0 ? (openBlock(), createBlock("div", { key: 1 }, [
            createVNode("br"),
            createVNode(VBtn, {
              loading: $data.loading,
              color: "primary",
              type: "submit",
              onClick: $options.handleOnLogin,
              block: ""
            }, {
              default: withCtx(() => [
                createTextVNode(" Entrar ")
              ]),
              _: 1
            }, 8, ["loading", "onClick"])
          ])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/sign-in-form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SignInForm = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  components: { SignInForm }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_sign_in_form = resolveComponent("sign-in-form");
  _push(`<!--[--><h1 class="d-flex justify-center mb-10">Login</h1>`);
  _push(ssrRenderComponent(VCard, {
    class: "mx-auto px-6 py-8",
    "max-width": "444",
    title: "Realizar login"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_sign_in_form, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_sign_in_form)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sign-in/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-d1d44422.mjs.map
