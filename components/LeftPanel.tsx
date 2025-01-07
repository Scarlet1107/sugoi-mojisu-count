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
import CopyButton from "./CopyButton";
import { useTextContext } from "@/context/TextContext";

const LeftPanel = () => {
  const { text, setText } = useTextContext(); // 入力された文字列
  const [includeSpaces, setIncludeSpaces] = useState<boolean>(false); // 空白を含めるかどうか
  const [includeLineBreaks, setIncludeLineBreaks] = useState<boolean>(false); // 改行を含めるかどうか
  const [currentCount, setCurrentCount] = useState<number>(0); // 文字数カウント
  const [goalCount, setGoalCount] = useState<number>(1000); // 目標文字数

  useEffect(() => {
    const savedText = localStorage.getItem("text");
    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("text", text);
    let processedText = text;

    if (!includeLineBreaks) {
      processedText = processedText.replace(/\n/g, "");
    }

    if (!includeSpaces) {
      processedText = processedText.replace(/[^\S\r\n]/g, "");
    }

    const length = [...processedText].length;
    setCurrentCount(length);
  }, [text, includeSpaces, includeLineBreaks]);

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  return (
    <div className="w-full h-full pt-8 pl-8 pr-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-8">
          <div className="flex items-center">
            <p>現在： </p>
            <p>{currentCount}</p>
          </div>
          <div className="flex items-center">
            <p>目標：</p>
            <Input
              className="w-24"
              type="text"
              inputMode="numeric"
              value={goalCount}
              step={100}
              min={0}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!isNaN(value)) {
                  setGoalCount(value);
                }
              }}
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
              <DialogTitle>
                <Image
                  src={"/welcomeNeco.png"}
                  height={300}
                  width={300}
                  alt="ようこそネコ"
                />
              </DialogTitle>
              <DialogDescription>
                このアプリでは、文字数をカウントすることができます。無料AIへの相談もすることができます。レポート作成や文章作成にお役立てください！
                <br />
                また、入力されたデータはブラウザに保存されるため、誤ってページを閉じてもデータが消える心配はありません。
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-8 items-centers mt-4">
        <div className="flex items-center space-x-1">
          <Checkbox
            id="space"
            aria-label="空白を含めるかどうか"
            checked={includeSpaces}
            onCheckedChange={(checked: boolean) => {
              setIncludeSpaces(checked);
            }}
          />
          <Label htmlFor="space">空白を含める</Label>
        </div>
        <div className="flex items-center space-x-1">
          <Checkbox
            id="lineBreak"
            aria-label="改行を含めるかどうか"
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
      {text.length > 0 && <CopyButton textToCopy={text} />}
    </div>
  );
};

export default LeftPanel;
