﻿//////////////////////////////////////////////////////////////////////////////////////
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

/// <reference path="../lib/types.d.ts" />

import TypeScript = require("../lib/typescript/tsc");
import FileUtil = require("../lib/FileUtil");
import utils = require('../lib/utils');
import UglifyJS = require("../lib/uglify-js/uglifyjs");

class Action {

    public constructor(options: lark.ICompileOptions) {
        this.options = options;
        this.projectDir = options.projectDir;
    }

    public projectDir: string;
    public options: lark.ICompileOptions;

    public run(): number {
        return 0;
    }


    public clean(path: string) {

        var fileList = FileUtil.getDirectoryListing(path);
        var length = fileList.length;
        for (var i = 0; i < length; i++)
        {
            var path = fileList[i];
            FileUtil.remove(path);
        }
    }


    public buildProject(): number {
        var option: lark.ICompileOptions = this.options;

        //拷贝lark.js
        if (!option.publish && FileUtil.exists(option.srcLarkFile))
        {
            FileUtil.copy(option.srcLarkFile, option.outLarkFile);
        }

        var tsList: string[] = FileUtil.search(option.srcDir, "ts");
        return this.compile(option, tsList, option.out, option.outDir);

    }

    public buildLark(): number {

        var options: lark.ICompileOptions = this.options;
        var larkRoot = options.larkRoot;
        var srcPath: string = FileUtil.joinPath(larkRoot, "src");
        var tsList: string[] = FileUtil.search(srcPath, "ts");
        var output = options.srcLarkFile;
        var destOut = options.outLarkFile;

        if (FileUtil.exists(output))
            FileUtil.remove(output);
        var exitCode = this.compile(options, tsList, output, null, !options.publish);
        if (exitCode == 0)
        {
            FileUtil.copy(output, destOut);
        }
        return exitCode;
    }

    private compile(options: lark.ICompileOptions, files: string[], out?: string, outDir?: string, def?: boolean): number {
        var defTemp = options.declaration;
        options.declaration = def;

        var exitCode = TypeScript.executeWithOption(options, files, out, outDir, def);

        options.declaration = defTemp;

        if (!options.minify)
            return exitCode;

        
        if (!out)
        {
            console.log(utils.tr(10004));
            return exitCode;
        }

        var defines = {
            DEBUG: false,
            RELEASE: true
        }
        //UglifyJS参数参考这个页面：https://github.com/mishoo/UglifyJS2
        var result = UglifyJS.minify(out, { compress: { global_defs: defines }, output: { beautify: false } });
        FileUtil.save(out, result.code);

        return exitCode;
    }
    /**
    * 复制文件夹及其子文件夹下所有的文件
    * @param from 要搜索的文件夹
    * @param to 目标文件夹
    * @param filter 过滤函数：filter(file:string):boolean,参数为遍历过程中的每一个文件，返回true则加入结果列表
    */
    public copyDirectory(from: string, to: string, filter?: (filename: string) => boolean) {
        var fileList: string[] = [];
        if (!filter)
            fileList = FileUtil.getDirectoryListing(from);
        else
            fileList = FileUtil.searchByFunction(from, filter);
        length = fileList.length;
        for (var i = 0; i < length; i++) {
            var path = fileList[i];
            var destPath = path.substring(from.length);
            destPath = FileUtil.joinPath(to, destPath);
            FileUtil.copy(path, destPath);
        }
    }

    static fileExtensionToIgnore = {
        "ts": true
    };

    public srcFolderOutputFilter(file: string) {
        var extension = FileUtil.getExtension(file);
        if (extension in Action.fileExtensionToIgnore)
            return false;
        return true;
    }
}

TypeScript.exit = exitCode => {
    if (exitCode != 0)
        console.log(utils.tr(10003));
    return exitCode;
};


export = Action;