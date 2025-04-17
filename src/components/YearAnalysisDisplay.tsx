import React, { useState } from 'react';
import { DetailedYearInfo, getElementColor } from '@/lib/wuyunliuqi';

interface YearAnalysisDisplayProps {
  yearInfo: DetailedYearInfo;
}

export function YearAnalysisDisplay({ yearInfo }: YearAnalysisDisplayProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'children' | 'adults' | 'prevention'>('overview');
  
  // 获取元素颜色
  const tianYunColor = getElementColor(yearInfo.tianYun);
  const diQiColor = getElementColor(yearInfo.diQi);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">1965年五运六气综合分析</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: tianYunColor }}></div>
              <span className="text-gray-600 font-medium">天运：</span>
              <span className="ml-2 font-semibold" style={{ color: tianYunColor }}>
                {yearInfo.tianYun}
              </span>
            </div>
            
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: diQiColor }}></div>
              <span className="text-gray-600 font-medium">地气：</span>
              <span className="ml-2 font-semibold" style={{ color: diQiColor }}>
                {yearInfo.diQi}
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">年运概述</h4>
            <p className="text-gray-700">{yearInfo.yearDescription}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">五行盛衰分析</h3>
          <div className="grid grid-cols-5 gap-2">
            <FiveElementBar label="木" value={yearInfo.fiveElements.wood} color="#4caf50" />
            <FiveElementBar label="火" value={yearInfo.fiveElements.fire} color="#f44336" />
            <FiveElementBar label="土" value={yearInfo.fiveElements.earth} color="#ff9800" />
            <FiveElementBar label="金" value={yearInfo.fiveElements.metal} color="#ffc107" />
            <FiveElementBar label="水" value={yearInfo.fiveElements.water} color="#2196f3" />
          </div>
        </div>
      </div>
      
      <div>
        <div className="border-b">
          <div className="flex flex-wrap">
            <TabButton 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')}
              label="综合分析"
            />
            <TabButton 
              active={activeTab === 'children'} 
              onClick={() => setActiveTab('children')}
              label="儿童易发疾病"
            />
            <TabButton 
              active={activeTab === 'adults'} 
              onClick={() => setActiveTab('adults')}
              label="成人多发疾病"
            />
            <TabButton 
              active={activeTab === 'prevention'} 
              onClick={() => setActiveTab('prevention')}
              label="预防与养生"
            />
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">综合分析</h3>
              <p className="text-gray-700 mb-6 whitespace-pre-line">{yearInfo.analysis.overallAnalysis}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-gray-700">健康影响</h4>
                <p className="text-gray-700">{yearInfo.analysis.healthImpact}</p>
              </div>
            </div>
          )}
          
          {activeTab === 'children' && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">儿童易发疾病</h3>
              
              <div className="space-y-4">
                {yearInfo.analysis.childrenDiseases.map((disease, index) => (
                  <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold mb-2 text-blue-700">{disease.category}</h4>
                    <p className="text-gray-700">{disease.symptoms}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'adults' && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">成人多发疾病</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {yearInfo.analysis.adultDiseases.map((disease, index) => (
                  <div key={index} className="bg-red-50 rounded-lg px-4 py-3 border border-red-100">
                    <span className="text-red-800">{disease}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'prevention' && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">预防与养生</h3>
              
              <div className="space-y-3">
                {yearInfo.analysis.preventionAdvice.map((advice, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-green-500 text-white rounded-full flex items-center justify-center w-6 h-6 mt-0.5 mr-3 flex-shrink-0">
                      <span className="text-sm">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{advice}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface FiveElementBarProps {
  label: string;
  value: number;
  color: string;
}

function FiveElementBar({ label, value, color }: FiveElementBarProps) {
  // 计算值的百分比，用于显示条形的高度
  // 假设值的范围是 -40 到 +40
  const normalizedValue = Math.abs(value);
  const height = Math.min(Math.max(normalizedValue / 40 * 100, 10), 100);
  
  return (
    <div className="flex flex-col items-center">
      <div className="h-32 w-full flex flex-col justify-end mb-1 relative">
        <div className="text-xs absolute top-0 left-1/2 transform -translate-x-1/2">
          {value > 0 ? `+${value}` : value}
        </div>
        <div 
          className="w-8 rounded-t-sm mx-auto" 
          style={{ 
            height: `${height}%`, 
            backgroundColor: color,
            opacity: value > 0 ? 1 : 0.5 
          }}
        ></div>
      </div>
      <div 
        className="text-center font-medium rounded-full px-3 py-1 text-sm"
        style={{ color: 'white', backgroundColor: color }}
      >
        {label}
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

function TabButton({ active, onClick, label }: TabButtonProps) {
  return (
    <button
      className={`px-4 py-3 text-sm font-medium ${
        active
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-600 hover:text-gray-800'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
} 