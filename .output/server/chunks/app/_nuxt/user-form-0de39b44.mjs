import { withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { _ as _export_sfc, n as navigateTo } from '../server.mjs';
import { u as useAuth } from './auth-541611ee.mjs';
import { U as UserSchema } from './validation-64a05837.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { V as VForm } from './VForm-e1cdeb50.mjs';
import { V as VRow, a as VCol } from './VRow-6b2a6e40.mjs';
import { V as VTextField } from './VTextField-75698ea0.mjs';
import { V as VSelect, a as VSnackbar } from './VSnackbar-045c24c8.mjs';
import { V as VBtn } from './VBtn-3a93cc12.mjs';

const _sfc_main = {
  props: ["id"],
  setup({ id = null }) {
    return {
      auth: useAuth(),
      id
    };
  },
  data() {
    return {
      full_name: "",
      username: "",
      password: "",
      type: "",
      errors: {},
      default_types: ["Admin", "Professor"],
      created: null
    };
  },
  methods: {
    async validate(data) {
      this.errors = {};
      try {
        await UserSchema.validate(data);
        return true;
      } catch (err) {
        console.log(err);
        this.errors[err.path] = err.message;
        console.log(err.path, err.message);
        return false;
      }
    },
    async add() {
      if (this.created) {
        return;
      }
      const data = {
        full_name: this.full_name,
        username: this.username,
        password: this.password,
        type: this.type
      };
      if (this.id) {
        data.id = this.id;
      }
      const isValid = await this.validate(data);
      if (isValid) {
        try {
          this.created = await $fetch(`/api/users`, {
            method: "post",
            body: data,
            headers: {
              Authorization: `Bearer ${this.auth.token}`
            }
          });
          navigateTo("/dashboard/users");
        } catch (err) {
          console.error(err);
        }
      }
    }
  },
  async mounted() {
    if (this.id) {
      const { username, full_name, role } = await $fetch("/api/users?id=" + this.id);
      this.username = username;
      this.full_name = full_name;
      this.type = role === 0 ? "Admin" : "Professor";
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[-->`);
  _push(ssrRenderComponent(VForm, { class: "px-6" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p class="text-caption"${_scopeId}> Perfil </p>`);
        _push2(ssrRenderComponent(VRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol, {
                cols: "12",
                sm: "12",
                md: "6",
                lg: "6"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  var _a, _b;
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField, {
                      variant: "outlined",
                      modelValue: $data.full_name,
                      "onUpdate:modelValue": ($event) => $data.full_name = $event,
                      label: "Nome completo",
                      "error-messages": ((_a = $data.errors) == null ? void 0 : _a.full_name) ? [$data.errors.full_name] : "",
                      clearable: ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField, {
                        variant: "outlined",
                        modelValue: $data.full_name,
                        "onUpdate:modelValue": ($event) => $data.full_name = $event,
                        label: "Nome completo",
                        "error-messages": ((_b = $data.errors) == null ? void 0 : _b.full_name) ? [$data.errors.full_name] : "",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCol, {
                cols: "12",
                sm: "12",
                md: "6",
                lg: "6"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  var _a, _b;
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField, {
                      variant: "outlined",
                      modelValue: $data.username,
                      "onUpdate:modelValue": ($event) => $data.username = $event,
                      label: "Usu\xE1rio para login",
                      "error-messages": ((_a = $data.errors) == null ? void 0 : _a.username) ? [$data.errors.username] : "",
                      clearable: ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField, {
                        variant: "outlined",
                        modelValue: $data.username,
                        "onUpdate:modelValue": ($event) => $data.username = $event,
                        label: "Usu\xE1rio para login",
                        "error-messages": ((_b = $data.errors) == null ? void 0 : _b.username) ? [$data.errors.username] : "",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol, {
                  cols: "12",
                  sm: "12",
                  md: "6",
                  lg: "6"
                }, {
                  default: withCtx(() => {
                    var _a;
                    return [
                      createVNode(VTextField, {
                        variant: "outlined",
                        modelValue: $data.full_name,
                        "onUpdate:modelValue": ($event) => $data.full_name = $event,
                        label: "Nome completo",
                        "error-messages": ((_a = $data.errors) == null ? void 0 : _a.full_name) ? [$data.errors.full_name] : "",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ];
                  }),
                  _: 1
                }),
                createVNode(VCol, {
                  cols: "12",
                  sm: "12",
                  md: "6",
                  lg: "6"
                }, {
                  default: withCtx(() => {
                    var _a;
                    return [
                      createVNode(VTextField, {
                        variant: "outlined",
                        modelValue: $data.username,
                        "onUpdate:modelValue": ($event) => $data.username = $event,
                        label: "Usu\xE1rio para login",
                        "error-messages": ((_a = $data.errors) == null ? void 0 : _a.username) ? [$data.errors.username] : "",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ];
                  }),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<p class="text-caption"${_scopeId}> Usu\xE1rio de acesso </p>`);
        _push2(ssrRenderComponent(VRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol, {
                cols: "12",
                sm: "12",
                md: "6",
                lg: "6"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  var _a, _b;
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField, {
                      variant: "outlined",
                      modelValue: $data.password,
                      "onUpdate:modelValue": ($event) => $data.password = $event,
                      label: "Senha",
                      "error-messages": ((_a = $data.errors) == null ? void 0 : _a.password) ? [$data.errors.password] : "",
                      clearable: ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField, {
                        variant: "outlined",
                        modelValue: $data.password,
                        "onUpdate:modelValue": ($event) => $data.password = $event,
                        label: "Senha",
                        "error-messages": ((_b = $data.errors) == null ? void 0 : _b.password) ? [$data.errors.password] : "",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCol, {
                cols: "12",
                sm: "12",
                md: "6",
                lg: "6"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  var _a, _b;
                  if (_push4) {
                    _push4(ssrRenderComponent(VSelect, {
                      label: "Tipo de usu\xE1rio",
                      modelValue: $data.type,
                      "onUpdate:modelValue": ($event) => $data.type = $event,
                      items: $data.default_types,
                      variant: "outlined",
                      "error-messages": ((_a = $data.errors) == null ? void 0 : _a.type) ? [$data.errors.type] : ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VSelect, {
                        label: "Tipo de usu\xE1rio",
                        modelValue: $data.type,
                        "onUpdate:modelValue": ($event) => $data.type = $event,
                        items: $data.default_types,
                        variant: "outlined",
                        "error-messages": ((_b = $data.errors) == null ? void 0 : _b.type) ? [$data.errors.type] : ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol, {
                  cols: "12",
                  sm: "12",
                  md: "6",
                  lg: "6"
                }, {
                  default: withCtx(() => {
                    var _a;
                    return [
                      createVNode(VTextField, {
                        variant: "outlined",
                        modelValue: $data.password,
                        "onUpdate:modelValue": ($event) => $data.password = $event,
                        label: "Senha",
                        "error-messages": ((_a = $data.errors) == null ? void 0 : _a.password) ? [$data.errors.password] : "",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ];
                  }),
                  _: 1
                }),
                createVNode(VCol, {
                  cols: "12",
                  sm: "12",
                  md: "6",
                  lg: "6"
                }, {
                  default: withCtx(() => {
                    var _a;
                    return [
                      createVNode(VSelect, {
                        label: "Tipo de usu\xE1rio",
                        modelValue: $data.type,
                        "onUpdate:modelValue": ($event) => $data.type = $event,
                        items: $data.default_types,
                        variant: "outlined",
                        "error-messages": ((_a = $data.errors) == null ? void 0 : _a.type) ? [$data.errors.type] : ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                    ];
                  }),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VBtn, {
          color: "primary",
          onClick: $options.add
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Prosseguir `);
            } else {
              return [
                createTextVNode(" Prosseguir ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("p", { class: "text-caption" }, " Perfil "),
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, {
                cols: "12",
                sm: "12",
                md: "6",
                lg: "6"
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode(VTextField, {
                      variant: "outlined",
                      modelValue: $data.full_name,
                      "onUpdate:modelValue": ($event) => $data.full_name = $event,
                      label: "Nome completo",
                      "error-messages": ((_a = $data.errors) == null ? void 0 : _a.full_name) ? [$data.errors.full_name] : "",
                      clearable: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ];
                }),
                _: 1
              }),
              createVNode(VCol, {
                cols: "12",
                sm: "12",
                md: "6",
                lg: "6"
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode(VTextField, {
                      variant: "outlined",
                      modelValue: $data.username,
                      "onUpdate:modelValue": ($event) => $data.username = $event,
                      label: "Usu\xE1rio para login",
                      "error-messages": ((_a = $data.errors) == null ? void 0 : _a.username) ? [$data.errors.username] : "",
                      clearable: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ];
                }),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode("p", { class: "text-caption" }, " Usu\xE1rio de acesso "),
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, {
                cols: "12",
                sm: "12",
                md: "6",
                lg: "6"
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode(VTextField, {
                      variant: "outlined",
                      modelValue: $data.password,
                      "onUpdate:modelValue": ($event) => $data.password = $event,
                      label: "Senha",
                      "error-messages": ((_a = $data.errors) == null ? void 0 : _a.password) ? [$data.errors.password] : "",
                      clearable: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ];
                }),
                _: 1
              }),
              createVNode(VCol, {
                cols: "12",
                sm: "12",
                md: "6",
                lg: "6"
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode(VSelect, {
                      label: "Tipo de usu\xE1rio",
                      modelValue: $data.type,
                      "onUpdate:modelValue": ($event) => $data.type = $event,
                      items: $data.default_types,
                      variant: "outlined",
                      "error-messages": ((_a = $data.errors) == null ? void 0 : _a.type) ? [$data.errors.type] : ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                  ];
                }),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VBtn, {
            color: "primary",
            onClick: $options.add
          }, {
            default: withCtx(() => [
              createTextVNode(" Prosseguir ")
            ]),
            _: 1
          }, 8, ["onClick"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(VSnackbar, {
    modelValue: $data.created,
    "onUpdate:modelValue": ($event) => $data.created = $event,
    "multi-line": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      var _a, _b;
      if (_push2) {
        _push2(` O usu\xE1rio ${ssrInterpolate((_a = $data.created) == null ? void 0 : _a.full)} acaba de ser adicionado `);
      } else {
        return [
          createTextVNode(" O usu\xE1rio " + toDisplayString((_b = $data.created) == null ? void 0 : _b.full) + " acaba de ser adicionado ", 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/user-form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UserForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { UserForm as U };
//# sourceMappingURL=user-form-0de39b44.mjs.map
