import * as Yup from "yup";
import {pt} from 'yup-locale-pt';

Yup.setLocale(pt);
const {object, string, number} = Yup;

export const MaterialSchema = object({
    name: string().required("O nome do material é requerido").min(1).max(100),
    formula: string()
        .typeError("Preencha uma fórmula válida.")
        .required("A formula do material é requerido")
        .min(1)
        .max(100),
    concentration: number()
        .typeError("Preencha um número válido.")
        .required("A concentração do material é requerido")
        .min(1)
        .max(100),
    weight: number().required("O peso do material é requerido").min(0).max(10000),
    metric: string().required("A unidade do material é requerido").max(25),
    note: string().required("A observação do material é requerido").max(1000),
});
