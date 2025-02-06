import { CommuteType } from "@/pages/BusBooking/types/commuteType";

export function getDaysInMonth(year: number, month: number) {
  // 1월에서 이전 달로 가면 작년 12월로
  if (month < 0) {
    month = 11;
    year -= 1;
  } else if (month > 11) {
    year += 1;
    month = 0;
  }

  const daysInMonth = totalDaysInMonth(year, month);

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days: (number | "")[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push("");
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  new Array(42 - days.length).fill("").forEach((v) => days.push(v)); // 균일한 grid 크기를 위해 42개의 일 수를 계산.

  return days;
}
// 예매 가능한 기간에 해당하는지와 등교버스 하교버스 운영 시간이 지나도 비활성화여부를 체크.
export function isDateDisabled(date: Date, commuteType: CommuteType) {
  const now = new Date();
  const compareDate = new Date(date);
  compareDate.setHours(
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  );

  const TWO_DAYS_AND_FIVE_MINUTES_TO_SECONDS = 48 * 60 * 60 + 5 * 60;
  const minDate = new Date(
    now.getTime() + TWO_DAYS_AND_FIVE_MINUTES_TO_SECONDS * 1000
  );
  const maxDate = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  maxDate.setMonth(maxDate.getMonth() + 2);

  // 등하교 시간 제한 체크
  const limitHour = commuteType === "등교" ? 18 : 21; // 등교 18시(오후6시), 하교 21시(오후9시)

  // 날짜만 비교하기 위한 복사본
  const compareDateDateOnly = new Date(date);
  const minDateDateOnly = new Date(minDate);

  compareDateDateOnly.setHours(0, 0, 0, 0);
  minDateDateOnly.setHours(0, 0, 0, 0);

  // minDate의 시간이 해당 등하교 제한 시간을 넘어가는지 체크
  const minDateHour = minDate.getHours();
  const minDateMinutes = minDate.getMinutes();

  // 선택날짜가 minDate와 같은 날인 경우
  if (compareDateDateOnly.getTime() === minDateDateOnly.getTime()) {
    // 최소 예약 가능 시각이 등하교 제한 시간을 넘어가면 비활성화
    if (
      minDateHour >= limitHour ||
      (minDateHour === limitHour && minDateMinutes > 0)
    ) {
      return true; // 비활성화
    }
    return false; // 활성화
  }

  return compareDate < minDate || compareDate > maxDate;
}

// month은 실제 보다 -1 이므로 +1
export const totalDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// 시간 선택시 가능한 시간인지 반환.
export function isBookingTimeAvailable(date: Date) {
  const now = new Date();
  // 현재와 같은 시각으로 48시간 후 부터 이므로, 현재 시각과 맞추기.
  // 일반 Date는 오전 12시로 맞춰져있어서, 최소 가능한 일자가 비활성화 되는 문제가 생길 수 있음.
  date.setHours(
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  );
  const TWO_DAYS_AND_FIVE_MINUTES_TO_SECONDS = 48 * 60 * 60 + 5 * 60; // 48시간 + 5분 후 부터 가능. 이를 초로 환산.
  const TWO_DAYS_TO_SECONDS = 48 * 60 * 60;

  const minDate = new Date(
    now.getTime() + TWO_DAYS_AND_FIVE_MINUTES_TO_SECONDS * 1000 // 밀리초로 계산
  );
  const maxDate = new Date(
    now.getTime() + TWO_DAYS_TO_SECONDS * 1000 // 밀리초로 계산
  );

  maxDate.setMonth(minDate.getMonth() + 2); // 2개월 후

  return minDate <= date && date <= maxDate;
}
