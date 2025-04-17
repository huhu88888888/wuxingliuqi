import React, { useState } from 'react';
import { 
  getWuYunLiuQiDataByYear,
  getWuYunLiuQiDataByMonth,
  getDetailedYearData,
  getSolarTermByDate,
  getElementColor,
  MonthData,
  YearData
} from '@/lib/wuyunliuqi';
import { SolarTermDisplay } from './SolarTermDisplay';
import { YearAnalysisDisplay } from './YearAnalysisDisplay';

interface WuYunLiuQiDisplayProps {
  selectedDate: string;
}

export function WuYunLiuQiDisplay({ selectedDate }: WuYunLiuQiDisplayProps) {
  const [activeSection, setActiveSection] = useState<'solarTerm' | 'yearAnalysis'>('solarTerm');
  
  // 从日期字符串解析年月日
  const dateParts = selectedDate.split('-');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  
  // 获取相关数据
  const yearData = getWuYunLiuQiDataByYear(year);
  const monthData = getWuYunLiuQiDataByMonth(year, month);
  const solarTerm = getSolarTermByDate(selectedDate);
  const detailedYearData = getDetailedYearData(year);

  if (!yearData || !detailedYearData) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">暂无数据</h3>
        <p className="mt-2 text-gray-600">该年份的五运六气数据暂未收录。目前仅支持1965年数据查询。</p>
      </div>
    );
  }

  if (!solarTerm) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">未找到节气数据</h3>
        <p className="mt-2 text-gray-600">所选日期不在已知的节气范围内。请选择1965年内的其他日期。</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex border-b mb-6 bg-white rounded-t-lg shadow-sm px-4">
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeSection === 'solarTerm'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveSection('solarTerm')}
        >
          节气详情
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeSection === 'yearAnalysis'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveSection('yearAnalysis')}
        >
          年度分析
        </button>
      </div>

      {activeSection === 'solarTerm' ? (
        <SolarTermDisplay solarTerm={solarTerm} />
      ) : (
        <YearAnalysisDisplay yearInfo={detailedYearData.yearInfo} />
      )}
    </div>
  );
}

function YearDataCard({ yearData, year }: { yearData: YearData; year: number }) {
  const tianYunColor = getElementColor(yearData.tianYun);
  const diQiColor = getElementColor(yearData.diQi);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{year}年五运六气概况</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: tianYunColor }}
              ></div>
              <span className="text-gray-600 font-medium">天运：</span>
              <span 
                className="ml-2 font-semibold" 
                style={{ color: tianYunColor }}
              >
                {yearData.tianYun}
              </span>
            </div>
            
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: diQiColor }}
              ></div>
              <span className="text-gray-600 font-medium">地气：</span>
              <span 
                className="ml-2 font-semibold" 
                style={{ color: diQiColor }}
              >
                {yearData.diQi}
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">年运概述</h4>
            <p className="text-gray-700">{yearData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthDataCard({ monthData, month }: { monthData: MonthData; month: number }) {
  const seasonQiColor = getElementColor(monthData.seasonQi);
  const guestQiColor = getElementColor(monthData.guestQi);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{month}月气候特点</h3>
          <span className="text-lg font-medium text-gray-500">
            农历 {monthData.lunarMonth}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col h-full">
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">主气</h4>
            <div className="flex items-center mb-2">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: seasonQiColor }}
              ></div>
              <span 
                className="font-semibold text-lg" 
                style={{ color: seasonQiColor }}
              >
                {monthData.seasonQi}
              </span>
            </div>
            <div className="mt-auto">
              <span className="text-sm text-gray-600">
                当令之气，影响较强
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col h-full">
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">客气</h4>
            <div className="flex items-center mb-2">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: guestQiColor }}
              ></div>
              <span 
                className="font-semibold text-lg" 
                style={{ color: guestQiColor }}
              >
                {monthData.guestQi}
              </span>
            </div>
            <div className="mt-auto">
              <span className="text-sm text-gray-600">
                客行之气，与主气相互影响
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">气候特点及养生建议</h4>
          <p className="text-gray-700">{monthData.description}</p>
        </div>
      </div>
    </div>
  );
} 