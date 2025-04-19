import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DebuggerContainer = styled.div`
  min-height: 100vh;
  background: #0f0f19;
  color: #fff;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h1`
  font-size: 1.8rem;
  background: linear-gradient(90deg, #6e44ff 0%, #00eeff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BackButton = styled.button`
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background: rgba(21, 21, 31, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const PanelTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .actions {
    display: flex;
    gap: 0.5rem;
  }
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 'linear-gradient(90deg, #6e44ff 0%, #5033cc 100%)' : 'transparent'};
  color: ${props => props.primary ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  border: ${props => props.primary ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'};
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? '0.6' : '1'};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  
  &:hover {
    background: ${props => props.primary ? 'linear-gradient(90deg, #5033cc 0%, #3d2799 100%)' : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #6e44ff;
    border-radius: 10px;
  }
`;

const Message = styled.div`
  background: ${props => {
    switch(props.role) {
      case 'system': return 'rgba(255, 184, 0, 0.1)';
      case 'user': return 'rgba(0, 184, 255, 0.1)';
      case 'assistant': return 'rgba(110, 68, 255, 0.1)';
      case 'tool': return 'rgba(0, 255, 184, 0.1)';
      default: return 'rgba(255, 255, 255, 0.05)';
    }
  }};
  border-radius: 8px;
  padding: 1rem;
  position: relative;
  
  &:hover .message-actions {
    opacity: 1;
  }
`;

const MessageRole = styled.div`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
  background: ${props => {
    switch(props.role) {
      case 'system': return 'rgba(255, 184, 0, 0.8)';
      case 'user': return 'rgba(0, 184, 255, 0.8)';
      case 'assistant': return 'rgba(110, 68, 255, 0.8)';
      case 'tool': return 'rgba(0, 255, 184, 0.8)';
      default: return 'rgba(255, 255, 255, 0.3)';
    }
  }};
`;

const MessageContent = styled.div`
  color: #fff;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const MessageActions = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.3rem;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const IconButton = styled.button`
  background: rgba(21, 21, 31, 0.8);
  color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    background: ${props => props.delete ? 'rgba(255, 0, 0, 0.2)' : 'rgba(110, 68, 255, 0.2)'};
  }
`;

const Form = styled.div`
  margin-top: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(21, 21, 31, 0.8);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  
  &:focus {
    border-color: #6e44ff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(21, 21, 31, 0.8);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 0.9rem;
  min-height: 120px;
  outline: none;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    border-color: #6e44ff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ResponseArea = styled.div`
  margin-top: 1.5rem;
`;

const ResponseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ResponseMeta = styled.div`
  background: rgba(21, 21, 31, 0.8);
  border-radius: 6px;
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  
  .meta-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .meta-value {
    color: #fff;
  }
`;

const ResponseContent = styled.div`
  background: rgba(110, 68, 255, 0.1);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
  white-space: pre-wrap;
  font-size: 0.9rem;
  line-height: 1.5;
  max-height: 400px;
  overflow-y: auto;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Tab = styled.button`
  background: ${props => props.active ? 'rgba(110, 68, 255, 0.1)' : 'transparent'};
  color: ${props => props.active ? '#6e44ff' : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  padding: 0.8rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#6e44ff' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.active ? '#6e44ff' : '#fff'};
  }
`;

const ParameterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const ParameterCard = styled.div`
  background: rgba(21, 21, 31, 0.8);
  border-radius: 8px;
  padding: 1rem;
`;

const ParameterTitle = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  
  .param-key {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const RangeInput = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin: 0.5rem 0;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: #6e44ff;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  background: rgba(21, 21, 31, 1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.9rem;
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(21, 21, 31, 0.9);
  border-radius: 6px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1rem;
`;

function PromptDebugger() {
  const [activeTab, setActiveTab] = useState('context');
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: '你好，请介绍一下文明枢纽游戏的特点。' }
  ]);
  const [editingMessage, setEditingMessage] = useState(null);
  const [newMessage, setNewMessage] = useState({ role: 'user', content: '' });
  const [response, setResponse] = useState({
    content: '',
    metadata: {
      model: 'doubao-1.5-pro-32k',
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      latency: 0
    }
  });
  const [streamingContent, setStreamingContent] = useState('');
  const [apiParams, setApiParams] = useState({
    temperature: 0.7,
    max_tokens: 4096,
    top_p: 0.8,
    frequency_penalty: 0,
    presence_penalty: 0,
    model: 'deepseek-v3-250324'
  });
  const [apiKey, setApiKey] = useState('d36d3932-e745-4340-9737-5dff42f1a901');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [finalResponse, setFinalResponse] = useState(null);
  const [abortController, setAbortController] = useState(null);

  const handleAddMessage = () => {
    if (newMessage.content.trim() === '') return;
    
    if (editingMessage !== null) {
      const updatedMessages = [...messages];
      updatedMessages[editingMessage] = newMessage;
      setMessages(updatedMessages);
      setEditingMessage(null);
    } else {
      setMessages([...messages, newMessage]);
    }
    
    setNewMessage({ role: 'user', content: '' });
  };
  
  const handleEditMessage = (index) => {
    setEditingMessage(index);
    setNewMessage(messages[index]);
  };
  
  const handleDeleteMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
    
    if (editingMessage === index) {
      setEditingMessage(null);
      setNewMessage({ role: 'user', content: '' });
    }
  };
  
  const handleClearAll = () => {
    if (window.confirm('确定要清空所有消息吗？这将保留系统消息。')) {
      const systemMessage = messages.find(msg => msg.role === 'system');
      setMessages(systemMessage ? [systemMessage] : []);
    }
  };
  
  const handleChangeParam = (param, value) => {
    setApiParams({
      ...apiParams,
      [param]: value
    });
  };
  
  const handleStreamResponse = async (reader, startTime, responseMetadata) => {
    const decoder = new TextDecoder();
    let accumulatedContent = '';
    let id, model, created, object, service_tier;
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }
        
        // 解析SSE数据
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            if (line.includes('[DONE]')) {
              // 流结束
              const endTime = Date.now();
              const latency = ((endTime - startTime) / 1000).toFixed(2);
              
              // 设置最终响应
              setFinalResponse({
                content: accumulatedContent,
                metadata: {
                  model: model || apiParams.model,
                  usage: responseMetadata.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
                  latency: latency,
                  id: id,
                  created: created,
                  object: object,
                  service_tier: service_tier
                }
              });
              
              // 将最终响应添加到消息列表
              setMessages(prevMessages => [...prevMessages, { 
                role: 'assistant', 
                content: accumulatedContent 
              }]);
              
              setIsStreaming(false);
              break;
            } else {
              // 处理内容块
              try {
                const data = JSON.parse(line.substring(6));
                
                // 存储响应元数据
                if (!id && data.id) id = data.id;
                if (!model && data.model) model = data.model;
                if (!created && data.created) created = data.created;
                if (!object && data.object) object = data.object;
                if (!service_tier && data.service_tier) service_tier = data.service_tier;
                
                // 获取实际内容
                if (data.choices && data.choices.length > 0) {
                  const delta = data.choices[0].delta;
                  
                  if (delta && delta.content) {
                    accumulatedContent += delta.content;
                    setStreamingContent(accumulatedContent);
                  }
                  
                  // 更新用量数据
                  if (data.usage) {
                    responseMetadata.usage = data.usage;
                  }
                }
              } catch (e) {
                console.error('解析SSE数据时出错:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('流处理过程中出错:', error);
      setIsStreaming(false);
    }
  };
  
  const handleStopRequest = () => {
    if (abortController) {
      abortController.abort();
      console.log('请求已手动终止');
      
      // 更新UI状态
      setIsStreaming(false);
      setIsSubmitting(false);
      
      // 设置最终响应，标记为用户终止
      if (streamingContent) {
        setFinalResponse({
          content: streamingContent,
          metadata: {
            model: apiParams.model,
            usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
            latency: 0,
            id: '用户终止',
            finish_reason: 'user_cancelled'
          }
        });
        
        // 将当前内容添加到消息列表
        setMessages(prevMessages => [...prevMessages, { 
          role: 'assistant', 
          content: streamingContent 
        }]);
      }
    }
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsStreaming(true);
    setStreamingContent('');
    setFinalResponse(null);
    
    // 创建新的AbortController实例
    const controller = new AbortController();
    setAbortController(controller);
    
    const startTime = Date.now();
    const responseMetadata = {
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
    };
    
    try {
      // 按照API要求构建请求体，添加stream: true参数
      const requestBody = {
        model: apiParams.model,
        messages: messages,
        temperature: parseFloat(apiParams.temperature),
        max_tokens: parseInt(apiParams.max_tokens),
        top_p: parseFloat(apiParams.top_p),
        frequency_penalty: parseFloat(apiParams.frequency_penalty),
        presence_penalty: parseFloat(apiParams.presence_penalty),
        stream: true
      };
      
      console.log('发送流式请求:', requestBody);
      
      const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal  // 添加AbortController信号
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || errorData.message || '请求失败');
      }
      
      // 获取响应流并处理
      const reader = response.body.getReader();
      await handleStreamResponse(reader, startTime, responseMetadata);
      
    } catch (error) {
      // 检查是否是用户终止导致的错误
      if (error.name === 'AbortError') {
        console.log('请求被用户终止');
      } else {
        console.error('API调用失败:', error);
        setResponse({
          content: `请求失败: ${error.message}`,
          metadata: {
            model: apiParams.model,
            usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
            latency: 0,
            error: error.message
          }
        });
      }
      setIsStreaming(false);
    } finally {
      setIsSubmitting(false);
      setAbortController(null);  // 清理AbortController
    }
  };
  
  const exportPrompt = () => {
    const data = JSON.stringify({
      messages,
      apiParams
    }, null, 2);
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const importPrompt = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.messages && Array.isArray(data.messages)) {
              setMessages(data.messages);
            }
            if (data.apiParams) {
              setApiParams(data.apiParams);
            }
          } catch (error) {
            alert('导入失败：文件格式错误');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };
  
  return (
    <DebuggerContainer>
      <Header>
        <Title>提示词调试控制台</Title>
        <BackButton onClick={() => window.history.back()}>返回主页</BackButton>
      </Header>
      
      <MainContent>
        <Panel>
          <Tabs>
            <Tab 
              active={activeTab === 'context'} 
              onClick={() => setActiveTab('context')}
            >
              上下文管理
            </Tab>
            <Tab 
              active={activeTab === 'params'} 
              onClick={() => setActiveTab('params')}
            >
              模型参数
            </Tab>
          </Tabs>
          
          {activeTab === 'context' && (
            <>
              <PanelTitle>
                对话历史
                <div className="actions">
                  <ActionButton onClick={exportPrompt}>导出</ActionButton>
                  <ActionButton onClick={importPrompt}>导入</ActionButton>
                  <ActionButton onClick={handleClearAll}>清空</ActionButton>
                </div>
              </PanelTitle>
              
              <MessageList>
                {messages.map((message, index) => (
                  <Message key={index} role={message.role}>
                    <MessageRole role={message.role}>
                      {message.role === 'system' ? '系统' : 
                       message.role === 'user' ? '用户' : 
                       message.role === 'assistant' ? 'AI' : '工具'}
                    </MessageRole>
                    <MessageContent>{message.content}</MessageContent>
                    <MessageActions className="message-actions">
                      <IconButton onClick={() => handleEditMessage(index)}>✏️</IconButton>
                      <IconButton delete onClick={() => handleDeleteMessage(index)}>🗑️</IconButton>
                    </MessageActions>
                  </Message>
                ))}
              </MessageList>
              
              <Form>
                <FormGroup>
                  <Label>角色</Label>
                  <Select 
                    value={newMessage.role}
                    onChange={(e) => setNewMessage({...newMessage, role: e.target.value})}
                  >
                    <option value="system">系统</option>
                    <option value="user">用户</option>
                    <option value="assistant">AI助手</option>
                    <option value="tool">工具</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label>内容</Label>
                  <TextArea 
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                    placeholder="输入消息内容..."
                  />
                </FormGroup>
                
                <ButtonGroup>
                  <ActionButton primary onClick={handleAddMessage}>
                    {editingMessage !== null ? '更新消息' : '添加消息'}
                  </ActionButton>
                  {editingMessage !== null && (
                    <ActionButton onClick={() => {
                      setEditingMessage(null);
                      setNewMessage({ role: 'user', content: '' });
                    }}>
                      取消
                    </ActionButton>
                  )}
                </ButtonGroup>
              </Form>
            </>
          )}
          
          {activeTab === 'params' && (
            <>
              <PanelTitle>模型参数设置</PanelTitle>
              <ParameterGrid>
                <ParameterCard>
                  <ParameterTitle>
                    模型 <span className="param-key">model</span>
                  </ParameterTitle>
                  <Select
                    value={apiParams.model}
                    onChange={(e) => handleChangeParam('model', e.target.value)}
                  >
                    <option value="deepseek-v3-250324">DeepSeek V3</option>
                    <option value="doubao-1.5-pro-32k-250115">豆包 1.5 Pro 32K</option>
                    <option value="doubao-1.5-32k-chat">豆包 1.5 32K Chat</option>
                  </Select>
                </ParameterCard>
                
                <ParameterCard>
                  <ParameterTitle>
                    API密钥 <span className="param-key">api_key</span>
                  </ParameterTitle>
                  <Input 
                    type="password" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="输入API密钥"
                  />
                </ParameterCard>
                
                <ParameterCard>
                  <ParameterTitle>
                    温度 <span className="param-key">temperature</span>
                  </ParameterTitle>
                  <RangeInput 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={apiParams.temperature}
                    onChange={(e) => handleChangeParam('temperature', parseFloat(e.target.value))}
                  />
                  <RangeLabels>
                    <span>确定性 0</span>
                    <span>{apiParams.temperature}</span>
                    <span>1 创造性</span>
                  </RangeLabels>
                </ParameterCard>
                
                <ParameterCard>
                  <ParameterTitle>
                    最大长度 <span className="param-key">max_tokens</span>
                  </ParameterTitle>
                  <Input 
                    type="number" 
                    min="1" 
                    max="32000" 
                    value={apiParams.max_tokens}
                    onChange={(e) => handleChangeParam('max_tokens', parseInt(e.target.value))}
                  />
                </ParameterCard>
                
                <ParameterCard>
                  <ParameterTitle>
                    核采样 <span className="param-key">top_p</span>
                  </ParameterTitle>
                  <RangeInput 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={apiParams.top_p}
                    onChange={(e) => handleChangeParam('top_p', parseFloat(e.target.value))}
                  />
                  <RangeLabels>
                    <span>0</span>
                    <span>{apiParams.top_p}</span>
                    <span>1</span>
                  </RangeLabels>
                </ParameterCard>
                
                <ParameterCard>
                  <ParameterTitle>
                    频率惩罚 <span className="param-key">frequency_penalty</span>
                  </ParameterTitle>
                  <RangeInput 
                    type="range" 
                    min="-2" 
                    max="2" 
                    step="0.1" 
                    value={apiParams.frequency_penalty}
                    onChange={(e) => handleChangeParam('frequency_penalty', parseFloat(e.target.value))}
                  />
                  <RangeLabels>
                    <span>-2</span>
                    <span>{apiParams.frequency_penalty}</span>
                    <span>2</span>
                  </RangeLabels>
                </ParameterCard>
                
                <ParameterCard>
                  <ParameterTitle>
                    存在惩罚 <span className="param-key">presence_penalty</span>
                  </ParameterTitle>
                  <RangeInput 
                    type="range" 
                    min="-2" 
                    max="2" 
                    step="0.1" 
                    value={apiParams.presence_penalty}
                    onChange={(e) => handleChangeParam('presence_penalty', parseFloat(e.target.value))}
                  />
                  <RangeLabels>
                    <span>-2</span>
                    <span>{apiParams.presence_penalty}</span>
                    <span>2</span>
                  </RangeLabels>
                </ParameterCard>
              </ParameterGrid>
            </>
          )}
          
          <ButtonGroup style={{ marginTop: '2rem' }}>
            <ActionButton 
              primary 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? '请求中...' : '发送请求'}
            </ActionButton>
            
            {isStreaming && (
              <ActionButton 
                onClick={handleStopRequest}
                style={{ 
                  background: 'rgba(255, 68, 68, 0.1)', 
                  color: '#ff4444', 
                  borderColor: 'rgba(255, 68, 68, 0.3)' 
                }}
              >
                停止生成
              </ActionButton>
            )}
          </ButtonGroup>
        </Panel>
        
        <Panel>
          <PanelTitle>
            响应结果
            <div className="actions">
              <ActionButton 
                onClick={() => {
                  const contentToCopy = finalResponse ? finalResponse.content : streamingContent;
                  navigator.clipboard.writeText(contentToCopy);
                  alert('已复制到剪贴板');
                }}
                disabled={!streamingContent && !finalResponse}
              >
                复制
              </ActionButton>
            </div>
          </PanelTitle>
          
          <ResponseMeta>
            <div className="meta-item">
              <span>请求ID</span>
              <span className="meta-value">
                {finalResponse?.metadata.id || '-'}
              </span>
            </div>
            <div className="meta-item">
              <span>模型</span>
              <span className="meta-value">
                {finalResponse?.metadata.model || apiParams.model}
              </span>
            </div>
            <div className="meta-item">
              <span>提示词tokens</span>
              <span className="meta-value">
                {finalResponse?.metadata.usage.prompt_tokens || 0}
              </span>
            </div>
            <div className="meta-item">
              <span>生成tokens</span>
              <span className="meta-value">
                {finalResponse?.metadata.usage.completion_tokens || 0}
              </span>
            </div>
            <div className="meta-item">
              <span>总tokens</span>
              <span className="meta-value">
                {finalResponse?.metadata.usage.total_tokens || 0}
              </span>
            </div>
            <div className="meta-item">
              <span>停止原因</span>
              <span className="meta-value">
                {finalResponse?.metadata.finish_reason || '-'}
              </span>
            </div>
            <div className="meta-item">
              <span>响应时间</span>
              <span className="meta-value">
                {finalResponse?.metadata.latency || (isStreaming ? '计时中...' : '0')}s
              </span>
            </div>
            {finalResponse?.metadata.error && (
              <div className="meta-item error">
                <span>错误信息</span>
                <span className="meta-value">{finalResponse.metadata.error}</span>
              </div>
            )}
          </ResponseMeta>
          
          <ResponseContent>
            {isSubmitting && !streamingContent ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <style>
                    {`.spinner { animation: rotate 2s linear infinite; }`}
                    {`@keyframes rotate { 100% { transform: rotate(360deg); } }`}
                    {`.path { animation: dash 1.5s ease-in-out infinite; }`}
                    {`@keyframes dash { 0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; } 50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; } 100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; } }`}
                  </style>
                  <circle className="path" cx="12" cy="12" r="10" fill="none" stroke="#6e44ff" strokeWidth="3" strokeLinecap="round"></circle>
                </svg>
              </div>
            ) : streamingContent ? (
              <>
                {streamingContent}
                {isStreaming && (
                  <span className="cursor" style={{ display: 'inline-block', width: '8px', height: '18px', background: '#6e44ff', marginLeft: '2px', verticalAlign: 'middle', animation: 'blink 1s infinite' }}>
                    <style>
                      {`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}
                    </style>
                  </span>
                )}
              </>
            ) : finalResponse?.content ? (
              finalResponse.content
            ) : (
              <div style={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center' }}>
                暂无响应数据
              </div>
            )}
          </ResponseContent>
          
          <StatusBar>
            <span>
              请求状态: {
                isSubmitting 
                  ? (isStreaming ? '接收中' : '处理中') 
                  : finalResponse?.metadata.finish_reason === 'user_cancelled'
                    ? '用户终止'
                    : '就绪'
              }
            </span>
            <span>版本: v0.1.0</span>
          </StatusBar>
        </Panel>
      </MainContent>
    </DebuggerContainer>
  );
}

export default PromptDebugger;
