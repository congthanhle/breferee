export const MatchStatus = {
  NOT_STARTED: 0,
  ONGOING: 1,
  COMPLETED: 2,
};

export const MatchStatusLabel = {
  [MatchStatus.NOT_STARTED]: 'Chưa bắt đầu',
  [MatchStatus.ONGOING]: 'Đang diễn ra',
  [MatchStatus.COMPLETED]: 'Đã kết thúc',
};