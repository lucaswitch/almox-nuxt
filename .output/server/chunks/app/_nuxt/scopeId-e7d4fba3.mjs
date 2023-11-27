import { x as getCurrentInstance } from '../server.mjs';

function useScopeId() {
  const vm = getCurrentInstance("useScopeId");
  const scopeId = vm.vnode.scopeId;
  return {
    scopeId: scopeId ? {
      [scopeId]: ""
    } : void 0
  };
}

export { useScopeId as u };
//# sourceMappingURL=scopeId-e7d4fba3.mjs.map
