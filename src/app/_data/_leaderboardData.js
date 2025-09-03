const leaderboardData = [
  {
    id: 1,
    rank: 1,
    name: "SRIMONEYSHANKAR AJITH",
    username: "code_ninja_sri",
    image: "img/team/SRIMONEYSHANKAR AJITH.jpg",
    contestRating: 2850,
    codeforcesRating: 2720,
    solvedProblems: 347,
    contestsParticipated: 24
  },
  {
    id: 2,
    rank: 2,
    name: "HARSH JHA",
    username: "binary_beast",
    image: "img/team/HARSH JHA.jpg",
    contestRating: 2720,
    codeforcesRating: 2650,
    solvedProblems: 318,
    contestsParticipated: 22
  },
  {
    id: 3,
    rank: 3,
    name: "VISHWANATH PRAKASH",
    username: "algo_wizard",
    image: "img/team/VISHWANATH PRAKASH.webp",
    contestRating: 2650,
    codeforcesRating: 2580,
    solvedProblems: 295,
    contestsParticipated: 20
  },
  {
    id: 4,
    rank: 4,
    name: "PRAJWAL KUMAR K",
    username: "frontend_coder",
    image: "img/team/PRAJWAL KUMAR K.jpg",
    contestRating: 2480,
    codeforcesRating: 2420,
    solvedProblems: 276,
    contestsParticipated: 18
  },
  {
    id: 5,
    rank: 5,
    name: "JAYANTH P",
    username: "mobile_master",
    image: "img/team/JAYANTH P .jpg",
    contestRating: 2380,
    codeforcesRating: 2350,
    solvedProblems: 254,
    contestsParticipated: 16
  },
  {
    id: 6,
    rank: 6,
    name: "M NIVIEN",
    username: "data_scientist_pro",
    image: "img/team/M NIVIEN.jpg",
    contestRating: 2290,
    codeforcesRating: 2180,
    solvedProblems: 238,
    contestsParticipated: 15
  },
  {
    id: 7,
    rank: 7,
    name: "LESTLIN ROBINS",
    username: "devops_coder",
    image: "img/team/LESTLIN ROBINS.jpeg",
    contestRating: 2180,
    codeforcesRating: 2120,
    solvedProblems: 221,
    contestsParticipated: 14
  },
  {
    id: 8,
    rank: 8,
    name: "ABEL GEORGE ABRAHAM",
    username: "fullstack_dev",
    image: "img/team/ABEL GEORGE ABRAHAM.jpg",
    contestRating: 2050,
    codeforcesRating: 1980,
    solvedProblems: 198,
    contestsParticipated: 12
  },
  {
    id: 9,
    rank: 9,
    name: "M SIVAPRASAD",
    username: "security_expert",
    image: "img/team/M SIVAPRASAD.jpeg",
    contestRating: 1980,
    codeforcesRating: 1920,
    solvedProblems: 189,
    contestsParticipated: 11
  },
  {
    id: 10,
    rank: 10,
    name: "SAUMYA SHAHI",
    username: "code_explorer",
    image: "img/team/SAUMYA SHAHI.jpeg",
    contestRating: 1890,
    codeforcesRating: 1850,
    solvedProblems: 175,
    contestsParticipated: 10
  }
];

// Recent contests data
const recentContests = [
  {
    id: 1,
    name: "Codeforces Round #896 (Div. 1)",
    date: "2025-07-28",
    type: "Codeforces",
    participants: 2847,
    status: "Completed",
    topPerformer: "SRIMONEYSHANKAR AJITH",
    topPerformerRank: 12
  },
  {
    id: 2,
    name: "AtCoder Beginner Contest 315",
    date: "2025-07-27",
    type: "AtCoder",
    participants: 1923,
    status: "Completed",
    topPerformer: "HARSH JHA",
    topPerformerRank: 8
  },
  {
    id: 3,
    name: "CodeChef Long Challenge July",
    date: "2025-07-25",
    type: "CodeChef",
    participants: 3245,
    status: "Completed",
    topPerformer: "VISHWANATH PRAKASH",
    topPerformerRank: 15
  },
  {
    id: 4,
    name: "LeetCode Weekly Contest 356",
    date: "2025-07-23",
    type: "LeetCode",
    participants: 4521,
    status: "Completed",
    topPerformer: "PRAJWAL KUMAR K",
    topPerformerRank: 24
  },
  {
    id: 5,
    name: "Codeforces Educational Round #153",
    date: "2025-07-21",
    type: "Codeforces",
    participants: 2156,
    status: "Completed",
    topPerformer: "JAYANTH P",
    topPerformerRank: 18
  },
  {
    id: 6,
    name: "Google Kickstart Round D",
    date: "2025-07-20",
    type: "Google",
    participants: 1876,
    status: "Completed",
    topPerformer: "M NIVIEN",
    topPerformerRank: 32
  }
];

// Helper functions for leaderboard data
export const getTopPerformers = (count = 5) => {
  return leaderboardData
    .sort((a, b) => b.contestRating - a.contestRating)
    .slice(0, count);
};

export const getLeaderboardByCategory = (category) => {
  const categoryMap = {
    'contest': leaderboardData.sort((a, b) => b.contestRating - a.contestRating),
    'codeforces': leaderboardData.sort((a, b) => b.codeforcesRating - a.codeforcesRating)
  };
  
  return categoryMap[category] || leaderboardData;
};

export const getMemberById = (id) => {
  return leaderboardData.find(member => member.id === id);
};

export const getRecentContests = () => {
  return recentContests;
};

export const getAverageRating = () => {
  return Math.round(leaderboardData.reduce((sum, member) => sum + member.contestRating, 0) / leaderboardData.length);
};

export { recentContests };
export default leaderboardData;
