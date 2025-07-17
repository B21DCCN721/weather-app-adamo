// ChatBotMessenger.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Input, Button, List, Typography, Space, Flex, Divider } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';

const { Text } = Typography;

type Message = {
  id: number;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
};
interface ChatBotMessengerProps {
  open: boolean,
  setOpen: (value: boolean) => void,
  onSendMessage: (message: string) => void,
}

const ChatBotMessenger: React.FC<ChatBotMessengerProps> = ({ open, setOpen, onSendMessage }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      content: 'Xin chào! Tôi có thể giúp gì cho bạn hôm nay?',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    onSendMessage(userMsg.content)
    // Giả lập phản hồi của bot
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        content: `Bot: Bạn vừa nói "${userMsg.content}" phải không? 😊`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  return (
    <div
      style={{
        width: 380,
        margin: '0 auto',
        height: '90vh',
        display: `${open ? 'flex' : 'none'}`,
        flexDirection: 'column',
        border: '1px solid #ddd',
        borderRadius: 8,
        overflow: 'hidden',
        position: 'fixed',
        right: 30,
        bottom: 50,
        zIndex: 1000,
        background: '#fff'
      }}
    >
      {/* Header */}
      <Flex align='center' justify='space-between' style={{ margin: '16px 16px 0' }}>
        <Text strong style={{ fontSize: 18 }}>Chatbot</Text>
        <CloseOutlined onClick={() => setOpen(false)} />
      </Flex>
      <Divider />
      {/* Chat messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, }}>
        <List
          dataSource={messages}
          renderItem={(item) => (
            <div
              style={{
                display: 'flex',
                justifyContent: item.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 12,
              }}
            >
              {item.sender === 'bot' && <Avatar icon={<RobotOutlined />} />}
              <div
                style={{
                  maxWidth: '70%',
                  background: item.sender === 'user' ? '#1890ff' : '#fff',
                  color: item.sender === 'user' ? '#fff' : '#000',
                  padding: 10,
                  borderRadius: 16,
                  marginLeft: item.sender === 'bot' ? 8 : 0,
                  marginRight: item.sender === 'user' ? 8 : 0,
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }}
              >
                <div>{item.content}</div>
                <Text type="secondary" style={{ fontSize: 10, display: 'block', textAlign: item.sender === 'user' ? 'right' : 'left' }}>
                  {item.timestamp}
                </Text>
              </div>
              {item.sender === 'user' && <Avatar icon={<UserOutlined />} />}
            </div>
          )}
        />
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div style={{ padding: 16, borderTop: '1px solid #ddd', background: '#fff' }}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSend}
            ref={inputRef}
          />
          <Button type="primary" icon={<SendOutlined />} onClick={handleSend} />
        </Space.Compact>
      </div>
    </div>
  );
};

export default ChatBotMessenger;
