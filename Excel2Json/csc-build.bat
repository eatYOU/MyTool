@echo off
title Csc Csharp Script

cd exe
csc /define:DEBUG /optimize /r:Excel.dll /r:ICSharpCode.SharpZipLib.dll /out:excel2json.exe *.cs
echo csc build succeed!
@pause