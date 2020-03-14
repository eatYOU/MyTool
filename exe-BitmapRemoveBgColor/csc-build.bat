@echo off
title Csc Bitmap

cd exe
csc /define:DEBUG /optimize /r:System.Drawing.dll /out:bitmap.exe *.cs
echo csc build bitmap succeed!
@pause