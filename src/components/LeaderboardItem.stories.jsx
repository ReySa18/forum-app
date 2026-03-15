import LeaderboardItem from './LeaderboardItem';

export default {
  title: 'Components/LeaderboardItem',
  component: LeaderboardItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export const Gold = {
  args: {
    rank: 1,
    item: {
      user: {
        id: 'user-1',
        name: 'Budi Santoso',
        avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=6366f1&color=fff',
      },
      score: 2500,
    },
  },
};

export const Silver = {
  args: {
    rank: 2,
    item: {
      user: {
        id: 'user-2',
        name: 'Siti Rahma',
        avatar: 'https://ui-avatars.com/api/?name=Siti+Rahma&background=8b5cf6&color=fff',
      },
      score: 1800,
    },
  },
};

export const Bronze = {
  args: {
    rank: 3,
    item: {
      user: {
        id: 'user-3',
        name: 'Andi Wijaya',
        avatar: 'https://ui-avatars.com/api/?name=Andi+Wijaya&background=d97706&color=fff',
      },
      score: 1200,
    },
  },
};

export const Regular = {
  args: {
    rank: 7,
    item: {
      user: {
        id: 'user-7',
        name: 'Dewi Lestari',
        avatar: 'https://ui-avatars.com/api/?name=Dewi+Lestari&background=334155&color=fff',
      },
      score: 450,
    },
  },
};
