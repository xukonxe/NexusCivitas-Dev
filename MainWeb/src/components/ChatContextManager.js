import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const ChatManagerSection = styled.section`
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
  background: var(--background);
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  
  span {
    background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SectionDescription = styled(motion.p)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1.1rem;
`;

const ChatContextContainer = styled(motion.div)`
  background: rgba(21, 21, 31, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Tab = styled.button`
  background: ${props => props.active ? 'rgba(110, 68, 255, 0.1)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-secondary)'};
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? 'var(--primary)' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
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
    background: var(--primary);
    border-radius: 10px;
  }
`;

const MessageItem = styled.div`
  background: ${props => {
    switch(props.role) {
      case 'system': return 'rgba(255, 184, 0, 0.1)';
      case 'user': return 'rgba(0, 184, 255, 0.1)';
      case 'assistant': return 'rgba(110, 68, 255, 0.1)';
      case 'tool': return 'rgba(0, 255, 184, 0.1)';
      default: return 'rgba(255, 255, 255, 0.05)';
    }
  }};
  border-radius: 12px;
  padding: 1.2rem;
  position: relative;
  
  &:hover .message-actions {
    opacity: 1;
  }
`;

const MessageRole = styled.div`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
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
  color: var(--text-primary);
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const MessageActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ActionButton = styled.button`
  background: rgba(21, 21, 31, 0.8);
  color: var(--text-secondary);
  border: none;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary);
    background: rgba(110, 68, 255, 0.1);
  }
`;

const AddMessageForm = styled.div`
  margin-top: 2rem;
`;

const FormTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(21, 21, 31, 0.8);
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(110, 68, 255, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(21, 21, 31, 0.8);
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  outline: none;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(110, 68, 255, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.primary {
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    border: none;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(110, 68, 255, 0.3);
    }
  }
  
  &.secondary {
    background: transparent;
    color: var(--text-secondary);
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.2);
    }
  }
  
  &.danger {
    background: transparent;
    color: #ff4a4a;
    border: 1px solid rgba(255, 74, 74, 0.3);
    
    &:hover {
      background: rgba(255, 74, 74, 0.1);
    }
  }
`;

const ParameterContainer = styled.div`
  margin-top: 3rem;
`;

const ParameterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const ParameterCard = styled.div`
  background: rgba(21, 21, 31, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
`;

const ParameterTitle = styled.h4`
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  
  span {
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
    background: rgba(110, 68, 255, 0.1);
    color: var(--primary);
    border-radius: 4px;
    margin-left: 0.5rem;
  }
`;

const ParameterDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(21, 21, 31, 0.8);
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(110, 68, 255, 0.2);
  }
  
  &[type="range"] {
    -webkit-appearance: none;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      background: var(--primary);
      border-radius: 50%;
      cursor: pointer;
    }
  }
`;

const RangeContainer = styled.div`
  width: 100%;
  
  .range-value {
    display: flex;
    justify-content: space-between;
    color: var(--text-secondary);
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
`;

const ChatContextManager = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello, can you help me with my project?' },
    { role: 'assistant', content: 'Of course! I\'d be happy to help with your project. What kind of project are you working on, and what specific assistance do you need?' }
  ]);
  
  const [editingMessage, setEditingMessage] = useState(null);
  const [newMessage, setNewMessage] = useState({ role: 'user', content: '' });
  
  // API参数状态
  const [apiParams, setApiParams] = useState({
    temperature: 0.8,
    max_tokens: 4096,
    top_p: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0
  });
  
  const handleAddMessage = () => {
    if (newMessage.content.trim() === '') return;
    
    if (editingMessage !== null) {
      // 更新已有消息
      const updatedMessages = [...messages];
      updatedMessages[editingMessage] = newMessage;
      setMessages(updatedMessages);
      setEditingMessage(null);
    } else {
      // 添加新消息
      setMessages([...messages, newMessage]);
    }
    
    // 重置表单
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
  
  const handleCancelEdit = () => {
    setEditingMessage(null);
    setNewMessage({ role: 'user', content: '' });
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
  
  return (
    <ChatManagerSection id="chat-context">
      <SectionContainer>
        <SectionTitle
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          聊天<span>上下文管理</span>
        </SectionTitle>
        
        <SectionDescription
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          管理您的对话历史，编辑系统提示词和用户消息，优化AI生成内容
        </SectionDescription>
        
        <ChatContextContainer
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <TabContainer>
            <Tab 
              active={activeTab === 'messages'} 
              onClick={() => setActiveTab('messages')}
            >
              对话历史
            </Tab>
            <Tab 
              active={activeTab === 'params'} 
              onClick={() => setActiveTab('params')}
            >
              模型参数
            </Tab>
          </TabContainer>
          
          {activeTab === 'messages' && (
            <>
              <MessageList>
                {messages.map((message, index) => (
                  <MessageItem key={index} role={message.role}>
                    <MessageRole role={message.role}>
                      {message.role === 'system' ? '系统' : 
                       message.role === 'user' ? '用户' : 
                       message.role === 'assistant' ? 'AI助手' : '工具'}
                    </MessageRole>
                    <MessageContent>{message.content}</MessageContent>
                    <MessageActions className="message-actions">
                      <ActionButton onClick={() => handleEditMessage(index)} title="编辑">
                        ✏️
                      </ActionButton>
                      <ActionButton onClick={() => handleDeleteMessage(index)} title="删除">
                        🗑️
                      </ActionButton>
                    </MessageActions>
                  </MessageItem>
                ))}
              </MessageList>
              
              <ButtonGroup>
                <Button className="secondary" onClick={handleClearAll}>
                  清空对话
                </Button>
              </ButtonGroup>
              
              <AddMessageForm>
                <FormTitle>
                  {editingMessage !== null ? '编辑消息' : '添加新消息'}
                </FormTitle>
                <FormGroup>
                  <FormLabel>角色</FormLabel>
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
                  <FormLabel>内容</FormLabel>
                  <TextArea 
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                    placeholder="输入消息内容..."
                  />
                </FormGroup>
                <ButtonGroup>
                  <Button className="primary" onClick={handleAddMessage}>
                    {editingMessage !== null ? '更新消息' : '添加消息'}
                  </Button>
                  {editingMessage !== null && (
                    <Button className="secondary" onClick={handleCancelEdit}>
                      取消编辑
                    </Button>
                  )}
                </ButtonGroup>
              </AddMessageForm>
            </>
          )}
          
          {activeTab === 'params' && (
            <ParameterContainer>
              <FormTitle>模型参数设置</FormTitle>
              <ParameterDescription>
                调整以下参数可以控制AI的输出行为。参数设置会影响模型的创造力、确定性和回复长度等特性。
              </ParameterDescription>
              
              <ParameterGrid>
                <ParameterCard>
                  <ParameterTitle>温度 <span>temperature</span></ParameterTitle>
                  <ParameterDescription>
                    控制输出的随机性。较高的值会使输出更加随机，较低的值会使输出更加确定。
                  </ParameterDescription>
                  <RangeContainer>
                    <Input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      value={apiParams.temperature}
                      onChange={(e) => handleChangeParam('temperature', parseFloat(e.target.value))}
                    />
                    <div className="range-value">
                      <span>确定性 0</span>
                      <span>{apiParams.temperature}</span>
                      <span>1 创造性</span>
                    </div>
                  </RangeContainer>
                </ParameterCard>
                
                <ParameterCard>
                  <ParameterTitle>最大输出长度 <span>max_tokens</span></ParameterTitle>
                  <ParameterDescription>
                    设置模型回复的最大长度限制。
                  </ParameterDescription>
                  <Input 
                    type="number" 
                    min="1" 
                    max="32000" 
                    value={apiParams.max_tokens}
                    onChange={(e) => handleChangeParam('max_tokens', parseInt(e.target.value))}
                  />
                </ParameterCard>
                
                <ParameterCard>
                  <ParameterTitle>核采样 <span>top_p</span></ParameterTitle>
                  <ParameterDescription>
                    控制模型生成文本时的多样性。较低的值会使输出更加集中在高概率的词上。
                  </ParameterDescription>
                  <RangeContainer>
                    <Input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      value={apiParams.top_p}
                      onChange={(e) => handleChangeParam('top_p', parseFloat(e.target.value))}
                    />
                    <div className="range-value">
                      <span>专注 0</span>
                      <span>{apiParams.top_p}</span>
                      <span>1 多样</span>
                    </div>
                  </RangeContainer>
                </ParameterCard>
                
                <ParameterCard>
                  <ParameterTitle>频率惩罚 <span>frequency_penalty</span></ParameterTitle>
                  <ParameterDescription>
                    减少模型重复输出相同词语的倾向。较高的值会降低重复度。
                  </ParameterDescription>
                  <RangeContainer>
                    <Input 
                      type="range" 
                      min="-2" 
                      max="2" 
                      step="0.1" 
                      value={apiParams.frequency_penalty}
                      onChange={(e) => handleChangeParam('frequency_penalty', parseFloat(e.target.value))}
                    />
                    <div className="range-value">
                      <span>-2</span>
                      <span>{apiParams.frequency_penalty}</span>
                      <span>2</span>
                    </div>
                  </RangeContainer>
                </ParameterCard>
                
                <ParameterCard>
                  <ParameterTitle>存在惩罚 <span>presence_penalty</span></ParameterTitle>
                  <ParameterDescription>
                    减少模型讨论相同主题的倾向。较高的值会鼓励模型讨论新主题。
                  </ParameterDescription>
                  <RangeContainer>
                    <Input 
                      type="range" 
                      min="-2" 
                      max="2" 
                      step="0.1" 
                      value={apiParams.presence_penalty}
                      onChange={(e) => handleChangeParam('presence_penalty', parseFloat(e.target.value))}
                    />
                    <div className="range-value">
                      <span>-2</span>
                      <span>{apiParams.presence_penalty}</span>
                      <span>2</span>
                    </div>
                  </RangeContainer>
                </ParameterCard>
              </ParameterGrid>
              
              <ButtonGroup style={{ marginTop: '2rem' }}>
                <Button className="primary">应用参数</Button>
                <Button className="secondary">恢复默认值</Button>
              </ButtonGroup>
            </ParameterContainer>
          )}
        </ChatContextContainer>
      </SectionContainer>
    </ChatManagerSection>
  );
};

export default ChatContextManager;
