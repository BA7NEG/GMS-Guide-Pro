import React from 'react';
import { Layers, Globe, Shield, Play } from 'lucide-react';

const IntroSection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16 animate-fade-in">
      
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Google Mobile Services <span className="text-google-blue">(GMS)</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          GMS 是一套专有的 Google 应用程序和 API，通过许可授权在 Android 设备上运行。它将单纯的 Android 开源项目 (AOSP) 转化为完整的 Google 生态体验。
        </p>
      </div>

      {/* Core Difference Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
            <Layers className="text-gray-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">AOSP (Android Open Source Project)</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Android 的基础开源版本。任何厂商都可以免费使用，但不包含 Google 的核心服务。
          </p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex items-center"><span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>基础操作系统内核</li>
            <li className="flex items-center"><span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>没有 Play 商店</li>
            <li className="flex items-center"><span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>没有 Google 推送服务 (FCM)</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 relative z-10">
            <Globe className="text-google-blue" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">GMS (Google Mobile Services)</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            在 AOSP 基础之上的一层专有服务。需要通过严格的兼容性测试和 Google 授权。
          </p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>Google Play Store & Play Services</li>
            <li className="flex items-center"><span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>Chrome, YouTube, Maps, Gmail</li>
            <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>安全补丁与 API 支持</li>
          </ul>
        </div>
      </div>

      {/* Key Components */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">GMS 核心组件</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Google Play Store", desc: "应用分发中心，生态核心入口。", icon: <Play className="text-google-green" /> },
            { title: "Google Play Services", desc: "后台 API 框架，连接应用与 Android 系统。", icon: <Layers className="text-google-blue" /> },
            { title: "Chrome", desc: "默认浏览器，Webview 核心。", icon: <Globe className="text-google-yellow" /> },
            { title: "Google Search", desc: "全局搜索与 Assistant 智能助理。", icon: <div className="text-google-blue font-bold text-lg">G</div> },
            { title: "YouTube", desc: "流媒体视频服务。", icon: <div className="bg-google-red text-white text-[10px] px-1 rounded">YT</div> },
            { title: "Maps", desc: "定位、导航与地理信息服务。", icon: <div className="text-google-green font-bold">M</div> },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start p-4 bg-white rounded-lg border border-gray-100">
              <div className="flex-shrink-0 mr-4 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why GMS Matters */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">为什么需要 GMS 认证？</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              没有 GMS 认证的设备无法预装 Google 应用，甚至可能被 Play Protect 标记为“未认证”并限制功能。对于出海（Global Market）的 Android 设备，GMS 是进入市场的入场券。
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-green-300" />
                <span className="text-sm font-medium">安全保障</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={20} className="text-blue-300" />
                <span className="text-sm font-medium">全球生态</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default IntroSection;