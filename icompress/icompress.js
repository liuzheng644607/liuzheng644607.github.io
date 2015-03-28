;
(function() {
	window.icompress = icompress;

	function icompress(opts) {
		// 图片压缩的质量
		this.quality = opts.quality || 1;
		// file 控件
		this.pickbtn = opts.pickbtn || {};
		this.width = opts.width || null;
		// success function
		// param Object
		// the result of compress 
		// res={
		// 		"base64",base64,
		// 		"originBase64",originBase64
		// }
		this.success = opts.success || function() {};
		this.init();
	}

	icompress.prototype = {
		init: function() {
			var that = this;
			that.pickbtn.addEventListener("change", fileChange, false);

			function fileChange(e) {
				var fileCtrl = e.target;
				// 文件集合
				// 暂时只考虑一个文件
				var file = fileCtrl.files[0];

				var reader = new FileReader();

				reader.readAsDataURL(file);
				reader.onload = function(e) {
					_compress.call(that, reader.result);
				}
			}
		}
	};

	// 压缩
	function _compress(file) {
		var img = new Image();
		img.src = file;
		var that = this;
		img.onload = function() {

			var width = this.width,
				height = this.height,
				scale = width / height;
			width = that.width || width;
			height = width / scale;
			// 生成canvas
			var cvs = document.createElement('canvas');
			var ctx = cvs.getContext('2d');
			cvs.width = width;
			cvs.height = height;
			ctx.drawImage(img, 0, 0, width, height);
			var bs64 = cvs.toDataURL('image/jpeg', that.quality);
			if (navigator.userAgent.match(/iphone/i)) {
				if (!EXIF||!MegaPixImage) {
					alert("You haven't introduced EXIF.js plugin or MegaPixImage.js plugin");
					return;
				};
				EXIF.getData(img, function() {
					ori = img.exifdata.Orientation;
					var mpImg = new MegaPixImage(img);
					mpImg.render(cvs, {
						maxWidth: width,
						maxHeight: height,
						quality: that.quality,
						orientation: ori||6
					});
					bs64 = cvs.toDataURL('image/jpeg', that.quality);
					// 生成结果
					var result = {
						"base64": bs64,
						"originBase64":file
					};

					// 执行后函数
					that.success(result);
				});
				return;
			}
			var res = {
				"base64": bs64,
				"originBase64":file
			};
			that.success(res);
		}
	}
})()