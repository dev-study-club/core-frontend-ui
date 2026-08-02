import type { ComponentType } from "react";

export type ChapterId =
  | "ch01"
  | "ch02"
  | "ch03"
  | "ch04"
  | "ch05"
  | "ch06"
  | "ch07"
  | "ch08"
  | "ch09"
  | "ch10"
  | "ch11"
  | "ch12"
  | "ch13"
  | "ch14"
  | "ch15"
  | "ch16"
  | "ch17";

export type MemberId = "yeji" | "jihyeon" | "juhye" | "juntae" | "changjun";

export interface StudyMember {
  id: MemberId;
  name: string;
}

export interface Chapter {
  id: ChapterId;
  title: string;
}

export interface ExampleEntry {
  chapterId: ChapterId;
  memberId: MemberId;
  title: string;
  description: string;
  Component: ComponentType;
}

