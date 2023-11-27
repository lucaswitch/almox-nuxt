import { _ as __nuxt_component_0 } from './nuxt-link-7a4ab041.mjs';
import { withCtx, createTextVNode, createVNode, mergeProps, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { u as useAuth } from './auth-541611ee.mjs';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
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

const _sfc_main = {
  setup() {
    return {
      auth: useAuth()
    };
  },
  data() {
    return {
      items: [],
      total_count: 0,
      page: 1
    };
  },
  methods: {
    async refresh() {
      this.items = await $fetch("/api/materials", {
        method: "get",
        headers: {
          Authorization: `Bearer ${this.auth.token}`
        }
      });
    }
  },
  async mounted() {
    await this.refresh();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<!--[--><h6 class="text-h6"> Indice de materiais </h6>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/materials/add" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VBtn, { color: "primary" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Adicionar entrada `);
            } else {
              return [
                createTextVNode(" Adicionar entrada ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VBtn, { color: "primary" }, {
            default: withCtx(() => [
              createTextVNode(" Adicionar entrada ")
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
        _push2(`<thead${_scopeId}><tr${_scopeId}><th class="text-left"${_scopeId}> Nome </th><th class="text-right"${_scopeId}> Quantidade </th><th class="text-left"${_scopeId}> Concentra\xE7\xE3o </th><th class="text-left"${_scopeId}> Peso </th><th class="text-left"${_scopeId}> Marca </th><th class="text-right"${_scopeId}>A\xE7\xF5es</th></tr></thead><tbody${_scopeId}><!--[-->`);
        ssrRenderList($data.items, (item) => {
          _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(item.name)}</td><td class="text-right"${_scopeId}>${ssrInterpolate(item.quantity ? item.quantity : 0)}</td><td${_scopeId}>${ssrInterpolate(item.weight)}</td><td${_scopeId}>${ssrInterpolate(item.concentration)}</td><td${_scopeId}>${ssrInterpolate(item.brand)}</td><td class="text-right"${_scopeId}>`);
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
                      _push4(ssrRenderComponent(VListItem, null, {
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
                        href: "/dashboard/materials/" + item.id + "/entry"
                      }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(VListItemTitle, null, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(`Estoque`);
                                } else {
                                  return [
                                    createTextVNode("Estoque")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Estoque")
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
                        createVNode(VListItem, null, {
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Remover")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VListItem, {
                          href: "/dashboard/materials/" + item.id + "/entry"
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Estoque")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["href"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(VList, null, {
                    default: withCtx(() => [
                      createVNode(VListItem, null, {
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Remover")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VListItem, {
                        href: "/dashboard/materials/" + item.id + "/entry"
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Estoque")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1032, ["href"])
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
              createVNode("th", { class: "text-left" }, " Nome "),
              createVNode("th", { class: "text-right" }, " Quantidade "),
              createVNode("th", { class: "text-left" }, " Concentra\xE7\xE3o "),
              createVNode("th", { class: "text-left" }, " Peso "),
              createVNode("th", { class: "text-left" }, " Marca "),
              createVNode("th", { class: "text-right" }, "A\xE7\xF5es")
            ])
          ]),
          createVNode("tbody", null, [
            (openBlock(true), createBlock(Fragment, null, renderList($data.items, (item) => {
              return openBlock(), createBlock("tr", {
                key: item.name
              }, [
                createVNode("td", null, toDisplayString(item.name), 1),
                createVNode("td", { class: "text-right" }, toDisplayString(item.quantity ? item.quantity : 0), 1),
                createVNode("td", null, toDisplayString(item.weight), 1),
                createVNode("td", null, toDisplayString(item.concentration), 1),
                createVNode("td", null, toDisplayString(item.brand), 1),
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
                          createVNode(VListItem, null, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Remover")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VListItem, {
                            href: "/dashboard/materials/" + item.id + "/entry"
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Estoque")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["href"])
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
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/materials/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-671605f4.mjs.map
