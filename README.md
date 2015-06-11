#Lark
------------------

Lark ��һ���� Egret �Ŷ������Ļ���HTML5����������ƽ̨�ƶ�WebӦ�ã�΢վ�͸�ý����Ӫ���Ľ���Ӧ�ÿ�ܡ�

* **������Ⱦ** Lark ʹ�� Canvas ����Ⱦ UI, ʵ���˱� DOM ����������ʽ�б�
    �����߲��ع��Ļ���ϸ�ڡ�Lark ʵ����ȫ�Զ�����������Ⱦ�ﵽ�� DOM ������������ܱ��֡�
* **���ٿ���** Lark ����ʹ�� EXML ������Ӧ�ý��棬��ǩʽ���﷨�����ʺ� UI ������
  EXML ������������ UI ���߼�����ķ��룬�������Ŷ�Э���Ͱ汾������
  Lark ���ó��õ� UI ���������Ͼ���ʵ�ָ��ӹ��ܡ�
* **Ӳ������** Lark �ṩ�ḻ��Ӳ��������չ����ַ��� HTML5 ������
  ���� App ��������ܹ���ø��ӷḻ��ϵͳ API ��������������




##Hello Lark
---------------------

������һ���򵥵� Hello World ʾ��

```html

<!DOCTYPE HTML>
<html>
<head>
    <title>Hello World</title>
    <script src="libs/lark/lark.js"></script>
    <script src="libs/lark/lark.web.js"></script>
    <script src="libs/swan/swan.js"></script>
</head>
<body>
<div class="lark-player" data-entry-class="Main" style="height:400px"></div>

<script id="exml" type="text/xml">
    <s:Group class="Main" xmlns:s="http://ns.egret.com/swan">
        <s:Label text="Hello World" fontSize="64" fontFamily="Helvetica, Arial" left="150"/>
    </s:Group>
</script>

<script>
    var exml = document.getElementById('exml').textContent;
    new swan.sys.EXMLParser().parse(exml);
</script>

</body>
</html>

```
������ӻ������������ʾһ�� "Hello World"��

����� HTML ���������������� lark �� swan �� script �ļ����� EXML ��װ��һ�� script Tag �У�
ͨ�� JavaScript ȡ�� EXML �ı��� EXMLParser ���� EXML �е� `class="Main"` ����������һ��
JavaScript �� `Main`����ҳ�������ʱ��lark ����� `class="lark-player"` �� HTML Ԫ�أ�
������������������������`data-entry-class="Main"` ����˳���ִ�е���ڣ�Lark���Զ�ʵ���� `Main`
���ڻ�������ʾ������



##��װ Lark
--------------------

Lark Դ������ TypeScript ��д������Ҳ����ʹ�� JavaScript ������ Lark Ӧ�á�

###JavaScript
JavaScript �����߿���ֱ������ [build](https://github.com/egret-labs/Lark/tree/master/build)
Ŀ¼��Ԥ����� Lark script �ļ�������Ҫ��ģ�����뵽���� HTML �ļ��У����ɿ��� Lark Ӧ�á�

###TypeScript
Lark �ṩ�������й���������������ʹ�������й��߿��Է���Ĵ���������ͷ��� Lark ��Ŀ��

####��װǰ��׼��
Lark �����й��������� Node.js �� NPM ������δ��װ Node.js �Ŀ����߿��Ե� [Node.js ����](https://nodejs.org/) ���ذ�װ��
NPM �� Node.js �İ������ߣ�Ĭ�������»��� Node.js һ��װ��

####��װ�����й���
����Դ� github ��¡ Lark ��Դ���룬���� [���ش�����Դ����](https://github.com/egret-labs/Lark/archive/master.zip)��
Ȼ���������й����н��뵽 Lark �ĸ�Ŀ¼ִ�� `npm install -g` ��װ Lark �����й��ߡ�
��װ��ɺ�ִ�� `lark` �ܿ��� Lark ����İ汾��Ϣ��

####������Ŀ
�������Ĺ���Ŀ¼��ִ�� `lark create HelloWorld` Lark �ᴴ��һ�� HelloWorld Ŀ¼��Ϊ��Ŀ�ĸ�Ŀ¼, 
�������Ҫ�ڵ�ǰĿ¼������Ŀ����ֱ��ִ�� `lark create`�������й��߻��Զ���һ����������ڣ��밴����ʾ
ѡ����Ŀģ�塢��Ļ�ߴ��Ҫʹ�õ���չģ�顣

����������ʹ��˵����ο� [Lark �����й����ֲ�](https://github.com/egret-labs/Lark/blob/master/docs/cmd-tools.md)






##Next:
������ϸ�� Lark ʹ�÷�����ο�: https://github.com/egret-labs/Lark