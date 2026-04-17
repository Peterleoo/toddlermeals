import { generateDailyPlan as localGenerateDailyPlan, generateSingleMeal as localGenerateSingleMeal, generateTutorial as localGenerateTutorial, generateReport as localGenerateReport } from './localMealGenerator';

// 尝试导入 AI 服务，如果失败则使用本地服务
let generateDailyPlanAI: any = null;
let generateSingleMealAI: any = null;
let generateTutorialAI: any = null;
let generateReportAI: any = null;

try {
  // 动态导入 AI 服务
  const aiModule = require('./ai');
  generateDailyPlanAI = aiModule.generateDailyPlan;
  generateSingleMealAI = aiModule.generateSingleMeal;
  generateTutorialAI = aiModule.generateTutorial;
  generateReportAI = aiModule.generateReport;
} catch (e) {
  // AI 服务导入失败，使用本地服务
  console.log('AI service not available, using local meal generator');
}

// 检查是否启用 AI
function isAiEnabled() {
  try {
    const aiSettings = localStorage.getItem('aiSettings');
    if (aiSettings) {
      const settings = JSON.parse(aiSettings);
      return settings.aiEnabled && settings.apiKey;
    }
  } catch (e) {
    console.error('Error reading AI settings:', e);
  }
  return false;
}

// 生成每日餐单
export async function generateDailyPlan(date: string, language: 'zh' | 'en') {
  if (isAiEnabled() && generateDailyPlanAI) {
    try {
      return await generateDailyPlanAI(date, language);
    } catch (e) {
      console.error('AI meal generation failed, falling back to local:', e);
      return await localGenerateDailyPlan(date, language);
    }
  } else {
    return await localGenerateDailyPlan(date, language);
  }
}

// 生成单个餐食
export async function generateSingleMeal(date: string, mealType: string, language: 'zh' | 'en') {
  if (isAiEnabled() && generateSingleMealAI) {
    try {
      return await generateSingleMealAI(date, mealType, language);
    } catch (e) {
      console.error('AI single meal generation failed, falling back to local:', e);
      return await localGenerateSingleMeal(date, mealType, language);
    }
  } else {
    return await localGenerateSingleMeal(date, mealType, language);
  }
}

// 生成食谱教程
export async function generateTutorial(dishName: string, ingredients: string[], language: 'zh' | 'en') {
  if (isAiEnabled() && generateTutorialAI) {
    try {
      return await generateTutorialAI(dishName, ingredients, language);
    } catch (e) {
      console.error('AI tutorial generation failed, falling back to local:', e);
      return await localGenerateTutorial(dishName, ingredients, language);
    }
  } else {
    return await localGenerateTutorial(dishName, ingredients, language);
  }
}

// 生成报告
export async function generateReport(timeframe: 'daily' | 'weekly', history: any[], language: 'zh' | 'en') {
  if (isAiEnabled() && generateReportAI) {
    try {
      return await generateReportAI(timeframe, history, language);
    } catch (e) {
      console.error('AI report generation failed, falling back to local:', e);
      return await localGenerateReport(timeframe, history, language);
    }
  } else {
    return await localGenerateReport(timeframe, history, language);
  }
}