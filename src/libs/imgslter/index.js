/*!
 * GIT: https://github.com/shrekshrek/image-selecter
 **/
import EXIF from 'exif-js'
var ua = (function() {
    var u = navigator.userAgent;
    return {
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        iosv: u.substr(u.indexOf('iPhone OS') + 9, 3)
    };
})();
var ImgSlter = function() {
    this.initialize.apply(this, arguments);
};
ImgSlter.prototype = {
    initialize: function(config) {
        var _config = config || {};
        this.el = _config.el || (function() {
            var input = document.createElement('INPUT');
            input.type = 'file';
            // input.accept = 'image/*';
            // input.accept = 'image/png,image/jpeg,image/gif';
            // input.capture = 'camera';
            input.multiple = false;
            return input;
        })();
        this.size = _config.size || 500;
        this.type = _config.type || 'jpeg';
        this.quality = _config.quality || 1;
        this.videoParams = _config.videoParams || {};
        this.handler = _config.handler || function() {
        };
        this.color = _config.color;
        this.cvs = document.createElement('canvas');
        this.ctx = this.cvs.getContext('2d');
        this._changeHandler = this._changeHandler.bind(this);
        this.el.addEventListener('change', this._changeHandler, false);
    },
    // 处理视频
    _changeVideo: function(_file) {
        var _self = this;
        var formData = new FormData();
        formData.append('file', _file, _file.name);
        for ( const key in this.videoParams) {
            formData.append(key, this.videoParams[key])
        }
        _self.handler && _self.handler.call(this, {
            type: 'video',
            file: _file,
            formData: formData
        });
    },
    // 处理图片压缩旋转等
    _changeHandler: function(evt) {
        var _self = this;

        var _file = evt.target.files[0];

        if (_file === undefined) return;
        if (/video/i.test(_file.type)) {
            // 是视频
            _self._changeVideo(_file);
            return;
        }
        if (!/image/i.test(_file.type)) {
            // 不为图片，不向下执行
            return;
        }
        var imgW, imgW2, tmpImgW;
        var imgH, imgH2, tmpImgH;

        window.URL = window.URL || window.webkitURL;
        var src = window.URL.createObjectURL(_file);
        var img = new Image();
        img.onload = function() {
            EXIF.getData(img, function() {
                var Orientation = EXIF.getTag(this, 'Orientation') || 0;

                imgW = img.width;
                imgH = img.height;

                if (imgW >= imgH) {
                    imgW2 = _self.size;
                    imgH2 = imgW2 * imgH / imgW;
                    tmpImgW = imgW;
                    tmpImgH = imgH;
                } else {
                    imgH2 = _self.size;
                    imgW2 = imgH2 * imgW / imgH;
                    tmpImgW = imgH;
                    tmpImgH = imgW;
                }

                var _w, _h, _r;
                switch (Orientation) {
                    case 3:
                        _w = imgW2;
                        _h = imgH2;
                        _r = 180;
                        break;
                    case 6:
                        _w = imgH2;
                        _h = imgW2;
                        _r = 90;
                        break;
                    case 8:
                        _w = imgH2;
                        _h = imgW2;
                        _r = 270;
                        break;
                    default:
                        _w = imgW2;
                        _h = imgH2;
                        _r = 0;
                        break;
                }

                _self.cvs.width = _w;
                _self.cvs.height = _h;
                _self.ctx.clearRect(0, 0, _w, _h);

                if (_self.color) {
                    _self.ctx.fillStyle = _self.color;
                    _self.ctx.fillRect(0, 0, _w, _h);
                }

                _self.ctx.translate(_w / 2, _h / 2);
                _self.ctx.rotate(_r * Math.PI / 180);

                if (tmpImgW > 3260 || tmpImgH > 2440) {
                    if (ua.ios) {
                        if (parseInt(ua.iosv) >= 8) {
                            _self.ctx.drawImage(img, 0, 0, imgW, imgH, -imgW2 / 2, -imgH2 / 2, imgW2, imgH2);
                        } else {
                            _self.ctx.drawImage(img, 0, 0, imgW / 2, imgH / 2, -imgW2 / 2, -imgH2 / 2, imgW2, imgH2);
                        }
                    } else {
                        _self.ctx.drawImage(img, 0, 0, imgW, imgH, -imgW2 / 2, -imgH2 / 2, imgW2, imgH2);
                    }
                } else {
                    _self.ctx.drawImage(img, -imgW2 / 2, -imgH2 / 2, imgW2, imgH2);
                }

                _self.handler && _self.handler.call(this, {
                    type: 'image',
                    img: _self.cvs.toDataURL('image/' + _self.type, _self.quality),
                    width: _self.cvs.width,
                    height: _self.cvs.height
                });

                window.URL.revokeObjectURL(_file);
            });
        };
        img.src = src;
    },
    select: function() {
        if (this.el) this.el.click();
    },
    destroy: function() {
        this.el.removeEventListener('change', this._changeHandler, false);
        delete this.ctx;
        delete this.cvs;
        delete this.el;
    }
};
export default ImgSlter
