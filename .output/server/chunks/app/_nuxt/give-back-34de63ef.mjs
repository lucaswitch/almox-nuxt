import { defineComponent, ref, withAsyncContext, withCtx, unref, createVNode, createTextVNode, toDisplayString, isRef, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { u as useRoute } from '../server.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useAuth } from './auth-541611ee.mjs';
import { a as getLocalDateString } from './formatter-0cf2655f.mjs';
import { E as EntrySchema } from './validation-64a05837.mjs';
import { V as VCard, c as VCardText } from './VCard-d5f13c14.mjs';
import { V as VAlert } from './VAlert-1f74cb21.mjs';
import { V as VList, a as VListItem } from './VList-f255b9a7.mjs';
import { V as VTextField } from './VTextField-75698ea0.mjs';
import { V as VBtn } from './VBtn-3a93cc12.mjs';
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
import 'yup';
import 'yup-locale-pt';
import 'moment';
import './tag-a1f3d414.mjs';
import './VImg-b87ba832.mjs';
import './VAvatar-eebf826c.mjs';
import './index-da71ab58.mjs';
import './ssrBoot-49241434.mjs';
import './VDivider-1f7ddb31.mjs';
import './forwardRefs-80fc40bb.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "give-back",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const auth = useAuth();
    const id = route.params.id;
    const errors = ref({});
    const appointment = ref(null);
    const materials = ref([]);
    const material_name = ref(null);
    const material_id = ref(null);
    const quantity = ref(0);
    const notifications = ref([]);
    const canGiveBack = ref(false);
    async function handleOnGiveBack(name, id2) {
      material_id.value = id2;
      material_name.value = name;
      quantity.value = 0;
    }
    async function giveBack(material) {
      if (await validateQuantity()) {
        const body = {
          appointment_id: Number(appointment.value.id),
          material_id: Number(material.id),
          quantity: Number(quantity.value)
        };
        try {
          await $fetch(`/api/labs/schedule-give-back`, {
            method: "post",
            headers: {
              Authorization: `Bearer ${auth.token}`
            },
            body
          });
          notifications.value.push(`${material.name}(${quantity.value} ${material.metric.toLowerCase()}) retornados`);
          material_id.value = null;
          quantity.value = 0;
          await refresh();
        } catch (err) {
        }
      }
    }
    async function validateQuantity() {
      errors.value = {};
      try {
        await EntrySchema.validate({
          amount: Number(quantity.value)
        });
        if (Number(quantity.value) < 0) {
          errors.value["quantity"] = "Voc\xEA n\xE3o pode devolver uma quantidade negativa.";
          return false;
        }
        return true;
      } catch (err) {
        errors.value[err.path] = err.message;
        return false;
      }
    }
    async function getAppointment(id2) {
      const appointment2 = await $fetch(`/api/labs/schedule-view`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
        params: {
          id: id2
        }
      });
      const scheduledFrom = getLocalDateString(appointment2.scheduled_from, "DD/MM/YYYY HH:mm");
      const scheduledTo = getLocalDateString(appointment2.scheduled_to, "DD/MM/YYYY HH:mm");
      const createdDate = getLocalDateString(appointment2.created_at, "DD/MM/YYYY HH:mm");
      return { ...appointment2, scheduledFrom, scheduledTo, createdDate };
    }
    async function getMaterials(id2) {
      return await $fetch(`/api/labs/schedule-materials`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
        params: {
          appointment_id: id2
        }
      });
    }
    async function refresh() {
      materials.value = (await getMaterials(id)).map((material) => {
        material.quantity = Number(material.quantity);
        return material;
      });
      canGiveBack.value = false;
      for (const { quantity: quantity2 } of materials.value) {
        if (quantity2 < 0) {
          canGiveBack.value = true;
          break;
        }
      }
    }
    appointment.value = ([__temp, __restore] = withAsyncContext(() => getAppointment(id)), __temp = await __temp, __restore(), __temp);
    [__temp, __restore] = withAsyncContext(() => refresh()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h6 class="text-h6"> Devolver materiais </h6>`);
      _push(ssrRenderComponent(VCard, {
        class: "mt-2 pb-3",
        "max-width": "644"
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<b${_scopeId}>Laborat\xF3rio:</b> <span class="text-subtitle1"${_scopeId}>${ssrInterpolate(unref(appointment).name)}</span>`);
          } else {
            return [
              createVNode("b", null, "Laborat\xF3rio:"),
              createTextVNode(),
              createVNode("span", { class: "text-subtitle1" }, toDisplayString(unref(appointment).name), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(appointment)) {
              _push2(ssrRenderComponent(VCardText, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-body1"${_scopeId2}>${ssrInterpolate(unref(appointment).scheduledFrom)} / ${ssrInterpolate(unref(appointment).scheduledTo)}</p><p class="body2 text-medium-emphasis"${_scopeId2}> Criado por ${ssrInterpolate(unref(appointment).full_name)} em ${ssrInterpolate(unref(appointment).createdDate)}</p>`);
                    if (unref(canGiveBack)) {
                      _push3(`<div${_scopeId2}><!--[-->`);
                      ssrRenderList(unref(notifications), (message) => {
                        _push3(`<div${_scopeId2}>`);
                        _push3(ssrRenderComponent(VAlert, {
                          type: "success",
                          title: "Tudo certo!",
                          text: message,
                          variant: "tonal"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      });
                      _push3(`<!--]-->`);
                      _push3(ssrRenderComponent(VList, { lines: "one" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(unref(materials), (material) => {
                              _push4(`<div${_scopeId3}>`);
                              if (material.quantity < 0) {
                                _push4(ssrRenderComponent(VListItem, {
                                  key: material.id,
                                  title: material.name,
                                  subtitle: "quantidade para devolver: " + material.quantity + " " + material.metric.toLowerCase()
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    var _a, _b;
                                    if (_push5) {
                                      if (unref(material_id) === material.id) {
                                        _push5(`<div class="d-flex align-start mt-4 mb-6"${_scopeId4}>`);
                                        _push5(ssrRenderComponent(VTextField, {
                                          variant: "outlined",
                                          modelValue: unref(quantity),
                                          "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                          density: "compact",
                                          label: "Quantidade retornada",
                                          type: "number",
                                          min: "0",
                                          max: material.quantity,
                                          "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.quantity) ? [unref(errors).quantity] : ""
                                        }, null, _parent5, _scopeId4));
                                        _push5(ssrRenderComponent(VBtn, {
                                          color: "primary",
                                          variant: "tonal",
                                          class: "ml-2",
                                          onClick: ($event) => giveBack(material)
                                        }, {
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              _push6(` Confirmar `);
                                            } else {
                                              return [
                                                createTextVNode(" Confirmar ")
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                        _push5(`</div>`);
                                      } else {
                                        _push5(`<div${_scopeId4}>`);
                                        _push5(ssrRenderComponent(VBtn, {
                                          color: "primary",
                                          variant: "tonal",
                                          onClick: ($event) => handleOnGiveBack(material.name, material.id)
                                        }, {
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              _push6(`Devolver material `);
                                            } else {
                                              return [
                                                createTextVNode("Devolver material ")
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                        _push5(`</div>`);
                                      }
                                    } else {
                                      return [
                                        unref(material_id) === material.id ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "d-flex align-start mt-4 mb-6"
                                        }, [
                                          createVNode(VTextField, {
                                            variant: "outlined",
                                            modelValue: unref(quantity),
                                            "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                            density: "compact",
                                            label: "Quantidade retornada",
                                            type: "number",
                                            min: "0",
                                            max: material.quantity,
                                            "error-messages": ((_b = unref(errors)) == null ? void 0 : _b.quantity) ? [unref(errors).quantity] : ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "error-messages"]),
                                          createVNode(VBtn, {
                                            color: "primary",
                                            variant: "tonal",
                                            class: "ml-2",
                                            onClick: ($event) => giveBack(material)
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Confirmar ")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])
                                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                          createVNode(VBtn, {
                                            color: "primary",
                                            variant: "tonal",
                                            onClick: ($event) => handleOnGiveBack(material.name, material.id)
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Devolver material ")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])
                                        ]))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                            });
                            _push4(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(materials), (material) => {
                                return openBlock(), createBlock("div", null, [
                                  material.quantity < 0 ? (openBlock(), createBlock(VListItem, {
                                    key: material.id,
                                    title: material.name,
                                    subtitle: "quantidade para devolver: " + material.quantity + " " + material.metric.toLowerCase()
                                  }, {
                                    default: withCtx(() => {
                                      var _a;
                                      return [
                                        unref(material_id) === material.id ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "d-flex align-start mt-4 mb-6"
                                        }, [
                                          createVNode(VTextField, {
                                            variant: "outlined",
                                            modelValue: unref(quantity),
                                            "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                            density: "compact",
                                            label: "Quantidade retornada",
                                            type: "number",
                                            min: "0",
                                            max: material.quantity,
                                            "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.quantity) ? [unref(errors).quantity] : ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "error-messages"]),
                                          createVNode(VBtn, {
                                            color: "primary",
                                            variant: "tonal",
                                            class: "ml-2",
                                            onClick: ($event) => giveBack(material)
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Confirmar ")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])
                                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                          createVNode(VBtn, {
                                            color: "primary",
                                            variant: "tonal",
                                            onClick: ($event) => handleOnGiveBack(material.name, material.id)
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Devolver material ")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])
                                        ]))
                                      ];
                                    }),
                                    _: 2
                                  }, 1032, ["title", "subtitle"])) : createCommentVNode("", true)
                                ]);
                              }), 256))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<div${_scopeId2}>`);
                      _push3(ssrRenderComponent(VAlert, {
                        type: "info",
                        title: "Tudo certo!",
                        text: "N\xE3o h\xE1 materiais para devolver restantes",
                        variant: "tonal"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    }
                  } else {
                    return [
                      createVNode("p", { class: "text-body1" }, toDisplayString(unref(appointment).scheduledFrom) + " / " + toDisplayString(unref(appointment).scheduledTo), 1),
                      createVNode("p", { class: "body2 text-medium-emphasis" }, " Criado por " + toDisplayString(unref(appointment).full_name) + " em " + toDisplayString(unref(appointment).createdDate), 1),
                      unref(canGiveBack) ? (openBlock(), createBlock("div", { key: 0 }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(notifications), (message) => {
                          return openBlock(), createBlock("div", null, [
                            createVNode(VAlert, {
                              type: "success",
                              title: "Tudo certo!",
                              text: message,
                              variant: "tonal"
                            }, null, 8, ["text"])
                          ]);
                        }), 256)),
                        createVNode(VList, { lines: "one" }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(materials), (material) => {
                              return openBlock(), createBlock("div", null, [
                                material.quantity < 0 ? (openBlock(), createBlock(VListItem, {
                                  key: material.id,
                                  title: material.name,
                                  subtitle: "quantidade para devolver: " + material.quantity + " " + material.metric.toLowerCase()
                                }, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      unref(material_id) === material.id ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "d-flex align-start mt-4 mb-6"
                                      }, [
                                        createVNode(VTextField, {
                                          variant: "outlined",
                                          modelValue: unref(quantity),
                                          "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                          density: "compact",
                                          label: "Quantidade retornada",
                                          type: "number",
                                          min: "0",
                                          max: material.quantity,
                                          "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.quantity) ? [unref(errors).quantity] : ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "error-messages"]),
                                        createVNode(VBtn, {
                                          color: "primary",
                                          variant: "tonal",
                                          class: "ml-2",
                                          onClick: ($event) => giveBack(material)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Confirmar ")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                        createVNode(VBtn, {
                                          color: "primary",
                                          variant: "tonal",
                                          onClick: ($event) => handleOnGiveBack(material.name, material.id)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Devolver material ")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ]))
                                    ];
                                  }),
                                  _: 2
                                }, 1032, ["title", "subtitle"])) : createCommentVNode("", true)
                              ]);
                            }), 256))
                          ]),
                          _: 1
                        })
                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode(VAlert, {
                          type: "info",
                          title: "Tudo certo!",
                          text: "N\xE3o h\xE1 materiais para devolver restantes",
                          variant: "tonal"
                        })
                      ]))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(appointment) ? (openBlock(), createBlock(VCardText, { key: 0 }, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-body1" }, toDisplayString(unref(appointment).scheduledFrom) + " / " + toDisplayString(unref(appointment).scheduledTo), 1),
                  createVNode("p", { class: "body2 text-medium-emphasis" }, " Criado por " + toDisplayString(unref(appointment).full_name) + " em " + toDisplayString(unref(appointment).createdDate), 1),
                  unref(canGiveBack) ? (openBlock(), createBlock("div", { key: 0 }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(notifications), (message) => {
                      return openBlock(), createBlock("div", null, [
                        createVNode(VAlert, {
                          type: "success",
                          title: "Tudo certo!",
                          text: message,
                          variant: "tonal"
                        }, null, 8, ["text"])
                      ]);
                    }), 256)),
                    createVNode(VList, { lines: "one" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(materials), (material) => {
                          return openBlock(), createBlock("div", null, [
                            material.quantity < 0 ? (openBlock(), createBlock(VListItem, {
                              key: material.id,
                              title: material.name,
                              subtitle: "quantidade para devolver: " + material.quantity + " " + material.metric.toLowerCase()
                            }, {
                              default: withCtx(() => {
                                var _a;
                                return [
                                  unref(material_id) === material.id ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "d-flex align-start mt-4 mb-6"
                                  }, [
                                    createVNode(VTextField, {
                                      variant: "outlined",
                                      modelValue: unref(quantity),
                                      "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                      density: "compact",
                                      label: "Quantidade retornada",
                                      type: "number",
                                      min: "0",
                                      max: material.quantity,
                                      "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.quantity) ? [unref(errors).quantity] : ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "error-messages"]),
                                    createVNode(VBtn, {
                                      color: "primary",
                                      variant: "tonal",
                                      class: "ml-2",
                                      onClick: ($event) => giveBack(material)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Confirmar ")
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"])
                                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                    createVNode(VBtn, {
                                      color: "primary",
                                      variant: "tonal",
                                      onClick: ($event) => handleOnGiveBack(material.name, material.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Devolver material ")
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"])
                                  ]))
                                ];
                              }),
                              _: 2
                            }, 1032, ["title", "subtitle"])) : createCommentVNode("", true)
                          ]);
                        }), 256))
                      ]),
                      _: 1
                    })
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode(VAlert, {
                      type: "info",
                      title: "Tudo certo!",
                      text: "N\xE3o h\xE1 materiais para devolver restantes",
                      variant: "tonal"
                    })
                  ]))
                ]),
                _: 1
              })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/schedules/[id]/give-back.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=give-back-34de63ef.mjs.map
