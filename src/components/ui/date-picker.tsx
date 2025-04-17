import React, { useState, useEffect } from 'react';
import { getAvailableYears } from '@/lib/wuyunliuqi';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const availableYears = getAvailableYears();
  const [selectedYear, setSelectedYear] = useState<number>(parseInt(selectedDate.split('-')[0]));
  const [selectedMonth, setSelectedMonth] = useState<number>(parseInt(selectedDate.split('-')[1]));
  const [selectedDay, setSelectedDay] = useState<number>(parseInt(selectedDate.split('-')[2]));
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  // 生成月份数组
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 根据选择的年月更新日期数组
  useEffect(() => {
    const days = new Date(selectedYear, selectedMonth, 0).getDate();
    setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1));
    
    // 如果当前选择的日期超过这个月的天数，则调整为这个月的最后一天
    if (selectedDay > days) {
      setSelectedDay(days);
      updateSelectedDate(selectedYear, selectedMonth, days);
    }
  }, [selectedYear, selectedMonth]);

  // 更新选择的日期
  const updateSelectedDate = (year: number, month: number, day: number) => {
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    const dateString = `${year}-${formattedMonth}-${formattedDay}`;
    onDateChange(dateString);
  };

  // 处理年份变化
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    updateSelectedDate(year, selectedMonth, selectedDay);
  };

  // 处理月份变化
  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    updateSelectedDate(selectedYear, month, selectedDay);
  };

  // 处理日期变化
  const handleDayChange = (day: number) => {
    setSelectedDay(day);
    updateSelectedDate(selectedYear, selectedMonth, day);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">选择日期</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <label htmlFor="year-select" className="block text-sm font-medium mb-2 text-gray-700">
            年份
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white text-gray-800"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}年
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label htmlFor="month-select" className="block text-sm font-medium mb-2 text-gray-700">
            月份
          </label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => handleMonthChange(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white text-gray-800"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}月
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label htmlFor="day-select" className="block text-sm font-medium mb-2 text-gray-700">
            日期
          </label>
          <select
            id="day-select"
            value={selectedDay}
            onChange={(e) => handleDayChange(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white text-gray-800"
          >
            {daysInMonth.map((day) => (
              <option key={day} value={day}>
                {day}日
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        当前选择: {selectedYear}年{selectedMonth}月{selectedDay}日
      </div>
    </div>
  );
} 