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
module lark {

    /**
     * @language en_US
     * The VerticalAlign class defines the possible values for the vertical alignment.
     * @see lark.TextField#verticalAlign
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * VerticalAlign 类为垂直对齐方式定义可能的值。
     * @see lark.TextField#verticalAlign
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class VerticalAlign{

        /**
         * @language en_US
         * Vertically align content to the top of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将内容与容器的顶部对齐。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static TOP:string = "top";

        /**
         * @language en_US
         * Vertically align content to the bottom of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将内容与容器的底部对齐。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static BOTTOM:string = "bottom";

        /**
         * @language en_US
         * Vertically align content in the middle of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在容器的垂直中心对齐内容。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static MIDDLE:string = "middle";

    }
}