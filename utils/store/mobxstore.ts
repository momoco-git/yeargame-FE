import { observable } from 'mobx';

export const mobxstore = observable({
  myTeam: '1팀',
  currentGame: '랜덤게임',
  currentUser: '4',
  gamelist: ['초성게임', '줌인아웃게임', '기억력게임', '인물사진게임'],
  setgame(data: string) {
    this.currentGame = data;
  },
  setuser(data: string) {
    this.currentUser = data;
  },
});
