import React, { useState } from 'react';
import { ClipboardList, Code, CheckSquare, FileText, Send, AlertCircle } from 'lucide-react';
import { StepInfo } from '../types';

const steps: StepInfo[] = [
  {
    id: 'mada',
    title: '1. 签署协议 (MADA)',
    description: 'Mobile Application Distribution Agreement',
    icon: 'contract',
    details: [
      '厂商必须与 Google 签署 MADA 协议才能获准分发 GMS 应用。',
      '这通常需要经过 Google 的资质审核（出货量、品牌影响力等）。',
      '未签署协议的厂商通常通过 3PL (3rd Party Laboratory) 或 IDH 合作。'
    ]
  },
  {
    id: 'cdd',
    title: '2. 软硬件合规 (CDD)',
    description: 'Compatibility Definition Document',
    icon: 'rule',
    details: [
      '研发阶段必须严格遵循 Android CDD 文档。',
      '硬件要求：内存、屏幕密度、传感器、甚至 USB 接口规范。',
      '软件要求：API 行为一致性、多媒体编解码支持等。'
    ]
  },
  {
    id: 'testing',
    title: '3. 运行测试套件',
    description: 'CTS / GTS / VTS / STS',
    icon: 'test',
    details: [
      'CTS (Compatibility Test Suite): 200万+ 用例，验证 API 兼容性。',
      'GTS (GMS Test Suite): 验证 GMS 应用（如 YouTube, Play）的功能与播放能力。',
      'VTS (Vendor Test Suite): 验证 HAL 层与内核接口。',
      'STS (Security Test Suite): 验证当月安全补丁是否合入。'
    ]
  },
  {
    id: 'report',
    title: '4. 生成与分析报告',
    description: 'Fix Failures & Retry',
    icon: 'report',
    details: [
      '测试结果会生成 test_result.xml 和 .zip 报告。',
      '必须解决所有 "fail" 项。部分硬件差异导致的 fail 可申请 Waiver（豁免）。',
      '使用 CTS Verifier 进行需要人工干预的测试（如相机、音频质量）。'
    ]
  },
  {
    id: 'submit',
    title: '5. 提交审核 (PLS)',
    description: 'Submission to Google',
    icon: 'upload',
    details: [
      '通过 Partner Logic System (PLS) 或相关门户提交报告。',
      '通常需要上传：所有测试报告、build fingerprint、软硬件信息。',
      'Google 审核周期通常为 1-2 周，审核通过后获得 Approval。'
    ]
  }
];

const ProcessGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">GMS 认证流程</h2>
        <p className="mt-4 text-gray-600">从立项到量产的“通关”之路</p>
      </div>

      <div className="relative">
        {/* Timeline Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 rounded-full" />

        <div className="space-y-8">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const isActive = activeStep === step.id;
            
            return (
              <div key={step.id} className={`relative flex items-center md:justify-between ${isEven ? 'flex-row' : 'flex-row-reverse md:flex-row-reverse'}`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white border-4 border-google-blue z-10 shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-google-blue" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 group`}>
                  <div 
                    className={`bg-white p-6 rounded-xl border-l-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${isActive ? 'border-google-blue ring-1 ring-blue-100' : 'border-gray-200'}`}
                    onClick={() => setActiveStep(isActive ? null : step.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                         <span className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-google-blue">
                           {index + 1}
                         </span>
                        <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                      </div>
                      <Send size={16} className={`text-gray-400 transform transition-transform ${isActive ? 'rotate-90 text-google-blue' : ''}`} />
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-2">{step.description}</p>
                    
                    {/* Collapsible Details */}
                    <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <CheckSquare size={14} className="mt-1 text-green-500 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {!isActive && (
                      <p className="text-xs text-gray-400 mt-2 italic">点击展开详情</p>
                    )}
                  </div>
                </div>

                {/* Empty Space for alignment */}
                <div className="hidden md:block w-5/12" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-16 bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex gap-4 items-start">
        <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-bold text-yellow-800 text-lg">注意事项</h4>
          <p className="text-yellow-800/80 mt-1 text-sm">
            认证必须在设备上市前完成。如果设备已经上市销售（User Build），将无法再申请 GMS 认证。所有测试必须在 UserDebug 版本或特定的 User 版本上进行，并确保指纹（Fingerprint）一致。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessGuide;