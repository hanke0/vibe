import { MosaicParameters, MaterialImage, GridCell } from '../types/types';

// 保持宽高比的图像压缩 - 支持最高512x512分辨率
const compressImage = (image: HTMLImageElement, size: number): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  canvas.width = size;
  canvas.height = size;
  
  // 使用最高质量的图像缩放
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // 计算保持宽高比的裁剪参数
  const sourceWidth = image.width;
  const sourceHeight = image.height;
  const sourceAspectRatio = sourceWidth / sourceHeight;
  
  let sourceX = 0;
  let sourceY = 0;
  let cropWidth = sourceWidth;
  let cropHeight = sourceHeight;
  
  // 如果原图比目标更宽，从左右裁剪
  if (sourceAspectRatio > 1) {
    cropWidth = sourceHeight; // 裁剪为正方形
    sourceX = (sourceWidth - cropWidth) / 2; // 居中裁剪
  }
  // 如果原图比目标更高，从上下裁剪
  else if (sourceAspectRatio < 1) {
    cropHeight = sourceWidth; // 裁剪为正方形
    sourceY = (sourceHeight - cropHeight) / 2; // 居中裁剪
  }
  
  // 对于高分辨率压缩，使用多级缩放技术
  if (size >= 128) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    const intermediateSize = Math.min(size * 2, 1024);
    
    tempCanvas.width = intermediateSize;
    tempCanvas.height = intermediateSize;
    
    tempCtx.imageSmoothingEnabled = true;
    tempCtx.imageSmoothingQuality = 'high';
    
    // 先裁剪到中间尺寸
    tempCtx.drawImage(
      image,
      sourceX, sourceY, cropWidth, cropHeight,
      0, 0, intermediateSize, intermediateSize
    );
    
    // 然后缩放到目标尺寸
    ctx.drawImage(tempCanvas, 0, 0, intermediateSize, intermediateSize, 0, 0, size, size);
  } else {
    // 对于较小尺寸直接绘制并裁剪
    ctx.drawImage(
      image,
      sourceX, sourceY, cropWidth, cropHeight,
      0, 0, size, size
    );
  }
  
  return canvas;
};

// 优化的颜色提取，使用缓存和颜色方差计算
const colorCache = new Map<string, { color: [number, number, number], variance: number }>();

const calculateColorVariance = (imageData: ImageData): number => {
  const data = imageData.data;
  let rSum = 0, gSum = 0, bSum = 0;
  let rSqSum = 0, gSqSum = 0, bSqSum = 0;
  const pixelCount = data.length / 4;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    rSum += r;
    gSum += g;
    bSum += b;
    
    rSqSum += r * r;
    gSqSum += g * g;
    bSqSum += b * b;
  }
  
  const rMean = rSum / pixelCount;
  const gMean = gSum / pixelCount;
  const bMean = bSum / pixelCount;
  
  const rVariance = (rSqSum / pixelCount) - (rMean * rMean);
  const gVariance = (gSqSum / pixelCount) - (gMean * gMean);
  const bVariance = (bSqSum / pixelCount) - (bMean * bMean);
  
  return Math.sqrt(rVariance + gVariance + bVariance);
};

export const generateMosaic = async (
  targetImageUrl: string,
  materialUrls: string[],
  parameters: MosaicParameters,
  outputCanvas: HTMLCanvasElement,
  previewCanvas: HTMLCanvasElement,
  onComplete: (imageUrl: string) => void
) => {
  try {
    // 加载目标图像
    const targetImage = await loadImage(targetImageUrl);
    
    // 加载和处理素材图像 - 使用动态分辨率和多样性增强
    const materialImages: MaterialImage[] = [];
    const batchSize = Math.max(3, Math.min(8, Math.floor(30 / (parameters.materialResolution / 32)))); // 根据分辨率调整批次大小
    
    console.log(`开始加载${materialUrls.length}张素材，使用${parameters.materialResolution}x${parameters.materialResolution}px压缩（保持宽高比）`);
    
    for (let i = 0; i < materialUrls.length; i += batchSize) {
      const batch = materialUrls.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(async (url) => {
          try {
            const img = await loadImage(url);
            
            // 使用参数中指定的分辨率进行压缩，保持宽高比
            const compressedCanvas = compressImage(img, parameters.materialResolution);
            const colorData = getAverageColorFromCanvas(compressedCanvas, `${url}-${parameters.materialResolution}`);
            
            return { 
              url, 
              image: img, 
              compressedCanvas,
              averageColor: colorData.color,
              colorVariance: colorData.variance,
              usageCount: 0,
              lastUsedPosition: undefined
            };
          } catch (error) {
            console.warn(`Failed to load image: ${url}`, error);
            return null;
          }
        })
      );
      
      // 过滤失败的加载并添加到素材列表
      batchResults.forEach(result => {
        if (result) {
          materialImages.push(result);
        }
      });
      
      // 根据分辨率调整延迟时间
      const delay = Math.max(3, parameters.materialResolution / 16);
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    if (materialImages.length === 0) {
      throw new Error('No material images could be loaded');
    }

    console.log(`Successfully loaded ${materialImages.length} material images with ${parameters.materialResolution}x${parameters.materialResolution}px compression (aspect ratio preserved)`);

    // 设置画布 - 使用参数中的输出分辨率，最高支持8K
    const outputCtx = outputCanvas.getContext('2d')!;
    const previewCtx = previewCanvas.getContext('2d')!;
    
    const outputSize = Math.min(parameters.outputResolution, 7680); // 限制最大8K
    const previewSize = Math.min(1200, parameters.outputResolution); // 预览尺寸不超过1200px
    
    outputCanvas.width = outputSize;
    outputCanvas.height = outputSize;
    previewCanvas.width = previewSize;
    previewCanvas.height = previewSize;

    // 应用亮度和对比度
    outputCtx.filter = `brightness(${parameters.brightness}) contrast(${parameters.contrast})`;
    previewCtx.filter = `brightness(${parameters.brightness}) contrast(${parameters.contrast})`;

    // 创建网格
    console.log(`创建${parameters.gridSize}x${parameters.gridSize}网格，输出分辨率${outputSize}x${outputSize}`);
    const outputGridCells = await createGridOptimized(targetImage, parameters.gridSize, outputSize);
    const previewGridCells = await createGridOptimized(targetImage, parameters.gridSize, previewSize);
    
    // 为素材匹配网格单元 - 使用增强的多样性算法
    console.log('开始智能颜色匹配和多样性优化...');
    matchMaterialsToGridWithDiversity(outputGridCells, materialImages, parameters.colorTolerance, parameters.gridSize);
    matchMaterialsToGridWithDiversity(previewGridCells, materialImages, parameters.colorTolerance, parameters.gridSize);
    
    // 渲染马赛克
    console.log('开始渲染马赛克...');
    await renderHighQualityMosaic(outputGridCells, outputCtx, outputSize, materialImages);
    await renderPreviewMosaic(previewGridCells, parameters.tileSize, previewCtx, previewSize, materialImages);
    
    // 完成
    const resolutionLabel = outputSize >= 7680 ? '8K' : outputSize >= 6400 ? '6K' : outputSize >= 3840 ? '4K' : `${outputSize}p`;
    console.log(`马赛克生成完成：${resolutionLabel} (${outputSize}x${outputSize}px) - 所有图片保持原始宽高比`);
    onComplete(outputCanvas.toDataURL('image/png', 0.98));
    
  } catch (error) {
    console.error('生成马赛克失败:', error);
    throw error;
  }
};

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    const timeout = setTimeout(() => {
      reject(new Error(`Image load timeout: ${url}`));
    }, 30000); // 增加超时时间以适应高分辨率处理
    
    img.onload = () => {
      clearTimeout(timeout);
      resolve(img);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error(`Failed to load image: ${url}`));
    };
    
    img.src = url;
  });
};

const getAverageColorFromCanvas = (canvas: HTMLCanvasElement, cacheKey: string): { color: [number, number, number], variance: number } => {
  // 检查缓存
  if (colorCache.has(cacheKey)) {
    return colorCache.get(cacheKey)!;
  }
  
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  let r = 0, g = 0, b = 0;
  const pixelCount = data.length / 4;
  
  // 根据图像大小调整采样策略
  const sampleStep = canvas.width >= 64 ? 1 : 2; // 高分辨率时采样更多像素
  let sampleCount = 0;
  
  for (let i = 0; i < data.length; i += sampleStep * 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    sampleCount++;
  }
  
  const averageColor: [number, number, number] = [
    Math.round(r / sampleCount),
    Math.round(g / sampleCount),
    Math.round(b / sampleCount)
  ];
  
  // 计算颜色方差
  const variance = calculateColorVariance(imageData);
  
  const result = { color: averageColor, variance };
  
  // 缓存结果
  colorCache.set(cacheKey, result);
  return result;
};

const createGridOptimized = async (
  targetImage: HTMLImageElement,
  gridSize: number,
  canvasSize: number
): Promise<GridCell[]> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  
  // 使用高质量缩放
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(targetImage, 0, 0, canvasSize, canvasSize);
  
  const cellSize = canvasSize / gridSize;
  const cells: GridCell[] = [];
  
  // 根据网格大小和输出分辨率调整分块处理
  const chunkSize = Math.max(5, Math.min(20, Math.floor(gridSize / 8)));
  
  for (let startY = 0; startY < gridSize; startY += chunkSize) {
    const endY = Math.min(startY + chunkSize, gridSize);
    
    for (let y = startY; y < endY; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cellX = x * cellSize;
        const cellY = y * cellSize;
        
        const imageData = ctx.getImageData(cellX, cellY, cellSize, cellSize);
        const averageColor = getAverageColorFromImageData(imageData);
        
        cells.push({
          x: cellX,
          y: cellY,
          width: cellSize,
          height: cellSize,
          averageColor,
          position: { gridX: x, gridY: y }
        });
      }
    }
    
    // 让出控制权防止阻塞
    if (startY + chunkSize < gridSize) {
      await new Promise(resolve => setTimeout(resolve, 1));
    }
  }
  
  return cells;
};

const getAverageColorFromImageData = (imageData: ImageData): [number, number, number] => {
  const data = imageData.data;
  let r = 0, g = 0, b = 0;
  
  // 根据图像数据大小调整采样密度
  const step = Math.max(4, Math.floor(data.length / 12000));
  let sampleCount = 0;
  
  for (let i = 0; i < data.length; i += step) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    sampleCount++;
  }
  
  return [
    Math.round(r / sampleCount),
    Math.round(g / sampleCount),
    Math.round(b / sampleCount)
  ];
};

// 增强的颜色距离计算
const colorDistance = (color1: [number, number, number], color2: [number, number, number]): number => {
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;
  
  // 使用感知加权的RGB距离
  const rWeight = 0.299;
  const gWeight = 0.587;
  const bWeight = 0.114;
  
  return Math.sqrt(
    rWeight * Math.pow(r2 - r1, 2) +
    gWeight * Math.pow(g2 - g1, 2) +
    bWeight * Math.pow(b2 - b1, 2)
  );
};

// 计算位置距离
const positionDistance = (pos1: { gridX: number; gridY: number }, pos2: { gridX: number; gridY: number }): number => {
  return Math.sqrt(Math.pow(pos1.gridX - pos2.gridX, 2) + Math.pow(pos1.gridY - pos2.gridY, 2));
};

// 增强的多样性匹配算法
const matchMaterialsToGridWithDiversity = (
  gridCells: GridCell[],
  materialImages: MaterialImage[],
  colorTolerance: number,
  gridSize: number
) => {
  const toleranceThreshold = colorTolerance * 1.5;
  
  // 重置使用统计
  materialImages.forEach(material => {
    material.usageCount = 0;
    material.lastUsedPosition = undefined;
  });
  
  // 创建颜色组以提高匹配效率
  const colorGroups = new Map<string, MaterialImage[]>();
  const groupSize = Math.max(12, Math.min(24, Math.floor(256 / Math.sqrt(materialImages.length / 50))));
  
  materialImages.forEach(material => {
    const [r, g, b] = material.averageColor;
    const groupKey = `${Math.floor(r/groupSize)}-${Math.floor(g/groupSize)}-${Math.floor(b/groupSize)}`;
    
    if (!colorGroups.has(groupKey)) {
      colorGroups.set(groupKey, []);
    }
    colorGroups.get(groupKey)!.push(material);
  });
  
  // 按网格位置顺序处理，确保相邻位置的多样性
  gridCells.forEach((cell, cellIndex) => {
    const [r, g, b] = cell.averageColor;
    const groupKey = `${Math.floor(r/groupSize)}-${Math.floor(g/groupSize)}-${Math.floor(b/groupSize)}`;
    
    // 获取候选素材
    let candidateMaterials = colorGroups.get(groupKey) || [];
    
    // 如果组中没有素材，搜索相邻的颜色组
    if (candidateMaterials.length === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dg = -1; dg <= 1; dg++) {
          for (let db = -1; db <= 1; db++) {
            const adjKey = `${Math.floor(r/groupSize) + dr}-${Math.floor(g/groupSize) + dg}-${Math.floor(b/groupSize) + db}`;
            const adjMaterials = colorGroups.get(adjKey);
            if (adjMaterials) {
              candidateMaterials = candidateMaterials.concat(adjMaterials);
            }
          }
        }
      }
    }
    
    // 如果仍然没有找到，使用所有素材的子集
    if (candidateMaterials.length === 0) {
      candidateMaterials = materialImages.slice();
    }
    
    // 多样性评分函数
    const calculateDiversityScore = (material: MaterialImage): number => {
      let diversityScore = 0;
      
      // 1. 使用频率惩罚 - 使用次数越多，分数越低
      const usagePenalty = material.usageCount * 10;
      diversityScore -= usagePenalty;
      
      // 2. 位置距离奖励 - 距离上次使用位置越远，分数越高
      if (material.lastUsedPosition) {
        const posDistance = positionDistance(cell.position, material.lastUsedPosition);
        const minDistance = Math.max(3, gridSize / 20); // 最小距离要求
        if (posDistance >= minDistance) {
          diversityScore += posDistance * 5;
        } else {
          diversityScore -= (minDistance - posDistance) * 15; // 距离太近的严重惩罚
        }
      } else {
        diversityScore += 20; // 未使用过的素材获得奖励
      }
      
      // 3. 颜色方差奖励 - 颜色丰富的图片获得额外分数
      diversityScore += material.colorVariance * 0.1;
      
      return diversityScore;
    };
    
    // 寻找最佳匹配，结合颜色匹配和多样性
    let bestMatch = candidateMaterials[0];
    let bestScore = -Infinity;
    
    // 限制搜索范围以提高性能，但确保足够的多样性选择
    const searchLimit = Math.min(candidateMaterials.length, Math.max(20, materialImages.length / 10));
    
    for (let i = 0; i < searchLimit; i++) {
      const material = candidateMaterials[i];
      const colorDist = colorDistance(cell.averageColor, material.averageColor);
      
      // 颜色匹配分数 (越小越好，转换为越大越好)
      const colorScore = Math.max(0, toleranceThreshold - colorDist);
      
      // 多样性分数
      const diversityScore = calculateDiversityScore(material);
      
      // 综合分数 (颜色匹配权重60%，多样性权重40%)
      const totalScore = colorScore * 0.6 + diversityScore * 0.4;
      
      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestMatch = material;
      }
    }
    
    // 更新使用统计
    if (bestMatch) {
      bestMatch.usageCount++;
      bestMatch.lastUsedPosition = cell.position;
      cell.bestMatch = bestMatch;
    }
  });
  
  // 输出多样性统计
  const usageCounts = materialImages.map(m => m.usageCount);
  const maxUsage = Math.max(...usageCounts);
  const minUsage = Math.min(...usageCounts);
  const avgUsage = usageCounts.reduce((a, b) => a + b, 0) / usageCounts.length;
  
  console.log(`多样性统计: 最大使用${maxUsage}次, 最小使用${minUsage}次, 平均使用${avgUsage.toFixed(1)}次`);
};

// 高质量渲染用于输出 - 支持8K分辨率，保持宽高比
const renderHighQualityMosaic = async (
  gridCells: GridCell[],
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  materialImages: MaterialImage[]
): Promise<void> => {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  
  // 根据输出分辨率动态调整批次大小
  const batchSize = Math.max(15, Math.min(80, Math.floor(8000 / (canvasSize / 1000))));
  
  for (let i = 0; i < gridCells.length; i += batchSize) {
    const batch = gridCells.slice(i, i + batchSize);
    
    batch.forEach(cell => {
      if (cell.bestMatch) {
        const image = cell.bestMatch.image;
        const sourceWidth = image.width;
        const sourceHeight = image.height;
        const sourceAspectRatio = sourceWidth / sourceHeight;
        
        // 计算保持宽高比的裁剪参数
        let sourceX = 0;
        let sourceY = 0;
        let cropWidth = sourceWidth;
        let cropHeight = sourceHeight;
        
        // 如果原图比目标更宽，从左右裁剪
        if (sourceAspectRatio > 1) {
          cropWidth = sourceHeight; // 裁剪为正方形
          sourceX = (sourceWidth - cropWidth) / 2; // 居中裁剪
        }
        // 如果原图比目标更高，从上下裁剪
        else if (sourceAspectRatio < 1) {
          cropHeight = sourceWidth; // 裁剪为正方形
          sourceY = (sourceHeight - cropHeight) / 2; // 居中裁剪
        }
        
        // 使用原始高分辨率图像进行渲染，保持宽高比
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.drawImage(
          image,
          sourceX, sourceY, cropWidth, cropHeight, // 源图裁剪区域
          cell.x, cell.y, cell.width, cell.height  // 目标区域
        );
      }
    });
    
    // 根据分辨率调整延迟 - 8K需要更多处理时间
    const delay = Math.max(1, Math.floor(canvasSize / 1000));
    if (i + batchSize < gridCells.length) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// 预览渲染 - 平衡质量和性能，保持宽高比
const renderPreviewMosaic = async (
  gridCells: GridCell[],
  tileSize: number,
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  materialImages: MaterialImage[]
): Promise<void> => {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  
  const batchSize = Math.max(40, Math.min(120, Math.floor(12000 / (canvasSize / 800))));
  
  for (let i = 0; i < gridCells.length; i += batchSize) {
    const batch = gridCells.slice(i, i + batchSize);
    
    batch.forEach(cell => {
      if (cell.bestMatch) {
        const centerX = cell.x + cell.width / 2;
        const centerY = cell.y + cell.height / 2;
        const halfTile = tileSize / 2;
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // 使用压缩版本进行预览（已经保持了宽高比）
        if (cell.bestMatch.compressedCanvas) {
          ctx.drawImage(
            cell.bestMatch.compressedCanvas,
            centerX - halfTile,
            centerY - halfTile,
            tileSize,
            tileSize
          );
        } else {
          // 如果没有压缩版本，使用原图并保持宽高比
          const image = cell.bestMatch.image;
          const sourceWidth = image.width;
          const sourceHeight = image.height;
          const sourceAspectRatio = sourceWidth / sourceHeight;
          
          let sourceX = 0;
          let sourceY = 0;
          let cropWidth = sourceWidth;
          let cropHeight = sourceHeight;
          
          if (sourceAspectRatio > 1) {
            cropWidth = sourceHeight;
            sourceX = (sourceWidth - cropWidth) / 2;
          } else if (sourceAspectRatio < 1) {
            cropHeight = sourceWidth;
            sourceY = (sourceHeight - cropHeight) / 2;
          }
          
          ctx.drawImage(
            image,
            sourceX, sourceY, cropWidth, cropHeight,
            centerX - halfTile, centerY - halfTile, tileSize, tileSize
          );
        }
      }
    });
    
    // 让出控制权
    if (i + batchSize < gridCells.length) {
      await new Promise(resolve => setTimeout(resolve, 1));
    }
  }
};