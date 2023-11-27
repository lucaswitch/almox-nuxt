import { useSSRContext, defineComponent, withCtx, createTextVNode, unref, createVNode, ref, mergeProps, isRef } from 'vue';
import { u as useRoute } from '../server.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { E as EntrySchema } from './validation-64a05837.mjs';
import { u as useAuth } from './auth-541611ee.mjs';
import { V as VBtn } from './VBtn-3a93cc12.mjs';
import { V as VForm } from './VForm-e1cdeb50.mjs';
import { V as VRow, a as VCol } from './VRow-6b2a6e40.mjs';
import { V as VTextField } from './VTextField-75698ea0.mjs';
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
import 'yup';
import 'yup-locale-pt';
import 'moment';
import './tag-a1f3d414.mjs';
import './forwardRefs-80fc40bb.mjs';
import './index-da71ab58.mjs';
import './VImg-b87ba832.mjs';
import './VAvatar-eebf826c.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "stock-entry-form",
  __ssrInlineRender: true,
  props: {
    material_id: String
  },
  setup(__props) {
    const { material_id } = __props;
    const auth = useAuth();
    const disabled = ref(false);
    const created = ref(null);
    const amount = ref(0);
    const errors = ref({});
    async function validate() {
      errors.value = {};
      try {
        await EntrySchema.validate({ amount: Number(amount.value) });
        return true;
      } catch (err) {
        errors.value[err.path] = err.message;
        return false;
      }
    }
    async function add() {
      if (await validate() && disabled) {
        disabled.value = true;
        try {
          created.value = await $fetch("/api/entry", {
            method: "post",
            body: {
              amount: parseInt(amount.value, 10),
              material_id: parseInt(material_id, 10)
            },
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          });
        } catch (err) {
          errors.value = err.response._data.data;
        }
        disabled.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(created)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-3" }, _attrs))}>`);
        if (unref(created).amount > 0) {
          _push(`<div><p class="text-body-1">${ssrInterpolate(unref(created).amount)} itens adicionados com sucesso ao estoque de materiais! </p></div>`);
        } else {
          _push(`<div><p class="text-body-1">${ssrInterpolate(Math.abs(unref(created).amount, 10))} itens removido com sucesso do estoque de materiais! </p></div>`);
        }
        _push(`<div class="py-2">`);
        _push(ssrRenderComponent(VBtn, {
          color: "primary",
          href: "/dashboard/materials/" + __props.material_id + "/entry"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Continuar `);
            } else {
              return [
                createTextVNode(" Continuar ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        _push(ssrRenderComponent(VForm, { class: "px-3" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, { align: "center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a, _b;
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            variant: "outlined",
                            modelValue: unref(amount),
                            "onUpdate:modelValue": ($event) => isRef(amount) ? amount.value = $event : null,
                            clearable: "",
                            label: "Quantidade",
                            "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.amount) ? [unref(errors).amount] : ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              variant: "outlined",
                              modelValue: unref(amount),
                              "onUpdate:modelValue": ($event) => isRef(amount) ? amount.value = $event : null,
                              clearable: "",
                              label: "Quantidade",
                              "error-messages": ((_b = unref(errors)) == null ? void 0 : _b.amount) ? [unref(errors).amount] : ""
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
                              modelValue: unref(amount),
                              "onUpdate:modelValue": ($event) => isRef(amount) ? amount.value = $event : null,
                              clearable: "",
                              label: "Quantidade",
                              "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.amount) ? [unref(errors).amount] : ""
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
              _push2(ssrRenderComponent(VRow, { class: "py-2 px-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VBtn, {
                      color: "primary",
                      onClick: add,
                      disabled: unref(disabled)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Adicionar `);
                        } else {
                          return [
                            createTextVNode(" Adicionar ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VBtn, {
                      color: "primary",
                      variant: "outlined",
                      class: "ml-2",
                      href: "/dashboard/materials/" + __props.material_id + "/entry"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Voltar `);
                        } else {
                          return [
                            createTextVNode(" Voltar ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VBtn, {
                        color: "primary",
                        onClick: add,
                        disabled: unref(disabled)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Adicionar ")
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode(VBtn, {
                        color: "primary",
                        variant: "outlined",
                        class: "ml-2",
                        href: "/dashboard/materials/" + __props.material_id + "/entry"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Voltar ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, { align: "center" }, {
                  default: withCtx(() => [
                    createVNode(VCol, null, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode(VTextField, {
                            variant: "outlined",
                            modelValue: unref(amount),
                            "onUpdate:modelValue": ($event) => isRef(amount) ? amount.value = $event : null,
                            clearable: "",
                            label: "Quantidade",
                            "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.amount) ? [unref(errors).amount] : ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ];
                      }),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, { class: "py-2 px-2" }, {
                  default: withCtx(() => [
                    createVNode(VBtn, {
                      color: "primary",
                      onClick: add,
                      disabled: unref(disabled)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Adicionar ")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(VBtn, {
                      color: "primary",
                      variant: "outlined",
                      class: "ml-2",
                      href: "/dashboard/materials/" + __props.material_id + "/entry"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Voltar ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/stock-entry-form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const material_id = parseInt(route.params.id, 10);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h6 class="text-h6"> Entradas e saidas / Adicionar entrada </h6>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/materials/[id]/entry/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-c5828ab1.mjs.map
