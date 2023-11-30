import DateFnsFormat from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import isToday from "date-fns/isToday";
import enLocale from "date-fns/locale/en-US";
import parseISO from "date-fns/parseISO";

export const formatDate = (
  date: string,
  format = "H:mm, d MMMM yyyy",
  timeRelative = false,
) => {
  return timeRelative
    ? isToday(parseISO(date))
      ? formatDistance(new Date(), parseISO(date), {
          includeSeconds: true,
          locale: enLocale,
        }) + "назад"
      : DateFnsFormat(parseISO(date), format, {
          locale: enLocale,
        })
    : DateFnsFormat(parseISO(date), format, {
        locale: enLocale,
      });
};

export { default as DateFnsFormat } from "date-fns/format";
export { default as isToday } from "date-fns/isToday";
export { default as ruLocale } from "date-fns/locale/ru";
