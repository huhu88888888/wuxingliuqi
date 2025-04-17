import wuyunliuqiData from '../../public/wuyunliuqi-data.json';
import wuyunliuqiConcepts from '../../public/wuyunliuqi-concepts.json';
import detailedData from '../../public/wuyunliuqi-detailed-data.json';

export interface MonthData {
  monthNumber: number;
  lunarMonth: string;
  seasonQi: string;
  guestQi: string;
  description: string;
}

export interface YearData {
  tianYun: string;
  diQi: string;
  description: string;
}

export interface WuYunLiuQiYearData {
  year: YearData;
  months: MonthData[];
}

export interface SolarTerm {
  name: string;
  startDate: string;
  endDate: string;
  mainQi: string;
  guestQi: string;
  description: string;
  healthAdvice: string;
  commonDiseases: string;
  preventiveMeasures: string;
}

export interface ChildrenDisease {
  category: string;
  symptoms: string;
}

export interface YearAnalysis {
  overallAnalysis: string;
  healthImpact: string;
  childrenDiseases: ChildrenDisease[];
  adultDiseases: string[];
  preventionAdvice: string[];
}

export interface DetailedYearInfo {
  tianYun: string;
  diQi: string;
  yearDescription: string;
  fiveElements: {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
  };
  analysis: YearAnalysis;
}

export interface DetailedYearData {
  yearInfo: DetailedYearInfo;
  solarTerms: SolarTerm[];
}

export interface ConceptsData {
  wuYun: {
    title: string;
    description: string;
    items: Array<{
      name: string;
      element: string;
      nature: string;
      description: string;
    }>;
  };
  liuQi: {
    title: string;
    description: string;
    items: Array<{
      name: string;
      relatedElement: string;
      characteristics: string;
      healthImpact: string;
    }>;
  };
  seasonRelations: {
    description: string;
    seasons: Array<{
      name: string;
      dominantQi: string;
      dominantYun: string;
      healthAdvice: string;
    }>;
  };
}

// 获取特定年份的五运六气数据
export function getWuYunLiuQiDataByYear(year: number): WuYunLiuQiYearData | null {
  // 目前只有1965年的数据
  if (year !== 1965) {
    return null;
  }
  
  // 使用字符串作为键访问数据
  return wuyunliuqiData[year.toString() as keyof typeof wuyunliuqiData] as WuYunLiuQiYearData;
}

// 获取特定年月的五运六气数据
export function getWuYunLiuQiDataByMonth(year: number, month: number): MonthData | null {
  const yearData = getWuYunLiuQiDataByYear(year);
  
  if (!yearData) {
    return null;
  }
  
  return yearData.months.find(m => m.monthNumber === month) || null;
}

// 获取五运六气概念数据
export function getWuYunLiuQiConcepts(): ConceptsData {
  return wuyunliuqiConcepts as ConceptsData;
}

// 根据五运六气名称获取对应的元素颜色
export function getElementColor(name: string): string {
  if (name.includes('木')) return '#4caf50'; // 绿色
  if (name.includes('火')) return '#f44336'; // 红色
  if (name.includes('土')) return '#ff9800'; // 橙色
  if (name.includes('金')) return '#ffc107'; // 金黄色
  if (name.includes('水')) return '#2196f3'; // 蓝色
  
  // 默认颜色
  return '#757575';
}

// 获取可用的年份列表
export function getAvailableYears(): number[] {
  return [1965]; // 目前只有1965年的数据
}

// 获取详细的年份数据
export function getDetailedYearData(year: number): DetailedYearData | null {
  // 目前只有1965年的数据
  if (year !== 1965) {
    return null;
  }
  
  return detailedData[year.toString() as keyof typeof detailedData] as DetailedYearData;
}

// 根据日期获取对应的节气信息
export function getSolarTermByDate(dateString: string): SolarTerm | null {
  // 解析日期字符串为Date对象
  const date = new Date(dateString);
  
  // 验证日期格式是否有效
  if (isNaN(date.getTime())) {
    return null;
  }
  
  // 获取年份
  const year = date.getFullYear();
  
  // 目前只支持1965年的数据
  if (year !== 1965 && year !== 1966) {
    return null;
  }
  
  // 获取详细年份数据
  const detailedData = getDetailedYearData(1965); // 只有1965年的数据
  
  if (!detailedData) {
    return null;
  }
  
  // 找到日期对应的节气
  for (const solarTerm of detailedData.solarTerms) {
    const startDate = new Date(solarTerm.startDate);
    const endDate = new Date(solarTerm.endDate);
    
    if (date >= startDate && date <= endDate) {
      return solarTerm;
    }
  }
  
  return null;
} 