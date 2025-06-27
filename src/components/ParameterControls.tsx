import React from 'react';
import { Settings, Grid, Maximize2, Palette, Sun, Contrast, Zap, Monitor, Image } from 'lucide-react';
import { MosaicParameters } from '../types/types';

interface ParameterControlsProps {
  parameters: MosaicParameters;
  onParametersChange: (parameters: MosaicParameters) => void;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({ parameters, onParametersChange }) => {
  const updateParameter = (key: keyof MosaicParameters, value: number) => {
    onParametersChange({
      ...parameters,
      [key]: value
    });
  };

  const sliders = [
    {
      key: 'gridSize' as keyof MosaicParameters,
      label: '网格密度',
      icon: Grid,
      min: 20,
      max: 200,
      step: 1,
      value: parameters.gridSize,
      description: `更高密度 = 更多细节 (当前: ${parameters.gridSize}x${parameters.gridSize} 网格)`,
      category: 'basic'
    },
    {
      key: 'tileSize' as keyof MosaicParameters,
      label: '预览图块大小',
      icon: Maximize2,
      min: 4,
      max: 32,
      step: 1,
      value: parameters.tileSize,
      description: `控制预览中每个马赛克块的显示大小 (当前: ${parameters.tileSize}px)`,
      category: 'basic'
    },
    {
      key: 'materialResolution' as keyof MosaicParameters,
      label: '素材压缩分辨率',
      icon: Image,
      min: 16,
      max: 512,
      step: 8,
      value: parameters.materialResolution,
      description: `素材图片压缩尺寸，影响颜色匹配精度 (当前: ${parameters.materialResolution}x${parameters.materialResolution}px)`,
      category: 'resolution'
    },
    {
      key: 'outputResolution' as keyof MosaicParameters,
      label: '输出图片分辨率',
      icon: Monitor,
      min: 800,
      max: 7680,
      step: 400,
      value: parameters.outputResolution,
      description: `最终输出图片的分辨率 (当前: ${parameters.outputResolution}x${parameters.outputResolution}px)`,
      category: 'resolution'
    },
    {
      key: 'colorTolerance' as keyof MosaicParameters,
      label: '色彩容差',
      icon: Palette,
      min: 5,
      max: 80,
      step: 5,
      value: parameters.colorTolerance,
      description: '较低值 = 更精确的颜色匹配，较高值 = 更多样的素材选择',
      category: 'color'
    },
    {
      key: 'brightness' as keyof MosaicParameters,
      label: '亮度',
      icon: Sun,
      min: 0.4,
      max: 2.0,
      step: 0.1,
      value: parameters.brightness,
      description: '调整整体亮度以获得更好的视觉效果',
      category: 'color'
    },
    {
      key: 'contrast' as keyof MosaicParameters,
      label: '对比度',
      icon: Contrast,
      min: 0.4,
      max: 2.0,
      step: 0.1,
      value: parameters.contrast,
      description: '调整图像对比度以增强细节表现',
      category: 'color'
    }
  ];

  const getQualityLevel = () => {
    const { materialResolution, outputResolution } = parameters;
    if (materialResolution >= 256 && outputResolution >= 6400) return { level: '8K超高清', color: 'text-red-400', icon: '🔥' };
    if (materialResolution >= 128 && outputResolution >= 4800) return { level: '6K超高清', color: 'text-purple-400', icon: '💎' };
    if (materialResolution >= 64 && outputResolution >= 3200) return { level: '4K超高清', color: 'text-pink-400', icon: '⚡' };
    if (materialResolution >= 48 && outputResolution >= 1800) return { level: '2K高清', color: 'text-green-400', icon: '✨' };
    if (materialResolution >= 32 && outputResolution >= 1200) return { level: '高清', color: 'text-blue-400', icon: '📺' };
    return { level: '标准', color: 'text-yellow-400', icon: '📱' };
  };

  const quality = getQualityLevel();

  const basicSliders = sliders.filter(s => s.category === 'basic');
  const resolutionSliders = sliders.filter(s => s.category === 'resolution');
  const colorSliders = sliders.filter(s => s.category === 'color');

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Settings className="w-5 h-5 text-purple-400" />
        参数调整
        <span className="text-xs text-gray-500 ml-2">(调整后点击生成)</span>
        <div className={`ml-auto flex items-center gap-1 text-xs ${quality.color}`}>
          <span>{quality.icon}</span>
          {quality.level}模式
        </div>
      </h3>

      {/* 分辨率控制区域 */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
        <h4 className="text-sm font-semibold text-purple-300 mb-4 flex items-center gap-2">
          <Monitor className="w-4 h-4" />
          分辨率控制 (最高8K输出)
        </h4>
        <div className="space-y-4">
          {resolutionSliders.map(({ key, label, icon: Icon, min, max, step, value, description }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-purple-400" />
                  <label className="text-sm font-medium text-gray-300">{label}</label>
                </div>
                <span className="text-sm text-purple-400 font-mono">
                  {key === 'materialResolution' ? `${value}x${value}` : 
                   key === 'outputResolution' ? (value >= 7680 ? '8K' : value >= 6400 ? '6K' : value >= 4800 ? '5K' : value >= 3840 ? '4K' : value >= 2560 ? '2.5K' : value >= 1920 ? '2K' : `${value}p`) : 
                   `${value}p`}
                </span>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={(e) => updateParameter(key, parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                {/* 分辨率标记 */}
                {key === 'outputResolution' && (
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>HD</span>
                    <span>2K</span>
                    <span>4K</span>
                    <span>6K</span>
                    <span className="text-red-400">8K</span>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 基础控制 */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-cyan-300 mb-4 flex items-center gap-2">
          <Grid className="w-4 h-4" />
          基础设置
        </h4>
        <div className="space-y-4">
          {basicSliders.map(({ key, label, icon: Icon, min, max, step, value, description }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-400" />
                  <label className="text-sm font-medium text-gray-300">{label}</label>
                </div>
                <span className="text-sm text-cyan-400 font-mono">
                  {typeof value === 'number' && value % 1 === 0 ? value : value.toFixed(1)}
                </span>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={(e) => updateParameter(key, parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 颜色调整 */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-green-300 mb-4 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          颜色调整
        </h4>
        <div className="space-y-4">
          {colorSliders.map(({ key, label, icon: Icon, min, max, step, value, description }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-400" />
                  <label className="text-sm font-medium text-gray-300">{label}</label>
                </div>
                <span className="text-sm text-green-400 font-mono">
                  {typeof value === 'number' && value % 1 === 0 ? value : value.toFixed(1)}
                </span>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={(e) => updateParameter(key, parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-700 space-y-3">
        <button
          onClick={() => onParametersChange({
            gridSize: 80,
            tileSize: 12,
            colorTolerance: 30,
            brightness: 1.0,
            contrast: 1.1,
            materialResolution: 128,
            outputResolution: 3200
          })}
          className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          重置为4K默认值
        </button>

        {/* 快速预设 */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onParametersChange({
              ...parameters,
              materialResolution: 64,
              outputResolution: 1920
            })}
            className="px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-xs transition-colors duration-200"
          >
            📺 2K模式
          </button>
          <button
            onClick={() => onParametersChange({
              ...parameters,
              materialResolution: 128,
              outputResolution: 3840
            })}
            className="px-3 py-2 bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 rounded-lg text-xs transition-colors duration-200"
          >
            💎 4K模式
          </button>
          <button
            onClick={() => onParametersChange({
              ...parameters,
              materialResolution: 256,
              outputResolution: 6400
            })}
            className="px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-xs transition-colors duration-200"
          >
            ⚡ 6K模式
          </button>
          <button
            onClick={() => onParametersChange({
              ...parameters,
              materialResolution: 512,
              outputResolution: 7680
            })}
            className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-xs transition-colors duration-200"
          >
            🔥 8K模式
          </button>
        </div>
      </div>
      
      <div className={`mt-4 p-3 bg-gradient-to-r ${quality.color === 'text-red-400' ? 'from-red-500/10 to-orange-500/10 border-red-500/20' : quality.color === 'text-purple-400' ? 'from-purple-500/10 to-pink-500/10 border-purple-500/20' : 'from-green-500/10 to-blue-500/10 border-green-500/20'} border rounded-lg`}>
        <p className={`text-xs ${quality.color} flex items-center gap-2`}>
          <span>{quality.icon}</span>
          当前设置：{quality.level}模式 - 素材{parameters.materialResolution}x{parameters.materialResolution}px，输出{parameters.outputResolution >= 7680 ? '8K' : parameters.outputResolution >= 6400 ? '6K' : parameters.outputResolution >= 3840 ? '4K' : `${parameters.outputResolution}x${parameters.outputResolution}px`}
        </p>
      </div>
      
      <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-xs text-yellow-400 flex items-center gap-2">
          <Settings className="w-3 h-3" />
          提示：8K分辨率需要更长生成时间和更多内存，建议先用4K模式测试效果
        </p>
      </div>
      
      <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
        <p className="text-xs text-green-400 flex items-center gap-2">
          <Zap className="w-3 h-3" />
          智能多样性：即使颜色相似，系统也会尽量使用不同的电影海报以增加视觉丰富度
        </p>
      </div>
    </div>
  );
};

export default ParameterControls;