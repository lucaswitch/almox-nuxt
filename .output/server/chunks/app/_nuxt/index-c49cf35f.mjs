import { defineComponent, ref, withAsyncContext, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, mergeProps, createCommentVNode, useSSRContext } from 'vue';
import { n as navigateTo } from '../server.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { u as useAuth } from './auth-541611ee.mjs';
import { a as getLocalDateString, g as getMoment, b as getFirstName } from './formatter-0cf2655f.mjs';
import moment from 'moment';
import { V as VRow, a as VCol } from './VRow-6b2a6e40.mjs';
import { V as VCard, c as VCardText } from './VCard-d5f13c14.mjs';
import { V as VList, a as VListItem, b as VListItemTitle } from './VList-f255b9a7.mjs';
import { V as VBtn } from './VBtn-3a93cc12.mjs';
import { V as VTable } from './VTable-ddfcaa96.mjs';
import { a as VMenu } from './VMenu-9a09071e.mjs';
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
import './tag-a1f3d414.mjs';
import './VImg-b87ba832.mjs';
import './VAvatar-eebf826c.mjs';
import './index-da71ab58.mjs';
import './ssrBoot-49241434.mjs';
import './VDivider-1f7ddb31.mjs';
import './forwardRefs-80fc40bb.mjs';
import './scopeId-e7d4fba3.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const auth = useAuth();
    const appointments = ref([]);
    const appointment = ref(null);
    async function handleOnClickRow(value) {
      if (value === null) {
        appointment.value = null;
      } else {
        appointment.value = {
          ...value,
          materials: await $fetch("/api/labs/schedule-materials", {
            method: "get",
            headers: {
              Authorization: `Bearer ${auth.token}`
            },
            params: {
              appointment_id: value.id
            }
          })
        };
      }
    }
    async function handleOnCancel(id) {
      await $fetch("/api/labs/schedule-cancel", {
        method: "post",
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
        body: {
          id
        }
      });
      await refresh();
    }
    async function handleOnGiveBack(id) {
      await navigateTo(`/dashboard/schedules/${id}/give-back`);
    }
    async function getAppointments() {
      return await $fetch("/api/labs/schedules", {
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
    }
    async function refresh() {
      appointments.value = (await getAppointments()).map(({
        created_at,
        full_name,
        scheduled_from,
        scheduled_to,
        ...others
      }) => {
        const format = "DD/MM/YYYY HH:mm";
        const scheduledFrom = getLocalDateString(scheduled_from, format);
        const scheduledTo = getLocalDateString(scheduled_to, format);
        let isFuture = false;
        const scheduledFromDate = getMoment(scheduled_from);
        if (scheduledFromDate && scheduledFromDate.utc().unix() > moment().utc().unix()) {
          isFuture = true;
        }
        const firstName = getFirstName(full_name);
        const createdDate = getLocalDateString(created_at, format);
        return {
          ...others,
          full_name,
          firstName,
          isFuture,
          createdDate,
          scheduledTo,
          scheduledFrom,
          scheduled_from,
          scheduled_to
        };
      });
    }
    [__temp, __restore] = withAsyncContext(() => refresh()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h6 class="text-h6"> Agenda </h6><p class="body2 text-medium-emphasis"> Pressione um dos itens para expandir </p>`);
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(appointment)) {
              _push2(ssrRenderComponent(VCol, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCard, {
                      variant: "flat",
                      "min-width": "400",
                      class: "mx-auto",
                      "prepend-icon": "mdi-calendar"
                    }, {
                      title: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<b${_scopeId3}>Lab:</b> ${ssrInterpolate(unref(appointment).name)}`);
                        } else {
                          return [
                            createVNode("b", null, "Lab:"),
                            createTextVNode(" " + toDisplayString(unref(appointment).name), 1)
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCardText, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<p class="text-body1"${_scopeId4}>${ssrInterpolate(unref(appointment).scheduledFrom)} / ${ssrInterpolate(unref(appointment).scheduledTo)}</p><p class="body2 text-medium-emphasis"${_scopeId4}> Criado por ${ssrInterpolate(unref(appointment).full_name)} em ${ssrInterpolate(unref(appointment).createdDate)}</p>`);
                                if (unref(appointment).materials.length > 0) {
                                  _push5(ssrRenderComponent(VRow, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VCol, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VList, { lines: "one" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`<!--[-->`);
                                                    ssrRenderList(unref(appointment).materials, ({ id, name, quantity }, index) => {
                                                      _push8(ssrRenderComponent(VListItem, {
                                                        key: id,
                                                        title: index + 1 + ") " + name,
                                                        subtitle: "quantidade: " + quantity
                                                      }, null, _parent8, _scopeId7));
                                                    });
                                                    _push8(`<!--]-->`);
                                                  } else {
                                                    return [
                                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(appointment).materials, ({ id, name, quantity }, index) => {
                                                        return openBlock(), createBlock(VListItem, {
                                                          key: id,
                                                          title: index + 1 + ") " + name,
                                                          subtitle: "quantidade: " + quantity
                                                        }, null, 8, ["title", "subtitle"]);
                                                      }), 128))
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VList, { lines: "one" }, {
                                                  default: withCtx(() => [
                                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(appointment).materials, ({ id, name, quantity }, index) => {
                                                      return openBlock(), createBlock(VListItem, {
                                                        key: id,
                                                        title: index + 1 + ") " + name,
                                                        subtitle: "quantidade: " + quantity
                                                      }, null, 8, ["title", "subtitle"]);
                                                    }), 128))
                                                  ]),
                                                  _: 1
                                                })
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VCol, null, {
                                            default: withCtx(() => [
                                              createVNode(VList, { lines: "one" }, {
                                                default: withCtx(() => [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(appointment).materials, ({ id, name, quantity }, index) => {
                                                    return openBlock(), createBlock(VListItem, {
                                                      key: id,
                                                      title: index + 1 + ") " + name,
                                                      subtitle: "quantidade: " + quantity
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
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(ssrRenderComponent(VRow, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VCol, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<p class="body2 text-medium-emphasis"${_scopeId6}> N\xE3o h\xE1 materiais para este dia. </p>`);
                                            } else {
                                              return [
                                                createVNode("p", { class: "body2 text-medium-emphasis" }, " N\xE3o h\xE1 materiais para este dia. ")
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VCol, null, {
                                            default: withCtx(() => [
                                              createVNode("p", { class: "body2 text-medium-emphasis" }, " N\xE3o h\xE1 materiais para este dia. ")
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                }
                                _push5(ssrRenderComponent(VBtn, {
                                  color: "primary",
                                  class: "mt-2",
                                  variant: "tonal",
                                  onClick: ($event) => handleOnClickRow(null)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Fechar `);
                                    } else {
                                      return [
                                        createTextVNode(" Fechar ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode("p", { class: "text-body1" }, toDisplayString(unref(appointment).scheduledFrom) + " / " + toDisplayString(unref(appointment).scheduledTo), 1),
                                  createVNode("p", { class: "body2 text-medium-emphasis" }, " Criado por " + toDisplayString(unref(appointment).full_name) + " em " + toDisplayString(unref(appointment).createdDate), 1),
                                  unref(appointment).materials.length > 0 ? (openBlock(), createBlock(VRow, { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(VCol, null, {
                                        default: withCtx(() => [
                                          createVNode(VList, { lines: "one" }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(appointment).materials, ({ id, name, quantity }, index) => {
                                                return openBlock(), createBlock(VListItem, {
                                                  key: id,
                                                  title: index + 1 + ") " + name,
                                                  subtitle: "quantidade: " + quantity
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
                                  })) : (openBlock(), createBlock(VRow, { key: 1 }, {
                                    default: withCtx(() => [
                                      createVNode(VCol, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "body2 text-medium-emphasis" }, " N\xE3o h\xE1 materiais para este dia. ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })),
                                  createVNode(VBtn, {
                                    color: "primary",
                                    class: "mt-2",
                                    variant: "tonal",
                                    onClick: ($event) => handleOnClickRow(null)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Fechar ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode("p", { class: "text-body1" }, toDisplayString(unref(appointment).scheduledFrom) + " / " + toDisplayString(unref(appointment).scheduledTo), 1),
                                createVNode("p", { class: "body2 text-medium-emphasis" }, " Criado por " + toDisplayString(unref(appointment).full_name) + " em " + toDisplayString(unref(appointment).createdDate), 1),
                                unref(appointment).materials.length > 0 ? (openBlock(), createBlock(VRow, { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(VCol, null, {
                                      default: withCtx(() => [
                                        createVNode(VList, { lines: "one" }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(appointment).materials, ({ id, name, quantity }, index) => {
                                              return openBlock(), createBlock(VListItem, {
                                                key: id,
                                                title: index + 1 + ") " + name,
                                                subtitle: "quantidade: " + quantity
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
                                })) : (openBlock(), createBlock(VRow, { key: 1 }, {
                                  default: withCtx(() => [
                                    createVNode(VCol, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "body2 text-medium-emphasis" }, " N\xE3o h\xE1 materiais para este dia. ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })),
                                createVNode(VBtn, {
                                  color: "primary",
                                  class: "mt-2",
                                  variant: "tonal",
                                  onClick: ($event) => handleOnClickRow(null)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Fechar ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
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
                      createVNode(VCard, {
                        variant: "flat",
                        "min-width": "400",
                        class: "mx-auto",
                        "prepend-icon": "mdi-calendar"
                      }, {
                        title: withCtx(() => [
                          createVNode("b", null, "Lab:"),
                          createTextVNode(" " + toDisplayString(unref(appointment).name), 1)
                        ]),
                        default: withCtx(() => [
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode("p", { class: "text-body1" }, toDisplayString(unref(appointment).scheduledFrom) + " / " + toDisplayString(unref(appointment).scheduledTo), 1),
                              createVNode("p", { class: "body2 text-medium-emphasis" }, " Criado por " + toDisplayString(unref(appointment).full_name) + " em " + toDisplayString(unref(appointment).createdDate), 1),
                              unref(appointment).materials.length > 0 ? (openBlock(), createBlock(VRow, { key: 0 }, {
                                default: withCtx(() => [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode(VList, { lines: "one" }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(appointment).materials, ({ id, name, quantity }, index) => {
                                            return openBlock(), createBlock(VListItem, {
                                              key: id,
                                              title: index + 1 + ") " + name,
                                              subtitle: "quantidade: " + quantity
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
                              })) : (openBlock(), createBlock(VRow, { key: 1 }, {
                                default: withCtx(() => [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "body2 text-medium-emphasis" }, " N\xE3o h\xE1 materiais para este dia. ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })),
                              createVNode(VBtn, {
                                color: "primary",
                                class: "mt-2",
                                variant: "tonal",
                                onClick: ($event) => handleOnClickRow(null)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Fechar ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
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
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(VCol, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTable, { class: "mt-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<thead${_scopeId3}><tr${_scopeId3}><th class="text-left"${_scopeId3}> Laborat\xF3rio </th><th class="text-right"${_scopeId3}> Por </th><th class="text-left"${_scopeId3}> A partir </th><th class="text-left"${_scopeId3}> At\xE9 </th><th class="text-right"${_scopeId3}>A\xE7\xF5es</th></tr></thead><tbody${_scopeId3}><!--[-->`);
                        ssrRenderList(unref(appointments), (item) => {
                          _push4(`<tr style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId3}><td${_scopeId3}>${ssrInterpolate(item.name)}</td><td class="text-right text-body2 text-medium-emphasis"${_scopeId3}>${ssrInterpolate(item.firstName)}</td><td class="text-left text-caption text-medium-emphasis"${_scopeId3}>${ssrInterpolate(item.scheduledFrom)}</td><td class="text-left text-caption text-medium-emphasis"${_scopeId3}>${ssrInterpolate(item.scheduledTo)}</td><td class="text-right"${_scopeId3}>`);
                          _push4(ssrRenderComponent(VMenu, null, {
                            activator: withCtx(({ props }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VBtn, mergeProps({
                                  color: "primary",
                                  variant: "tonal"
                                }, props), {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` A\xE7\xF5es `);
                                    } else {
                                      return [
                                        createTextVNode(" A\xE7\xF5es ")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VBtn, mergeProps({
                                    color: "primary",
                                    variant: "tonal"
                                  }, props), {
                                    default: withCtx(() => [
                                      createTextVNode(" A\xE7\xF5es ")
                                    ]),
                                    _: 2
                                  }, 1040)
                                ];
                              }
                            }),
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VList, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      if (item.isFuture) {
                                        _push6(ssrRenderComponent(VListItem, {
                                          onClick: ($event) => handleOnCancel(item.id)
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VListItemTitle, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`Cancelar`);
                                                  } else {
                                                    return [
                                                      createTextVNode("Cancelar")
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VListItemTitle, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Cancelar")
                                                  ]),
                                                  _: 1
                                                })
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      if (item.isFuture === false) {
                                        _push6(ssrRenderComponent(VListItem, {
                                          onClick: ($event) => handleOnGiveBack(item.id)
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VListItemTitle, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`Devolver materiais`);
                                                  } else {
                                                    return [
                                                      createTextVNode("Devolver materiais")
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VListItemTitle, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Devolver materiais")
                                                  ]),
                                                  _: 1
                                                })
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                    } else {
                                      return [
                                        item.isFuture ? (openBlock(), createBlock(VListItem, {
                                          key: 0,
                                          onClick: ($event) => handleOnCancel(item.id)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VListItemTitle, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Cancelar")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])) : createCommentVNode("", true),
                                        item.isFuture === false ? (openBlock(), createBlock(VListItem, {
                                          key: 1,
                                          onClick: ($event) => handleOnGiveBack(item.id)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VListItemTitle, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Devolver materiais")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])) : createCommentVNode("", true)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VList, null, {
                                    default: withCtx(() => [
                                      item.isFuture ? (openBlock(), createBlock(VListItem, {
                                        key: 0,
                                        onClick: ($event) => handleOnCancel(item.id)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VListItemTitle, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Cancelar")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])) : createCommentVNode("", true),
                                      item.isFuture === false ? (openBlock(), createBlock(VListItem, {
                                        key: 1,
                                        onClick: ($event) => handleOnGiveBack(item.id)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VListItemTitle, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Devolver materiais")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</td></tr>`);
                        });
                        _push4(`<!--]--></tbody>`);
                      } else {
                        return [
                          createVNode("thead", null, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "text-left" }, " Laborat\xF3rio "),
                              createVNode("th", { class: "text-right" }, " Por "),
                              createVNode("th", { class: "text-left" }, " A partir "),
                              createVNode("th", { class: "text-left" }, " At\xE9 "),
                              createVNode("th", { class: "text-right" }, "A\xE7\xF5es")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(appointments), (item) => {
                              return openBlock(), createBlock("tr", {
                                key: item.id,
                                onClick: ($event) => handleOnClickRow(item),
                                style: { "cursor": "pointer" }
                              }, [
                                createVNode("td", null, toDisplayString(item.name), 1),
                                createVNode("td", { class: "text-right text-body2 text-medium-emphasis" }, toDisplayString(item.firstName), 1),
                                createVNode("td", { class: "text-left text-caption text-medium-emphasis" }, toDisplayString(item.scheduledFrom), 1),
                                createVNode("td", { class: "text-left text-caption text-medium-emphasis" }, toDisplayString(item.scheduledTo), 1),
                                createVNode("td", { class: "text-right" }, [
                                  createVNode(VMenu, null, {
                                    activator: withCtx(({ props }) => [
                                      createVNode(VBtn, mergeProps({
                                        color: "primary",
                                        variant: "tonal"
                                      }, props), {
                                        default: withCtx(() => [
                                          createTextVNode(" A\xE7\xF5es ")
                                        ]),
                                        _: 2
                                      }, 1040)
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(VList, null, {
                                        default: withCtx(() => [
                                          item.isFuture ? (openBlock(), createBlock(VListItem, {
                                            key: 0,
                                            onClick: ($event) => handleOnCancel(item.id)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VListItemTitle, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Cancelar")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])) : createCommentVNode("", true),
                                          item.isFuture === false ? (openBlock(), createBlock(VListItem, {
                                            key: 1,
                                            onClick: ($event) => handleOnGiveBack(item.id)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VListItemTitle, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Devolver materiais")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ])
                              ], 8, ["onClick"]);
                            }), 128))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTable, { class: "mt-2" }, {
                      default: withCtx(() => [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "text-left" }, " Laborat\xF3rio "),
                            createVNode("th", { class: "text-right" }, " Por "),
                            createVNode("th", { class: "text-left" }, " A partir "),
                            createVNode("th", { class: "text-left" }, " At\xE9 "),
                            createVNode("th", { class: "text-right" }, "A\xE7\xF5es")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(appointments), (item) => {
                            return openBlock(), createBlock("tr", {
                              key: item.id,
                              onClick: ($event) => handleOnClickRow(item),
                              style: { "cursor": "pointer" }
                            }, [
                              createVNode("td", null, toDisplayString(item.name), 1),
                              createVNode("td", { class: "text-right text-body2 text-medium-emphasis" }, toDisplayString(item.firstName), 1),
                              createVNode("td", { class: "text-left text-caption text-medium-emphasis" }, toDisplayString(item.scheduledFrom), 1),
                              createVNode("td", { class: "text-left text-caption text-medium-emphasis" }, toDisplayString(item.scheduledTo), 1),
                              createVNode("td", { class: "text-right" }, [
                                createVNode(VMenu, null, {
                                  activator: withCtx(({ props }) => [
                                    createVNode(VBtn, mergeProps({
                                      color: "primary",
                                      variant: "tonal"
                                    }, props), {
                                      default: withCtx(() => [
                                        createTextVNode(" A\xE7\xF5es ")
                                      ]),
                                      _: 2
                                    }, 1040)
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(VList, null, {
                                      default: withCtx(() => [
                                        item.isFuture ? (openBlock(), createBlock(VListItem, {
                                          key: 0,
                                          onClick: ($event) => handleOnCancel(item.id)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VListItemTitle, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Cancelar")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])) : createCommentVNode("", true),
                                        item.isFuture === false ? (openBlock(), createBlock(VListItem, {
                                          key: 1,
                                          onClick: ($event) => handleOnGiveBack(item.id)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VListItemTitle, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Devolver materiais")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ], 8, ["onClick"]);
                          }), 128))
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              unref(appointment) ? (openBlock(), createBlock(VCol, { key: 0 }, {
                default: withCtx(() => [
                  createVNode(VCard, {
                    variant: "flat",
                    "min-width": "400",
                    class: "mx-auto",
                    "prepend-icon": "mdi-calendar"
                  }, {
                    title: withCtx(() => [
                      createVNode("b", null, "Lab:"),
                      createTextVNode(" " + toDisplayString(unref(appointment).name), 1)
                    ]),
                    default: withCtx(() => [
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode("p", { class: "text-body1" }, toDisplayString(unref(appointment).scheduledFrom) + " / " + toDisplayString(unref(appointment).scheduledTo), 1),
                          createVNode("p", { class: "body2 text-medium-emphasis" }, " Criado por " + toDisplayString(unref(appointment).full_name) + " em " + toDisplayString(unref(appointment).createdDate), 1),
                          unref(appointment).materials.length > 0 ? (openBlock(), createBlock(VRow, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VList, { lines: "one" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(appointment).materials, ({ id, name, quantity }, index) => {
                                        return openBlock(), createBlock(VListItem, {
                                          key: id,
                                          title: index + 1 + ") " + name,
                                          subtitle: "quantidade: " + quantity
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
                          })) : (openBlock(), createBlock(VRow, { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "body2 text-medium-emphasis" }, " N\xE3o h\xE1 materiais para este dia. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })),
                          createVNode(VBtn, {
                            color: "primary",
                            class: "mt-2",
                            variant: "tonal",
                            onClick: ($event) => handleOnClickRow(null)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Fechar ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode(VTable, { class: "mt-2" }, {
                    default: withCtx(() => [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "text-left" }, " Laborat\xF3rio "),
                          createVNode("th", { class: "text-right" }, " Por "),
                          createVNode("th", { class: "text-left" }, " A partir "),
                          createVNode("th", { class: "text-left" }, " At\xE9 "),
                          createVNode("th", { class: "text-right" }, "A\xE7\xF5es")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(appointments), (item) => {
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            onClick: ($event) => handleOnClickRow(item),
                            style: { "cursor": "pointer" }
                          }, [
                            createVNode("td", null, toDisplayString(item.name), 1),
                            createVNode("td", { class: "text-right text-body2 text-medium-emphasis" }, toDisplayString(item.firstName), 1),
                            createVNode("td", { class: "text-left text-caption text-medium-emphasis" }, toDisplayString(item.scheduledFrom), 1),
                            createVNode("td", { class: "text-left text-caption text-medium-emphasis" }, toDisplayString(item.scheduledTo), 1),
                            createVNode("td", { class: "text-right" }, [
                              createVNode(VMenu, null, {
                                activator: withCtx(({ props }) => [
                                  createVNode(VBtn, mergeProps({
                                    color: "primary",
                                    variant: "tonal"
                                  }, props), {
                                    default: withCtx(() => [
                                      createTextVNode(" A\xE7\xF5es ")
                                    ]),
                                    _: 2
                                  }, 1040)
                                ]),
                                default: withCtx(() => [
                                  createVNode(VList, null, {
                                    default: withCtx(() => [
                                      item.isFuture ? (openBlock(), createBlock(VListItem, {
                                        key: 0,
                                        onClick: ($event) => handleOnCancel(item.id)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VListItemTitle, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Cancelar")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])) : createCommentVNode("", true),
                                      item.isFuture === false ? (openBlock(), createBlock(VListItem, {
                                        key: 1,
                                        onClick: ($event) => handleOnGiveBack(item.id)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VListItemTitle, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Devolver materiais")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ], 8, ["onClick"]);
                        }), 128))
                      ])
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
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/schedules/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-c49cf35f.mjs.map
