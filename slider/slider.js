$.sliderForUs = function (options) {
    return new function () {
        this.init = function () {
            if($("#"+options.id).length === 1){
                this.render().mount();
            }else{
                alert("未匹配到对应元素！")
            }
        };
        this.render = function(){
            var htmlStr =
                '<div class="slider-box '+options.style+'">'+
                '<div id='+ options.id +' class="slider-block">'+
                options.tips[0]+
                '<div class="slider-block-goright">'+
                '<img class="slider-block-img" src='+this.imgBase64.goright+' />'+
                '</div>'+
                '</div>'+
                '<div class="slider-under">'+options.tips[1]+'</div>'+
                '</div>';
            $("#"+options.id).replaceWith(htmlStr);
            return this;
        };
        this.mount = function(){
            var item = $("#"+options.id);
            item.on("touchstart",function (event) {
                this.moveData.orgX = event.touches[0].pageX;
            }.bind(this)).on("touchmove",function (event) {
                event.preventDefault();
                this.moveData.art = event.touches[0].pageX - this.moveData.orgX;
                if(this.moveData.art>0&&this.moveData.art<item.width()-35 && this.moveData.over===false){
                    item.css("transform","translateX("+ this.moveData.art+"px)");
                }
                if(this.moveData.art>item.width()-35-3){
                    item.unbind("touchstart","touchmove")
                        .css("transform","translateX(100%)");
                    this.moveData.over = true;
                }
            }.bind(this)).on("touchend",function () {
                if( this.moveData.over === true){
                    item.unbind("touchend");
                    if(typeof options.success === "function"){
                        options.success();
                    }else{
                        alert("success需为为函数！")
                    }
                }else {
                    item.css("transform","translateX(0px)");
                }
            }.bind(this));
        };
        this.moveData = {
            orgX:0,
            art:0,
            over:false
        };
        this.imgBase64 = {
            goright:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozZTJlN2M4OS0yYzg5LTEzNDUtYjNjMC1iYWQ3MzdlMjI2MDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUUzQjUwOUE3MEU4MTFFNzk3RTVBMDExMUZFMDRBRTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUUzQjUwOTk3MEU4MTFFNzk3RTVBMDExMUZFMDRBRTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTQxMDA3ZWMtYzZjOC1hMTQ2LTk3NDUtNTlkNjAyZTVmMTJjIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzcxOTg5MTctNmRlNC0xMWU3LWEzMDQtYWFmYzEzYzdhZjU3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+H0I1HwAAAI9JREFUeNq0lEsOwCAIBeHFG3n/G+iZaJvYphrLJ1o2bsbJIyJcShEi4pwzearWavJop5wwBUrlLykHxSafXqA0kEdo0qrK43XhSaDF9PDwghExIgm8YliP4ZyGjocXjIhBP5QmlSGB+SFuHruFX0mXhDPpsrCTtu3jFmp8GgHPCrR47Ew4ts/BUVT5Q4ABAAF8SlppV8ukAAAAAElFTkSuQmCC"
        }
    };
};