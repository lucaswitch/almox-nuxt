import * as Yup from "yup";
import {pt} from 'yup-locale-pt';
import moment from "moment";
import {no} from "vuetify/locale";

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


export const UserSchema = object({
    full_name: string().required("O nome completo é requerido")
        .typeError("Preencha uma nome completo válido.")
        .min(1).max(100)
        .label('Nome completo'),
    password: string()
        .typeError("Preencha uma senha válida.")
        .required("A senha é requerida")
        .min(8)
        .max(40)
        .label('Senha'),
    type: string()
        .typeError("Preencha o tipo do usuário.")
        .required("O tipo do usuário é requerido.")
        .oneOf(['Admin', 'Professor'])
        .label('Tipo'),
    username: string().typeError('Preencha o usuário').required().min(2).max(40).label('Usuário')
});

export const EntrySchema = object({
    amount: number().typeError('Por favor insira uma quantidade em formato numérico').required('Por favor insira uma quantidade').max(99999).min(-99999).integer().label('Quantidade').notOneOf([0], 'Não pode ser quantidade zero')
});


export const LabSchema = object({
    name: string().typeError('Por favor insira um nome de laboratório')
        .min(1)
        .max(100)
        .required('Este campo é obrigatório'),
    student_capacity: number()
        .required('Este campo é obrigatório')
        .typeError('Por favor insira uma quantidade em formato numérico')
        .max(100).min(1).integer().label('Quantidade')
        .notOneOf([0], 'Não pode ser quantidade zero')
})


function testIsValidDate(value: any) {
    const date = moment(value, 'DD/MM/YYYY HH:mm')
    return date && date.isValid();
}

function testIfIsFutureDate(value: any) {
    let date = moment(value, 'DD/MM/YYYY HH:mm').local()
    if (date && date.isValid()) {
        const now = moment()
        return now.unix() > date.unix()
    }
    return false
}

export const ScheduleSchema = object({
    scheduled_from: string()
        .typeError('Preencha a data de fim de reserva.')
        .required().label('Data de fim de reserva')
        .test('test', ({label}) => `A ${label} deve ser uma data válida.`, testIsValidDate)
        .test('testFuture', ({label}) => `A ${label} deve ser uma data futura.`, testIfIsFutureDate),
    scheduled_to: string().typeError('Preencha a data de início de reserva.')
        .required()
        .label('Data de inicio de reserva')
        .test('test', ({label}) => `A ${label} deve ser uma data válida.`, testIsValidDate)
        .test('testFuture', ({label}) => `A ${label} deve ser uma data futura.`, testIfIsFutureDate),
    lab_id: number().typeError('Preencha o laboratório.').integer(true).label('Laboratório'),
    note: string().required().min(1).max(255).label('Motivo')
})


export const ScheduleMaterialSchema = object({
    material_id: number().typeError('Selecione o material').label('Material').integer().min(1),
    quantity: number().typeError('Selecione a quantidade').label('Quantidade').integer().min(1)
})
