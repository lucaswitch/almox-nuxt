import { defineComponent, ref, withAsyncContext, mergeProps, withCtx, unref, isRef, createVNode, createTextVNode, useSSRContext } from 'vue';
import { n as navigateTo } from '../server.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuth } from './auth-541611ee.mjs';
import { L as LabSchema } from './validation-64a05837.mjs';
import { V as VForm } from './VForm-e1cdeb50.mjs';
import { V as VRow, a as VCol } from './VRow-6b2a6e40.mjs';
import { V as VTextField } from './VTextField-75698ea0.mjs';
import { V as VBtn } from './VBtn-3a93cc12.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "lab-form",
  __ssrInlineRender: true,
  props: {
    lab_id: String
  },
  async setup(__props) {
    let __temp, __restore;
    const { lab_id } = __props;
    const auth = useAuth();
    const name = ref();
    const student_capacity = ref();
    const errors = ref({});
    async function validate() {
      errors.value = {};
      const data = {
        name: name.value,
        student_capacity: parseInt(student_capacity.value, 10)
      };
      try {
        await LabSchema.validate(data);
        return true;
      } catch (err) {
        errors.value[err.path] = err.message;
        return false;
      }
    }
    async function create() {
      const body = {
        name: name.value,
        student_capacity: parseInt(student_capacity.value, 10)
      };
      return await $fetch("/api/labs/create", {
        method: "post",
        body,
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
    }
    async function update(id) {
      let body;
      body = {
        name: name.value,
        student_capacity: parseInt(student_capacity.value || "0", 10)
      };
      return await $fetch("/api/labs/update", {
        method: "post",
        body,
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
        params: {
          lab_id: id
        }
      });
    }
    async function handleOnClick() {
      if (await validate()) {
        if (lab_id) {
          await update(lab_id);
        } else {
          await create();
        }
        navigateTo("/dashboard/labs");
      }
    }
    if (lab_id) {
      const data = ([__temp, __restore] = withAsyncContext(() => $fetch("/api/labs/view", {
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
        params: {
          lab_id
        }
      })), __temp = await __temp, __restore(), __temp);
      name.value = data.name;
      student_capacity.value = data.student_capacity;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VForm, mergeProps({ class: "px-3" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          variant: "outlined",
                          modelValue: unref(name),
                          "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                          clearable: "",
                          label: "Nome",
                          "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.name) ? [unref(errors).name] : ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            variant: "outlined",
                            modelValue: unref(name),
                            "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                            clearable: "",
                            label: "Nome",
                            "error-messages": ((_b = unref(errors)) == null ? void 0 : _b.name) ? [unref(errors).name] : ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          variant: "outlined",
                          modelValue: unref(student_capacity),
                          "onUpdate:modelValue": ($event) => isRef(student_capacity) ? student_capacity.value = $event : null,
                          clearable: "",
                          label: "Capacidade",
                          "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.student_capacity) ? [unref(errors).student_capacity] : ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            variant: "outlined",
                            modelValue: unref(student_capacity),
                            "onUpdate:modelValue": ($event) => isRef(student_capacity) ? student_capacity.value = $event : null,
                            clearable: "",
                            label: "Capacidade",
                            "error-messages": ((_b = unref(errors)) == null ? void 0 : _b.student_capacity) ? [unref(errors).student_capacity] : ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, null, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode(VTextField, {
                            variant: "outlined",
                            modelValue: unref(name),
                            "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                            clearable: "",
                            label: "Nome",
                            "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.name) ? [unref(errors).name] : ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode(VTextField, {
                            variant: "outlined",
                            modelValue: unref(student_capacity),
                            "onUpdate:modelValue": ($event) => isRef(student_capacity) ? student_capacity.value = $event : null,
                            clearable: "",
                            label: "Capacidade",
                            "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.student_capacity) ? [unref(errors).student_capacity] : ""
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
            _push2(ssrRenderComponent(VBtn, {
              color: "primary",
              onClick: handleOnClick
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Salvar `);
                } else {
                  return [
                    createTextVNode(" Salvar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode(VTextField, {
                          variant: "outlined",
                          modelValue: unref(name),
                          "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                          clearable: "",
                          label: "Nome",
                          "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.name) ? [unref(errors).name] : ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ];
                    }),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode(VTextField, {
                          variant: "outlined",
                          modelValue: unref(student_capacity),
                          "onUpdate:modelValue": ($event) => isRef(student_capacity) ? student_capacity.value = $event : null,
                          clearable: "",
                          label: "Capacidade",
                          "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.student_capacity) ? [unref(errors).student_capacity] : ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ];
                    }),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VBtn, {
                color: "primary",
                onClick: handleOnClick
              }, {
                default: withCtx(() => [
                  createTextVNode(" Salvar ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/lab-form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=lab-form-d6d7ab4e.mjs.map
