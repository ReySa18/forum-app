import CategoryFilter from './CategoryFilter';

export default {
  title: 'Components/CategoryFilter',
  component: CategoryFilter,
  tags: ['autodocs'],
  argTypes: {
    onSelect: { action: 'category selected' },
  },
};

export const Default = {
  args: {
    categories: ['react', 'vue', 'angular', 'javascript'],
    selected: '',
    onSelect: () => {},
  },
};

export const WithSelection = {
  args: {
    categories: ['react', 'vue', 'angular', 'javascript'],
    selected: 'react',
    onSelect: () => {},
  },
};

export const SingleCategory = {
  args: {
    categories: ['general'],
    selected: '',
    onSelect: () => {},
  },
};

export const ManyCategories = {
  args: {
    categories: [
      'react', 'vue', 'angular', 'svelte', 'javascript',
      'typescript', 'nodejs', 'python', 'golang', 'rust',
      'docker', 'kubernetes', 'devops', 'database',
    ],
    selected: 'typescript',
    onSelect: () => {},
  },
};
