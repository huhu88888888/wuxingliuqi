import React, { useState } from 'react';
import { getWuYunLiuQiConcepts, getElementColor } from '@/lib/wuyunliuqi';

export function WuYunLiuQiConcepts() {
  const concepts = getWuYunLiuQiConcepts();
  const [activeTab, setActiveTab] = useState<'wuYun' | 'liuQi' | 'seasons'>('wuYun');

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="border-b">
        <div className="flex">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'wuYun'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('wuYun')}
          >
            五运解析
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'liuQi'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('liuQi')}
          >
            六气解析
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'seasons'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('seasons')}
          >
            四季对应
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'wuYun' && (
          <div>
            <h3 className="text-xl font-bold mb-2">{concepts.wuYun.title}</h3>
            <p className="text-gray-700 mb-6">{concepts.wuYun.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {concepts.wuYun.items.map((item) => (
                <div 
                  key={item.name} 
                  className="border rounded-lg p-4 transition-all hover:shadow-md"
                  style={{ borderColor: getElementColor(item.name) }}
                >
                  <div className="flex items-center mb-2">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: getElementColor(item.name) }}
                    ></div>
                    <h4 
                      className="font-medium text-lg"
                      style={{ color: getElementColor(item.name) }}
                    >
                      {item.name}
                    </h4>
                  </div>
                  <div className="flex space-x-4 mb-2 text-sm">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                      {item.element}行
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                      {item.nature}性
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'liuQi' && (
          <div>
            <h3 className="text-xl font-bold mb-2">{concepts.liuQi.title}</h3>
            <p className="text-gray-700 mb-6">{concepts.liuQi.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {concepts.liuQi.items.map((item) => (
                <div 
                  key={item.name} 
                  className="border rounded-lg p-4 transition-all hover:shadow-md"
                  style={{ borderColor: getElementColor(item.relatedElement) }}
                >
                  <div className="flex justify-between mb-3">
                    <h4 className="font-medium text-lg">{item.name}</h4>
                    <span 
                      className="px-2 py-1 text-xs rounded-full text-white"
                      style={{ backgroundColor: getElementColor(item.relatedElement) }}
                    >
                      {item.relatedElement}行
                    </span>
                  </div>
                  <div className="mb-3">
                    <h5 className="text-xs uppercase tracking-wider text-gray-500 mb-1">特性</h5>
                    <p className="text-gray-700">{item.characteristics}</p>
                  </div>
                  <div>
                    <h5 className="text-xs uppercase tracking-wider text-gray-500 mb-1">健康影响</h5>
                    <p className="text-gray-700 text-sm">{item.healthImpact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'seasons' && (
          <div>
            <h3 className="text-xl font-bold mb-2">四季与五运六气</h3>
            <p className="text-gray-700 mb-6">{concepts.seasonRelations.description}</p>
            
            <div className="space-y-4">
              {concepts.seasonRelations.seasons.map((season) => (
                <div 
                  key={season.name} 
                  className="bg-gray-50 rounded-lg p-4 transition-all hover:bg-gray-100"
                >
                  <div className="flex items-center mb-3">
                    <h4 
                      className="font-medium text-lg mr-3"
                      style={{ color: getElementColor(season.dominantYun) }}
                    >
                      {season.name}季
                    </h4>
                    <div className="flex space-x-2">
                      <span 
                        className="px-2 py-1 text-xs rounded-full text-white"
                        style={{ backgroundColor: getElementColor(season.dominantYun) }}
                      >
                        {season.dominantYun}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
                        {season.dominantQi}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs uppercase tracking-wider text-gray-500 mb-1">养生建议</h5>
                    <p className="text-gray-700">{season.healthAdvice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 