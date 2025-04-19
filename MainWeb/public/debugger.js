// 初始消息列表
let messages = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: '你好，请介绍一下文明枢纽游戏的特点。' }
];

// 当前正在编辑的消息索引
let editingIndex = null;

// API配置
const API_KEY = 'd36d3932-e745-4340-9737-5dff42f1a901';
const DEFAULT_MODEL = 'deepseek-v3-250324';

// API参数
let apiParams = {
  temperature: 0.7,
  max_tokens: 4096,
  top_p: 0.8,
  frequency_penalty: 0,
  presence_penalty: 0,
  model: DEFAULT_MODEL
};

// 更新所有参数值显示
function updateAllParamValues() {
  for (const param in apiParams) {
    if (document.getElementById(`${param}-value`)) {
      document.getElementById(`${param}-value`).textContent = apiParams[param];
    }
  }
  // 设置模型选择器的值
  if (document.getElementById('model-selector')) {
    document.getElementById('model-selector').value = apiParams.model;
  }
  // 更新模型显示
  document.getElementById('model-value').textContent = apiParams.model;
}

// 发送请求
function sendRequest() {
  // 更新状态
  document.getElementById('status').textContent = '请求状态: 处理中';
  
  // 显示加载图标
  document.getElementById('response-content').innerHTML = `
    <div style="display: flex; justify-content: center; padding: 2rem;">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <style>
          .spinner { animation: rotate 2s linear infinite; }
          @keyframes rotate { 100% { transform: rotate(360deg); } }
          .path { animation: dash 1.5s ease-in-out infinite; }
          @keyframes dash { 
            0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; } 
            50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; } 
            100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; } 
          }
        </style>
        <circle class="path" cx="12" cy="12" r="10" fill="none" stroke="#6e44ff" stroke-width="3" stroke-linecap="round"></circle>
      </svg>
    </div>
  `;
  
  // 实际API调用 (目前是模拟的)
  // 这里可以实现真正的API调用，使用API_KEY和apiParams.model
  console.log(`Using API Key: ${API_KEY}`);
  console.log(`Using Model: ${apiParams.model}`);
  
  // 模拟API调用
  setTimeout(() => {
    // 模拟响应处理
    document.getElementById('status').textContent = '请求状态: 完成';
    document.getElementById('response-content').textContent = '模拟响应内容';
  }, 2000);
}