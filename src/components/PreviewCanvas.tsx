import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Eye, Loader, Film, Zap, Monitor } from 'lucide-react';
import { MosaicParameters, MaterialImage, GridCell } from '../types/types';
import { generateMosaic } from '../utils/mosaicGenerator';

interface PreviewCanvasProps {
  targetImage: string | null;
  materialUrls: string[];
  parameters: MosaicParameters;
  isGenerating: boolean;
  shouldRegenerate: boolean;
  onImageGenerated: (imageUrl: string) => void;
  onRegenerationComplete: () => void;
}

const PreviewCanvas = forwardRef<HTMLCanvasElement, PreviewCanvasProps>(
  ({ targetImage, materialUrls, parameters, isGenerating, shouldRegenerate, onImageGenerated, onRegenerationComplete }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const previewRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => canvasRef.current!);

    useEffect(() => {
      if (shouldRegenerate && targetImage && materialUrls.length > 0 && canvasRef.current && previewRef.current) {
        generateMosaic(
          targetImage,
          materialUrls,
          parameters,
          canvasRef.current,
          previewRef.current,
          onImageGenerated
        ).finally(() => {
          onRegenerationComplete();
        });
      }
    }, [shouldRegenerate, targetImage, materialUrls, parameters, onImageGenerated, onRegenerationComplete]);

    const getQualityBadge = () => {
      const { materialResolution, outputResolution } = parameters;
      if (materialResolution >= 256 && outputResolution >= 6400) return { text: '8K超高清', color: 'text-red-400', bg: 'bg-red-500/20', icon: '🔥' };
      if (materialResolution >= 128 && outputResolution >= 4800) return { text: '6K超高清', color: 'text-purple-400', bg: 'bg-purple-500/20', icon: '💎' };
      if (materialResolution >= 64 && outputResolution >= 3200) return { text: '4K超高清', color: 'text-pink-400', bg: 'bg-pink-500/20', icon: '⚡' };
      if (materialResolution >= 48 && outputResolution >= 1800) return { text: '2K高清', color: 'text-green-400', bg: 'bg-green-500/20', icon: '✨' };
      if (materialResolution >= 32 && outputResolution >= 1200) return { text: '高清', color: 'text-blue-400', bg: 'bg-blue-500/20', icon: '📺' };
      return { text: '标准', color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: '📱' };
    };

    const getResolutionLabel = () => {
      if (parameters.outputResolution >= 7680) return '8K';
      if (parameters.outputResolution >= 6400) return '6K';
      if (parameters.outputResolution >= 3840) return '4K';
      if (parameters.outputResolution >= 2560) return '2.5K';
      if (parameters.outputResolution >= 1920) return '2K';
      return `${parameters.outputResolution}p`;
    };

    const quality = getQualityBadge();

    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-pink-400" />
          预览窗口
          <span className="text-xs text-gray-500 ml-2">
            ({getResolutionLabel()} 输出)
          </span>
          <div className={`ml-auto flex items-center gap-1 text-xs ${quality.color} ${quality.bg} px-2 py-1 rounded-full`}>
            <span>{quality.icon}</span>
            {quality.text}模式
          </div>
        </h3>
        
        <div className="relative bg-gray-900 rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
          {!targetImage ? (
            <div className="text-center text-gray-400">
              <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">等待上传目标图像</p>
              <p className="text-sm opacity-75">上传图片后即可看到预览效果</p>
            </div>
          ) : materialUrls.length === 0 ? (
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 mx-auto mb-4 opacity-50 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Film className="w-8 h-8 text-white" />
              </div>
              <p className="text-lg mb-2">等待添加电影海报素材</p>
              <p className="text-sm opacity-75">添加1000张电影海报后即可生成拼贴</p>
            </div>
          ) : (
            <>
              {isGenerating && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                  <div className="text-center text-white">
                    <Loader className="w-12 h-12 mx-auto mb-4 animate-spin text-cyan-400" />
                    <p className="text-lg font-medium mb-2">正在生成{getResolutionLabel()}马赛克拼贴...</p>
                    <p className="text-sm text-gray-300">
                      使用{parameters.materialResolution}x{parameters.materialResolution}px压缩算法处理{materialUrls.length}张电影海报
                    </p>
                    <div className="mt-4 w-64 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                    </div>
                    <p className={`text-xs ${quality.color} mt-2 flex items-center justify-center gap-1`}>
                      <span>{quality.icon}</span>
                      {quality.text}模式：{getResolutionLabel()} 分辨率输出
                    </p>
                    <p className="text-xs text-green-400 mt-1">
                      🎨 智能多样性算法确保每个位置使用不同海报
                    </p>
                  </div>
                </div>
              )}
              
              <div className="relative w-full h-full flex items-center justify-center">
                <canvas
                  ref={previewRef}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-gray-600"
                  style={{ imageRendering: 'auto' }}
                />
                
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
              </div>
            </>
          )}
        </div>
        
        {targetImage && materialUrls.length > 0 && (
          <div className="mt-4 p-4 bg-gray-700/30 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm text-gray-400">
              <div className="text-center">
                <div className="text-cyan-400 font-mono text-lg">{parameters.gridSize}x{parameters.gridSize}</div>
                <div>网格密度</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-mono text-lg">{materialUrls.length}</div>
                <div>电影海报</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-mono text-lg">{parameters.materialResolution}x{parameters.materialResolution}</div>
                <div>素材分辨率</div>
              </div>
              <div className="text-center">
                <div className="text-pink-400 font-mono text-lg">{getResolutionLabel()}</div>
                <div>输出分辨率</div>
              </div>
              <div className="text-center">
                <div className={`font-mono text-lg flex items-center justify-center gap-1 ${quality.color}`}>
                  <span className="text-sm">{quality.icon}</span>
                  {quality.text.split('超高清')[0] || quality.text.split('高清')[0] || quality.text}
                </div>
                <div>质量模式</div>
              </div>
              <div className="text-center">
                <div className="text-orange-400 font-mono text-lg">🎨</div>
                <div>智能多样性</div>
              </div>
            </div>
            
            <div className={`mt-3 p-3 ${quality.bg} border ${quality.color.replace('text-', 'border-').replace('400', '500/20')} rounded-lg`}>
              <p className={`text-xs ${quality.color} flex items-center gap-2`}>
                <Monitor className="w-3 h-3" />
                当前配置：{parameters.materialResolution}x{parameters.materialResolution}px素材压缩 + {getResolutionLabel()}输出分辨率
              </p>
            </div>
            
            <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-xs text-green-400 flex items-center gap-2">
                <Zap className="w-3 h-3" />
                智能多样性：系统会避免在相邻位置使用相同海报，确保视觉丰富度
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PreviewCanvas.displayName = 'PreviewCanvas';

export default PreviewCanvas;