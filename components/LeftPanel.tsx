"use client";
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const LeftPanel = () => {
  const [text, setText] = useState<string>(""); // 入力された文字列
  const [includeSpaces, setIncludeSpaces] = useState<boolean>(true); // 空白を含めるかどうか
  const [includeLineBreaks, setIncludeLineBreaks] = useState<boolean>(true); // 改行を含めるかどうか
  const [count, setCount] = useState<number>(0); // 文字数カウント

  const countCharacters = () => {
    let processedText = text;

    // 空白を除外する場合
    if (!includeSpaces) {
      processedText = processedText.replace(/\s/g, ""); // 空白文字をすべて削除
    }

    // 改行を除外する場合
    if (!includeLineBreaks) {
      processedText = processedText.replace(/\n/g, ""); // 改行文字をすべて削除
    }

    setCount(processedText.length); // カウントを更新
  };
  return (
    <div className="w-full h-full px-8 pt-8">
      <div className="flex justify-between items-center">
        <div className="flex space-x-8">
          <div className="flex items-center">
            <p>現在： </p>
            <p>{text.length}</p>
          </div>
          <div className="flex items-center">
            <p>目標：</p>
            <Input className="w-24" />
          </div>
        </div>
        {/* <Image src="/logo.jpg" alt="ロゴ" height={100} width={100} /> */}
        <p>ここに画像</p>
      </div>
      <div className="flex space-x-8 items-centers mt-4">
        <div className="flex items-center space-x-1">
          <Checkbox id="space" />
          <Label htmlFor="space">空白を含める</Label>
        </div>
        <div className="flex items-center space-x-1">
          <Checkbox id="lineBreak" />
          <Label htmlFor="lineBreak">改行を含める</Label>
        </div>
      </div>
      <Textarea
        className="h-1/2 mt-8"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default LeftPanel;
