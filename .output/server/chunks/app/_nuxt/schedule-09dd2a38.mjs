import { useSSRContext, defineComponent, withCtx, createTextVNode, createVNode, ref, withAsyncContext, mergeProps, unref, isRef, withDirectives, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './auth-541611ee.mjs';
import { S as ScheduleSchema, a as ScheduleMaterialSchema } from './validation-64a05837.mjs';
import { vMaska } from 'maska';
import { g as getMoment } from './formatter-0cf2655f.mjs';
import { V as VForm } from './VForm-e1cdeb50.mjs';
import { V as VRow, a as VCol } from './VRow-6b2a6e40.mjs';
import { V as VAlert } from './VAlert-1f74cb21.mjs';
import { V as VBtn } from './VBtn-3a93cc12.mjs';
import { V as VSelect, a as VSnackbar } from './VSnackbar-045c24c8.mjs';
import { V as VTextField } from './VTextField-75698ea0.mjs';
import { V as VList, a as VListItem } from './VList-f255b9a7.mjs';
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
import 'yup';
import 'yup-locale-pt';
import 'moment';
import 'moment/moment.js';
import './tag-a1f3d414.mjs';
import './forwardRefs-80fc40bb.mjs';
import './VImg-b87ba832.mjs';
import './VMenu-9a09071e.mjs';
import './scopeId-e7d4fba3.mjs';
import './index-da71ab58.mjs';
import './VAvatar-eebf826c.mjs';
import './ssrBoot-49241434.mjs';
import './VDivider-1f7ddb31.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "schedule-form",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const auth = useAuth();
    const options = { mask: "##/##/#### ##:##" };
    const quantity = ref(0);
    const material_id = ref(null);
    const availableMaterials = ref([]);
    const materials = ref([]);
    const lab_id = ref(null);
    const note = ref(null);
    const scheduled_from = ref(null);
    const scheduled_to = ref(null);
    const labs = ref([]);
    const errors = ref({});
    const fatalError = ref(null);
    const created = ref(null);
    async function validate() {
      errors.value = {};
      const data = {
        scheduled_to: scheduled_to.value,
        scheduled_from: scheduled_from.value,
        lab_id: Number(lab_id.value),
        note: note.value || ""
      };
      try {
        await ScheduleSchema.validate(data);
        const scheduledFrom = getMoment(data.scheduled_from, "DD/MM/YYYY HH:mm");
        const scheduledTo = getMoment(data.scheduled_to, "DD/MM/YYYY HH:mm");
        if (!scheduledFrom || !scheduledTo) {
          if (!scheduledFrom)
            errors.value.scheduled_from = "A data de in\xEDcio n\xE3o pode ser inferior a data de in\xEDcio.";
          else if (!scheduledTo) {
            errors.value.scheduled_to = "A data de fim n\xE3o pode ser inferior a data de in\xEDcio.";
          }
        } else if (scheduledFrom.unix() > scheduledTo.unix()) {
          errors.value.scheduled_to = "A data de fim n\xE3o pode ser inferior a data de in\xEDcio.";
          return false;
        } else if (scheduledFrom.unix() === scheduledTo.unix()) {
          errors.value.scheduled_to = "A data de fim n\xE3o pode ser igual a data de in\xEDcio.";
        }
        if (materials.value.length > 0)
          for (const { quantity: quantity2, material_id: material_id2 } of materials.value) {
            await ScheduleMaterialSchema.validate({ quantity: quantity2, material_id: material_id2 });
            const hasAvailableQuantity = await $fetch("/api/labs/check-material-quantity", {
              method: "get",
              headers: {
                Authorization: `Bearer ${auth.token}`
              },
              params: { quantity: quantity2, material_id: material_id2 }
            });
            if (!hasAvailableQuantity) {
              material_id2.value = material_id2;
              quantity2.value = quantity2;
              errors.value["quantity"] = "N\xE3o h\xE1 quantidade em estoque para esta reserva.";
              return false;
            }
          }
        return true;
      } catch (err) {
        console.error(err);
        errors.value[err.path] = err.message;
        return false;
      }
    }
    async function validateMaterials() {
      errors.value = {};
      const data = {
        material_id: Number(material_id.value),
        quantity: Number(quantity.value)
      };
      try {
        await ScheduleMaterialSchema.validate(data);
        const hasAvailableQuantity = await $fetch("/api/labs/check-material-quantity", {
          method: "get",
          headers: {
            Authorization: `Bearer ${auth.token}`
          },
          params: data
        });
        if (!hasAvailableQuantity) {
          errors.value["quantity"] = "N\xE3o h\xE1 quantidade em estoque para esta reserva.";
          return false;
        }
        return true;
      } catch (err) {
        errors.value[err.path] = err.message;
        return false;
      }
    }
    async function getLabs() {
      return await $fetch("/api/labs", {
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
    }
    async function getMaterials() {
      return await $fetch("/api/materials", {
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
    }
    async function schedule() {
      try {
        const scheduledFrom = getMoment(scheduled_from.value, "DD/MM/YYYY HH:mm");
        const scheduledTo = getMoment(scheduled_to.value, "DD/MM/YYYY HH:mm");
        const body = {
          scheduled_from: scheduledFrom == null ? void 0 : scheduledFrom.utc().format("DD/MM/YYYY HH:mm"),
          scheduled_to: scheduledTo == null ? void 0 : scheduledTo.utc().format("DD/MM/YYYY HH:mm"),
          lab_id: Number(lab_id.value),
          note: note.value || "",
          materials: materials.value
        };
        created.value = await $fetch(`/api/labs/schedule`, {
          method: "post",
          headers: {
            Authorization: `Bearer ${auth.token}`
          },
          body
        });
      } catch (err) {
        errors.value["lab_id"] = err.response.statusText;
      }
    }
    async function handleOnSchedule() {
      if (await validate()) {
        await schedule();
      }
    }
    async function handleOnAddMaterial() {
      if (await validateMaterials()) {
        for (const material of availableMaterials.value) {
          if (material.id == material_id.value) {
            const arr = [...materials.value].filter(({ material_id: material_id2 }) => {
              return material_id2 !== material.id;
            });
            arr.push({
              material_id: material_id.value,
              quantity: quantity.value,
              name: material.name
            });
            materials.value = arr;
            break;
          }
        }
      }
    }
    labs.value = ([__temp, __restore] = withAsyncContext(() => getLabs()), __temp = await __temp, __restore(), __temp);
    availableMaterials.value = ([__temp, __restore] = withAsyncContext(() => getMaterials()), __temp = await __temp, __restore(), __temp).filter(({ quantity: quantity2 }) => quantity2 > 0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VForm, mergeProps({ class: "px-3" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(created)) {
              _push2(ssrRenderComponent(VRow, { class: "pl-2 pr-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VAlert, {
                                  type: "info",
                                  title: "Laborat\xF3rio agendado",
                                  text: "O laborat\xF3rio foi agendado com sucesso!",
                                  variant: "tonal"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VAlert, {
                                    type: "info",
                                    title: "Laborat\xF3rio agendado",
                                    text: "O laborat\xF3rio foi agendado com sucesso!",
                                    variant: "tonal"
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VRow, { class: "mt-4 mb-1" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VBtn, {
                                  color: "primary",
                                  to: "/dashboard/schedules"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Ir para agenda `);
                                    } else {
                                      return [
                                        createTextVNode(" Ir para agenda ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VBtn, {
                                    color: "primary",
                                    to: "/dashboard/schedules"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Ir para agenda ")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VAlert, {
                                  type: "info",
                                  title: "Laborat\xF3rio agendado",
                                  text: "O laborat\xF3rio foi agendado com sucesso!",
                                  variant: "tonal"
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, { class: "mt-4 mb-1" }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  color: "primary",
                                  to: "/dashboard/schedules"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Ir para agenda ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VAlert, {
                                type: "info",
                                title: "Laborat\xF3rio agendado",
                                text: "O laborat\xF3rio foi agendado com sucesso!",
                                variant: "tonal"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, { class: "mt-4 mb-1" }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                color: "primary",
                                to: "/dashboard/schedules"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Ir para agenda ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCol, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    var _a, _b;
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VSelect, {
                                        modelValue: unref(lab_id),
                                        "onUpdate:modelValue": ($event) => isRef(lab_id) ? lab_id.value = $event : null,
                                        variant: "outlined",
                                        label: "Laborat\xF3rio",
                                        clearable: "",
                                        items: unref(labs),
                                        "item-title": "name",
                                        "item-value": "id",
                                        "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.lab_id) ? [unref(errors).lab_id] : ""
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VSelect, {
                                          modelValue: unref(lab_id),
                                          "onUpdate:modelValue": ($event) => isRef(lab_id) ? lab_id.value = $event : null,
                                          variant: "outlined",
                                          label: "Laborat\xF3rio",
                                          clearable: "",
                                          items: unref(labs),
                                          "item-title": "name",
                                          "item-value": "id",
                                          "error-messages": ((_b = unref(errors)) == null ? void 0 : _b.lab_id) ? [unref(errors).lab_id] : ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => {
                                      var _a;
                                      return [
                                        createVNode(VSelect, {
                                          modelValue: unref(lab_id),
                                          "onUpdate:modelValue": ($event) => isRef(lab_id) ? lab_id.value = $event : null,
                                          variant: "outlined",
                                          label: "Laborat\xF3rio",
                                          clearable: "",
                                          items: unref(labs),
                                          "item-title": "name",
                                          "item-value": "id",
                                          "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.lab_id) ? [unref(errors).lab_id] : ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                                      ];
                                    }),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCol, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    var _a, _b;
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VTextField, mergeProps({
                                        variant: "outlined",
                                        modelValue: unref(scheduled_from),
                                        "onUpdate:modelValue": ($event) => isRef(scheduled_from) ? scheduled_from.value = $event : null,
                                        clearable: "",
                                        label: "Data de in\xEDcio(Reserva)",
                                        "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.scheduled_from) ? [unref(errors).scheduled_from] : ""
                                      }, ssrGetDirectiveProps(_ctx, unref(vMaska), void 0, options)), null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        withDirectives(createVNode(VTextField, {
                                          variant: "outlined",
                                          modelValue: unref(scheduled_from),
                                          "onUpdate:modelValue": ($event) => isRef(scheduled_from) ? scheduled_from.value = $event : null,
                                          clearable: "",
                                          label: "Data de in\xEDcio(Reserva)",
                                          "error-messages": ((_b = unref(errors)) == null ? void 0 : _b.scheduled_from) ? [unref(errors).scheduled_from] : ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]), [
                                          [unref(vMaska), void 0, options]
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCol, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    var _a, _b;
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VTextField, mergeProps({
                                        variant: "outlined",
                                        modelValue: unref(scheduled_to),
                                        "onUpdate:modelValue": ($event) => isRef(scheduled_to) ? scheduled_to.value = $event : null,
                                        clearable: "",
                                        label: "Data de fim(Reserva)",
                                        "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.scheduled_to) ? [unref(errors).scheduled_to] : ""
                                      }, ssrGetDirectiveProps(_ctx, unref(vMaska), void 0, options)), null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        withDirectives(createVNode(VTextField, {
                                          variant: "outlined",
                                          modelValue: unref(scheduled_to),
                                          "onUpdate:modelValue": ($event) => isRef(scheduled_to) ? scheduled_to.value = $event : null,
                                          clearable: "",
                                          label: "Data de fim(Reserva)",
                                          "error-messages": ((_b = unref(errors)) == null ? void 0 : _b.scheduled_to) ? [unref(errors).scheduled_to] : ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]), [
                                          [unref(vMaska), void 0, options]
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => {
                                      var _a;
                                      return [
                                        withDirectives(createVNode(VTextField, {
                                          variant: "outlined",
                                          modelValue: unref(scheduled_from),
                                          "onUpdate:modelValue": ($event) => isRef(scheduled_from) ? scheduled_from.value = $event : null,
                                          clearable: "",
                                          label: "Data de in\xEDcio(Reserva)",
                                          "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.scheduled_from) ? [unref(errors).scheduled_from] : ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]), [
                                          [unref(vMaska), void 0, options]
                                        ])
                                      ];
                                    }),
                                    _: 1
                                  }),
                                  createVNode(VCol, null, {
                                    default: withCtx(() => {
                                      var _a;
                                      return [
                                        withDirectives(createVNode(VTextField, {
                                          variant: "outlined",
                                          modelValue: unref(scheduled_to),
                                          "onUpdate:modelValue": ($event) => isRef(scheduled_to) ? scheduled_to.value = $event : null,
                                          clearable: "",
                                          label: "Data de fim(Reserva)",
                                          "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.scheduled_to) ? [unref(errors).scheduled_to] : ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]), [
                                          [unref(vMaska), void 0, options]
                                        ])
                                      ];
                                    }),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCol, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    var _a, _b;
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VTextField, {
                                        variant: "outlined",
                                        modelValue: unref(note),
                                        "onUpdate:modelValue": ($event) => isRef(note) ? note.value = $event : null,
                                        clearable: "",
                                        label: "Motivo da reserva",
                                        "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.note) ? [unref(errors).note] : ""
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VTextField, {
                                          variant: "outlined",
                                          modelValue: unref(note),
                                          "onUpdate:modelValue": ($event) => isRef(note) ? note.value = $event : null,
                                          clearable: "",
                                          label: "Motivo da reserva",
                                          "error-messages": ((_b = unref(errors)) == null ? void 0 : _b.note) ? [unref(errors).note] : ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => {
                                      var _a;
                                      return [
                                        createVNode(VTextField, {
                                          variant: "outlined",
                                          modelValue: unref(note),
                                          "onUpdate:modelValue": ($event) => isRef(note) ? note.value = $event : null,
                                          clearable: "",
                                          label: "Motivo da reserva",
                                          "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.note) ? [unref(errors).note] : ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                      ];
                                    }),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<p class="text-subtitle-1 text-medium-emphasis mt-2 mb-2"${_scopeId3}> Selecione os materiais necess\xE1rios para a reserva do laborat\xF3rio abaixo: </p>`);
                          if (unref(materials).length > 0) {
                            _push4(ssrRenderComponent(VRow, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(VCol, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VList, { lines: "one" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<!--[-->`);
                                              ssrRenderList(unref(materials), ({ id, name, quantity: quantity2 }, index) => {
                                                _push7(ssrRenderComponent(VListItem, {
                                                  key: id,
                                                  title: index + 1 + ") " + name,
                                                  subtitle: "quantidade: " + quantity2
                                                }, null, _parent7, _scopeId6));
                                              });
                                              _push7(`<!--]-->`);
                                            } else {
                                              return [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(materials), ({ id, name, quantity: quantity2 }, index) => {
                                                  return openBlock(), createBlock(VListItem, {
                                                    key: id,
                                                    title: index + 1 + ") " + name,
                                                    subtitle: "quantidade: " + quantity2
                                                  }, null, 8, ["title", "subtitle"]);
                                                }), 128))
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VList, { lines: "one" }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(materials), ({ id, name, quantity: quantity2 }, index) => {
                                                return openBlock(), createBlock(VListItem, {
                                                  key: id,
                                                  title: index + 1 + ") " + name,
                                                  subtitle: "quantidade: " + quantity2
                                                }, null, 8, ["title", "subtitle"]);
                                              }), 128))
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(VCol, null, {
                                      default: withCtx(() => [
                                        createVNode(VList, { lines: "one" }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(materials), ({ id, name, quantity: quantity2 }, index) => {
                                              return openBlock(), createBlock(VListItem, {
                                                key: id,
                                                title: index + 1 + ") " + name,
                                                subtitle: "quantidade: " + quantity2
                                              }, null, 8, ["title", "subtitle"]);
                                            }), 128))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(ssrRenderComponent(VRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCol, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    var _a, _b;
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VSelect, {
                                        variant: "outlined",
                                        label: "Material",
                                        clearable: "",
                                        modelValue: unref(material_id),
                                        "onUpdate:modelValue": ($event) => isRef(material_id) ? material_id.value = $event : null,
                                        items: unref(availableMaterials),
                                        "item-title": "name",
                                        "item-value": "id",
                                        "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.material_id) ? [unref(errors).material_id] : ""
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VSelect, {
                                          variant: "outlined",
                                          label: "Material",
                                          clearable: "",
                                          modelValue: unref(material_id),
                                          "onUpdate:modelValue": ($event) => isRef(material_id) ? material_id.value = $event : null,
                                          items: unref(availableMaterials),
                                          "item-title": "name",
                                          "item-value": "id",
                                          "error-messages": ((_b = unref(errors)) == null ? void 0 : _b.material_id) ? [unref(errors).material_id] : ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCol, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    var _a, _b;
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VTextField, {
                                        variant: "outlined",
                                        modelValue: unref(quantity),
                                        "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                        clearable: "",
                                        label: "Quantidade",
                                        "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.quantity) ? [unref(errors).quantity] : ""
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VTextField, {
                                          variant: "outlined",
                                          modelValue: unref(quantity),
                                          "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                          clearable: "",
                                          label: "Quantidade",
                                          "error-messages": ((_b = unref(errors)) == null ? void 0 : _b.quantity) ? [unref(errors).quantity] : ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCol, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VBtn, {
                                        color: "primary",
                                        onClick: handleOnAddMaterial
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Adicionar `);
                                          } else {
                                            return [
                                              createTextVNode(" Adicionar ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VBtn, {
                                          color: "primary",
                                          onClick: handleOnAddMaterial
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Adicionar ")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => {
                                      var _a;
                                      return [
                                        createVNode(VSelect, {
                                          variant: "outlined",
                                          label: "Material",
                                          clearable: "",
                                          modelValue: unref(material_id),
                                          "onUpdate:modelValue": ($event) => isRef(material_id) ? material_id.value = $event : null,
                                          items: unref(availableMaterials),
                                          "item-title": "name",
                                          "item-value": "id",
                                          "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.material_id) ? [unref(errors).material_id] : ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
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
                                          modelValue: unref(quantity),
                                          "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                          clearable: "",
                                          label: "Quantidade",
                                          "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.quantity) ? [unref(errors).quantity] : ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                      ];
                                    }),
                                    _: 1
                                  }),
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        color: "primary",
                                        onClick: handleOnAddMaterial
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Adicionar ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          if (unref(fatalError)) {
                            _push4(ssrRenderComponent(VRow, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(VCol, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VSnackbar, {
                                          modelValue: unref(fatalError),
                                          "onUpdate:modelValue": ($event) => isRef(fatalError) ? fatalError.value = $event : null,
                                          "multi-line": ""
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(unref(fatalError))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(unref(fatalError)), 1)
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VSnackbar, {
                                            modelValue: unref(fatalError),
                                            "onUpdate:modelValue": ($event) => isRef(fatalError) ? fatalError.value = $event : null,
                                            "multi-line": ""
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(unref(fatalError)), 1)
                                            ]),
                                            _: 1
                                          }, 8, ["modelValue", "onUpdate:modelValue"])
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(VCol, null, {
                                      default: withCtx(() => [
                                        createVNode(VSnackbar, {
                                          modelValue: unref(fatalError),
                                          "onUpdate:modelValue": ($event) => isRef(fatalError) ? fatalError.value = $event : null,
                                          "multi-line": ""
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(fatalError)), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(ssrRenderComponent(VRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCol, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VBtn, {
                                        color: "primary",
                                        onClick: handleOnSchedule
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Reservar `);
                                          } else {
                                            return [
                                              createTextVNode(" Reservar ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VBtn, {
                                          color: "primary",
                                          onClick: handleOnSchedule
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Reservar ")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        color: "primary",
                                        onClick: handleOnSchedule
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Reservar ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, null, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      createVNode(VSelect, {
                                        modelValue: unref(lab_id),
                                        "onUpdate:modelValue": ($event) => isRef(lab_id) ? lab_id.value = $event : null,
                                        variant: "outlined",
                                        label: "Laborat\xF3rio",
                                        clearable: "",
                                        items: unref(labs),
                                        "item-title": "name",
                                        "item-value": "id",
                                        "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.lab_id) ? [unref(errors).lab_id] : ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                                    ];
                                  }),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, null, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      withDirectives(createVNode(VTextField, {
                                        variant: "outlined",
                                        modelValue: unref(scheduled_from),
                                        "onUpdate:modelValue": ($event) => isRef(scheduled_from) ? scheduled_from.value = $event : null,
                                        clearable: "",
                                        label: "Data de in\xEDcio(Reserva)",
                                        "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.scheduled_from) ? [unref(errors).scheduled_from] : ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]), [
                                        [unref(vMaska), void 0, options]
                                      ])
                                    ];
                                  }),
                                  _: 1
                                }),
                                createVNode(VCol, null, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      withDirectives(createVNode(VTextField, {
                                        variant: "outlined",
                                        modelValue: unref(scheduled_to),
                                        "onUpdate:modelValue": ($event) => isRef(scheduled_to) ? scheduled_to.value = $event : null,
                                        clearable: "",
                                        label: "Data de fim(Reserva)",
                                        "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.scheduled_to) ? [unref(errors).scheduled_to] : ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]), [
                                        [unref(vMaska), void 0, options]
                                      ])
                                    ];
                                  }),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, null, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      createVNode(VTextField, {
                                        variant: "outlined",
                                        modelValue: unref(note),
                                        "onUpdate:modelValue": ($event) => isRef(note) ? note.value = $event : null,
                                        clearable: "",
                                        label: "Motivo da reserva",
                                        "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.note) ? [unref(errors).note] : ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                    ];
                                  }),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "text-subtitle-1 text-medium-emphasis mt-2 mb-2" }, " Selecione os materiais necess\xE1rios para a reserva do laborat\xF3rio abaixo: "),
                            unref(materials).length > 0 ? (openBlock(), createBlock(VRow, { key: 0 }, {
                              default: withCtx(() => [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VList, { lines: "one" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(materials), ({ id, name, quantity: quantity2 }, index) => {
                                          return openBlock(), createBlock(VListItem, {
                                            key: id,
                                            title: index + 1 + ") " + name,
                                            subtitle: "quantidade: " + quantity2
                                          }, null, 8, ["title", "subtitle"]);
                                        }), 128))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, null, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      createVNode(VSelect, {
                                        variant: "outlined",
                                        label: "Material",
                                        clearable: "",
                                        modelValue: unref(material_id),
                                        "onUpdate:modelValue": ($event) => isRef(material_id) ? material_id.value = $event : null,
                                        items: unref(availableMaterials),
                                        "item-title": "name",
                                        "item-value": "id",
                                        "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.material_id) ? [unref(errors).material_id] : ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
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
                                        modelValue: unref(quantity),
                                        "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                        clearable: "",
                                        label: "Quantidade",
                                        "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.quantity) ? [unref(errors).quantity] : ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                    ];
                                  }),
                                  _: 1
                                }),
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      color: "primary",
                                      onClick: handleOnAddMaterial
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Adicionar ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            unref(fatalError) ? (openBlock(), createBlock(VRow, { key: 1 }, {
                              default: withCtx(() => [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VSnackbar, {
                                      modelValue: unref(fatalError),
                                      "onUpdate:modelValue": ($event) => isRef(fatalError) ? fatalError.value = $event : null,
                                      "multi-line": ""
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(fatalError)), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      color: "primary",
                                      onClick: handleOnSchedule
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Reservar ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    createVNode(VSelect, {
                                      modelValue: unref(lab_id),
                                      "onUpdate:modelValue": ($event) => isRef(lab_id) ? lab_id.value = $event : null,
                                      variant: "outlined",
                                      label: "Laborat\xF3rio",
                                      clearable: "",
                                      items: unref(labs),
                                      "item-title": "name",
                                      "item-value": "id",
                                      "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.lab_id) ? [unref(errors).lab_id] : ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                                  ];
                                }),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    withDirectives(createVNode(VTextField, {
                                      variant: "outlined",
                                      modelValue: unref(scheduled_from),
                                      "onUpdate:modelValue": ($event) => isRef(scheduled_from) ? scheduled_from.value = $event : null,
                                      clearable: "",
                                      label: "Data de in\xEDcio(Reserva)",
                                      "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.scheduled_from) ? [unref(errors).scheduled_from] : ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]), [
                                      [unref(vMaska), void 0, options]
                                    ])
                                  ];
                                }),
                                _: 1
                              }),
                              createVNode(VCol, null, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    withDirectives(createVNode(VTextField, {
                                      variant: "outlined",
                                      modelValue: unref(scheduled_to),
                                      "onUpdate:modelValue": ($event) => isRef(scheduled_to) ? scheduled_to.value = $event : null,
                                      clearable: "",
                                      label: "Data de fim(Reserva)",
                                      "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.scheduled_to) ? [unref(errors).scheduled_to] : ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]), [
                                      [unref(vMaska), void 0, options]
                                    ])
                                  ];
                                }),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    createVNode(VTextField, {
                                      variant: "outlined",
                                      modelValue: unref(note),
                                      "onUpdate:modelValue": ($event) => isRef(note) ? note.value = $event : null,
                                      clearable: "",
                                      label: "Motivo da reserva",
                                      "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.note) ? [unref(errors).note] : ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ];
                                }),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "text-subtitle-1 text-medium-emphasis mt-2 mb-2" }, " Selecione os materiais necess\xE1rios para a reserva do laborat\xF3rio abaixo: "),
                          unref(materials).length > 0 ? (openBlock(), createBlock(VRow, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VList, { lines: "one" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(materials), ({ id, name, quantity: quantity2 }, index) => {
                                        return openBlock(), createBlock(VListItem, {
                                          key: id,
                                          title: index + 1 + ") " + name,
                                          subtitle: "quantidade: " + quantity2
                                        }, null, 8, ["title", "subtitle"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    createVNode(VSelect, {
                                      variant: "outlined",
                                      label: "Material",
                                      clearable: "",
                                      modelValue: unref(material_id),
                                      "onUpdate:modelValue": ($event) => isRef(material_id) ? material_id.value = $event : null,
                                      items: unref(availableMaterials),
                                      "item-title": "name",
                                      "item-value": "id",
                                      "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.material_id) ? [unref(errors).material_id] : ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
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
                                      modelValue: unref(quantity),
                                      "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                      clearable: "",
                                      label: "Quantidade",
                                      "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.quantity) ? [unref(errors).quantity] : ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ];
                                }),
                                _: 1
                              }),
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    color: "primary",
                                    onClick: handleOnAddMaterial
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Adicionar ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          unref(fatalError) ? (openBlock(), createBlock(VRow, { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VSnackbar, {
                                    modelValue: unref(fatalError),
                                    "onUpdate:modelValue": ($event) => isRef(fatalError) ? fatalError.value = $event : null,
                                    "multi-line": ""
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(fatalError)), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    color: "primary",
                                    onClick: handleOnSchedule
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Reservar ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
          } else {
            return [
              unref(created) ? (openBlock(), createBlock(VRow, {
                key: 0,
                class: "pl-2 pr-2"
              }, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VAlert, {
                            type: "info",
                            title: "Laborat\xF3rio agendado",
                            text: "O laborat\xF3rio foi agendado com sucesso!",
                            variant: "tonal"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, { class: "mt-4 mb-1" }, {
                        default: withCtx(() => [
                          createVNode(VBtn, {
                            color: "primary",
                            to: "/dashboard/schedules"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Ir para agenda ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : (openBlock(), createBlock(VRow, { key: 1 }, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createVNode(VSelect, {
                                  modelValue: unref(lab_id),
                                  "onUpdate:modelValue": ($event) => isRef(lab_id) ? lab_id.value = $event : null,
                                  variant: "outlined",
                                  label: "Laborat\xF3rio",
                                  clearable: "",
                                  items: unref(labs),
                                  "item-title": "name",
                                  "item-value": "id",
                                  "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.lab_id) ? [unref(errors).lab_id] : ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                              ];
                            }),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                withDirectives(createVNode(VTextField, {
                                  variant: "outlined",
                                  modelValue: unref(scheduled_from),
                                  "onUpdate:modelValue": ($event) => isRef(scheduled_from) ? scheduled_from.value = $event : null,
                                  clearable: "",
                                  label: "Data de in\xEDcio(Reserva)",
                                  "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.scheduled_from) ? [unref(errors).scheduled_from] : ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]), [
                                  [unref(vMaska), void 0, options]
                                ])
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(VCol, null, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                withDirectives(createVNode(VTextField, {
                                  variant: "outlined",
                                  modelValue: unref(scheduled_to),
                                  "onUpdate:modelValue": ($event) => isRef(scheduled_to) ? scheduled_to.value = $event : null,
                                  clearable: "",
                                  label: "Data de fim(Reserva)",
                                  "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.scheduled_to) ? [unref(errors).scheduled_to] : ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]), [
                                  [unref(vMaska), void 0, options]
                                ])
                              ];
                            }),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createVNode(VTextField, {
                                  variant: "outlined",
                                  modelValue: unref(note),
                                  "onUpdate:modelValue": ($event) => isRef(note) ? note.value = $event : null,
                                  clearable: "",
                                  label: "Motivo da reserva",
                                  "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.note) ? [unref(errors).note] : ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                              ];
                            }),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("p", { class: "text-subtitle-1 text-medium-emphasis mt-2 mb-2" }, " Selecione os materiais necess\xE1rios para a reserva do laborat\xF3rio abaixo: "),
                      unref(materials).length > 0 ? (openBlock(), createBlock(VRow, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VList, { lines: "one" }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(materials), ({ id, name, quantity: quantity2 }, index) => {
                                    return openBlock(), createBlock(VListItem, {
                                      key: id,
                                      title: index + 1 + ") " + name,
                                      subtitle: "quantidade: " + quantity2
                                    }, null, 8, ["title", "subtitle"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createVNode(VSelect, {
                                  variant: "outlined",
                                  label: "Material",
                                  clearable: "",
                                  modelValue: unref(material_id),
                                  "onUpdate:modelValue": ($event) => isRef(material_id) ? material_id.value = $event : null,
                                  items: unref(availableMaterials),
                                  "item-title": "name",
                                  "item-value": "id",
                                  "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.material_id) ? [unref(errors).material_id] : ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
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
                                  modelValue: unref(quantity),
                                  "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                  clearable: "",
                                  label: "Quantidade",
                                  "error-messages": ((_a = unref(errors)) == null ? void 0 : _a.quantity) ? [unref(errors).quantity] : ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                color: "primary",
                                onClick: handleOnAddMaterial
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Adicionar ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      unref(fatalError) ? (openBlock(), createBlock(VRow, { key: 1 }, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VSnackbar, {
                                modelValue: unref(fatalError),
                                "onUpdate:modelValue": ($event) => isRef(fatalError) ? fatalError.value = $event : null,
                                "multi-line": ""
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(fatalError)), 1)
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                color: "primary",
                                onClick: handleOnSchedule
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Reservar ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/schedule-form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "schedule",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
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
                  _push3(` Agendar laborat\xF3rio `);
                } else {
                  return [
                    createTextVNode(" Agendar laborat\xF3rio ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardSubtitle, null, null, _parent2, _scopeId));
            _push2(`<div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(VCardTitle, null, {
                default: withCtx(() => [
                  createTextVNode(" Agendar laborat\xF3rio ")
                ]),
                _: 1
              }),
              createVNode(VCardSubtitle),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/labs/[id]/schedule.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=schedule-09dd2a38.mjs.map
