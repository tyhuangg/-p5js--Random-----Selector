let images = [];
let numberOfImages = 7; // 總共圖片數量
let imageCount = 1; // 當前顯示的圖片數量
let imagePositions = []; // 儲存圖片的位置
let usedImages = new Set(); // 記錄已經使用過的圖片索引
let texts = [ // 與圖片對應的文字內容
  "HEESEUNG / 李羲承 / 2001.10.15",
  "JAY / 朴綜星 / 2002.04.20",
  "JAKE / 沈載倫 / 2002.11.15",
  "SUNGHOON / 朴成訓 / 2002.12.08",
  "SUNOO / 金善禹 / 2003.06.24",
  "JUNGWON / 梁禎元 / 2004.02.09",
  "NI-KI / 西村力 / 2005.12.09"
];
let currentText = ""; // 當前顯示的文字內容

function preload() {
  for (let i = 1; i <= numberOfImages; i++) {
    images[i - 1] = loadImage(`images/image${i}.jpg`, 
      img => console.log(`Loaded: images/image${i}.jpg`), 
      err => console.error(`Failed to load: images/image${i}.jpg`));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(20);
  
  // 開始顯示第一張圖片
  displayNextImage();
}

function draw() {
  background(0); // 清除畫布
  fill(255); // 設置文字顏色
  text("ENHYPEN Romance : UNTOLD - daydream", width / 2, 50); // 顯示標題
  
  // 顯示當前圖片
  for (let i = 0; i < imageCount; i++) {
    image(images[currentImageIndex], imagePositions[i].x, imagePositions[i].y); // 使用固定位置顯示圖片
  }

  // 顯示當前文字
  text(currentText, width / 2, height - 50); // 顯示對應文字
}

function mousePressed() {
  displayNextImage(); // 使用者點擊時顯示下一張圖片
}

function displayNextImage() {
  // 如果已經顯示過所有圖片，顯示完成訊息
  if (usedImages.size === numberOfImages) {
    currentText = "你已經選擇完所有的男模，接下來請靜候 11/11 ENHYPEN 強勢回歸！";
    imageCount = 0; // 不顯示任何圖片
    currentText = "請點擊任意地方重新開始遊戲";
    usedImages.clear(); // 清除已使用的圖片，重新開始遊戲
    return; // 結束函數
  }

  // 更新圖片索引
  do {
    currentImageIndex = floor(random(numberOfImages)); // 隨機選擇圖片索引
  } while (usedImages.has(currentImageIndex)); // 確保選擇未被使用過的圖片
  
  // 記錄已使用的圖片
  usedImages.add(currentImageIndex); 

  imageCount = floor(random(1, 5)); // 隨機生成顯示的圖片數量（1-4）

  // 設置圖片的隨機位置
  imagePositions = [];
  for (let i = 0; i < imageCount; i++) {
    let x = random(0, width - images[currentImageIndex].width);
    let y = random(100, height - images[currentImageIndex].height);
    imagePositions.push({ x, y });
  }

  // 更新對應的文字內容
  currentText = texts[currentImageIndex];
}
