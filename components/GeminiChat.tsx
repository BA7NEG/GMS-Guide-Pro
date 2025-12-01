import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { ChatMessage, MessageRole } from '../types';
import { streamGMSAdvice } from '../services/geminiService';

const GeminiChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: MessageRole.MODEL,
      text: '你好！我是 GMS 认证助手。无论是 CTS 报错分析，还是 GMS 流程咨询，我都可以帮你。\n\n你可以问我：\n- "什么是 MADA 协议？"\n- "如何解决 CTS Camera 失败？"\n- "GTS 和 CTS 有什么区别？"'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Create a placeholder for the AI response
      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: MessageRole.MODEL,
        text: ''
      }]);

      // Stream the response
      const streamResult = await streamGMSAdvice(
        userMsg.text,
        messages.map(m => ({ role: m.role, text: m.text })) // Pass simple history
      );

      let fullText = '';
      
      for await (const chunk of streamResult) {
        const chunkText = chunk.text();
        fullText += chunkText;
        
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId 
            ? { ...msg, text: fullText }
            : msg
        ));
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: MessageRole.MODEL,
        text: '抱歉，连接 AI 服务时出现错误，请检查 API Key 设置或稍后重试。',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "CTS 失败怎么分析？",
    "如何申请 GMS License？",
    "Widevine L1 是什么？",
    "GMS 包包含哪些应用？"
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden my-6">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-google-blue to-indigo-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <Sparkles size={20} className="text-yellow-300" />
          </div>
          <div>
            <h3 className="font-bold text-lg">GMS 认证专家 AI</h3>
            <p className="text-xs text-blue-100 opacity-80">Powered by Gemini 2.5 Flash</p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])} 
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Clear Chat"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === MessageRole.USER ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${
              msg.role === MessageRole.USER ? 'bg-gray-800 text-white' : 'bg-white text-google-blue border border-blue-100'
            }`}>
              {msg.role === MessageRole.USER ? <User size={16} /> : <Bot size={18} />}
            </div>
            
            <div className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-sm ${
              msg.role === MessageRole.USER 
                ? 'bg-gray-800 text-white rounded-tr-none' 
                : msg.isError 
                  ? 'bg-red-50 text-red-600 border border-red-100 rounded-tl-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              {msg.role === MessageRole.MODEL ? (
                <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm ml-12 animate-pulse">
            <Loader2 size={14} className="animate-spin" />
            <span>AI 正在思考中...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        {messages.length < 3 && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-hide">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q)}
                className="whitespace-nowrap px-3 py-1.5 bg-blue-50 text-google-blue text-xs rounded-full hover:bg-blue-100 transition-colors border border-blue-100"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex gap-3 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入关于 GMS 的问题..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm focus:border-google-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all max-h-32 min-h-[50px]"
            rows={1}
            style={{ minHeight: '52px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 p-2 rounded-lg bg-google-blue text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors shadow-sm"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-2">
          AI 可能产生不准确的信息。请务必参考 Google 官方 GMS 文档。
        </p>
      </div>
    </div>
  );
};

export default GeminiChat;