import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';

Yup.setLocale(pt);
const { object, string, number } = Yup;
const MaterialSchema = object({
  name: string().required("O nome do material \xE9 requerido").min(1).max(100),
  formula: string().typeError("Preencha uma f\xF3rmula v\xE1lida.").required("A formula do material \xE9 requerido").min(1).max(100),
  concentration: number().typeError("Preencha um n\xFAmero v\xE1lido.").required("A concentra\xE7\xE3o do material \xE9 requerido").min(1).max(100),
  weight: number().required("O peso do material \xE9 requerido").min(0).max(1e4),
  metric: string().required("A unidade do material \xE9 requerido").max(25),
  note: string().required("A observa\xE7\xE3o do material \xE9 requerido").max(1e3)
});
const UserSchema = object({
  full_name: string().required("O nome completo \xE9 requerido").typeError("Preencha uma nome completo v\xE1lido.").min(1).max(100).label("Nome completo"),
  password: string().typeError("Preencha uma senha v\xE1lida.").required("A senha \xE9 requerida").min(8).max(40).label("Senha"),
  type: string().typeError("Preencha o tipo do usu\xE1rio.").required("O tipo do usu\xE1rio \xE9 requerido.").oneOf(["Admin", "Professor"]).label("Tipo"),
  username: string().typeError("Preencha o usu\xE1rio").required().min(2).max(40).label("Usu\xE1rio")
});

export { MaterialSchema as M, UserSchema as U };
//# sourceMappingURL=validation.mjs.map
