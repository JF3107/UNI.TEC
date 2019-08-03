// ******** 方案一 [ 一站式到位 ] ***********
ctx.draw(false, function() {
  wx.canvasToTempFilePath({
	canvasId: 'customCanvas',
	success(res) {
	  wx.authorize({
		scope: 'scope.writePhotosAlbum',
		success() {
		  wx.saveImageToPhotosAlbum({
			filePath: res.tempFilePath,
			success() {
			  wx.showToast({
				title: '图片保存成功'
			  })
			}
		  })
		}
	  })
	}
  }, this)
});

// ******** 方案二 [ 一次授权式 ] ***********
// （draw 方法体内）
    ctx.draw(false, function() {
      wx.canvasToTempFilePath({
        canvasId: 'customCanvas',
        success(res) {
          let temPathRes = res;
          wx.getSetting({
            success(res) {
              if (!res.authSetting['scope.writePhotosAlbum']) {
                wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success() {
                    // 用户已经同意小程序相册功能，后续调用 wx.saveImageToPhotosAlbum 接口不会弹窗询问
                    that.startSaveImage(temPathRes)
                  }
                })
              }else{
                that.startSaveImage(temPathRes)
              }
            }
          })
        }
      }, this)
    });
// 全局层 写方法 startSaveImage
startSaveImage(res) {
  wx.saveImageToPhotosAlbum({
    filePath: res.tempFilePath,
    success() {
      wx.showToast({
        title: '图片保存成功'
      })
    }
  })
},