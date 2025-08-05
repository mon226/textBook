// 講師プロフィールデータ

export interface Instructor {
  id: string;
  name: string;
  gender: '男' | '女';
  background: {
    highSchool: string;
    university: string;
    department?: string;
  };
  subjects?: string[];
  color: string;
}

export const instructors: Instructor[] = [
  {
    id: 'A',
    name: 'A講師',
    gender: '女',
    background: {
      highSchool: '私立中高一貫校',
      university: '医学部'
    },
    subjects: ['数学', '英語'],
    color: 'sub-6'
  },
  {
    id: 'B',
    name: 'B講師',
    gender: '女',
    background: {
      highSchool: '私立中高一貫校',
      university: '慶應義塾大学',
      department: '経済学部'
    },
    color: 'sub-1'
  },
  {
    id: 'C',
    name: 'C講師',
    gender: '男',
    background: {
      highSchool: '公立高校',
      university: '東工大',
      department: '情報理工学院'
    },
    subjects: ['数学', '物理'],
    color: 'sub-5'
  },
  {
    id: 'D',
    name: 'D講師',
    gender: '男',
    background: {
      highSchool: '県立高校',
      university: '慶應義塾大学',
      department: '理工学部'
    },
    subjects: ['数学'],
    color: 'sub-3'
  },
  {
    id: 'E',
    name: 'E講師',
    gender: '女',
    background: {
      highSchool: '公立中学・都立高校（not自校作成校）',
      university: '早稲田大学',
      department: '文化構想学部'
    },
    subjects: ['国語', '日本史'],
    color: 'sub-8'
  },
  {
    id: 'F',
    name: 'F講師',
    gender: '男',
    background: {
      highSchool: '私立中高一貫校',
      university: '東大理一→工学系'
    },
    subjects: ['数学', '英語', '国語'],
    color: 'sub-4'
  },
  {
    id: 'G',
    name: 'G講師',
    gender: '女',
    background: {
      highSchool: '地方中高一貫校',
      university: '東京大学',
      department: '理科二類'
    },
    color: 'chemistry-main'
  },
  {
    id: 'H',
    name: 'H講師',
    gender: '男',
    background: {
      highSchool: '都内私立中高一貫校',
      university: '東京大学',
      department: '文科三類'
    },
    color: 'geography-sub'
  },
  {
    id: 'I',
    name: 'I講師',
    gender: '男',
    background: {
      highSchool: '神奈川県公立高校',
      university: '早稲田大学',
      department: '基幹理工学部'
    },
    subjects: ['数学'],
    color: 'japanese-sub'
  },
  {
    id: 'J',
    name: 'J講師',
    gender: '女',
    background: {
      highSchool: '地方中高一貫校',
      university: '早稲田大学',
      department: '法学部'
    },
    subjects: ['英語'],
    color: 'japanese-main'
  },
  {
    id: 'K',
    name: 'K講師',
    gender: '男',
    background: {
      highSchool: '地方私立高校',
      university: '横浜国立大学',
      department: '経済学部DSEP'
    },
    color: 'physics-sub'
  },
  {
    id: 'L',
    name: 'L講師',
    gender: '女',
    background: {
      highSchool: '国立の高校',
      university: '慶應義塾大学',
      department: '薬学部'
    },
    subjects: ['数学'],
    color: 'history-jp-main'
  },
  {
    id: 'M',
    name: 'M講師',
    gender: '女',
    background: {
      highSchool: '公立中学・私立高校',
      university: '立教大学',
      department: '法学部'
    },
    subjects: ['英語'],
    color: 'english-main'
  }
];