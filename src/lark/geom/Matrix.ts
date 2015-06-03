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

    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;

    function cos(angle:number):number {
        switch (angle) {
            case HalfPI:
            case -PacPI:
                return 0;
            case PI:
            case -PI:
                return -1;
            case PacPI:
            case -HalfPI:
                return 0;
            default:
                return Math.cos(angle);
        }
    }

    function sin(angle:number):number {
        switch (angle) {
            case HalfPI:
            case -PacPI:
                return 1;
            case PI:
            case -PI:
                return 0;
            case PacPI:
            case -HalfPI:
                return -1;
            default:
                return Math.sin(angle);
        }
    }

    var matrixPool:Matrix[] = [];
    /**
     * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
     * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
     * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
     */
    export class Matrix extends LarkObject {

        /**
         * 释放一个Matrix实例到对象池
         */
        public static release(matrix:Matrix):void {
            if(!matrix){
                return;
            }
            matrixPool.push(matrix);
        }

        /**
         * 从对象池中取出或创建一个新的Matrix对象。
         * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
         * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
         */
        public static create():Matrix {
            var matrix = matrixPool.pop();
            if (!matrix) {
                matrix = new Matrix();
            }
            return matrix;
        }

        /**
         * 创建一个 Matrix 对象
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         */
        constructor(a:number = 1, b:number = 0, c:number = 0, d:number = 1, tx:number = 0, ty:number = 0) {
            super();
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }

        /**
         * 缩放或旋转图像时影响像素沿 x 轴定位的值
         */
        public a:number;
        /**
         * 旋转或倾斜图像时影响像素沿 y 轴定位的值
         */
        public b:number;
        /**
         * 旋转或倾斜图像时影响像素沿 x 轴定位的值
         */
        public c:number;
        /**
         * 缩放或旋转图像时影响像素沿 y 轴定位的值
         */
        public d:number;
        /**
         * 沿 x 轴平移每个点的距离
         */
        public tx:number;

        /**
         * 沿 y 轴平移每个点的距离
         */
        public ty:number;

        /**
         * 返回一个新的 Matrix 对象，它是此矩阵的克隆，带有与所含对象完全相同的副本。
         */
        public clone():Matrix {
            return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
        }

        /**
         * 将某个矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。
         * @param other 要连接到源矩阵的矩阵。
         */
        public concat(other:Matrix):void {
            var a =  this.a * other.a;
            var b =  0.0;
            var c =  0.0;
            var d =  this.d * other.d;
            var tx = this.tx * other.a + other.tx;
            var ty = this.ty * other.d + other.ty;

            if (this.b !== 0.0 || this.c !== 0.0 || other.b !== 0.0 || other.c !== 0.0) {
                a  += this.b * other.c;
                d  += this.c * other.b;
                b  += this.a * other.b + this.b * other.d;
                c  += this.c * other.a + this.d * other.c;
                tx += this.ty * other.c;
                ty += this.tx * other.b;
            }

            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }

        /**
         * 将源 Matrix 对象中的所有矩阵数据复制到调用方 Matrix 对象中。
         */
        public copyFrom(other:Matrix):Matrix {
            this.a = other.a;
            this.b = other.b;
            this.c = other.c;
            this.d = other.d;
            this.tx = other.tx;
            this.ty = other.ty;
            return this;
        }

        /**
         * 为每个矩阵属性设置一个值，该值将导致矩阵无转换。通过应用恒等矩阵转换的对象将与原始对象完全相同。
         * 调用 identity() 方法后，生成的矩阵具有以下属性：a=1、b=0、c=0、d=1、tx=0 和 ty=0。
         */
        public identity():void {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
        }

        /**
         * 执行原始矩阵的逆转换。
         * 您可以将一个逆矩阵应用于对象来撤消在应用原始矩阵时执行的转换。
         */
        public invert():void {
            this.$invertInto(this);
        }

        $invertInto(target:Matrix):void {
            var a = this.a;
            var b  = this.b;
            var c  = this.c;
            var d = this.d;
            var tx = this.tx;
            var ty = this.ty;
            if (b === 0 && c === 0) {
                target.b = target.c = 0;
                if(a===0||d===0){
                    target.a = target.d = target.tx = target.ty = 0;
                }
                else{
                    a = target.a = 1 / a;
                    d = target.d = 1 / d;
                    target.tx = -a * tx;
                    target.ty = -d * ty;
                }

                return;
            }
            var determinant = a * d - b * c;
            if (determinant === 0) {
                target.identity();
                return;
            }
            determinant = 1 / determinant;
            var k = target.a =  d * determinant;
            b = target.b = -b * determinant;
            c = target.c = -c * determinant;
            d = target.d =  a * determinant;
            target.tx = -(k * tx + c * ty);
            target.ty = -(b * tx + d * ty);
        }

        /**
         * 对 Matrix 对象应用旋转转换。
         * rotate() 方法将更改 Matrix 对象的 a、b、c 和 d 属性。
         * @param angle 以弧度为单位的旋转角度。
         */
        public rotate(angle:number):void {
            angle = +angle;
            if (angle !== 0) {
                var u = cos(angle);
                var v = sin(angle);
                var ta = this.a;
                var tb = this.b;
                var tc = this.c;
                var td = this.d;
                var ttx = this.tx;
                var tty = this.ty;
                this.a = ta  * u - tb  * v;
                this.b = ta  * v + tb  * u;
                this.c = tc  * u - td  * v;
                this.d = tc  * v + td  * u;
                this.tx = ttx * u - tty * v;
                this.ty = ttx * v + tty * u;
            }
        }

        /**
         * 对矩阵应用缩放转换。x 轴乘以 sx，y 轴乘以 sy。
         * scale() 方法将更改 Matrix 对象的 a 和 d 属性。
         * @param sx 用于沿 x 轴缩放对象的乘数。
         * @param sy 用于沿 y 轴缩放对象的乘数。
         */
        public scale(sx:number, sy:number):void {
            if (sx !== 1) {
                this.a *= sx;
                this.c *= sx;
                this.tx *= sx;
            }
            if (sy !== 1) {
                this.b *= sy;
                this.d *= sy;
                this.ty *= sy;
            }
        }

        /**
         * 将 Matrix 的成员设置为指定值
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         */
        public setTo(a:number, b:number, c:number, d:number, tx:number, ty:number):Matrix {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
            return this;
        }

        /**
         * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
         * @param pointX 想要获得其矩阵转换结果的点的x坐标。
         * @param pointY 想要获得其矩阵转换结果的点的y坐标。
         * @param resultPoint 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，若不传入将创建一个新的Point对象返回。
         * @returns 由应用矩阵转换所产生的点。
         */
        public transformPoint(pointX:number, pointY:number, resultPoint?:Point):Point {
            var x = this.a * pointX + this.c * pointY + this.tx;
            var y = this.b * pointX + this.d * pointY + this.ty;
            if (resultPoint) {
                resultPoint.setTo(x, y);
                return resultPoint;
            }
            return new Point(x, y);
        }

        /**
         * 沿 x 和 y 轴平移矩阵，由 dx 和 dy 参数指定。
         * @param dx 沿 x 轴向右移动的量（以像素为单位）。
         * @param dy 沿 y 轴向下移动的量（以像素为单位）。
         */
        public translate(dx:number, dy:number):void {
            this.tx += dx;
            this.ty += dy;
        }

        /**
         * 是否与另一个矩阵数据相等
         * @param other 要比较的另一个矩阵对象。
         * @returns 是否相等，ture表示相等。
         */
        public equals(other:Matrix):boolean {
            return this.a === other.a && this.b === other.b &&
                this.c === other.c && this.d === other.d &&
                this.tx === other.tx && this.ty === other.ty;
        }

        $transformBounds(bounds:Rectangle):void {
            var a  = this.a;
            var b  = this.b;
            var c  = this.c;
            var d  = this.d;
            var tx = this.tx;
            var ty = this.ty;

            var x = bounds.x;
            var y = bounds.y;
            var xMax = x + bounds.width;
            var yMax = y + bounds.height;

            var x0 = a * x + c * y + tx;
            var y0 = b * x + d * y + ty;
            var x1 = a * xMax + c * y + tx;
            var y1 = b * xMax + d * y + ty;
            var x2 = a * xMax + c * yMax + tx;
            var y2 = b * xMax + d * yMax + ty;
            var x3 = a * x + c * yMax + tx;
            var y3 = b * x + d * yMax + ty;

            var tmp = 0;

            if (x0 > x1) {
                tmp = x0;
                x0 = x1;
                x1 = tmp;
            }
            if (x2 > x3) {
                tmp = x2;
                x2 = x3;
                x3 = tmp;
            }

            bounds.x = Math.floor(x0 < x2 ? x0 : x2);
            bounds.width = Math.ceil((x1 > x3 ? x1 : x3) - bounds.x);

            if (y0 > y1) {
                tmp = y0;
                y0 = y1;
                y1 = tmp;
            }
            if (y2 > y3) {
                tmp = y2;
                y2 = y3;
                y3 = tmp;
            }

            bounds.y = Math.floor(y0 < y2 ? y0 : y2);
            bounds.height = Math.ceil((y1 > y3 ? y1 : y3) - bounds.y);
        }

        private getDeterminant() {
            return this.a * this.d - this.b * this.c;
        }

        $getScaleX():number {
            var m = this;
            if (m.a === 1 && m.b === 0) {
                return 1;
            }
            var result = Math.sqrt(m.a * m.a + m.b * m.b);
            return this.getDeterminant() < 0 ? -result : result;
        }

        $getScaleY():number {
            var m = this;
            if (m.c === 0 && m.d === 1) {
                return 1;
            }
            var result = Math.sqrt(m.c * m.c + m.d * m.d);
            return this.getDeterminant() < 0 ? -result : result;
        }

        $getSkewX():number {
            return Math.atan2(this.d, this.c) - (PI / 2);
        }

        $getSkewY():number {
            return Math.atan2(this.b, this.a);
        }

        $updateScaleAndRotation(scaleX:number, scaleY:number, skewX:number, skewY:number) {
            if ((skewX === 0 || skewX === TwoPI) && (skewY === 0 || skewY === TwoPI)) {
                this.a = scaleX;
                this.b = this.c = 0;
                this.d = scaleY;
                return;
            }

            var u = cos(skewX);
            var v = sin(skewX);
            if (skewX === skewY) {
                this.a = u * scaleX;
                this.b = v * scaleX;
            } else {
                this.a = cos(skewY) * scaleX;
                this.b = sin(skewY) * scaleX;
            }
            this.c = -v * scaleY;
            this.d = u * scaleY;
        }

        /**
         * target = other * this
         */
        $preMultiplyInto(other:Matrix, target:Matrix):void {
            var a =  other.a * this.a;
            var b =  0.0;
            var c =  0.0;
            var d =  other.d * this.d;
            var tx = other.tx * this.a + this.tx;
            var ty = other.ty * this.d + this.ty;

            if (other.b !== 0.0 || other.c !== 0.0 || this.b !== 0.0 || this.c !== 0.0) {
                a  += other.b * this.c;
                d  += other.c * this.b;
                b  += other.a * this.b + other.b * this.d;
                c  += other.c * this.a + other.d * this.c;
                tx += other.ty * this.c;
                ty += other.tx * this.b;
            }

            target.a = a;
            target.b = b;
            target.c = c;
            target.d = d;
            target.tx = tx;
            target.ty = ty;
        }

    }
    registerClass(Matrix,Types.Matrix);

    /**
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    export var $TempMatrix = new Matrix();
}