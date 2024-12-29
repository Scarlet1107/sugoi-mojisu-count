"use client";
import React, { useState, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LeftPanel = () => {
  const [text, setText] = useState<string>(""); // 入力された文字列
  const [includeSpaces, setIncludeSpaces] = useState<boolean>(true); // 空白を含めるかどうか
  const [includeLineBreaks, setIncludeLineBreaks] = useState<boolean>(true); // 改行を含めるかどうか
  const [currentCount, setCurrentCount] = useState<number>(0); // 文字数カウント
  const [goalCount, setGoalCount] = useState<number>(200); // 目標文字数

  // text, includeSpaces, includeLineBreaks の状態が変わるたびに自動で文字数を再計算
  useEffect(() => {
    let processedText = text;

    // 空白を除外する場合
    if (!includeSpaces) {
      // \s には空白文字やタブ、改行などすべて含まれるため、
      // 改行の除外/含有設定を別でやりたい場合は注意が必要
      processedText = processedText.replace(/\s/g, "");
    }

    // 改行を除外する場合
    if (!includeLineBreaks) {
      // 改行を除外するだけならこちら
      // ただし \s の中にも \n は含まれるため、上の処理との使い分け注意
      processedText = processedText.replace(/\n/g, "");
    }

    // 日本語など全角文字を考慮してサロゲートペアを正しく数えるため、スプレッド構文で配列化してlengthを取る
    const length = [...processedText].length;
    setCurrentCount(length);
  }, [text, includeSpaces, includeLineBreaks]);

  const handleTextChange = (newText: string) => {
    setText(newText); // テキストを更新
  };

  return (
    <div className="w-full h-full pt-8 pl-8 pr-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-8">
          {/* 「現在」の表示を text.length から count に変更 */}
          <div className="flex items-center">
            <p>現在： </p>
            <p>{currentCount}</p>
          </div>
          <div className="flex items-center">
            <p>目標：</p>
            <Input
              className="w-20"
              type="number"
              value={goalCount}
              step={100}
              min={0}
              onChange={(e) => setGoalCount(Number(e.target.value))}
            />
            <p>文字</p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger>
            <Image
              src="/tutorialButton.png"
              alt="チュートリアル"
              height={100}
              width={100}
              className="cursor-pointer"
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>すごい文字数カウントへようこそ！！</DialogTitle>
              <DialogDescription>
                このアプリでは、文字数をカウントすることができます。AIによる添削~~~
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-8 items-centers mt-4">
        <div className="flex items-center space-x-1">
          {/* チェックボックスに checked と onCheckedChange を設定し、
              includeSpaces と連動させる */}
          <Checkbox
            id="space"
            checked={includeSpaces}
            onCheckedChange={(checked: boolean) => {
              setIncludeSpaces(checked);
            }}
          />
          <Label htmlFor="space">空白を含める</Label>
        </div>
        <div className="flex items-center space-x-1">
          {/* 同様に、改行を含める設定も連動させる */}
          <Checkbox
            id="lineBreak"
            checked={includeLineBreaks}
            onCheckedChange={(checked: boolean) => {
              setIncludeLineBreaks(checked);
            }}
          />
          <Label htmlFor="lineBreak">改行を含める</Label>
        </div>
      </div>

      <div className="my-4">
        <Progress value={Math.min((currentCount / goalCount) * 100, 100)} />
      </div>

      <Textarea
        className="h-1/2"
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
      />
    </div>
  );
};

export default LeftPanel;
