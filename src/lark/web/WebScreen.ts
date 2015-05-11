//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

module lark.web {

    /**
     * Canvas屏幕适配器
     */
    export class WebScreen extends LarkObject {

        /**
         * 创建一个WebScreen实例
         * @param container 播放器外层容器
         * @param scaleMode 舞台缩放模式
         * @param contentWidth 初始化内容宽度
         * @param contentHeight 初始化内容高度
         */
        public constructor(container:HTMLElement, canvas:HTMLCanvasElement, scaleMode:string, contentWidth:number, contentHeight:number) {
            super();
            this.container = container;
            this.canvas = canvas;
            this.scaleMode = scaleMode;
            this.contentWidth = contentWidth;
            this.contentHeight = contentHeight;
            this.attachCanvas(container,canvas);
        }

        /**
         * 画布实例
         */
        private canvas:HTMLCanvasElement;
        /**
         * 播放器容器实例
         */
        private container:HTMLElement;

        /**
         * 缩放模式,默认值为player.ScaleMode.NO_SCALE。请参考player.ScaleMode中定义的值,若设置的值不是player.ScaleMode中的值，将会默认采用player.ScaleMode.NO_SCALE。
         */
        private scaleMode:string;

        /**
         * 初始化内容宽度
         */
        private contentWidth:number;
        /**
         * 初始化内容高度
         */
        private contentHeight:number;

        /**
         * 添加canvas到container。
         */
        private attachCanvas(container:HTMLElement,canvas:HTMLCanvasElement):void {
            container.onselectstart = function () {//屏蔽网页的文本选择
                return false;
            };
            var style = canvas.style;
            style.margin = "auto";
            style.position = "absolute";
            style.top = "0";
            style.bottom = "0";
            style.left = "0";
            style.right = "0";
            container.appendChild(canvas);
            style = container.style;
            style.overflow = "hidden";
            style.position = "relative";
        }

        /**
         * 更新播放器视口尺寸
         */
        public updateScreenSize(player:lark.player.Player, webTouch:WebTouchHandler,webText:WebTextLayer):void {
            var screenRect = this.container.getBoundingClientRect();
            var stageSize = lark.player.screenAdapter.calculateStageSize(this.scaleMode,
                screenRect.width, screenRect.height, this.contentWidth, this.contentHeight);
            var stageWidth = stageSize.stageWidth;
            var stageHeight = stageSize.stageHeight;
            var displayWidth = stageSize.displayWidth;
            var displayHeight = stageSize.displayHeight;
            var canvas = this.canvas;
            if (canvas.width !== stageWidth) {
                canvas.width = stageWidth;
            }
            if (canvas.height !== stageHeight) {
                canvas.height = stageHeight;
            }
            canvas.style.width = displayWidth + "px";
            canvas.style.height = displayHeight + "px";
            player.updateStageSize(stageWidth, stageHeight);
            var scalex = displayWidth / stageWidth,
                scaley = displayHeight / stageHeight;
            webTouch.updateScaleMode(scalex,scaley);
            webText.updateScaleMode(scalex,scaley);
        }
    }
}