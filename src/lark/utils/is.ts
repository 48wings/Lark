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
     * Indicates whether an object is a instance of the class or interface specified as the parameter.This method has better performance
     * compared width the instanceOf operator,and it can indicate whether an object is a instance of the specific interface.
     * @param instance the instance to be checked.
     * @param typeFlag the enum value representing a specific class or interface.
     * @returns A value of true if the object is a instance of the class or interface specified as the parameter.
     * @example
     * <code>
     *     var instance = new lark.Sprite();
     *     lark.log(lark.is(instance,lark.Types.Sprite))  //true
     *     lark.log(lark.is(instance,lark.Types.DisplayObjectContainer))  //true
     *     lark.log(lark.is(instance,lark.Types.Bitmap))  //false
     * </code>
     * @see lark.registerClass()
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 检查指定对象是否为 Lark 框架内指定接口或类或其子类的实例。此方法与使用 instanceOf 关键字相比具有更高的性能，并且能判断接口的实现。
     * @param instance 要判断的实例。
     * @param typeFlag 类或接口的枚举值.
     * @returns 返回true表示当前对象是指定类或接口的实例。
     * @example
     * <code>
     *     var instance = new lark.Sprite();
     *     lark.log(lark.is(instance,lark.Types.Sprite))  //true
     *     lark.log(lark.is(instance,lark.Types.DisplayObjectContainer))  //true
     *     lark.log(lark.is(instance,lark.Types.Bitmap))  //false
     * </code>
     * @see lark.registerClass()
     * @version Lark 1.0
     * @platform Web,Native
     */
    export function is(instance:any, typeFlag:number):boolean {
        if (!instance || typeof instance != "object") {
            return false;
        }
        var prototype:any = Object.getPrototypeOf(instance);
        var flags = prototype ? prototype.__typeFlags__ : null;
        if (!flags) {
            return false;
        }
        return (flags.indexOf(typeFlag) !== -1);
    }
}