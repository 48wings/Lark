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


import Action = require('./Action');
import Entry = require('./Entry');
import Build = require('./Build');
import Project = require('./Project');
import FileUtil = require('../lib/FileUtil');
import server = require('../server/server');
import service = require('../service/index');

class Create extends Action {

    public run():number {
        super.run();
        var option = this.options;
        FileUtil.createDirectory(option.srcDir);
        FileUtil.createDirectory(option.debugDir);

        lark.options.project = new Project();
        lark.options.project.save();
        server.startServer(option, option.manageUrl + "create/");
        return 0;
    }

    public doCreate(projJson: lark.ILarkProject, callback?: Function) {
        var proj = new Project();
        proj.parse(projJson);
        this.options.project = proj;
        proj.save();
        var template = FileUtil.joinPath(lark.options.larkRoot, "tools/templates/" + proj.template);
        FileUtil.copy(template, lark.options.projectDir);
        this.copyLark();
        this.copyTemplate();
        var build = new Build(this.options);
        build.buildProject();
        FileUtil.remove(this.options.larkPropertiesFile);
        callback();
    }
}

export = Create;