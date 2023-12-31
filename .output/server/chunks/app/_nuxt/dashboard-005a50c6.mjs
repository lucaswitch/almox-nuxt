import { createVNode, mergeProps, toRef, ref, shallowRef, computed, watch, nextTick, Fragment, Transition, withCtx, createTextVNode, toDisplayString, renderSlot, useSSRContext } from 'vue';
import { Q as defineStore, p as propsFactory, g as genericComponent, m as makeThemeProps, H as useRtl, h as provideTheme, t as useDisplay, a as useProxiedModel, o as provideDefaults, _ as _export_sfc, n as navigateTo, d as convertToUnit } from '../server.mjs';
import { u as useAuth } from './auth-541611ee.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { V as VApp } from './VApp-b6d866d8.mjs';
import { M as makeVBtnProps, V as VBtn, t as makeBorderProps, b as makeElevationProps, e as makeRoundedProps, y as useBorder, C as useBackgroundColor, i as useElevation, l as useRounded, F as useRouter, N as toPhysical } from './VBtn-3a93cc12.mjs';
import { u as useRender, m as makeComponentProps, a as makeTagProps } from './tag-a1f3d414.mjs';
import { m as makeLayoutItemProps, u as useLayoutItem, V as VMain } from './VMain-dd97db66.mjs';
import { u as useScopeId } from './scopeId-e7d4fba3.mjs';
import { u as useSsrBoot } from './ssrBoot-49241434.mjs';
import { V as VList, c as VListSubheader, a as VListItem } from './VList-f255b9a7.mjs';
import { V as VDivider } from './VDivider-1f7ddb31.mjs';
import { V as VAppBar, a as VAppBarTitle, b as VContainer } from './VAppBarTitle-1de5ae51.mjs';
import { V as VAvatar } from './VAvatar-eebf826c.mjs';
import { V as VImg } from './VImg-b87ba832.mjs';
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
import './index-da71ab58.mjs';

const usePreferences = defineStore("preferences", {
  state() {
    return {
      drawer: true
    };
  },
  getters: {},
  actions: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  },
  persist: true
});
const _sfc_main = {
  setup() {
    return {
      auth: useAuth(),
      preferences: usePreferences()
    };
  },
  methods: {
    toggleDrawer() {
      this.preferences.toggleDrawer();
    },
    async logout() {
      this.auth.logout();
      await navigateTo("/");
    }
  }
};
const makeVAppBarNavIconProps = propsFactory({
  ...makeVBtnProps({
    icon: "$menu",
    variant: "text"
  })
}, "VAppBarNavIcon");
const VAppBarNavIcon = genericComponent()({
  name: "VAppBarNavIcon",
  props: makeVAppBarNavIconProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VBtn, mergeProps(props, {
      "class": ["v-app-bar-nav-icon"]
    }), slots));
    return {};
  }
});
function useSticky(_ref) {
  let {
    rootEl,
    isSticky,
    layoutItemStyles
  } = _ref;
  const isStuck = shallowRef(false);
  const stuckPosition = shallowRef(0);
  const stickyStyles = computed(() => {
    const side = typeof isStuck.value === "boolean" ? "top" : isStuck.value;
    return [isSticky.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, isStuck.value ? {
      [side]: convertToUnit(stuckPosition.value)
    } : {
      top: layoutItemStyles.value.top
    }];
  });
  return {
    isStuck,
    stickyStyles
  };
}
function useTouch(_ref) {
  let {
    isActive,
    isTemporary,
    width,
    touchless,
    position
  } = _ref;
  computed(() => ["left", "right"].includes(position.value));
  const isDragging = shallowRef(false);
  const dragProgress = shallowRef(0);
  shallowRef(0);
  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform: position.value === "left" ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "right" ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === "top" ? `translateY(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "bottom" ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
      transition: "none"
    } : void 0;
  });
  return {
    isDragging,
    dragProgress,
    dragStyles
  };
}
function oops() {
  throw new Error();
}
const locations = ["start", "end", "left", "right", "top", "bottom"];
const makeVNavigationDrawerProps = propsFactory({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  permanent: Boolean,
  rail: {
    type: Boolean,
    default: null
  },
  railWidth: {
    type: [Number, String],
    default: 56
  },
  scrim: {
    type: [Boolean, String],
    default: true
  },
  image: String,
  temporary: Boolean,
  touchless: Boolean,
  width: {
    type: [Number, String],
    default: 256
  },
  location: {
    type: String,
    default: "start",
    validator: (value) => locations.includes(value)
  },
  sticky: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "nav"
  }),
  ...makeThemeProps()
}, "VNavigationDrawer");
const VNavigationDrawer = genericComponent()({
  name: "VNavigationDrawer",
  props: makeVNavigationDrawerProps(),
  emits: {
    "update:modelValue": (val) => true,
    "update:rail": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      elevationClasses
    } = useElevation(props);
    const {
      mobile
    } = useDisplay();
    const {
      roundedClasses
    } = useRounded(props);
    const router = useRouter();
    const isActive = useProxiedModel(props, "modelValue", null, (v) => !!v);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      scopeId
    } = useScopeId();
    const rootEl = ref();
    const isHovering = shallowRef(false);
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
    });
    const location = computed(() => {
      return toPhysical(props.location, isRtl.value);
    });
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const isSticky = computed(() => props.sticky && !isTemporary.value && location.value !== "bottom");
    if (props.expandOnHover && props.rail != null) {
      watch(isHovering, (val) => emit("update:rail", !val));
    }
    if (!props.disableResizeWatcher) {
      watch(isTemporary, (val) => !props.permanent && nextTick(() => isActive.value = !val));
    }
    if (!props.disableRouteWatcher && router) {
      watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
    }
    watch(() => props.permanent, (val) => {
      if (val)
        isActive.value = true;
    });
    const {
      isDragging,
      dragProgress,
      dragStyles
    } = useTouch({
      isActive,
      isTemporary,
      width,
      touchless: toRef(props, "touchless"),
      position: location
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const {
      layoutItemStyles,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize,
      elementSize: width,
      active: computed(() => isActive.value || isDragging.value),
      disableTransitions: computed(() => isDragging.value),
      absolute: computed(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || isSticky.value && typeof isStuck.value !== "string"
      ))
    });
    const {
      isStuck,
      stickyStyles
    } = useSticky({
      rootEl,
      isSticky,
      layoutItemStyles
    });
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    }));
    const scrimStyles = computed(() => ({
      ...isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: "none"
      } : void 0,
      ...layoutItemScrimStyles.value
    }));
    provideDefaults({
      VList: {
        bgColor: "transparent"
      }
    });
    function onMouseenter() {
      isHovering.value = true;
    }
    function onMouseleave() {
      isHovering.value = false;
    }
    useRender(() => {
      const hasImage = slots.image || props.image;
      return createVNode(Fragment, null, [createVNode(props.tag, mergeProps({
        "ref": rootEl,
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave,
        "class": ["v-navigation-drawer", `v-navigation-drawer--${location.value}`, {
          "v-navigation-drawer--expand-on-hover": props.expandOnHover,
          "v-navigation-drawer--floating": props.floating,
          "v-navigation-drawer--is-hovering": isHovering.value,
          "v-navigation-drawer--rail": props.rail,
          "v-navigation-drawer--temporary": isTemporary.value,
          "v-navigation-drawer--active": isActive.value,
          "v-navigation-drawer--sticky": isSticky.value
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, dragStyles.value, ssrBootStyles.value, stickyStyles.value, props.style]
      }, scopeId, attrs), {
        default: () => {
          var _a, _b, _c, _d;
          return [hasImage && createVNode("div", {
            "key": "image",
            "class": "v-navigation-drawer__img"
          }, [slots.image ? (_a = slots.image) == null ? void 0 : _a.call(slots, {
            image: props.image
          }) : createVNode("img", {
            "src": props.image,
            "alt": ""
          }, null)]), slots.prepend && createVNode("div", {
            "class": "v-navigation-drawer__prepend"
          }, [(_b = slots.prepend) == null ? void 0 : _b.call(slots)]), createVNode("div", {
            "class": "v-navigation-drawer__content"
          }, [(_c = slots.default) == null ? void 0 : _c.call(slots)]), slots.append && createVNode("div", {
            "class": "v-navigation-drawer__append"
          }, [(_d = slots.append) == null ? void 0 : _d.call(slots)])];
        }
      }), createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && createVNode("div", mergeProps({
          "class": ["v-navigation-drawer__scrim", scrimColor.backgroundColorClasses.value],
          "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
          "onClick": () => isActive.value = false
        }, scopeId), null)]
      })]);
    });
    return {
      isStuck
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent(VApp, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VNavigationDrawer, {
          modelValue: $setup.preferences.drawer,
          "onUpdate:modelValue": ($event) => $setup.preferences.drawer = $event
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VList, { nav: "" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VListSubheader, { class: "my-2" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Laborat\xF3rios`);
                        } else {
                          return [
                            createTextVNode("Laborat\xF3rios")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VListItem, {
                      "prepend-icon": "mdi-calendar",
                      title: "Agenda",
                      value: "agenda",
                      rounded: "pill",
                      router: "",
                      to: "/dashboard/schedules"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VListItem, {
                      "prepend-icon": "mdi-door",
                      title: "Laborat\xF3rios",
                      value: "todos",
                      rounded: "pill",
                      router: "",
                      to: "/dashboard/labs"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VDivider, null, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VListSubheader, { class: "my-2" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`MATERIAIS`);
                        } else {
                          return [
                            createTextVNode("MATERIAIS")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VListItem, {
                      "prepend-icon": "mdi-flask-empty",
                      title: "Estoque de materiais",
                      value: "todos",
                      rounded: "pill",
                      router: "",
                      to: "/dashboard/materials"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VDivider, null, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VListSubheader, { class: "my-2" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`PESSOAS`);
                        } else {
                          return [
                            createTextVNode("PESSOAS")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VListItem, {
                      "prepend-icon": "mdi-account-cog",
                      title: "Pessoas",
                      value: "users",
                      rounded: "pill",
                      router: "",
                      to: "/dashboard/users"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VListSubheader, { class: "my-2" }, {
                        default: withCtx(() => [
                          createTextVNode("Laborat\xF3rios")
                        ]),
                        _: 1
                      }),
                      createVNode(VListItem, {
                        "prepend-icon": "mdi-calendar",
                        title: "Agenda",
                        value: "agenda",
                        rounded: "pill",
                        router: "",
                        to: "/dashboard/schedules"
                      }),
                      createVNode(VListItem, {
                        "prepend-icon": "mdi-door",
                        title: "Laborat\xF3rios",
                        value: "todos",
                        rounded: "pill",
                        router: "",
                        to: "/dashboard/labs"
                      }),
                      createVNode(VDivider),
                      createVNode(VListSubheader, { class: "my-2" }, {
                        default: withCtx(() => [
                          createTextVNode("MATERIAIS")
                        ]),
                        _: 1
                      }),
                      createVNode(VListItem, {
                        "prepend-icon": "mdi-flask-empty",
                        title: "Estoque de materiais",
                        value: "todos",
                        rounded: "pill",
                        router: "",
                        to: "/dashboard/materials"
                      }),
                      createVNode(VDivider),
                      createVNode(VListSubheader, { class: "my-2" }, {
                        default: withCtx(() => [
                          createTextVNode("PESSOAS")
                        ]),
                        _: 1
                      }),
                      createVNode(VListItem, {
                        "prepend-icon": "mdi-account-cog",
                        title: "Pessoas",
                        value: "users",
                        rounded: "pill",
                        router: "",
                        to: "/dashboard/users"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VListSubheader, { class: "my-2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`\xA0\xA0\xA0\xA0 A\xC7\xD5ES`);
                  } else {
                    return [
                      createTextVNode("\xA0\xA0\xA0\xA0 A\xC7\xD5ES")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VListItem, {
                "prepend-icon": "mdi-exit-to-app",
                title: "Sair",
                rounded: "pill",
                onClick: $options.logout
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VList, { nav: "" }, {
                  default: withCtx(() => [
                    createVNode(VListSubheader, { class: "my-2" }, {
                      default: withCtx(() => [
                        createTextVNode("Laborat\xF3rios")
                      ]),
                      _: 1
                    }),
                    createVNode(VListItem, {
                      "prepend-icon": "mdi-calendar",
                      title: "Agenda",
                      value: "agenda",
                      rounded: "pill",
                      router: "",
                      to: "/dashboard/schedules"
                    }),
                    createVNode(VListItem, {
                      "prepend-icon": "mdi-door",
                      title: "Laborat\xF3rios",
                      value: "todos",
                      rounded: "pill",
                      router: "",
                      to: "/dashboard/labs"
                    }),
                    createVNode(VDivider),
                    createVNode(VListSubheader, { class: "my-2" }, {
                      default: withCtx(() => [
                        createTextVNode("MATERIAIS")
                      ]),
                      _: 1
                    }),
                    createVNode(VListItem, {
                      "prepend-icon": "mdi-flask-empty",
                      title: "Estoque de materiais",
                      value: "todos",
                      rounded: "pill",
                      router: "",
                      to: "/dashboard/materials"
                    }),
                    createVNode(VDivider),
                    createVNode(VListSubheader, { class: "my-2" }, {
                      default: withCtx(() => [
                        createTextVNode("PESSOAS")
                      ]),
                      _: 1
                    }),
                    createVNode(VListItem, {
                      "prepend-icon": "mdi-account-cog",
                      title: "Pessoas",
                      value: "users",
                      rounded: "pill",
                      router: "",
                      to: "/dashboard/users"
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDivider),
                createVNode(VListSubheader, { class: "my-2" }, {
                  default: withCtx(() => [
                    createTextVNode("\xA0\xA0\xA0\xA0 A\xC7\xD5ES")
                  ]),
                  _: 1
                }),
                createVNode(VListItem, {
                  "prepend-icon": "mdi-exit-to-app",
                  title: "Sair",
                  rounded: "pill",
                  onClick: $options.logout
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VAppBar, {
          flat: "",
          class: "border-b",
          color: "primary"
        }, {
          append: withCtx((_2, _push3, _parent3, _scopeId2) => {
            var _a, _b;
            if (_push3) {
              _push3(`<div class="user-details" data-v-02643591${_scopeId2}><p class="text-subtitle-1" data-v-02643591${_scopeId2}>${ssrInterpolate((_a = $setup.auth.user) == null ? void 0 : _a.full_name)} (${ssrInterpolate($setup.auth.user.role === 0 ? "Admin" : "Professor")}) </p>`);
              _push3(ssrRenderComponent(VAvatar, { size: "36px" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VImg, {
                      alt: "Avatar",
                      src: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VImg, {
                        alt: "Avatar",
                        src: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createVNode("div", { class: "user-details" }, [
                  createVNode("p", { class: "text-subtitle-1" }, toDisplayString((_b = $setup.auth.user) == null ? void 0 : _b.full_name) + " (" + toDisplayString($setup.auth.user.role === 0 ? "Admin" : "Professor") + ") ", 1),
                  createVNode(VAvatar, { size: "36px" }, {
                    default: withCtx(() => [
                      createVNode(VImg, {
                        alt: "Avatar",
                        src: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                      })
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VAppBarNavIcon, { onClick: $options.toggleDrawer }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VAppBarTitle, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Almox UniCeub\xAE`);
                  } else {
                    return [
                      createTextVNode("Almox UniCeub\xAE")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VAppBarNavIcon, { onClick: $options.toggleDrawer }, null, 8, ["onClick"]),
                createVNode(VAppBarTitle, null, {
                  default: withCtx(() => [
                    createTextVNode("Almox UniCeub\xAE")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VMain, { style: { "background-color": "#f5f5f7" } }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VContainer, { fluid: "" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", {}, void 0, true)
                    ];
                  }
                }),
                _: 3
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VContainer, { fluid: "" }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ]),
                  _: 3
                })
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VNavigationDrawer, {
            modelValue: $setup.preferences.drawer,
            "onUpdate:modelValue": ($event) => $setup.preferences.drawer = $event
          }, {
            default: withCtx(() => [
              createVNode(VList, { nav: "" }, {
                default: withCtx(() => [
                  createVNode(VListSubheader, { class: "my-2" }, {
                    default: withCtx(() => [
                      createTextVNode("Laborat\xF3rios")
                    ]),
                    _: 1
                  }),
                  createVNode(VListItem, {
                    "prepend-icon": "mdi-calendar",
                    title: "Agenda",
                    value: "agenda",
                    rounded: "pill",
                    router: "",
                    to: "/dashboard/schedules"
                  }),
                  createVNode(VListItem, {
                    "prepend-icon": "mdi-door",
                    title: "Laborat\xF3rios",
                    value: "todos",
                    rounded: "pill",
                    router: "",
                    to: "/dashboard/labs"
                  }),
                  createVNode(VDivider),
                  createVNode(VListSubheader, { class: "my-2" }, {
                    default: withCtx(() => [
                      createTextVNode("MATERIAIS")
                    ]),
                    _: 1
                  }),
                  createVNode(VListItem, {
                    "prepend-icon": "mdi-flask-empty",
                    title: "Estoque de materiais",
                    value: "todos",
                    rounded: "pill",
                    router: "",
                    to: "/dashboard/materials"
                  }),
                  createVNode(VDivider),
                  createVNode(VListSubheader, { class: "my-2" }, {
                    default: withCtx(() => [
                      createTextVNode("PESSOAS")
                    ]),
                    _: 1
                  }),
                  createVNode(VListItem, {
                    "prepend-icon": "mdi-account-cog",
                    title: "Pessoas",
                    value: "users",
                    rounded: "pill",
                    router: "",
                    to: "/dashboard/users"
                  })
                ]),
                _: 1
              }),
              createVNode(VDivider),
              createVNode(VListSubheader, { class: "my-2" }, {
                default: withCtx(() => [
                  createTextVNode("\xA0\xA0\xA0\xA0 A\xC7\xD5ES")
                ]),
                _: 1
              }),
              createVNode(VListItem, {
                "prepend-icon": "mdi-exit-to-app",
                title: "Sair",
                rounded: "pill",
                onClick: $options.logout
              }, null, 8, ["onClick"])
            ]),
            _: 1
          }, 8, ["modelValue", "onUpdate:modelValue"]),
          createVNode(VAppBar, {
            flat: "",
            class: "border-b",
            color: "primary"
          }, {
            append: withCtx(() => {
              var _a;
              return [
                createVNode("div", { class: "user-details" }, [
                  createVNode("p", { class: "text-subtitle-1" }, toDisplayString((_a = $setup.auth.user) == null ? void 0 : _a.full_name) + " (" + toDisplayString($setup.auth.user.role === 0 ? "Admin" : "Professor") + ") ", 1),
                  createVNode(VAvatar, { size: "36px" }, {
                    default: withCtx(() => [
                      createVNode(VImg, {
                        alt: "Avatar",
                        src: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                      })
                    ]),
                    _: 1
                  })
                ])
              ];
            }),
            default: withCtx(() => [
              createVNode(VAppBarNavIcon, { onClick: $options.toggleDrawer }, null, 8, ["onClick"]),
              createVNode(VAppBarTitle, null, {
                default: withCtx(() => [
                  createTextVNode("Almox UniCeub\xAE")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VMain, { style: { "background-color": "#f5f5f7" } }, {
            default: withCtx(() => [
              createVNode(VContainer, { fluid: "" }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ]),
                _: 3
              })
            ]),
            _: 3
          })
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-02643591"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-005a50c6.mjs.map
