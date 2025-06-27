import React, { useRef, useState } from 'react';
import { Upload, Image, X } from 'lucide-react';

interface UploadSectionProps {
  onImageUpload: (imageUrl: string) => void;
  targetImage: string | null;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onImageUpload, targetImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // Only set dragging to false if we're leaving the drop zone entirely
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const clearImage = () => {
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Image className="w-5 h-5 text-cyan-400" />
        目标图像
      </h3>
      
      {!targetImage ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer group transition-all duration-200 ${
            isDragging 
              ? 'border-cyan-400 bg-cyan-400/10 scale-105' 
              : 'border-gray-600 hover:border-cyan-400'
          }`}
        >
          <Upload className={`w-12 h-12 mx-auto mb-4 transition-all duration-200 ${
            isDragging 
              ? 'text-cyan-400 scale-110' 
              : 'text-gray-400 group-hover:text-cyan-400'
          }`} />
          <p className={`mb-2 transition-colors duration-200 ${
            isDragging 
              ? 'text-cyan-300' 
              : 'text-gray-400 group-hover:text-gray-300'
          }`}>
            {isDragging ? '释放文件以上传' : '拖拽图片到此处或点击上传'}
          </p>
          <p className="text-sm text-gray-500">
            支持 JPG、PNG、GIF 格式
          </p>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={targetImage}
            alt="Target"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition-colors duration-200"
            >
              更换图片
            </button>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default UploadSection;