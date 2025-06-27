import React from 'react';
import { Layers, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg shadow-lg shadow-cyan-500/25">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                马赛克拼贴生成器
              </h1>
              <p className="text-gray-400 text-sm">你的碎片，你的故事</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-gray-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">用万千碎片拼出另一个自己</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;