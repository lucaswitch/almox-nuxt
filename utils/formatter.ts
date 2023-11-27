import moment, {Moment} from "moment/moment";


export function getMoment(date: string | null, format: string = 'YYYY-MM-DD HH:mm:ss') {
    if (typeof date === 'string') {
        const d = moment.utc(date, format)
        if (d && d.isValid()) {
            return d
        }
    }

    return null
}

export function getLocalDateString(date: string, format = 'LL') {
    const d = moment.utc(date, 'YYYY-MM-DD HH:mm:ss')
    if (d && d.isValid()) {
        return d.local().format(format)
    }
    return ''
}

export function getFirstName(fullName: string) {
    return fullName.split(' ').slice(0, -1).join(' ');
}

export function getMomentToSequelize(m: Moment | null) {
    if (m) {
        return new Date(m.unix() * 1000)
    }
    return null
}