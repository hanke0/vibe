import React, { useState, useRef } from 'react';
import { Upload, Settings, Download, Share2, Sparkles, Zap } from 'lucide-react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import MaterialInput from './components/MaterialInput';
import ParameterControls from './components/ParameterControls';
import PreviewCanvas from './components/PreviewCanvas';
import ParticleBackground from './components/ParticleBackground';
import { MosaicParameters } from './types/types';

function App() {
  const [targetImage, setTargetImage] = useState<string | null>(null);
  const [materialUrls, setMaterialUrls] = useState<string[]>([]);
  const [parameters, setParameters] = useState<MosaicParameters>({
    gridSize: 80,
    tileSize: 12,
    colorTolerance: 30,
    brightness: 1.0,
    contrast: 1.1,
    materialResolution: 128,  // 默认128x128素材压缩分辨率
    outputResolution: 3200   // 默认4K输出分辨率
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [shouldRegenerate, setShouldRegenerate] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = async () => {
    if (!targetImage || materialUrls.length === 0) return;
    
    setIsGenerating(true);
    setShouldRegenerate(true);
    
    // 根据输出分辨率和素材分辨率动态调整生成时间
    const resolutionFactor = (parameters.outputResolution / 1200) * (parameters.materialResolution / 32);
    const estimatedTime = Math.max(10000, resolutionFactor * 8000);
    
    setTimeout(() => {
      setIsGenerating(false);
    }, estimatedTime);
  };

  const handleParametersChange = (newParameters: MosaicParameters) => {
    setParameters(newParameters);
    // Don't trigger regeneration automatically
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      const resolutionLabel = parameters.outputResolution >= 7680 ? '8K' : 
                             parameters.outputResolution >= 6400 ? '6K' : 
                             parameters.outputResolution >= 3840 ? '4K' : 
                             `${parameters.outputResolution}p`;
      link.download = `mosaic-${resolutionLabel}-${parameters.materialResolution}x${parameters.materialResolution}.png`;
      link.href = canvasRef.current.toDataURL('image/png', 0.98); // 更高质量
      link.click();
    }
  };

  const handleShare = async () => {
    if (canvasRef.current) {
      try {
        const blob = await new Promise<Blob>((resolve) => {
          canvasRef.current!.toBlob(resolve as BlobCallback, 'image/png', 0.98);
        });
        
        if (navigator.share && blob) {
          const resolutionLabel = parameters.outputResolution >= 7680 ? '8K' : 
                                 parameters.outputResolution >= 6400 ? '6K' : 
                                 parameters.outputResolution >= 3840 ? '4K' : 
                                 `${parameters.outputResolution}p`;
          const file = new File([blob], `mosaic-${resolutionLabel}.png`, { type: 'image/png' });
          await navigator.share({
            title: `我的${resolutionLabel}超高清马赛克拼贴作品`,
            text: `用1000张电影海报拼出的${resolutionLabel}超高清艺术作品`,
            files: [file]
          });
        } else {
          // Fallback to copy link
          const url = canvasRef.current!.toDataURL('image/png', 0.98);
          await navigator.clipboard.writeText(url);
          const resolutionLabel = parameters.outputResolution >= 7680 ? '8K' : 
                                 parameters.outputResolution >= 6400 ? '6K' : 
                                 parameters.outputResolution >= 3840 ? '4K' : 
                                 `${parameters.outputResolution}p`;
          alert(`${resolutionLabel}超高清图片链接已复制到剪贴板`);
        }
      } catch (error) {
        console.error('分享失败:', error);
      }
    }
  };

  const getResolutionLabel = () => {
    if (parameters.outputResolution >= 7680) return '8K';
    if (parameters.outputResolution >= 6400) return '6K';
    if (parameters.outputResolution >= 3840) return '4K';
    if (parameters.outputResolution >= 2560) return '2.5K';
    if (parameters.outputResolution >= 1920) return '2K';
    return `${parameters.outputResolution}p`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Controls */}
            <div className="lg:col-span-1 space-y-6">
              <UploadSection 
                onImageUpload={setTargetImage}
                targetImage={targetImage}
              />
              
              <MaterialInput 
                urls={materialUrls}
                onUrlsChange={setMaterialUrls}
              />
              
              <ParameterControls 
                parameters={parameters}
                onParametersChange={handleParametersChange}
              />
              
              <div className="flex gap-4">
                <button
                  onClick={handleGenerate}
                  disabled={!targetImage || materialUrls.length === 0 || isGenerating}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      生成{getResolutionLabel()}中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <Zap className="w-4 h-4" />
                      生成{getResolutionLabel()}拼贴
                    </>
                  )}
                </button>
              </div>
              
              {generatedImage && (
                <div className="flex gap-4">
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <Zap className="w-3 h-3" />
                    下载{getResolutionLabel()}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    分享作品
                  </button>
                </div>
              )}
            </div>
            
            {/* Right Panel - Preview */}
            <div className="lg:col-span-2">
              <PreviewCanvas
                ref={canvasRef}
                targetImage={targetImage}
                materialUrls={materialUrls}
                parameters={parameters}
                isGenerating={isGenerating}
                shouldRegenerate={shouldRegenerate}
                onImageGenerated={setGeneratedImage}
                onRegenerationComplete={() => setShouldRegenerate(false)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;