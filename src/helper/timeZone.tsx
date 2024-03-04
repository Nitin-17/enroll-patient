import moment from 'moment-timezone';

const getTimeZoneDetails = (timezone: string) => {
    return {
        abbr: moment().tz(timezone)?.zoneAbbr(),
        offset: moment.tz(timezone).format('Z'),
    };
};

const getTimeZoneOffset = (timezone: string) => getTimeZoneDetails(timezone).offset;

export { getTimeZoneOffset };
