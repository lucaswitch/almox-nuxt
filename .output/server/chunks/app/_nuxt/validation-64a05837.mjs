import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
import moment from 'moment';

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
const EntrySchema = object({
  amount: number().typeError("Por favor insira uma quantidade em formato num\xE9rico").required("Por favor insira uma quantidade").max(99999).min(-99999).integer().label("Quantidade").notOneOf([0], "N\xE3o pode ser quantidade zero")
});
const LabSchema = object({
  name: string().typeError("Por favor insira um nome de laborat\xF3rio").min(1).max(100).required("Este campo \xE9 obrigat\xF3rio"),
  student_capacity: number().required("Este campo \xE9 obrigat\xF3rio").typeError("Por favor insira uma quantidade em formato num\xE9rico").max(100).min(1).integer().label("Quantidade").notOneOf([0], "N\xE3o pode ser quantidade zero")
});
function testIsValidDate(value) {
  const date = moment(value, "DD/MM/YYYY HH:mm");
  return date && date.isValid();
}
function testIfIsFutureDate(value) {
  let date = moment(value, "DD/MM/YYYY HH:mm");
  if (date && date.isValid()) {
    const now = moment();
    return now.unix() < date.unix();
  }
  return false;
}
const ScheduleSchema = object({
  scheduled_from: string().typeError("Preencha a data de fim de reserva.").required().label("Data de fim de reserva").test("test", ({ label }) => `A ${label} deve ser uma data v\xE1lida.`, testIsValidDate).test("testFuture", ({ label }) => `A ${label} deve ser uma data futura.`, testIfIsFutureDate),
  scheduled_to: string().typeError("Preencha a data de in\xEDcio de reserva.").required().label("Data de inicio de reserva").test("test", ({ label }) => `A ${label} deve ser uma data v\xE1lida.`, testIsValidDate).test("testFuture", ({ label }) => `A ${label} deve ser uma data futura.`, testIfIsFutureDate),
  lab_id: number().typeError("Preencha o laborat\xF3rio.").integer().label("Laborat\xF3rio"),
  note: string().required().min(1).max(255).label("Motivo")
});
const ScheduleMaterialSchema = object({
  material_id: number().required().typeError("Selecione o material").label("Material").integer().min(1),
  quantity: number().typeError("Selecione a quantidade").label("Quantidade").integer().min(1).min(1)
});

export { EntrySchema as E, LabSchema as L, MaterialSchema as M, ScheduleSchema as S, UserSchema as U, ScheduleMaterialSchema as a };
//# sourceMappingURL=validation-64a05837.mjs.map
