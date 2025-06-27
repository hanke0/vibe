export interface MosaicParameters {
  gridSize: number;
  tileSize: number;
  colorTolerance: number;
  brightness: number;
  contrast: number;
  materialResolution: number;  // 素材压缩分辨率 (最大512x512)
  outputResolution: number;    // 输出图片分辨率 (最大8K)
}

export interface MaterialImage {
  url: string;
  image: HTMLImageElement;
  compressedCanvas?: HTMLCanvasElement;
  averageColor: [number, number, number];
  colorVariance: number;  // 新增：颜色方差用于多样性匹配
  usageCount: number;     // 新增：使用次数统计
  lastUsedPosition?: { x: number; y: number }; // 新增：最后使用位置
}

export interface GridCell {
  x: number;
  y: number;
  width: number;
  height: number;
  averageColor: [number, number, number];
  bestMatch?: MaterialImage;
  position: { gridX: number; gridY: number }; // 新增：网格位置
}