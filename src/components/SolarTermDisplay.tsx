import React from 'react';
import { SolarTerm, getElementColor } from '@/lib/wuyunliuqi';

interface SolarTermDisplayProps {
  solarTerm: SolarTerm;
}

export function SolarTermDisplay({ solarTerm }: SolarTermDisplayProps) {
  const mainQiColor = getElementColor(solarTerm.mainQi);
  const guestQiColor = getElementColor(solarTerm.guestQi);
  
  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
        <h2 className="text-3xl font-bold mb-1">{solarTerm.name}</h2>
        <p className="opacity-80">
          {formatDate(solarTerm.startDate)} — {formatDate(solarTerm.endDate)}
        </p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold mb-2 text-blue-800">节气概述</h3>
            <p className="text-gray-700">{solarTerm.description}</p>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: mainQiColor }}>
                <span className="text-white font-medium">主</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">主气</div>
                <div className="font-semibold" style={{ color: mainQiColor }}>{solarTerm.mainQi}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: guestQiColor }}>
                <span className="text-white font-medium">客</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">客气</div>
                <div className="font-semibold" style={{ color: guestQiColor }}>{solarTerm.guestQi}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-lg font-semibold mb-2 text-green-800">养生建议</h3>
            <p className="text-gray-700">{solarTerm.healthAdvice}</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h3 className="text-lg font-semibold mb-2 text-red-800">常见疾病</h3>
            <p className="text-gray-700">{solarTerm.commonDiseases}</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="text-lg font-semibold mb-2 text-yellow-800">预防措施</h3>
            <p className="text-gray-700">{solarTerm.preventiveMeasures}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 