import { useState } from "react";
export default function useCalendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth(), //  (0: 1월, 1: 2월, ...)
    };
  });

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate((prev) => {
      // 1월에서 이전 달로 가면 작년 12월로
      if (prev.month === 0) {
        return {
          year: prev.year - 1,
          month: 11,
        };
      }
      //  월만 감소
      return {
        year: prev.year,
        month: prev.month - 1,
      };
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      // 12월에서 다음 달로 가면 다음 년도 1월로
      if (prev.month === 11) {
        return {
          year: prev.year + 1,
          month: 0,
        };
      }
      // 그 외의 경우는 단순히 월만 증가
      return {
        year: prev.year,
        month: prev.month + 1,
      };
    });
  };
  return { currentDate, goToPreviousMonth, goToNextMonth };
}
