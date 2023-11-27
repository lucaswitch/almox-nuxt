import { _ as __nuxt_component_0 } from './nuxt-link-7a4ab041.mjs';
import { defineComponent, ref, withAsyncContext, withCtx, createTextVNode, createVNode, unref, mergeProps, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { n as navigateTo } from '../server.mjs';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './auth-541611ee.mjs';
import { V as VBtn } from './VBtn-3a93cc12.mjs';
import { V as VTable } from './VTable-ddfcaa96.mjs';
import { a as VMenu } from './VMenu-9a09071e.mjs';
import { V as VList, a as VListItem, b as VListItemTitle } from './VList-f255b9a7.mjs';
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
import './scopeId-e7d4fba3.mjs';
import './VImg-b87ba832.mjs';
import './index-da71ab58.mjs';
import './ssrBoot-49241434.mjs';
import './VAvatar-eebf826c.mjs';
import './VDivider-1f7ddb31.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const auth = useAuth();
    const items = ref([]);
    async function getLabs() {
      return await $fetch("/api/labs", {
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
    }
    async function handleOnDelete(id) {
      await $fetch("/api/labs/delete", {
        method: "post",
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
        params: {
          lab_id: id
        }
      });
      items.value = await getLabs();
    }
    async function handleOnUpdate(id) {
      navigateTo(`/dashboard/labs/${id}/update`);
    }
    async function handleOnSchedule(id) {
      navigateTo(`/dashboard/labs/${id}/schedule`);
    }
    items.value = ([__temp, __restore] = withAsyncContext(() => getLabs()), __temp = await __temp, __restore(), __temp);
    console.log(items.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><h6 class="text-h6"> Laborat\xF3rios </h6>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/labs/add" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, { color: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Adicionar laborat\xF3rio `);
                } else {
                  return [
                    createTextVNode(" Adicionar laborat\xF3rio ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, { color: "primary" }, {
                default: withCtx(() => [
                  createTextVNode(" Adicionar laborat\xF3rio ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VTable, { class: "mt-2" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<thead${_scopeId}><tr${_scopeId}><th class="text-left"${_scopeId}> Id </th><th class="text-left"${_scopeId}> Nome </th><th class="text-right"${_scopeId}> Capacidade de alunos </th><th class="text-right"${_scopeId}>A\xE7\xF5es</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(unref(items), (item) => {
              _push2(`<tr${_scopeId}><td${_scopeId}> #${ssrInterpolate(item.id)}</td><td${_scopeId}>${ssrInterpolate(item.name)}</td><td class="text-right"${_scopeId}>${ssrInterpolate(item.student_capacity ? item.student_capacity : 0)}</td><td class="text-right"${_scopeId}>`);
              _push2(ssrRenderComponent(VMenu, null, {
                activator: withCtx(({ props }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VBtn, mergeProps({
                      color: "primary",
                      variant: "tonal"
                    }, props), {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` A\xE7\xF5es `);
                        } else {
                          return [
                            createTextVNode(" A\xE7\xF5es ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
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
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VList, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VListItem, {
                            onClick: ($event) => handleOnDelete(item.id)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VListItemTitle, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Remover`);
                                    } else {
                                      return [
                                        createTextVNode("Remover")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VListItemTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Remover")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VListItem, {
                            onClick: ($event) => handleOnUpdate(item.id)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VListItemTitle, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Editar`);
                                    } else {
                                      return [
                                        createTextVNode("Editar")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VListItemTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Editar")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VListItem, {
                            onClick: ($event) => handleOnSchedule(item.id)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VListItemTitle, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Agendar`);
                                    } else {
                                      return [
                                        createTextVNode("Agendar")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VListItemTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Agendar")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VListItem, {
                              onClick: ($event) => handleOnDelete(item.id)
                            }, {
                              default: withCtx(() => [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Remover")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
                            createVNode(VListItem, {
                              onClick: ($event) => handleOnUpdate(item.id)
                            }, {
                              default: withCtx(() => [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Editar")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
                            createVNode(VListItem, {
                              onClick: ($event) => handleOnSchedule(item.id)
                            }, {
                              default: withCtx(() => [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Agendar")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VList, null, {
                        default: withCtx(() => [
                          createVNode(VListItem, {
                            onClick: ($event) => handleOnDelete(item.id)
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Remover")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          createVNode(VListItem, {
                            onClick: ($event) => handleOnUpdate(item.id)
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Editar")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          createVNode(VListItem, {
                            onClick: ($event) => handleOnSchedule(item.id)
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Agendar")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody>`);
          } else {
            return [
              createVNode("thead", null, [
                createVNode("tr", null, [
                  createVNode("th", { class: "text-left" }, " Id "),
                  createVNode("th", { class: "text-left" }, " Nome "),
                  createVNode("th", { class: "text-right" }, " Capacidade de alunos "),
                  createVNode("th", { class: "text-right" }, "A\xE7\xF5es")
                ])
              ]),
              createVNode("tbody", null, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(items), (item) => {
                  return openBlock(), createBlock("tr", {
                    key: item.id
                  }, [
                    createVNode("td", null, " #" + toDisplayString(item.id), 1),
                    createVNode("td", null, toDisplayString(item.name), 1),
                    createVNode("td", { class: "text-right" }, toDisplayString(item.student_capacity ? item.student_capacity : 0), 1),
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
                              createVNode(VListItem, {
                                onClick: ($event) => handleOnDelete(item.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(VListItemTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Remover")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["onClick"]),
                              createVNode(VListItem, {
                                onClick: ($event) => handleOnUpdate(item.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(VListItemTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Editar")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["onClick"]),
                              createVNode(VListItem, {
                                onClick: ($event) => handleOnSchedule(item.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(VListItemTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Agendar")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ])
                  ]);
                }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/labs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-a8aa202a.mjs.map
