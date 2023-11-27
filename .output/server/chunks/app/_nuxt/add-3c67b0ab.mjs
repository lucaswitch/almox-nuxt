import { computed, ref, shallowRef, watchEffect, watch, nextTick, createVNode, mergeProps, Fragment, withDirectives, resolveDirective, vModelText, useSSRContext, resolveComponent, withCtx, createTextVNode, toDisplayString } from 'vue';
import { p as propsFactory, g as genericComponent, a as useProxiedModel, _ as _export_sfc, d as convertToUnit, f as filterInputAttrs, n as navigateTo, b as callEvent, e as clamp } from '../server.mjs';
import { u as useAuth } from './auth-541611ee.mjs';
import { mask } from 'vue-the-mask';
import { M as MaterialSchema } from './validation-64a05837.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { V as VForm } from './VForm-e1cdeb50.mjs';
import { V as VRow, a as VCol } from './VRow-6b2a6e40.mjs';
import { d as makeVInputProps, e as makeVFieldProps, f as useFocus, g as VInput, h as filterFieldProps, i as VField, j as VCounter, V as VTextField } from './VTextField-75698ea0.mjs';
import { V as VSelect, a as VSnackbar } from './VSnackbar-045c24c8.mjs';
import { f as forwardRefs } from './forwardRefs-80fc40bb.mjs';
import { I as Intersect$1 } from './VImg-b87ba832.mjs';
import { u as useRender } from './tag-a1f3d414.mjs';
import { V as VBtn } from './VBtn-3a93cc12.mjs';
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
import './index-da71ab58.mjs';
import './VList-f255b9a7.mjs';
import './ssrBoot-49241434.mjs';
import './VAvatar-eebf826c.mjs';
import './VDivider-1f7ddb31.mjs';
import './VMenu-9a09071e.mjs';
import './scopeId-e7d4fba3.mjs';

const _sfc_main$1 = {
  setup() {
    return {
      auth: useAuth()
    };
  },
  data() {
    return {
      default_units: ["Mililitros", "Litros", "Miligramas", "Gramas", "Quilos"],
      name: "",
      formula: "",
      concentration: "",
      weight: "",
      brand: "",
      metric: "",
      note: "",
      errors: {},
      created: null
    };
  },
  directives: { mask },
  methods: {
    async validate(data) {
      this.errors = {};
      try {
        await MaterialSchema.validate(data);
        return true;
      } catch (err) {
        this.errors[err.path] = err.message;
        return false;
      }
    },
    async add() {
      const data = {
        name: this.name,
        formula: this.formula,
        concentration: this.concentration,
        weight: this.weight,
        brand: this.brand,
        metric: this.metric,
        note: this.note
      };
      const isValid = await this.validate(data);
      if (isValid) {
        try {
          this.created = await $fetch(`/api/materials`, {
            method: "post",
            body: data,
            headers: {
              Authorization: `Bearer ${this.auth.token}`
            }
          });
          navigateTo("/dashboard/materials");
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
};
const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (v) => !isNaN(parseFloat(v))
  },
  maxRows: {
    type: [Number, String],
    validator: (v) => !isNaN(parseFloat(v))
  },
  suffix: String,
  modelModifiers: Object,
  ...makeVInputProps(),
  ...makeVFieldProps()
}, "VTextarea");
const VTextarea = genericComponent()({
  name: "VTextarea",
  directives: {
    Intersect: Intersect$1
  },
  inheritAttrs: false,
  props: makeVTextareaProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength)
        return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string")
        return void 0;
      return props.counter;
    });
    function onIntersect(isIntersecting, entries) {
      var _a, _b;
      if (!props.autofocus || !isIntersecting)
        return;
      (_b = (_a = entries[0].target) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    }
    const vInputRef = ref();
    const vFieldRef = ref();
    const controlHeight = shallowRef("");
    const textareaRef = ref();
    const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      var _a;
      if (textareaRef.value !== document.activeElement) {
        (_a = textareaRef.value) == null ? void 0 : _a.focus();
      }
      if (!isFocused.value)
        focus();
    }
    function onControlClick(e) {
      onFocus();
      emit("click:control", e);
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = "";
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      var _a;
      const el = e.target;
      model.value = el.value;
      if ((_a = props.modelModifiers) == null ? void 0 : _a.trim) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }
    const sizerRef = ref();
    const rows = ref(+props.rows);
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    watchEffect(() => {
      if (!props.autoGrow)
        rows.value = +props.rows;
    });
    function calculateInputHeight() {
      if (!props.autoGrow)
        return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value)
          return;
        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);
        const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        const newHeight = clamp(height != null ? height : 0, minHeight, maxHeight);
        rows.value = Math.floor((newHeight - padding) / lineHeight);
        controlHeight.value = convertToUnit(newHeight);
      });
    }
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);
    let observer;
    watch(sizerRef, (val) => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        observer == null ? void 0 : observer.disconnect();
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [{
        modelValue: _,
        ...inputProps
      }] = VInput.filterProps(props);
      const [fieldProps] = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-textarea v-text-field", {
          "v-textarea--prefixed": props.prefix,
          "v-textarea--suffixed": props.suffix,
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-textarea--auto-grow": props.autoGrow,
          "v-textarea--no-resize": props.noResize || props.autoGrow,
          "v-text-field--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "style": {
              "--v-textarea-control-height": controlHeight.value
            },
            "onClick": onControlClick,
            "onMousedown": onControlMousedown,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "active": isActive.value || isDirty.value,
            "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return createVNode(Fragment, null, [props.prefix && createVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createVNode("textarea", mergeProps({
                "ref": textareaRef,
                "class": fieldClass,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": props.name,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[resolveDirective("intersect"), {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createVNode("textarea", {
                "class": [fieldClass, "v-textarea__sizer"],
                "id": `${slotProps.id}-sizer`,
                "onUpdate:modelValue": ($event) => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a;
          return createVNode(Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max.value
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[-->`);
  _push(ssrRenderComponent(VForm, { class: "px-3" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      var _a, _b;
      if (_push2) {
        _push2(ssrRenderComponent(VRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  var _a2, _b2;
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField, {
                      variant: "outlined",
                      modelValue: $data.name,
                      "onUpdate:modelValue": ($event) => $data.name = $event,
                      clearable: "",
                      label: "Nome do produto",
                      "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.name) ? [$data.errors.name] : ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField, {
                        variant: "outlined",
                        modelValue: $data.name,
                        "onUpdate:modelValue": ($event) => $data.name = $event,
                        clearable: "",
                        label: "Nome do produto",
                        "error-messages": ((_b2 = $data.errors) == null ? void 0 : _b2.name) ? [$data.errors.name] : ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCol, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  var _a2, _b2;
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField, {
                      modelValue: $data.formula,
                      "onUpdate:modelValue": ($event) => $data.formula = $event,
                      variant: "outlined",
                      clearable: "",
                      label: "F\xF3rmula qu\xEDmica",
                      "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.formula) ? [$data.errors.formula] : ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField, {
                        modelValue: $data.formula,
                        "onUpdate:modelValue": ($event) => $data.formula = $event,
                        variant: "outlined",
                        clearable: "",
                        label: "F\xF3rmula qu\xEDmica",
                        "error-messages": ((_b2 = $data.errors) == null ? void 0 : _b2.formula) ? [$data.errors.formula] : ""
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
                    var _a2;
                    return [
                      createVNode(VTextField, {
                        variant: "outlined",
                        modelValue: $data.name,
                        "onUpdate:modelValue": ($event) => $data.name = $event,
                        clearable: "",
                        label: "Nome do produto",
                        "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.name) ? [$data.errors.name] : ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ];
                  }),
                  _: 1
                }),
                createVNode(VCol, null, {
                  default: withCtx(() => {
                    var _a2;
                    return [
                      createVNode(VTextField, {
                        modelValue: $data.formula,
                        "onUpdate:modelValue": ($event) => $data.formula = $event,
                        variant: "outlined",
                        clearable: "",
                        label: "F\xF3rmula qu\xEDmica",
                        "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.formula) ? [$data.errors.formula] : ""
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
        _push2(ssrRenderComponent(VRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  var _a2, _b2;
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField, {
                      modelValue: $data.concentration,
                      "onUpdate:modelValue": ($event) => $data.concentration = $event,
                      variant: "outlined",
                      label: "Concentra\xE7\xE3o",
                      clearable: "",
                      "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.concentration) ? [$data.errors.concentration] : ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField, {
                        modelValue: $data.concentration,
                        "onUpdate:modelValue": ($event) => $data.concentration = $event,
                        variant: "outlined",
                        label: "Concentra\xE7\xE3o",
                        clearable: "",
                        "error-messages": ((_b2 = $data.errors) == null ? void 0 : _b2.concentration) ? [$data.errors.concentration] : ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCol, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  var _a2, _b2;
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField, {
                      modelValue: $data.weight,
                      "onUpdate:modelValue": ($event) => $data.weight = $event,
                      variant: "outlined",
                      clearable: "",
                      label: "Peso molecular",
                      "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.weight) ? [$data.errors.weight] : ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField, {
                        modelValue: $data.weight,
                        "onUpdate:modelValue": ($event) => $data.weight = $event,
                        variant: "outlined",
                        clearable: "",
                        label: "Peso molecular",
                        "error-messages": ((_b2 = $data.errors) == null ? void 0 : _b2.weight) ? [$data.errors.weight] : ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCol, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  var _a2, _b2;
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField, {
                      modelValue: $data.brand,
                      "onUpdate:modelValue": ($event) => $data.brand = $event,
                      variant: "outlined",
                      clearable: "",
                      label: "Marca",
                      "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.brand) ? [$data.errors.brand] : ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField, {
                        modelValue: $data.brand,
                        "onUpdate:modelValue": ($event) => $data.brand = $event,
                        variant: "outlined",
                        clearable: "",
                        label: "Marca",
                        "error-messages": ((_b2 = $data.errors) == null ? void 0 : _b2.brand) ? [$data.errors.brand] : ""
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
                    var _a2;
                    return [
                      createVNode(VTextField, {
                        modelValue: $data.concentration,
                        "onUpdate:modelValue": ($event) => $data.concentration = $event,
                        variant: "outlined",
                        label: "Concentra\xE7\xE3o",
                        clearable: "",
                        "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.concentration) ? [$data.errors.concentration] : ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ];
                  }),
                  _: 1
                }),
                createVNode(VCol, null, {
                  default: withCtx(() => {
                    var _a2;
                    return [
                      createVNode(VTextField, {
                        modelValue: $data.weight,
                        "onUpdate:modelValue": ($event) => $data.weight = $event,
                        variant: "outlined",
                        clearable: "",
                        label: "Peso molecular",
                        "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.weight) ? [$data.errors.weight] : ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ];
                  }),
                  _: 1
                }),
                createVNode(VCol, null, {
                  default: withCtx(() => {
                    var _a2;
                    return [
                      createVNode(VTextField, {
                        modelValue: $data.brand,
                        "onUpdate:modelValue": ($event) => $data.brand = $event,
                        variant: "outlined",
                        clearable: "",
                        label: "Marca",
                        "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.brand) ? [$data.errors.brand] : ""
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
        _push2(ssrRenderComponent(VRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  var _a2, _b2;
                  if (_push4) {
                    _push4(ssrRenderComponent(VSelect, {
                      modelValue: $data.metric,
                      "onUpdate:modelValue": ($event) => $data.metric = $event,
                      variant: "outlined",
                      clearable: "",
                      label: "Unidade de medidas",
                      items: $data.default_units,
                      "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.metric) ? [$data.errors.metric] : ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VSelect, {
                        modelValue: $data.metric,
                        "onUpdate:modelValue": ($event) => $data.metric = $event,
                        variant: "outlined",
                        clearable: "",
                        label: "Unidade de medidas",
                        items: $data.default_units,
                        "error-messages": ((_b2 = $data.errors) == null ? void 0 : _b2.metric) ? [$data.errors.metric] : ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol, null, {
                  default: withCtx(() => {
                    var _a2;
                    return [
                      createVNode(VSelect, {
                        modelValue: $data.metric,
                        "onUpdate:modelValue": ($event) => $data.metric = $event,
                        variant: "outlined",
                        clearable: "",
                        label: "Unidade de medidas",
                        items: $data.default_units,
                        "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.metric) ? [$data.errors.metric] : ""
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
        _push2(ssrRenderComponent(VTextarea, {
          modelValue: $data.note,
          "onUpdate:modelValue": ($event) => $data.note = $event,
          variant: "outlined",
          class: "mt-5",
          clearable: "",
          label: "Observa\xE7\xF5es",
          "error-messages": ((_a = $data.errors) == null ? void 0 : _a.note) ? [$data.errors.note] : ""
        }, null, _parent2, _scopeId));
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
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, null, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode(VTextField, {
                      variant: "outlined",
                      modelValue: $data.name,
                      "onUpdate:modelValue": ($event) => $data.name = $event,
                      clearable: "",
                      label: "Nome do produto",
                      "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.name) ? [$data.errors.name] : ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ];
                }),
                _: 1
              }),
              createVNode(VCol, null, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode(VTextField, {
                      modelValue: $data.formula,
                      "onUpdate:modelValue": ($event) => $data.formula = $event,
                      variant: "outlined",
                      clearable: "",
                      label: "F\xF3rmula qu\xEDmica",
                      "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.formula) ? [$data.errors.formula] : ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
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
                  var _a2;
                  return [
                    createVNode(VTextField, {
                      modelValue: $data.concentration,
                      "onUpdate:modelValue": ($event) => $data.concentration = $event,
                      variant: "outlined",
                      label: "Concentra\xE7\xE3o",
                      clearable: "",
                      "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.concentration) ? [$data.errors.concentration] : ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ];
                }),
                _: 1
              }),
              createVNode(VCol, null, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode(VTextField, {
                      modelValue: $data.weight,
                      "onUpdate:modelValue": ($event) => $data.weight = $event,
                      variant: "outlined",
                      clearable: "",
                      label: "Peso molecular",
                      "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.weight) ? [$data.errors.weight] : ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ];
                }),
                _: 1
              }),
              createVNode(VCol, null, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode(VTextField, {
                      modelValue: $data.brand,
                      "onUpdate:modelValue": ($event) => $data.brand = $event,
                      variant: "outlined",
                      clearable: "",
                      label: "Marca",
                      "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.brand) ? [$data.errors.brand] : ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
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
                  var _a2;
                  return [
                    createVNode(VSelect, {
                      modelValue: $data.metric,
                      "onUpdate:modelValue": ($event) => $data.metric = $event,
                      variant: "outlined",
                      clearable: "",
                      label: "Unidade de medidas",
                      items: $data.default_units,
                      "error-messages": ((_a2 = $data.errors) == null ? void 0 : _a2.metric) ? [$data.errors.metric] : ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                  ];
                }),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VTextarea, {
            modelValue: $data.note,
            "onUpdate:modelValue": ($event) => $data.note = $event,
            variant: "outlined",
            class: "mt-5",
            clearable: "",
            label: "Observa\xE7\xF5es",
            "error-messages": ((_b = $data.errors) == null ? void 0 : _b.note) ? [$data.errors.note] : ""
          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
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
        _push2(` O material ${ssrInterpolate((_a = $data.created) == null ? void 0 : _a.name)} acaba de ser adicionado no estoque `);
      } else {
        return [
          createTextVNode(" O material " + toDisplayString((_b = $data.created) == null ? void 0 : _b.name) + " acaba de ser adicionado no estoque ", 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/material-form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MaterialForm = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  components: {
    MaterialForm
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
          // Authorization: `Bearer ${this.auth.token}`
        }
      });
    }
  },
  async mounted() {
    await this.refresh();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_material_form = resolveComponent("material-form");
  _push(`<!--[--><h6 class="text-h6"> Indice de materiais </h6>`);
  _push(ssrRenderComponent(VCard, {
    class: "mt-2 pb-3",
    "max-width": "644"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCardTitle, null, {
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
        _push2(ssrRenderComponent(VCardSubtitle, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Para adicionar novos materiais informe as informa\xE7\xF5es da nova remessa. `);
            } else {
              return [
                createTextVNode(" Para adicionar novos materiais informe as informa\xE7\xF5es da nova remessa. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<div class="mt-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_material_form, null, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode(VCardTitle, null, {
            default: withCtx(() => [
              createTextVNode(" Adicionar entrada ")
            ]),
            _: 1
          }),
          createVNode(VCardSubtitle, null, {
            default: withCtx(() => [
              createTextVNode(" Para adicionar novos materiais informe as informa\xE7\xF5es da nova remessa. ")
            ]),
            _: 1
          }),
          createVNode("div", { class: "mt-4" }, [
            createVNode(_component_material_form)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/materials/add.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { add as default };
//# sourceMappingURL=add-3c67b0ab.mjs.map
