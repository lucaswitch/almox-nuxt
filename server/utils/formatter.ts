import moment from "moment/moment";

export function getLocalDateString(date: string, format = 'LL') {
    const d = moment(date, 'YYYY-MM-DD HH:mm:ss')
    if (d && d.isValid()) {
        return d.local().format(format)
    }
    return ''
}
