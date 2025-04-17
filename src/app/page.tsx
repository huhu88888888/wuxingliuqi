'use client';

import { useState } from 'react';
import { DatePicker } from '@/components/ui/date-picker';
import { WuYunLiuQiDisplay } from '@/components/WuYunLiuQiDisplay';
import { WuYunLiuQiConcepts } from '@/components/WuYunLiuQiConcepts';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>('1965-01-20');
  const [activeSection, setActiveSection] = useState<'data' | 'concepts'>('data');

  return (
    <main className="wuyunliuqi-bg min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-800">中医五运六气查询系统</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            探索传统中医理论中的时间气候变化与健康关系，根据二十四节气了解五运六气对人体的影响
          </p>
        </header>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/3">
            <DatePicker
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
            
            <div className="mt-4 bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">查看内容</h3>
              <div className="flex flex-col space-y-2">
                <button
                  className={`px-4 py-2 rounded-md text-left font-medium ${
                    activeSection === 'data'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveSection('data')}
                >
                  五运六气数据
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-left font-medium ${
                    activeSection === 'concepts'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveSection('concepts')}
                >
                  基本概念与理论
                </button>
              </div>
            </div>
            
            <div className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-3">关于五运六气</h3>
              <p className="text-sm">
                五运六气是中医学对自然气候变化规律及其对人体影响的理论。通过了解节气特点，我们可以顺应自然，防病保健。
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            {activeSection === 'data' ? (
              <WuYunLiuQiDisplay selectedDate={selectedDate} />
            ) : (
              <WuYunLiuQiConcepts />
            )}
          </div>
        </div>
        
        <footer className="mt-12 py-6 border-t text-center text-gray-500 text-sm">
          <p>© 2024 中医五运六气查询系统 | 基于传统中医理论</p>
          <p className="mt-2">
            目前仅收录1965年数据，后续将持续更新更多年份的五运六气资料
          </p>
        </footer>
      </div>
    </main>
  );
}
