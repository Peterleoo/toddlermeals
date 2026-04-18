import { db } from '../db';

// 预设的餐单数据
const mealTemplates = {
  breakfast: [
    { dishName: '营养小米粥', ingredients: ['小米 50g', '胡萝卜 20g', '南瓜 30g'] },
    { dishName: '香蕉燕麦粥', ingredients: ['燕麦 30g', '香蕉 1根', '牛奶 100ml'] },
    { dishName: '蒸蛋羹', ingredients: ['鸡蛋 1个', '温水 100ml', '葱花 5g'] },
    { dishName: '全麦面包配酸奶', ingredients: ['全麦面包 1片', '酸奶 100g', '蓝莓 20g'] },
    { dishName: '蔬菜瘦肉粥', ingredients: ['大米 50g', '瘦肉 30g', '青菜 20g'] },
    { dishName: '南瓜小米粥', ingredients: ['小米 40g', '南瓜 50g', '红枣 2颗'] },
    { dishName: '苹果燕麦粥', ingredients: ['燕麦 30g', '苹果 50g', '水 150ml'] },
    { dishName: '鸡肉蔬菜粥', ingredients: ['大米 40g', '鸡肉 25g', '胡萝卜 20g', '西兰花 20g'] },
    { dishName: '豆腐蛋花汤', ingredients: ['豆腐 50g', '鸡蛋 1个', '青菜 20g', '水 200ml'] },
    { dishName: '红薯小米粥', ingredients: ['小米 40g', '红薯 50g'] },
    { dishName: '燕麦牛奶粥', ingredients: ['燕麦 30g', '牛奶 150ml', '蜂蜜 5g'] },
    { dishName: '香蕉牛奶糊', ingredients: ['香蕉 1根', '牛奶 100ml', '米粉 20g'] },
    { dishName: '胡萝卜鸡蛋粥', ingredients: ['大米 40g', '胡萝卜 30g', '鸡蛋 1个'] },
    { dishName: '南瓜牛奶粥', ingredients: ['大米 40g', '南瓜 50g', '牛奶 100ml'] },
    { dishName: '菠菜瘦肉粥', ingredients: ['大米 50g', '瘦肉 25g', '菠菜 20g'] },
    { dishName: '番茄鸡蛋面', ingredients: ['面条 40g', '番茄 40g', '鸡蛋 1个'] },
    { dishName: '黄瓜鸡蛋羹', ingredients: ['鸡蛋 1个', '黄瓜 20g', '温水 100ml'] },
    { dishName: '全麦吐司配果酱', ingredients: ['全麦吐司 2片', '草莓果酱 10g'] },
    { dishName: '南瓜蒸蛋', ingredients: ['南瓜 50g', '鸡蛋 1个', '温水 80ml'] },
    { dishName: '胡萝卜小米粥', ingredients: ['小米 40g', '胡萝卜 30g', '红枣 1颗'] },
    { dishName: '苹果泥配燕麦', ingredients: ['苹果 50g', '燕麦 20g', '牛奶 50ml'] },
    { dishName: '鸡肉粥', ingredients: ['大米 50g', '鸡肉 25g', '姜丝 3g'] },
    { dishName: '豆腐粥', ingredients: ['大米 50g', '豆腐 40g', '青菜 15g'] },
    { dishName: '西兰花鸡蛋粥', ingredients: ['大米 40g', '西兰花 20g', '鸡蛋 1个'] },
    { dishName: '香蕉燕麦糊', ingredients: ['香蕉 1根', '燕麦 20g', '牛奶 80ml'] },
    { dishName: '山药小米粥', ingredients: ['小米 40g', '山药 50g', '红枣 2颗'] },
    { dishName: '番茄鸡蛋羹', ingredients: ['鸡蛋 1个', '番茄 20g', '温水 100ml'] },
    { dishName: '蓝莓燕麦粥', ingredients: ['燕麦 30g', '蓝莓 20g', '牛奶 100ml'] },
    { dishName: '玉米粥', ingredients: ['玉米糁 40g', '大米 20g'] },
    { dishName: '胡萝卜南瓜粥', ingredients: ['大米 40g', '胡萝卜 20g', '南瓜 30g'] }
  ],
  lunch: [
    { dishName: '软米饭配番茄炒蛋', ingredients: ['米饭 60g', '番茄 50g', '鸡蛋 1个', '植物油 5ml'] },
    { dishName: '南瓜鸡肉面', ingredients: ['面条 50g', '南瓜 40g', '鸡肉 30g', '青菜 20g'] },
    { dishName: '鳕鱼蔬菜粥', ingredients: ['大米 50g', '鳕鱼 30g', '西兰花 20g', '胡萝卜 20g'] },
    { dishName: '豆腐蔬菜烩饭', ingredients: ['米饭 60g', '豆腐 50g', '胡萝卜 20g', '青菜 20g', '植物油 5ml'] },
    { dishName: '瘦肉蔬菜小馄饨', ingredients: ['馄饨皮 10张', '瘦肉 30g', '青菜 20g', '葱花 5g'] },
    { dishName: '清蒸鲈鱼配米饭', ingredients: ['鲈鱼 50g', '米饭 60g', '姜丝 5g', '葱段 5g'] },
    { dishName: '鸡肉土豆泥', ingredients: ['鸡肉 30g', '土豆 50g', '牛奶 50ml'] },
    { dishName: '番茄牛肉意面', ingredients: ['意面 50g', '番茄 50g', '牛肉 25g', '植物油 5ml'] },
    { dishName: '蔬菜蛋炒饭', ingredients: ['米饭 60g', '鸡蛋 1个', '胡萝卜 20g', '青菜 20g', '植物油 5ml'] },
    { dishName: '虾仁豆腐羹', ingredients: ['虾仁 25g', '豆腐 50g', '青菜 20g', '水 150ml'] },
    { dishName: '软米饭配红烧肉', ingredients: ['米饭 60g', '五花肉 30g', '酱油 2ml', '冰糖 3g'] },
    { dishName: '鸡肉蔬菜意面', ingredients: ['意面 50g', '鸡肉 25g', '胡萝卜 20g', '西兰花 20g', '植物油 5ml'] },
    { dishName: '清蒸鳕鱼配米饭', ingredients: ['鳕鱼 40g', '米饭 60g', '姜丝 3g', '葱段 3g'] },
    { dishName: '豆腐烧肉配米饭', ingredients: ['米饭 60g', '豆腐 50g', '瘦肉 25g', '酱油 2ml', '植物油 5ml'] },
    { dishName: '蔬菜牛肉粥', ingredients: ['大米 50g', '牛肉 25g', '胡萝卜 20g', '青菜 20g'] },
    { dishName: '鸡蛋蔬菜面', ingredients: ['面条 50g', '鸡蛋 1个', '胡萝卜 20g', '青菜 20g', '植物油 5ml'] },
    { dishName: '虾仁炒饭', ingredients: ['米饭 60g', '虾仁 20g', '鸡蛋 1个', '胡萝卜 15g', '植物油 5ml'] },
    { dishName: '鸡肉粥配馒头', ingredients: ['大米 50g', '鸡肉 25g', '馒头 1个'] },
    { dishName: '番茄鸡蛋盖浇饭', ingredients: ['米饭 60g', '番茄 50g', '鸡蛋 1个', '植物油 5ml'] },
    { dishName: '牛肉土豆泥', ingredients: ['牛肉 25g', '土豆 50g', '牛奶 40ml'] },
    { dishName: '清蒸虾配米饭', ingredients: ['虾 30g', '米饭 60g', '姜丝 3g', '葱段 3g'] },
    { dishName: '蔬菜豆腐汤配米饭', ingredients: ['米饭 60g', '豆腐 50g', '青菜 20g', '胡萝卜 20g', '水 150ml'] },
    { dishName: '鸡肉炒饭', ingredients: ['米饭 60g', '鸡肉 25g', '胡萝卜 20g', '青菜 20g', '植物油 5ml'] },
    { dishName: '鳕鱼豆腐粥', ingredients: ['大米 50g', '鳕鱼 30g', '豆腐 40g', '青菜 20g'] },
    { dishName: '软米饭配炒青菜', ingredients: ['米饭 60g', '青菜 50g', '植物油 5ml', '盐 1g'] },
    { dishName: '番茄鸡蛋面', ingredients: ['面条 50g', '番茄 50g', '鸡蛋 1个', '青菜 20g', '植物油 5ml'] },
    { dishName: '猪肉白菜饺子', ingredients: ['饺子皮 10张', '猪肉 30g', '白菜 30g', '葱花 5g'] },
    { dishName: '软米饭配宫保鸡丁', ingredients: ['米饭 60g', '鸡肉 30g', '花生 10g', '胡萝卜 20g', '植物油 5ml'] },
    { dishName: '南瓜粥配蒸蛋', ingredients: ['南瓜 50g', '大米 40g', '鸡蛋 1个'] },
    { dishName: '牛肉蔬菜汤配馒头', ingredients: ['牛肉 25g', '胡萝卜 20g', '青菜 20g', '馒头 1个', '水 150ml'] }
  ],
  snack: [
    { dishName: '苹果泥', ingredients: ['苹果 1个'] },
    { dishName: '香蕉泥', ingredients: ['香蕉 1根'] },
    { dishName: '蒸南瓜', ingredients: ['南瓜 50g'] },
    { dishName: '酸奶配水果', ingredients: ['酸奶 100g', '草莓 20g', '香蕉 30g'] },
    { dishName: '蔬菜手指条', ingredients: ['胡萝卜 30g', '西兰花 30g', '土豆 30g'] },
    { dishName: '蒸蛋卷', ingredients: ['鸡蛋 1个', '葱花 5g'] },
    { dishName: '小馒头', ingredients: ['面粉 30g', '鸡蛋 1个', '牛奶 20ml'] },
    { dishName: '水果沙拉', ingredients: ['苹果 30g', '香蕉 30g', '酸奶 50g'] },
    { dishName: '烤红薯条', ingredients: ['红薯 50g'] },
    { dishName: '酸奶溶豆', ingredients: ['鸡蛋 1个', '酸奶 50g', '奶粉 10g'] },
    { dishName: '胡萝卜条', ingredients: ['胡萝卜 50g'] },
    { dishName: '苹果片', ingredients: ['苹果 1个'] },
    { dishName: '香蕉片', ingredients: ['香蕉 1根'] },
    { dishName: '蒸胡萝卜', ingredients: ['胡萝卜 50g'] },
    { dishName: '蒸西兰花', ingredients: ['西兰花 50g'] },
    { dishName: '酸奶', ingredients: ['酸奶 100g'] },
    { dishName: '奶酪条', ingredients: ['奶酪 30g'] },
    { dishName: '全麦饼干', ingredients: ['全麦饼干 2片'] },
    { dishName: '梨泥', ingredients: ['梨 1个'] },
    { dishName: '桃子泥', ingredients: ['桃子 1个'] },
    { dishName: '草莓泥', ingredients: ['草莓 50g'] },
    { dishName: '蓝莓泥', ingredients: ['蓝莓 50g'] },
    { dishName: '蒸土豆', ingredients: ['土豆 50g'] },
    { dishName: '蒸山药', ingredients: ['山药 50g'] },
    { dishName: '蒸紫薯', ingredients: ['紫薯 50g'] },
    { dishName: '芒果泥', ingredients: ['芒果 1个'] },
    { dishName: '西瓜片', ingredients: ['西瓜 100g'] },
    { dishName: '哈密瓜片', ingredients: ['哈密瓜 100g'] },
    { dishName: '黄瓜条', ingredients: ['黄瓜 50g'] },
    { dishName: '小番茄', ingredients: ['小番茄 50g'] }
  ],
  dinner: [
    { dishName: '小米南瓜粥', ingredients: ['小米 40g', '南瓜 50g'] },
    { dishName: '软米饭配清蒸鱼', ingredients: ['米饭 60g', '鲈鱼 50g', '姜丝 5g'] },
    { dishName: '鸡肉蔬菜粥', ingredients: ['大米 50g', '鸡肉 30g', '胡萝卜 20g', '青菜 20g'] },
    { dishName: '豆腐蛋花汤配馒头', ingredients: ['豆腐 50g', '鸡蛋 1个', '馒头 1个', '水 150ml'] },
    { dishName: '蔬菜瘦肉粥', ingredients: ['大米 50g', '瘦肉 30g', '菠菜 20g'] },
    { dishName: '南瓜粥配蒸蛋', ingredients: ['大米 40g', '南瓜 50g', '鸡蛋 1个'] },
    { dishName: '鳕鱼豆腐粥', ingredients: ['大米 50g', '鳕鱼 30g', '豆腐 40g', '青菜 20g'] },
    { dishName: '鸡肉面条', ingredients: ['面条 50g', '鸡肉 30g', '胡萝卜 20g', '青菜 20g'] },
    { dishName: '番茄鸡蛋面', ingredients: ['面条 50g', '番茄 50g', '鸡蛋 1个', '青菜 20g'] },
    { dishName: '瘦肉粥配小馒头', ingredients: ['大米 50g', '瘦肉 30g', '小馒头 1个'] },
    { dishName: '小米粥配蒸蛋', ingredients: ['小米 40g', '鸡蛋 1个'] },
    { dishName: '软米饭配炒豆腐', ingredients: ['米饭 60g', '豆腐 50g', '青菜 20g', '植物油 5ml'] },
    { dishName: '鸡肉粥配馒头', ingredients: ['大米 50g', '鸡肉 25g', '馒头 1个'] },
    { dishName: '蔬菜粥', ingredients: ['大米 50g', '胡萝卜 20g', '青菜 20g', '西兰花 20g'] },
    { dishName: '豆腐蔬菜汤配米饭', ingredients: ['米饭 60g', '豆腐 50g', '青菜 20g', '胡萝卜 20g', '水 150ml'] },
    { dishName: '清蒸鱼配米饭', ingredients: ['米饭 60g', '鲈鱼 40g', '姜丝 3g', '葱段 3g'] },
    { dishName: '瘦肉面条', ingredients: ['面条 50g', '瘦肉 25g', '青菜 20g', '胡萝卜 20g'] },
    { dishName: '南瓜粥配馒头', ingredients: ['大米 40g', '南瓜 50g', '馒头 1个'] },
    { dishName: '鸡蛋蔬菜粥', ingredients: ['大米 50g', '鸡蛋 1个', '青菜 20g', '胡萝卜 20g'] },
    { dishName: '鳕鱼粥', ingredients: ['大米 50g', '鳕鱼 30g', '姜丝 3g'] },
    { dishName: '软米饭配鸡蛋羹', ingredients: ['米饭 60g', '鸡蛋 1个', '温水 100ml'] },
    { dishName: '鸡肉蔬菜汤配馒头', ingredients: ['鸡肉 25g', '青菜 20g', '胡萝卜 20g', '馒头 1个', '水 150ml'] },
    { dishName: '小米粥配小馒头', ingredients: ['小米 40g', '小馒头 1个'] },
    { dishName: '豆腐粥', ingredients: ['大米 50g', '豆腐 50g', '青菜 20g'] },
    { dishName: '蔬菜面条', ingredients: ['面条 50g', '青菜 20g', '胡萝卜 20g', '西兰花 20g'] },
    { dishName: '软米饭配炒青菜', ingredients: ['米饭 60g', '青菜 50g', '植物油 5ml', '盐 1g'] },
    { dishName: '鸡蛋番茄面', ingredients: ['面条 50g', '鸡蛋 1个', '番茄 50g', '青菜 20g'] },
    { dishName: '虾仁豆腐粥', ingredients: ['大米 50g', '虾仁 25g', '豆腐 40g', '青菜 20g'] },
    { dishName: '小米山药粥', ingredients: ['小米 40g', '山药 50g', '红枣 2颗'] },
    { dishName: '软米饭配清蒸虾', ingredients: ['米饭 60g', '虾 30g', '姜丝 3g', '葱段 3g'] }
  ]
};

// 预设的食谱教程
const recipeTutorials = {
  '营养小米粥': '# 营养小米粥\n\n## 食材\n- 小米 50g\n- 胡萝卜 20g\n- 南瓜 30g\n\n## 步骤\n1. 小米洗净，浸泡30分钟\n2. 胡萝卜和南瓜去皮，切成小粒\n3. 锅中加入适量清水，放入小米、胡萝卜和南瓜\n4. 大火煮开后，转小火煮30分钟，至小米软烂\n5. 稍凉后即可食用\n\n## 营养提示\n小米富含维生素和矿物质，胡萝卜和南瓜含有丰富的β-胡萝卜素，有助于宝宝的视力发育。',
  '香蕉燕麦粥': '# 香蕉燕麦粥\n\n## 食材\n- 燕麦 30g\n- 香蕉 1根\n- 牛奶 100ml\n\n## 步骤\n1. 燕麦洗净，加入适量清水煮至软烂\n2. 香蕉去皮，切成小块\n3. 将香蕉块加入燕麦粥中，继续煮2分钟\n4. 加入牛奶，搅拌均匀\n5. 稍凉后即可食用\n\n## 营养提示\n燕麦富含膳食纤维，香蕉含有钾元素，牛奶提供钙质，适合作为宝宝的早餐。',
  '蒸蛋羹': '# 蒸蛋羹\n\n## 食材\n- 鸡蛋 1个\n- 温水 100ml\n- 葱花 5g\n\n## 步骤\n1. 鸡蛋打散，加入温水搅拌均匀\n2. 用滤网过滤蛋液，去除气泡\n3. 放入蒸锅中，用中火蒸10分钟\n4. 撒上葱花，即可食用\n\n## 营养提示\n鸡蛋富含优质蛋白质，是宝宝生长发育的重要营养来源。',
  '全麦面包配酸奶': '# 全麦面包配酸奶\n\n## 食材\n- 全麦面包 1片\n- 酸奶 100g\n- 蓝莓 20g\n\n## 步骤\n1. 全麦面包切成小块\n2. 将酸奶倒入碗中\n3. 加入全麦面包块和蓝莓\n4. 轻轻搅拌均匀\n5. 即可食用\n\n## 营养提示\n全麦面包富含膳食纤维，酸奶含有益生菌，有助于宝宝的肠道健康。',
  '蔬菜瘦肉粥': '# 蔬菜瘦肉粥\n\n## 食材\n- 大米 50g\n- 瘦肉 30g\n- 青菜 20g\n\n## 步骤\n1. 大米洗净，浸泡30分钟\n2. 瘦肉切成肉末\n3. 青菜洗净，切成小段\n4. 锅中加入适量清水，放入大米和肉末\n5. 大火煮开后，转小火煮20分钟\n6. 加入青菜，继续煮5分钟\n7. 稍凉后即可食用\n\n## 营养提示\n瘦肉提供优质蛋白质，青菜富含维生素和矿物质，有助于宝宝的健康成长。',
  '南瓜小米粥': '# 南瓜小米粥\n\n## 食材\n- 小米 40g\n- 南瓜 50g\n- 红枣 2颗\n\n## 步骤\n1. 小米洗净，浸泡30分钟\n2. 南瓜去皮，切成小粒\n3. 红枣去核，切成小粒\n4. 锅中加入适量清水，放入小米、南瓜和红枣\n5. 大火煮开后，转小火煮30分钟，至小米软烂\n6. 稍凉后即可食用\n\n## 营养提示\n南瓜含有丰富的β-胡萝卜素和膳食纤维，红枣提供维生素和矿物质，有助于宝宝的消化和营养吸收。',
  '苹果燕麦粥': '# 苹果燕麦粥\n\n## 食材\n- 燕麦 30g\n- 苹果 50g\n- 水 150ml\n\n## 步骤\n1. 燕麦洗净，加入水煮沸\n2. 转小火煮10分钟，至燕麦软烂\n3. 苹果去皮，切成小粒\n4. 将苹果粒加入燕麦粥中，继续煮5分钟\n5. 稍凉后即可食用\n\n## 营养提示\n苹果含有丰富的维生素和膳食纤维，燕麦提供碳水化合物和蛋白质，适合作为宝宝的早餐。',
  '鸡肉蔬菜粥': '# 鸡肉蔬菜粥\n\n## 食材\n- 大米 40g\n- 鸡肉 25g\n- 胡萝卜 20g\n- 西兰花 20g\n\n## 步骤\n1. 大米洗净，浸泡30分钟\n2. 鸡肉切成肉末\n3. 胡萝卜和西兰花切成小粒\n4. 锅中加入适量清水，放入大米和鸡肉末\n5. 大火煮开后，转小火煮20分钟\n6. 加入胡萝卜和西兰花，继续煮5分钟\n7. 稍凉后即可食用\n\n## 营养提示\n鸡肉提供优质蛋白质，胡萝卜和西兰花富含维生素和矿物质，有助于宝宝的生长发育。',
  '豆腐蛋花汤': '# 豆腐蛋花汤\n\n## 食材\n- 豆腐 50g\n- 鸡蛋 1个\n- 青菜 20g\n- 水 200ml\n\n## 步骤\n1. 豆腐切成小粒\n2. 青菜洗净，切成小段\n3. 锅中加入水煮沸\n4. 放入豆腐粒，煮5分钟\n5. 打入鸡蛋，搅拌成蛋花\n6. 加入青菜，煮2分钟\n7. 稍凉后即可食用\n\n## 营养提示\n豆腐富含优质蛋白质和钙质，鸡蛋提供蛋白质，青菜富含维生素，是一道营养均衡的汤品。',
  '红薯小米粥': '# 红薯小米粥\n\n## 食材\n- 小米 40g\n- 红薯 50g\n\n## 步骤\n1. 小米洗净，浸泡30分钟\n2. 红薯去皮，切成小粒\n3. 锅中加入适量清水，放入小米和红薯\n4. 大火煮开后，转小火煮30分钟，至小米和红薯软烂\n5. 稍凉后即可食用\n\n## 营养提示\n红薯含有丰富的膳食纤维和维生素，小米提供碳水化合物和矿物质，有助于宝宝的消化和营养吸收。',
  '软米饭配番茄炒蛋': '# 软米饭配番茄炒蛋\n\n## 食材\n- 米饭 60g\n- 番茄 50g\n- 鸡蛋 1个\n- 植物油 5ml\n\n## 步骤\n1. 番茄洗净，切成小块\n2. 鸡蛋打散\n3. 锅中加入植物油，加热后倒入蛋液\n4. 炒熟后盛出备用\n5. 锅中再加入少量植物油，放入番茄块炒至出汁\n6. 加入炒好的鸡蛋，翻炒均匀\n7. 盛在软米饭上即可食用\n\n## 营养提示\n番茄富含维生素C，鸡蛋提供优质蛋白质，米饭提供碳水化合物，是一道营养均衡的餐食。',
  '南瓜鸡肉面': '# 南瓜鸡肉面\n\n## 食材\n- 面条 50g\n- 南瓜 40g\n- 鸡肉 30g\n- 青菜 20g\n\n## 步骤\n1. 南瓜去皮，切成小粒\n2. 鸡肉切成肉末\n3. 青菜洗净，切成小段\n4. 锅中加入适量清水，放入面条煮至八分熟\n5. 加入南瓜粒和鸡肉末，继续煮5分钟\n6. 加入青菜，煮2分钟\n7. 稍凉后即可食用\n\n## 营养提示\n南瓜含有丰富的β-胡萝卜素，鸡肉提供优质蛋白质，面条提供碳水化合物，青菜富含维生素，是一道营养均衡的餐食。',
  '鳕鱼蔬菜粥': '# 鳕鱼蔬菜粥\n\n## 食材\n- 大米 50g\n- 鳕鱼 30g\n- 西兰花 20g\n- 胡萝卜 20g\n\n## 步骤\n1. 大米洗净，浸泡30分钟\n2. 鳕鱼切成小粒\n3. 西兰花和胡萝卜切成小粒\n4. 锅中加入适量清水，放入大米煮至八分熟\n5. 加入鳕鱼粒、西兰花和胡萝卜，继续煮10分钟\n6. 稍凉后即可食用\n\n## 营养提示\n鳕鱼富含优质蛋白质和DHA，有助于宝宝的大脑发育，西兰花和胡萝卜富含维生素和矿物质，是一道营养丰富的餐食。',
  '豆腐蔬菜烩饭': '# 豆腐蔬菜烩饭\n\n## 食材\n- 米饭 60g\n- 豆腐 50g\n- 胡萝卜 20g\n- 青菜 20g\n- 植物油 5ml\n\n## 步骤\n1. 豆腐切成小粒\n2. 胡萝卜和青菜切成小段\n3. 锅中加入植物油，加热后放入胡萝卜炒至变软\n4. 加入豆腐粒，翻炒均匀\n5. 加入青菜，翻炒至熟\n6. 加入米饭，翻炒均匀\n7. 稍凉后即可食用\n\n## 营养提示\n豆腐富含优质蛋白质和钙质，胡萝卜和青菜富含维生素和矿物质，米饭提供碳水化合物，是一道营养均衡的餐食。',
  '瘦肉蔬菜小馄饨': '# 瘦肉蔬菜小馄饨\n\n## 食材\n- 馄饨皮 10张\n- 瘦肉 30g\n- 青菜 20g\n- 葱花 5g\n\n## 步骤\n1. 瘦肉切成肉末\n2. 青菜洗净，切成细末\n3. 将瘦肉末、青菜末和葱花混合，搅拌均匀\n4. 取一张馄饨皮，放入适量馅料\n5. 包成小馄饨\n6. 锅中加入适量清水，煮沸后放入馄饨\n7. 煮至馄饨浮起，再煮2分钟\n8. 稍凉后即可食用\n\n## 营养提示\n瘦肉提供优质蛋白质，青菜富含维生素和矿物质，馄饨皮提供碳水化合物，是一道营养均衡的餐食。',
  '清蒸鲈鱼配米饭': '# 清蒸鲈鱼配米饭\n\n## 食材\n- 鲈鱼 50g\n- 米饭 60g\n- 姜丝 5g\n- 葱段 5g\n\n## 步骤\n1. 鲈鱼洗净，切成小块\n2. 放入盘中，撒上姜丝和葱段\n3. 放入蒸锅中，大火蒸8分钟\n4. 取出后淋上少量生抽\n5. 搭配米饭食用\n\n## 营养提示\n鲈鱼富含优质蛋白质和DHA，有助于宝宝的大脑发育，米饭提供碳水化合物，是一道营养丰富的餐食。',
  '鸡肉土豆泥': '# 鸡肉土豆泥\n\n## 食材\n- 鸡肉 30g\n- 土豆 50g\n- 牛奶 50ml\n\n## 步骤\n1. 土豆去皮，切成小块\n2. 放入锅中，加入适量清水煮至软烂\n3. 鸡肉切成小块，煮熟\n4. 将土豆和鸡肉放入搅拌机中，加入牛奶\n5. 搅拌成泥状\n6. 稍凉后即可食用\n\n## 营养提示\n鸡肉提供优质蛋白质，土豆提供碳水化合物，牛奶提供钙质，是一道营养均衡的餐食。',
  '番茄牛肉意面': '# 番茄牛肉意面\n\n## 食材\n- 意面 50g\n- 番茄 50g\n- 牛肉 25g\n- 植物油 5ml\n\n## 步骤\n1. 意面放入锅中，加入适量清水煮至八分熟\n2. 番茄洗净，切成小块\n3. 牛肉切成肉末\n4. 锅中加入植物油，加热后放入牛肉末炒至变色\n5. 加入番茄块，炒至出汁\n6. 加入煮好的意面，翻炒均匀\n7. 稍凉后即可食用\n\n## 营养提示\n牛肉提供优质蛋白质和铁质，番茄富含维生素C，意面提供碳水化合物，是一道营养均衡的餐食。',
  '蔬菜蛋炒饭': '# 蔬菜蛋炒饭\n\n## 食材\n- 米饭 60g\n- 鸡蛋 1个\n- 胡萝卜 20g\n- 青菜 20g\n- 植物油 5ml\n\n## 步骤\n1. 鸡蛋打散\n2. 胡萝卜和青菜切成小段\n3. 锅中加入植物油，加热后倒入蛋液\n4. 炒熟后盛出备用\n5. 锅中再加入少量植物油，放入胡萝卜炒至变软\n6. 加入青菜，翻炒至熟\n7. 加入米饭和炒好的鸡蛋，翻炒均匀\n8. 稍凉后即可食用\n\n## 营养提示\n鸡蛋提供优质蛋白质，胡萝卜和青菜富含维生素和矿物质，米饭提供碳水化合物，是一道营养均衡的餐食。',
  '虾仁豆腐羹': '# 虾仁豆腐羹\n\n## 食材\n- 虾仁 25g\n- 豆腐 50g\n- 青菜 20g\n- 水 150ml\n\n## 步骤\n1. 虾仁洗净，切成小块\n2. 豆腐切成小粒\n3. 青菜洗净，切成小段\n4. 锅中加入水煮沸\n5. 放入豆腐粒，煮5分钟\n6. 加入虾仁和青菜，煮3分钟\n7. 稍凉后即可食用\n\n## 营养提示\n虾仁富含优质蛋白质和钙质，豆腐提供蛋白质和钙质，青菜富含维生素，是一道营养丰富的餐食。',
  '苹果泥': '# 苹果泥\n\n## 食材\n- 苹果 1个\n\n## 步骤\n1. 苹果洗净，去皮去核\n2. 切成小块\n3. 放入蒸锅中，大火蒸10分钟\n4. 取出后用勺子压成泥状\n5. 稍凉后即可食用\n\n## 营养提示\n苹果富含维生素和膳食纤维，有助于宝宝的消化和营养吸收。',
  '香蕉泥': '# 香蕉泥\n\n## 食材\n- 香蕉 1根\n\n## 步骤\n1. 香蕉去皮\n2. 切成小块\n3. 用勺子压成泥状\n4. 即可食用\n\n## 营养提示\n香蕉富含钾元素和膳食纤维，有助于宝宝的消化和营养吸收。',
  '蒸南瓜': '# 蒸南瓜\n\n## 食材\n- 南瓜 50g\n\n## 步骤\n1. 南瓜去皮，切成小块\n2. 放入蒸锅中，大火蒸15分钟\n3. 取出后用勺子压成泥状\n4. 稍凉后即可食用\n\n## 营养提示\n南瓜富含β-胡萝卜素和膳食纤维，有助于宝宝的视力发育和消化。',
  '酸奶配水果': '# 酸奶配水果\n\n## 食材\n- 酸奶 100g\n- 草莓 20g\n- 香蕉 30g\n\n## 步骤\n1. 草莓洗净，切成小块\n2. 香蕉去皮，切成小块\n3. 将酸奶倒入碗中\n4. 加入草莓和香蕉块\n5. 轻轻搅拌均匀\n6. 即可食用\n\n## 营养提示\n酸奶含有益生菌，有助于宝宝的肠道健康，水果提供维生素和膳食纤维，是一道营养丰富的零食。',
  '蔬菜手指条': '# 蔬菜手指条\n\n## 食材\n- 胡萝卜 30g\n- 西兰花 30g\n- 土豆 30g\n\n## 步骤\n1. 胡萝卜和土豆去皮，切成手指粗细的条\n2. 西兰花洗净，切成小朵\n3. 锅中加入适量清水，煮沸后放入蔬菜条\n4. 煮至软烂\n5. 取出后稍凉即可食用\n\n## 营养提示\n胡萝卜富含β-胡萝卜素，西兰花富含维生素和矿物质，土豆提供碳水化合物，是一道营养丰富的手指食物。',
  '蒸蛋卷': '# 蒸蛋卷\n\n## 食材\n- 鸡蛋 1个\n- 葱花 5g\n\n## 步骤\n1. 鸡蛋打散，加入葱花搅拌均匀\n2. 平底锅加热，刷上少量植物油\n3. 倒入蛋液，摊成薄饼\n4. 待蛋液凝固后，卷成蛋卷\n5. 放入蒸锅中，大火蒸5分钟\n6. 取出后切成小段\n7. 稍凉后即可食用\n\n## 营养提示\n鸡蛋富含优质蛋白质，是宝宝生长发育的重要营养来源。',
  '小馒头': '# 小馒头\n\n## 食材\n- 面粉 30g\n- 鸡蛋 1个\n- 牛奶 20ml\n\n## 步骤\n1. 面粉和鸡蛋混合，加入牛奶搅拌成面团\n2. 将面团分成小份，揉成小馒头形状\n3. 放入蒸锅中，大火蒸15分钟\n4. 取出后稍凉即可食用\n\n## 营养提示\n面粉提供碳水化合物，鸡蛋提供优质蛋白质，牛奶提供钙质，是一道营养丰富的零食。',
  '水果沙拉': '# 水果沙拉\n\n## 食材\n- 苹果 30g\n- 香蕉 30g\n- 酸奶 50g\n\n## 步骤\n1. 苹果洗净，去皮去核，切成小块\n2. 香蕉去皮，切成小块\n3. 将苹果和香蕉块放入碗中\n4. 倒入酸奶，轻轻搅拌均匀\n5. 即可食用\n\n## 营养提示\n水果富含维生素和膳食纤维，酸奶含有益生菌，有助于宝宝的肠道健康。',
  '烤红薯条': '# 烤红薯条\n\n## 食材\n- 红薯 50g\n\n## 步骤\n1. 红薯去皮，切成手指粗细的条\n2. 放入烤盘中，刷上少量植物油\n3. 放入烤箱，180℃烤20分钟\n4. 取出后稍凉即可食用\n\n## 营养提示\n红薯富含膳食纤维和维生素，是一道营养丰富的零食。',
  '酸奶溶豆': '# 酸奶溶豆\n\n## 食材\n- 鸡蛋 1个\n- 酸奶 50g\n- 奶粉 10g\n\n## 步骤\n1. 分离鸡蛋，只取蛋白\n2. 将蛋白打发至硬性发泡\n3. 加入酸奶和奶粉，轻轻搅拌均匀\n4. 用裱花袋挤成小圆形\n5. 放入烤箱，100℃烤60分钟\n6. 取出后冷却即可食用\n\n## 营养提示\n酸奶含有益生菌，鸡蛋提供优质蛋白质，奶粉提供钙质，是一道营养丰富的零食。',
  '小米南瓜粥': '# 小米南瓜粥\n\n## 食材\n- 小米 40g\n- 南瓜 50g\n\n## 步骤\n1. 小米洗净，浸泡30分钟\n2. 南瓜去皮，切成小粒\n3. 锅中加入适量清水，放入小米和南瓜\n4. 大火煮开后，转小火煮30分钟，至小米和南瓜软烂\n5. 稍凉后即可食用\n\n## 营养提示\n小米富含维生素和矿物质，南瓜含有丰富的β-胡萝卜素，有助于宝宝的视力发育。',
  '软米饭配清蒸鱼': '# 软米饭配清蒸鱼\n\n## 食材\n- 米饭 60g\n- 鲈鱼 50g\n- 姜丝 5g\n\n## 步骤\n1. 鲈鱼洗净，切成小块\n2. 放入盘中，撒上姜丝\n3. 放入蒸锅中，大火蒸8分钟\n4. 取出后淋上少量生抽\n5. 搭配软米饭食用\n\n## 营养提示\n鲈鱼富含优质蛋白质和DHA，有助于宝宝的大脑发育，米饭提供碳水化合物，是一道营养丰富的餐食。',
  '豆腐蛋花汤配馒头': '# 豆腐蛋花汤配馒头\n\n## 食材\n- 豆腐 50g\n- 鸡蛋 1个\n- 馒头 1个\n- 水 150ml\n\n## 步骤\n1. 豆腐切成小粒\n2. 锅中加入水煮沸\n3. 放入豆腐粒，煮5分钟\n4. 打入鸡蛋，搅拌成蛋花\n5. 馒头切成小块\n6. 将馒头块放入汤中，煮2分钟\n7. 稍凉后即可食用\n\n## 营养提示\n豆腐富含优质蛋白质和钙质，鸡蛋提供蛋白质，馒头提供碳水化合物，是一道营养均衡的餐食。',
  '南瓜粥配蒸蛋': '# 南瓜粥配蒸蛋\n\n## 食材\n- 大米 40g\n- 南瓜 50g\n- 鸡蛋 1个\n\n## 步骤\n1. 大米洗净，浸泡30分钟\n2. 南瓜去皮，切成小粒\n3. 锅中加入适量清水，放入大米和南瓜\n4. 大火煮开后，转小火煮30分钟，至大米和南瓜软烂\n5. 鸡蛋打散，加入温水搅拌均匀\n6. 用滤网过滤蛋液，去除气泡\n7. 放入蒸锅中，用中火蒸10分钟\n8. 南瓜粥和蒸蛋搭配食用\n\n## 营养提示\n南瓜含有丰富的β-胡萝卜素，大米提供碳水化合物，鸡蛋提供优质蛋白质，是一道营养均衡的餐食。',
  '鳕鱼豆腐粥': '# 鳕鱼豆腐粥\n\n## 食材\n- 大米 50g\n- 鳕鱼 30g\n- 豆腐 40g\n- 青菜 20g\n\n## 步骤\n1. 大米洗净，浸泡30分钟\n2. 鳕鱼切成小粒\n3. 豆腐切成小粒\n4. 青菜洗净，切成小段\n5. 锅中加入适量清水，放入大米煮至八分熟\n6. 加入鳕鱼粒、豆腐粒和青菜，继续煮10分钟\n7. 稍凉后即可食用\n\n## 营养提示\n鳕鱼富含优质蛋白质和DHA，豆腐提供蛋白质和钙质，青菜富含维生素，是一道营养丰富的餐食。',
  '鸡肉面条': '# 鸡肉面条\n\n## 食材\n- 面条 50g\n- 鸡肉 30g\n- 胡萝卜 20g\n- 青菜 20g\n\n## 步骤\n1. 鸡肉切成肉末\n2. 胡萝卜和青菜切成小段\n3. 锅中加入适量清水，放入面条煮至八分熟\n4. 加入鸡肉末、胡萝卜和青菜，继续煮5分钟\n5. 稍凉后即可食用\n\n## 营养提示\n鸡肉提供优质蛋白质，胡萝卜和青菜富含维生素和矿物质，面条提供碳水化合物，是一道营养均衡的餐食。',
  '番茄鸡蛋面': '# 番茄鸡蛋面\n\n## 食材\n- 面条 50g\n- 番茄 50g\n- 鸡蛋 1个\n- 青菜 20g\n\n## 步骤\n1. 番茄洗净，切成小块\n2. 鸡蛋打散\n3. 锅中加入适量清水，放入面条煮至八分熟\n4. 加入番茄块，煮5分钟\n5. 打入鸡蛋，搅拌成蛋花\n6. 加入青菜，煮2分钟\n7. 稍凉后即可食用\n\n## 营养提示\n番茄富含维生素C，鸡蛋提供优质蛋白质，青菜富含维生素，面条提供碳水化合物，是一道营养均衡的餐食。',
  '瘦肉粥配小馒头': '# 瘦肉粥配小馒头\n\n## 食材\n- 大米 50g\n- 瘦肉 30g\n- 小馒头 1个\n\n## 步骤\n1. 大米洗净，浸泡30分钟\n2. 瘦肉切成肉末\n3. 锅中加入适量清水，放入大米和肉末\n4. 大火煮开后，转小火煮30分钟，至大米软烂\n5. 小馒头切成小块\n6. 瘦肉粥和小馒头搭配食用\n\n## 营养提示\n瘦肉提供优质蛋白质，大米提供碳水化合物，小馒头提供碳水化合物，是一道营养均衡的餐食。'
};

export function getBabyProfile() {
  try {
    const data = localStorage.getItem('babyProfile');
    if (data) return JSON.parse(data);
  } catch (e) {}
  return { age: 24, gender: 'boy' };
}

// 生成每日餐单
export async function generateDailyPlan(date: string, language: 'zh' | 'en') {
  const prefs = await db.preferences.toArray();
  const likes = prefs.filter(p => p.type === 'like').map(p => p.item);
  const dislikes = prefs.filter(p => p.type === 'dislike').map(p => p.item);
  const allergies = prefs.filter(p => p.type === 'allergy').map(p => p.item);

  // Get recent history to avoid repetition
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const recentHistory = await db.mealHistory.where('date').aboveOrEqual(threeDaysAgo).toArray();
  const recentMeals = recentHistory.map(h => h.dishName);

  const meals = [];
  const mealTypes: Array<keyof typeof mealTemplates> = ['breakfast', 'lunch', 'snack', 'dinner'];

  for (const mealType of mealTypes) {
    // Filter out meals with disliked ingredients or allergens
    let availableMeals = mealTemplates[mealType].filter(meal => {
      const hasDisliked = meal.ingredients.some(ing => {
        // 提取食材名称（去掉数量和单位）
        const ingName = ing.split(' ')[0];
        return dislikes.includes(ingName);
      });
      const hasAllergy = meal.ingredients.some(ing => {
        // 提取食材名称（去掉数量和单位）
        const ingName = ing.split(' ')[0];
        return allergies.includes(ingName);
      });
      return !hasDisliked && !hasAllergy;
    });

    // Prioritize meals with liked ingredients
    const likedMeals = availableMeals.filter(meal => {
      return meal.ingredients.some(ing => {
        // 提取食材名称（去掉数量和单位）
        const ingName = ing.split(' ')[0];
        return likes.includes(ingName);
      });
    });

    if (likedMeals.length > 0) {
      availableMeals = likedMeals.concat(availableMeals.filter(meal => !likedMeals.includes(meal)));
    }

    // Filter out recently used meals
    availableMeals = availableMeals.filter(meal => !recentMeals.includes(meal.dishName));

    // If no available meals, use all meals
    if (availableMeals.length === 0) {
      availableMeals = mealTemplates[mealType].filter(meal => {
        const hasAllergy = meal.ingredients.some(ing => {
          // 提取食材名称（去掉数量和单位）
          const ingName = ing.split(' ')[0];
          return allergies.includes(ingName);
        });
        return !hasAllergy;
      });
    }

    // Select a random meal
    const selectedMeal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
    meals.push({
      mealType,
      dishName: selectedMeal.dishName,
      ingredients: selectedMeal.ingredients
    });
  }

  return meals;
}

// 生成单个餐食
export async function generateSingleMeal(date: string, mealType: string, language: 'zh' | 'en') {
  const prefs = await db.preferences.toArray();
  const dislikes = prefs.filter(p => p.type === 'dislike').map(p => p.item);
  const allergies = prefs.filter(p => p.type === 'allergy').map(p => p.item);

  // Get recent history to avoid repetition
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const recentHistory = await db.mealHistory.where('date').aboveOrEqual(threeDaysAgo).toArray();
  const recentMeals = recentHistory.map(h => h.dishName);

  // Filter out meals with disliked ingredients or allergens
  let availableMeals = mealTemplates[mealType as keyof typeof mealTemplates].filter(meal => {
    const hasDisliked = meal.ingredients.some(ing => {
      // 提取食材名称（去掉数量和单位）
      const ingName = ing.split(' ')[0];
      return dislikes.includes(ingName);
    });
    const hasAllergy = meal.ingredients.some(ing => {
      // 提取食材名称（去掉数量和单位）
      const ingName = ing.split(' ')[0];
      return allergies.includes(ingName);
    });
    return !hasDisliked && !hasAllergy;
  });

  // Filter out recently used meals
  availableMeals = availableMeals.filter(meal => !recentMeals.includes(meal.dishName));

  // If no available meals, use all meals
  if (availableMeals.length === 0) {
    availableMeals = mealTemplates[mealType as keyof typeof mealTemplates].filter(meal => {
      const hasAllergy = meal.ingredients.some(ing => {
        // 提取食材名称（去掉数量和单位）
        const ingName = ing.split(' ')[0];
        return allergies.includes(ingName);
      });
      return !hasAllergy;
    });
  }

  // Select a random meal
  const selectedMeal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
  return {
    mealType,
    dishName: selectedMeal.dishName,
    ingredients: selectedMeal.ingredients
  };
}

// 生成食谱教程
export async function generateTutorial(dishName: string, ingredients: string[], language: 'zh' | 'en') {
  // 返回预设的教程，如果没有则返回默认教程
  return recipeTutorials[dishName as keyof typeof recipeTutorials] || `# ${dishName}\n\n## 食材\n${ingredients.map(ing => `- ${ing}`).join('\n')}\n\n## 步骤\n1. 准备好所有食材\n2. 根据宝宝的年龄和咀嚼能力，将食材切成适当的大小\n3. 烹饪至软烂，确保宝宝容易消化\n4. 稍凉后即可食用\n\n## 营养提示\n这是一道营养均衡的宝宝餐食，适合${getBabyProfile().age}个月的宝宝食用。`;
}

// 生成报告
export async function generateReport(timeframe: 'daily' | 'weekly', history: any[], language: 'zh' | 'en') {
  if (history.length === 0) {
    return language === 'zh' ? '没有足够的就餐历史来生成报告。' : 'Not enough meal history to generate a report.';
  }

  const eatenMeals = history.filter(h => h.status === 'eaten');
  const rejectedMeals = history.filter(h => h.status === 'rejected');
  const partialMeals = history.filter(h => h.status === 'partial');
  const acceptanceRate = history.length > 0 ? Math.round((eatenMeals.length / history.length) * 100) : 0;

  // 分析喜欢和不喜欢的食材
  const ingredientCount: { [key: string]: number } = {};
  const rejectedIngredientCount: { [key: string]: number } = {};

  eatenMeals.forEach(meal => {
    meal.ingredients.forEach((ing: string) => {
      // 提取食材名称（去掉数量和单位）
      const ingName = ing.split(' ')[0];
      ingredientCount[ingName] = (ingredientCount[ingName] || 0) + 1;
    });
  });

  rejectedMeals.forEach(meal => {
    meal.ingredients.forEach((ing: string) => {
      // 提取食材名称（去掉数量和单位）
      const ingName = ing.split(' ')[0];
      rejectedIngredientCount[ingName] = (rejectedIngredientCount[ingName] || 0) + 1;
    });
  });

  // 找出最受欢迎和最不受欢迎的食材
  const popularIngredients = Object.entries(ingredientCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([ing]) => ing);

  const unpopularIngredients = Object.entries(rejectedIngredientCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([ing]) => ing);

  // 按日期分组（如果是每周报告）
  const mealsByDate: { [key: string]: any[] } = {};
  history.forEach(meal => {
    if (!mealsByDate[meal.date]) {
      mealsByDate[meal.date] = [];
    }
    mealsByDate[meal.date].push(meal);
  });

  if (timeframe === 'daily') {
    // 每日详细报告
    // 获取最新的日期
    const latestDate = Object.keys(mealsByDate).sort().reverse()[0];
    const dayMeals = mealsByDate[latestDate] || [];
    
    // 按餐点类型排序
    const mealOrder = { breakfast: 1, lunch: 2, snack: 3, dinner: 4 };
    const sortedMeals = dayMeals.sort((a, b) => {
      const aOrder = mealOrder[a.mealType.toLowerCase() as keyof typeof mealOrder] || 99;
      const bOrder = mealOrder[b.mealType.toLowerCase() as keyof typeof mealOrder] || 99;
      return aOrder - bOrder;
    });

    // 计算当日的接受率
    const dayAcceptanceRate = dayMeals.length > 0 ? Math.round((dayMeals.filter(m => m.status === 'eaten').length / dayMeals.length) * 100) : 0;

    if (language === 'zh') {
      return `# 宝宝每日饮食报告\n\n## 日期\n${latestDate}\n\n## 基本统计\n- 总餐数: ${dayMeals.length}\n- 已吃餐数: ${dayMeals.filter(m => m.status === 'eaten').length}\n- 拒绝餐数: ${dayMeals.filter(m => m.status === 'rejected').length}\n- 部分食用: ${dayMeals.filter(m => m.status === 'partial').length}\n- 接受率: ${dayAcceptanceRate}%\n\n## 当日餐食详情\n${sortedMeals.map(meal => {
  const mealTypeKey = meal.mealType.toLowerCase() as keyof typeof mealOrder;
  const translatedMealType = mealTypeKey === 'breakfast' ? '早餐' : 
                           mealTypeKey === 'lunch' ? '午餐' : 
                           mealTypeKey === 'snack' ? '加餐' : 
                           mealTypeKey === 'dinner' ? '晚餐' : meal.mealType;
  const statusText = meal.status === 'eaten' ? '已吃' : 
                    meal.status === 'rejected' ? '拒绝' : 
                    meal.status === 'partial' ? '部分食用' : '待定';
  return `### ${translatedMealType}\n- 菜品: ${meal.dishName}\n- 状态: ${statusText}\n- 食材: ${meal.ingredients.join(', ')}\n`;
}).join('\n')}\n\n## 饮食习惯分析\n### 喜欢的食材\n${popularIngredients.length > 0 ? popularIngredients.map(ing => `- ${ing}`).join('\n') : '暂无数据'}\n\n### 不喜欢的食材\n${unpopularIngredients.length > 0 ? unpopularIngredients.map(ing => `- ${ing}`).join('\n') : '暂无数据'}\n\n## 建议\n- 多提供宝宝喜欢的食材，增加餐食的接受度\n- 尝试不同的烹饪方式，让宝宝体验多样化的口感\n- 保持餐食的营养均衡，确保宝宝获得全面的营养`;
    } else {
      return `# Toddler Daily Meal Report\n\n## Date\n${latestDate}\n\n## Basic Statistics\n- Total Meals: ${dayMeals.length}\n- Meals Eaten: ${dayMeals.filter(m => m.status === 'eaten').length}\n- Meals Rejected: ${dayMeals.filter(m => m.status === 'rejected').length}\n- Partially Eaten: ${dayMeals.filter(m => m.status === 'partial').length}\n- Acceptance Rate: ${dayAcceptanceRate}%\n\n## Daily Meal Details\n${sortedMeals.map(meal => {
  const statusText = meal.status === 'eaten' ? 'Eaten' : 
                    meal.status === 'rejected' ? 'Rejected' : 
                    meal.status === 'partial' ? 'Partially Eaten' : 'Pending';
  return `### ${meal.mealType}\n- Dish: ${meal.dishName}\n- Status: ${statusText}\n- Ingredients: ${meal.ingredients.join(', ')}\n`;
}).join('\n')}\n\n## Eating Habit Analysis\n### Liked Ingredients\n${popularIngredients.length > 0 ? popularIngredients.map(ing => `- ${ing}`).join('\n') : 'No data available'}\n\n### Disliked Ingredients\n${unpopularIngredients.length > 0 ? unpopularIngredients.map(ing => `- ${ing}`).join('\n') : 'No data available'}\n\n## Recommendations\n- Offer more of the ingredients your toddler likes to increase meal acceptance\n- Try different cooking methods to introduce varied textures\n- Maintain a balanced diet to ensure your toddler gets comprehensive nutrition`;
    }
  } else {
    // 每周报告
    if (language === 'zh') {
      return `# 宝宝饮食报告\n\n## 基本统计\n- 总餐数: ${history.length}\n- 已吃餐数: ${eatenMeals.length}\n- 拒绝餐数: ${rejectedMeals.length}\n- 部分食用: ${partialMeals.length}\n- 接受率: ${acceptanceRate}%\n\n## 每日概览\n${Object.entries(mealsByDate).map(([date, meals]) => {
  const dayEaten = meals.filter(m => m.status === 'eaten').length;
  const dayTotal = meals.length;
  const dayAcceptance = dayTotal > 0 ? Math.round((dayEaten / dayTotal) * 100) : 0;
  return `- ${date}: ${dayEaten}/${dayTotal} 餐 (${dayAcceptance}% 接受率)`;
}).join('\n')}\n\n## 饮食习惯分析\n### 喜欢的食材\n${popularIngredients.length > 0 ? popularIngredients.map(ing => `- ${ing}`).join('\n') : '暂无数据'}\n\n### 不喜欢的食材\n${unpopularIngredients.length > 0 ? unpopularIngredients.map(ing => `- ${ing}`).join('\n') : '暂无数据'}\n\n## 建议\n- 多提供宝宝喜欢的食材，增加餐食的接受度\n- 尝试不同的烹饪方式，让宝宝体验多样化的口感\n- 保持餐食的营养均衡，确保宝宝获得全面的营养`;
    } else {
      return `# Toddler Meal Report\n\n## Basic Statistics\n- Total Meals: ${history.length}\n- Meals Eaten: ${eatenMeals.length}\n- Meals Rejected: ${rejectedMeals.length}\n- Partially Eaten: ${partialMeals.length}\n- Acceptance Rate: ${acceptanceRate}%\n\n## Daily Overview\n${Object.entries(mealsByDate).map(([date, meals]) => {
  const dayEaten = meals.filter(m => m.status === 'eaten').length;
  const dayTotal = meals.length;
  const dayAcceptance = dayTotal > 0 ? Math.round((dayEaten / dayTotal) * 100) : 0;
  return `- ${date}: ${dayEaten}/${dayTotal} meals (${dayAcceptance}% acceptance)`;
}).join('\n')}\n\n## Eating Habit Analysis\n### Liked Ingredients\n${popularIngredients.length > 0 ? popularIngredients.map(ing => `- ${ing}`).join('\n') : 'No data available'}\n\n### Disliked Ingredients\n${unpopularIngredients.length > 0 ? unpopularIngredients.map(ing => `- ${ing}`).join('\n') : 'No data available'}\n\n## Recommendations\n- Offer more of the ingredients your toddler likes to increase meal acceptance\n- Try different cooking methods to introduce varied textures\n- Maintain a balanced diet to ensure your toddler gets comprehensive nutrition`;
    }
  }
}
