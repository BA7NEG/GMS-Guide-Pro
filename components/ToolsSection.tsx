import React from 'react';
import { Terminal, ShieldCheck, Video, Settings } from 'lucide-react';

const ToolsSection: React.FC = () => {
  const tools = [
    {
      name: 'CTS',
      fullName: 'Compatibility Test Suite',
      icon: <Terminal className="text-white" />,
      color: 'bg-green-500',
      description: '最核心的测试套件。运行在桌面端，通过 ADB 连接设备进行 200 万+ 项自动化测试。',
      focus: 'API 兼容性、系统行为、权限管理。',
      command: 'run cts --plan cts-guide'
    },
    {
      name: 'GTS',
      fullName: 'GMS Test Suite',
      icon: <Video className="text-white" />,
      color: 'bg-red-500',
      description: '专门针对 GMS 应用的测试。不仅检查 API，还检查内容播放许可证（Widevine DRM）。',
      focus: 'GMS Core 功能、多媒体流、Widevine 安全级别。',
      command: 'run gts --module GtsYoutubeTestCases'
    },
    {
      name: 'VTS',
      fullName: 'Vendor Test Suite',
      icon: <Settings className="text-white" />,
      color: 'bg-blue-500',
      description: 'Project Treble 的产物。确保 Vendor 层（HAL）与 System 层解耦且兼容。',
      focus: 'Kernel, HAL 接口, AIDL/HIDL 实现。',
      command: 'run vts'
    },
    {
      name: 'STS',
      fullName: 'Security Test Suite',
      icon: <ShieldCheck className="text-white" />,
      color: 'bg-purple-500',
      description: '确保设备已修补已知的安全漏洞。每个月的安全公告都会更新此测试套件。',
      focus: 'CVE 漏洞修复验证。',
      command: 'run sts-dynamic-develop'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">四大测试金刚</h2>
        <p className="mt-4 text-gray-600">通过 GMS 必须征服的测试套件</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tools.map((tool) => (
          <div key={tool.name} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
            <div className={`h-2 ${tool.color} w-full`} />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center shadow-lg shadow-gray-200`}>
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{tool.name}</h3>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{tool.fullName}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed min-h-[48px]">
                  {tool.description}
                </p>
                
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase block mb-1">测试重点</span>
                  <p className="text-sm text-gray-700 font-medium">{tool.focus}</p>
                </div>

                <div className="bg-gray-900 rounded-md p-3 font-mono text-xs text-green-400 flex items-center gap-2 overflow-x-auto">
                  <span className="text-gray-500 select-none">$</span>
                  {tool.command}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">测试环境准备清单</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 border-b pb-2">硬件要求</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Linux PC (Ubuntu 20.04+ 推荐)</li>
              <li>• 高质量 USB 数据线</li>
              <li>• 稳定的 WiFi 网络 (IPv6 支持)</li>
              <li>• 待测设备 (DUT) 需 UserDebug 版</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 border-b pb-2">软件配置</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 最新 Android SDK Platform-Tools</li>
              <li>• JDK 11 或更高版本</li>
              <li>• Python 3 环境</li>
              <li>• 对应版本的媒体文件包 (Media Files)</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 border-b pb-2">设备设置</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 开启开发者选项 & USB 调试</li>
              <li>• 屏幕常亮 (Stay Awake)</li>
              <li>• 语言设置为 English (US)</li>
              <li>• 插入有效 SIM 卡 (部分测试需要)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsSection;